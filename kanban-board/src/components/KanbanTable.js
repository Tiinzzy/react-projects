import React from "react";

import './style.css';

const KANBAN_HEADERS = ['Backlog', 'To Do', 'In Progress', 'Completed'];

export default class KanbanTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5 }} cellPadding={0} cellSpacing={1}>
                    <tbody>
                        <tr>
                            {KANBAN_HEADERS.map((e, i) => (
                                <th key={i} width='25%'>{e}</th>
                            ))}
                        </tr>
                        <tr>
                            <td width='25%'>1</td>
                            <td width='25%'>2</td>
                            <td width='25%'>3</td>
                            <td width='25%'>4</td>
                        </tr>
                        <tr>
                            <td width='25%'>5</td>
                            <td width='25%'>6</td>
                            <td width='25%'>7</td>
                            <td width='25%'>8</td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}