import React from "react";

function TableHeader(props) {
    return (
        <thead>
            <tr>
                {props.headers.map((header) => (
                    <th key={header}>{header}</th>
                ))}
            </tr>
        </thead>
    );
}

function TableBody(props) {
    
    const rows = props.characterData.map((row, index) => (
        <tr key={index}>
            {props.headers.map((header) => (
                <td key={header}>{row[header]}</td>
            ))}
            <td>
                <button onClick={() => props.removeCharacter(index)}>
                    Delete
                </button>
            </td>
        </tr>
    ));
    return <tbody>{rows}</tbody>;
}

function Table(props) {
    return (
        <table>
            <TableHeader headers={props.headers} />
            <TableBody
                headers={props.headers}
                characterData={props.characterData}
                removeCharacter={props.removeCharacter}
            />
        </table>
    );
}

export default Table;
