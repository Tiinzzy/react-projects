import React from "react";

import { Column, Table } from "react-virtualized";

import BackEndConnection from './BackEndConnection';

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
            <div id="scorll-element" style={{ display: 'flex', flexDirection: 'row' }}>
                <Table
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    headerHeight={200}
                    width={1000}
                    height={500}
                    rowHeight={150}
                    rowCount={this.state.dataDisplay.length}
                    rowGetter={({ index }) => this.state.dataDisplay[index]}>
                    <Column
                        label='id'
                        dataKey='id'
                        width={50}
                    />
                    <Column
                        label='genres'
                        dataKey='genres'
                        width={50}
                    />
                    <Column
                        label='imdb'
                        dataKey='imdb'
                        width={50}
                    />
                    <Column
                        label='movie_id'
                        dataKey='movie_id'
                        width={50}
                    />
                    <Column
                        label='overview'
                        dataKey='overview'
                        width={50}
                    />
                    <Column
                        label='title'
                        dataKey='title'
                        width={50}
                    />
                    <Column
                        label='vote'
                        dataKey='vote'
                        width={50}
                    />
                    <Column
                        label='vote_count'
                        dataKey='vote_count'
                        width={50}
                    />

                </Table>
            </div>
        );
    }
}