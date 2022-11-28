import React from "react";

import FilePicker from './FilePicker'

class SaveFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <FilePicker />
            </>
        );
    }
}
export default SaveFile;