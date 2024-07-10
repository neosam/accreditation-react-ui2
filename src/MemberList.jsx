import {useState} from "react";

export const MemberList = ({memberList, doAttend, removeAttend}) => {
    let [search, setSearch] = useState("");

    const filterList = (list) => {
        return list.filter(member =>
            search.trim() === '' ||
            member.first_name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
            member.last_name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
            `${member.member_id}`.toLowerCase().indexOf(search.toLowerCase()) >= 0);
    }

    const sortList = (list) => {
        return list.sort((memberA, memberB) => {
            if (memberA.last_name < memberB.last_name) {
                return -1;
            }
            if (memberA.last_name > memberB.last_name) {
                return 1;
            }
            if (memberA.first_name < memberB.first_name) {
                return -1;
            }
            if (memberA.first_name > memberB.first_name) {
                return 1;
            }
            return 0;
        })
    }

   return <div>
       <p className={"search-box"}>
           <label className={"search-box-label"}>Suche:</label>
           <input className={"search-box-input"} value={search} onChange={ev => setSearch(ev.target.value)} />
       </p>
       <table className={"member-list"}>
           <thead>
           <tr>
               <th>Nachname</th>
               <th>Vorname</th>
               <th>Mitgliedsnummer</th>
               <th>Angemeldet</th>
           </tr>
           </thead>
           <tbody>
           {sortList(filterList(memberList)).map(member =>
               <tr className={member.attends? "row-attends": "row-not-attends"}>
                <td>{member.last_name}</td>
                <td>{member.first_name}</td>
                <td>{member.member_id}</td>
                   <td>{member.attends ?
                       <div className={"attends-field"}>
                         <label className={"attends-label"}>Angemeldet</label>
                         <button className={"remove-attend-button"}
                             onClick={() => removeAttend(member.attendId)}
                         >Abmelden</button>
                       </div>:
                    <button
                        onClick={() => doAttend(member.id)}
                    >Anmelden</button>}</td>
               </tr>
           )}
           </tbody>
       </table>
   </div>
}