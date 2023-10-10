import React from "react";

import './style.css';

class LoadingDots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <>
                <div className="snippet" data-title="dot-typing">
                    <div className="stage">
                        <div className="dot-typing"></div>
                    </div>
                </div>
            </>
        );
    }
}
export default LoadingDots;