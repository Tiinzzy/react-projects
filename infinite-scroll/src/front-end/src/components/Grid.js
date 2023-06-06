import React from "react";

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        backend.get_all_movies((data) => {
            console.log(data);
        })
    }

    render() {
        return (
            <>
                this is the grid
            </>
        );
    }
}