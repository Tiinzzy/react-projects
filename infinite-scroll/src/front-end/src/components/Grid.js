import React from "react";

import BackEndConnection from './BackEndConnection';

import '../App.css';

const backend = BackEndConnection.INSTANCE();

export default class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: null
        }
    }

    componentDidMount() {
        backend.get_all_movies((data) => {
            this.setState({ headers: Object.keys(data[0]) });
            console.log(data[0])
        })
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ overflowY: 'scroll', height: 100, border: 'solid 1px black', width: 400 }}>
                    <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5 }} cellPadding={0} cellSpacing={1}>
                        <tbody >
                            <tr>
                                {this.state.headers !== null && this.state.headers.map((e, i) => (
                                    <th key={i}>{e}</th>
                                ))}
                            </tr>
                            <tr>
                                {/* <td>
                                    gf
                                </td>
                                <td>
                                    gf
                                </td>
                                <td>
                                    gh
                                </td> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}