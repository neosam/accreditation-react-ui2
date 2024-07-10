export const ServerPath = ({serverPath, onUpdate, expanded, onToggleExpand}) => {
    return <div>
        {expanded ?
            <div>
                <input type="password" value={serverPath} onChange={(ev) => onUpdate(ev.target.value)} />
                <button onClick={() => onToggleExpand()}>Server Pfad verstecken</button>
            </div>
            :
            <button onClick={() => onToggleExpand()}>Server Pfad bearbeiten</button>
         }
    </div>
}