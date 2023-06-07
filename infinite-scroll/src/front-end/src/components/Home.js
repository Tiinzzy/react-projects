import React from 'react';

import ReactGrid from './ReactGrid'

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

const ROW_PER_PAGE = 20;
const ROW_PER_SCROLL = ROW_PER_PAGE / 2;

function convertingData(arrayOfObjects) {
    const arrayOfArrays = arrayOfObjects.map(array_obj => Object.values(array_obj));
    arrayOfArrays.unshift(['Genres', 'Imdb', 'Movie_Id', 'Overview', 'Id', 'Title', 'Vote', 'Vote_Count']);
    return arrayOfArrays
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: null,
            pageNum: 0,
            busy: false
        }
    }

    componentDidMount() {
        let query = { offset_number: 0, display_number: 20 };
        backend.get_all_movies(query, (data) => {
            let convertedData = convertingData(data);
            this.setState({ readyData: convertedData });
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
                    let convertedData = convertingData(data);
                    this.setState({ busy: false, pageNum, readyData: convertedData });
                });
            });
        } else if (!movingDown && !this.state.busy) {
            this.setState({ busy: true }, function () {
                let pageNum = this.state.pageNum - ROW_PER_SCROLL;
                pageNum = pageNum >= 0 ? pageNum : 0;
                let query = { offset_number: pageNum, display_number: ROW_PER_PAGE };
                backend.get_all_movies(query, (data) => {
                    let convertedData = convertingData(data);
                    this.setState({ busy: false, pageNum, readyData: convertedData });
                });
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handelScroll);
    }

    render() {
        return (<div id="scorll-element">
            {this.state.readyData && < ReactGrid arrayOfArrays={this.state.readyData} />}
        </div>
        );
    }
}