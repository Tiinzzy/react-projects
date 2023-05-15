import React from "react";

import './style.css';

const KANBAN_HEADERS = ['Backlog', 'To Do', 'In Progress', 'Completed'];
const TEST = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

export default class KanbanTable extends React.Component {

    constructor(props) {
        super(props);
        this.dragItem = React.createRef();
        this.dragOverItem = React.createRef();
        this.state = {
            list: TEST,
            dragItem: null,
            dragOverItem: null
        }
    }

    handleDragStart(e, position) {
        console.log(position, 'start postion');
        this.dragItem.current = position;
        this.setState({ dragItem: this.dragItem.current });
        console.log(e.target.innerHTML);
        console.log("Dragging STARTED")
    }

    handleDrag(e, position) {
        console.log(position, 'moving position');
        this.dragOverItem.current = position;
        this.setState({ dragOverItem: this.dragOverItem.current });
        console.log(e.target.innerHTML);
        console.log("Dragging CURRENT...")
    }

    handleDragEnd() {
        const copy_test = [...TEST];
        const dragItemContent = copy_test[this.dragItem.current];
        copy_test.splice(this.state.dragItem, 1);
        copy_test.splice(this.state.dragOverItem, 0, dragItemContent);
        this.setState({ list: copy_test })

        console.log("Ended")
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
                            {this.state.list && this.state.list.map((e, i) => (
                                <td key={i}
                                    draggable
                                    onDragStart={(e) => this.handleDragStart(e, i)}
                                    onDragEnter={(e) => this.handleDrag(e, i)}
                                    onDragEnd={this.handleDragEnd} width='25%'>{e}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}