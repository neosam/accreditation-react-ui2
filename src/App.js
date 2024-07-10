//import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {ServerPath} from "./ServerPath";
import {MemberList} from "./MemberList";
import {MemberListUpdate} from "./MemberListUpdate";
import { v4 as uuidv4 } from 'uuid';

const mergeAttendantsWithMemberList = (memberList, attendants) => {
    return memberList.map(member => {
        let attends = attendants.find(attendant => attendant.member_id === member.id);
        return {
            ...member,
            attends: attends !== undefined,
            attendId: attends === undefined? null: attends.id,
        };
    });
}

function App() {
  const [serverPath, setServerPath] = useState("http://localhost:8080");
  const [serverPathEditVisible, setServerPathEditVisible] = useState(true);
  const [memberList, setMemberList] = useState([]);
  const [attendants, setAttendants] = useState([]);
  const [connected, setConnected] = useState(false);

  const updateAttendants = () => {
      fetch(`${serverPath}/attendant`)
          .then(response => response.json())
          .then(newAttendants => [newAttendants, setAttendants(newAttendants)])
          .then(([newAttendants, _]) => updateMemberList(memberList, newAttendants))
          .then(() => setConnected(true))
          .catch(() => setConnected(false));
  }

  useEffect(() => {
      const updateAttendantsInterval = setInterval(() => {
          updateAttendants();
      }, 300);
      return () => clearInterval(updateAttendantsInterval);
  })

  const updateMemberList = (newMemberList) => {
      const mergedList = mergeAttendantsWithMemberList(newMemberList, attendants);
      setMemberList(mergedList);
  }

  const onRegisterMember = (memberId) => {
    fetch(`${serverPath}/attendant`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: uuidv4(),
            member_id: memberId,
            registered_at: '2020-01-01T08:00:00+0100',
        })
    }).then(updateAttendants);
  }

  const onRemoveAttend = (memberId) => {
      fetch(`${serverPath}/attendant/${memberId}`, {
          method: 'DELETE',
      });
  }

  return (
    <div className="App">
        <div className={"server-connection"}>
            <ServerPath
                serverPath={serverPath}
                onUpdate={(newServerPath) => {
                  setServerPath(newServerPath)
                  console.log(newServerPath);
                }}
                expanded={serverPathEditVisible}
                onToggleExpand={() => setServerPathEditVisible(!serverPathEditVisible)}
            />
            {connected ? <div className={"connected-label"}>Verbunden</div> : <div className={"disconnected-label"}>Nicht verbunden</div>}
            </div>
        <MemberListUpdate serverPath={serverPath} onLoaded={memberList => updateMemberList(memberList)} />
        <MemberList memberList={memberList} doAttend={onRegisterMember} removeAttend={onRemoveAttend}/>
    </div>
  );
}

export default App;
