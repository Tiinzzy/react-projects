import React from "react";

import DisplayList from "./DisplayList";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <DisplayList />
            </>
        );
    }
}
export default Home;