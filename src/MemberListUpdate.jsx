export const MemberListUpdate = ({serverPath, onLoaded}) => {
    return <button onClick={() =>
        fetch(`${serverPath}/member`)
            .then(response => response.json())
            .then(memberList => onLoaded(memberList))
    }>Lade Mitgliederliste</button>
}

