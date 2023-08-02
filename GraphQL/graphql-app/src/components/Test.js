import React from 'react';
import axios from 'axios';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();


export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            newTaskContent: '',
        }
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        let query = `
        query{
          tasks {
            id
            content
          }
        }
      `;
        backend.graphql_get_tasks(query, (data) => {
            console.log(data);
        });
    }


    handleInputChange(e) {
        this.setState({ newTaskContent: e.target.value });
    };

    addTask() {
        if (this.state.newTaskContent.trim() !== '') {
            let content = this.state.newTaskContent;
            let query = `
        mutation addTask($content: String!) {
          addTask(content: $content) {
            id
            content
          }
        }`;

            backend.graphql_update_tasks(query, content, (data) => {
                console.log(data);
            });
        };
    }
    render() {

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1>To-Do List</h1>
                <div>
                    <input
                        type="text"
                        value={this.state.newTaskContent}
                        onChange={(e) => this.handleInputChange(e)}
                        placeholder="Enter a new task"
                    />
                    <button onClick={() => this.addTask()} style={{ marginLeft: 10 }}>Add Task</button>
                </div>
                <ul>
                    {this.state.tasks.map((task) => (
                        <li key={task.id}>{task.content}</li>
                    ))}
                </ul>
            </div>
        );
    }
};