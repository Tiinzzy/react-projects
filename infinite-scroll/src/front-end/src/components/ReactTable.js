import React from "react";

import { Column, Table } from "react-virtualized";

import BackEndConnection from './BackEndConnection';

import 'react-virtualized/styles.css';

const backend = BackEndConnection.INSTANCE();

const ROW_PER_PAGE = 20;
const ROW_PER_SCROLL = ROW_PER_PAGE / 2;

export default class ReactTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: null,
            dataDisplay: [],
            pageNum: 0
        }
    }

    componentDidMount() {
        let query = { offset_number: this.state.pageNum, display_number: ROW_PER_PAGE };
        backend.get_all_movies(query, (data) => {
            this.setState({ headers: Object.keys(data[0]).filter(h => h !== 'row_number'), dataDisplay: data }, () => {
                let updatedArray = [...this.state.headers];
                updatedArray.unshift('Id');
                this.setState({ headers: updatedArray });
            });
        });

        backend.get_data_length((data) => { this.setState({ fullDataLength: data[0].data_length }) });
    }

    render() {
        return (
            <div id="scorll-element" style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                <Table
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    width={1400}
                    height={400}
                    headerHeight={20}
                    rowHeight={50}
                    rowCount={this.state.dataDisplay.length}
                    rowGetter={({ index }) => this.state.dataDisplay[index]}>
                    <Column
                        label='id'
                        dataKey='id'
                        width={50}
                        height={10}
                    />
                    <Column
                        label='genres'
                        dataKey='genres'
                        width={150}
                        height={10}
                    />
                    <Column
                        label='imdb'
                        dataKey='imdb'
                        width={110}
                        height={10}
                    />
                    <Column
                        label='movie_id'
                        dataKey='movie_id'
                        width={110}
                        height={10}
                    />
                    <Column
                        label='overview'
                        dataKey='overview'
                        width={400}
                        height={10}
                    />
                    <Column
                        label='title'
                        dataKey='title'
                        width={150}
                        height={10}
                    />
                    <Column
                        label='vote'
                        dataKey='vote'
                        width={100}
                        height={10}
                    />
                    <Column
                        label='vote_count'
                        dataKey='vote_count'
                        width={150}
                        height={10}
                    />

                </Table>
            </div>
        );
    }
}