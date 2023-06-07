import React from "react";

import { Column, Table } from "react-virtualized";

import BackEndConnection from './BackEndConnection';

import 'react-virtualized/styles.css';
import './style.css';

const backend = BackEndConnection.INSTANCE();

const ROW_PER_PAGE = 20;
const ROW_PER_SCROLL = ROW_PER_PAGE / 2;

export default class ReactTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: null,
            dataDisplay: [],
            pageNum: 0,
            busy: false
        }
    }

    componentDidMount() {
        let query = { offset_number: this.state.pageNum, display_number: ROW_PER_PAGE };
        backend.get_all_movies(query, (data) => {
            this.setState({ headers: Object.keys(data[0]).filter(h => h !== 'row_number'), dataDisplay: data }, () => {
                // // let updatedArray = [...this.state.headers];
                // // updatedArray.unshift('Id');
                // this.setState({ headers: updatedArray });
            });
        });

        backend.get_data_length((data) => { this.setState({ fullDataLength: data[0].data_length }) });

        document.getElementById('scorll-element').addEventListener('wheel', (e) => this.handelScroll(e));
    }

    handelScroll(e) {
        let movingDown = e.deltaY > 0;
        if (movingDown && !this.state.busy) {
            this.setState({ busy: true }, function () {
                let pageNum = this.state.pageNum + ROW_PER_SCROLL;
                pageNum = pageNum < this.state.fullDataLength - ROW_PER_PAGE ? pageNum : this.state.fullDataLength - ROW_PER_PAGE;
                let query = { offset_number: pageNum, display_number: ROW_PER_PAGE };
                backend.get_all_movies(query, (data) => {
                    this.setState({ busy: false, pageNum, dataDisplay: data });
                });
            });
        } else if (!movingDown && !this.state.busy) {
            this.setState({ busy: true }, function () {
                let pageNum = this.state.pageNum - ROW_PER_SCROLL;
                pageNum = pageNum >= 0 ? pageNum : 0;
                let query = { offset_number: pageNum, display_number: ROW_PER_PAGE };
                backend.get_all_movies(query, (data) => {
                    this.setState({ busy: false, pageNum, dataDisplay: data });
                });
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handelScroll);
    }

    render() {
        return (
            <div id="scorll-element" style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                <Table
                    className="table-style"
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    width={1400}
                    height={400}
                    headerHeight={20}
                    rowHeight={50}
                    rowCount={this.state.dataDisplay.length}
                    rowGetter={({ index }) => this.state.dataDisplay[index]}>
                    {this.state.headers !== null && this.state.headers.map((e, i) => (
                        <Column
                            key={i}
                            label={e}
                            dataKey={e}
                            width={500}
                            height={10}
                        />
                    ))}
                </Table>
            </div>
        );
    }
}