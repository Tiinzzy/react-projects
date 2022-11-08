import React from "react";

class CsvGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jCsv: props.jCsv
        }
    }

    render() {
        return (
            <>
                hello
                {this.state.jCsv.map((e, i) => (<div key={i}>
                    {this.state.jCsv[i].W1}
                </div>))}
            </>
        );
    }
}
export default CsvGrid;