import React from "react";

import Box from '@mui/material/Box';

import { eventEmitter } from './DisplayList';
import BackEndConnection from './BackEndConnection';
import ListAllGenre from './ListAllGenre';

const backend = BackEndConnection.INSTANCE();

class DisplayEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genreData: null
        }
    }

    componentDidMount() {
        eventEmitter.on('selectedItem', (data) => {
            if (data.item === "Customer") {
                this.handleCustomer();
            } else if (data.item === "Genre") {
                this.handleGenre();
            } else if (data.item === "Movies") {
                this.handleMovies();
            } else if (data.item === "Subscription") {
                this.handleSubscription();
            } else if (data.item === "TV Series") {
                this.handleTvSeries();
            }
        });
    }

    handleCustomer() {
        console.log("customer");
    }

    handleGenre() {
        backend.get_all_genre((data) => {
            this.setState({ genreData: data });
        })

    }

    handleMovies() {
        console.log("movies");

    }

    handleSubscription() {
        console.log("subscription");
    }

    handleTvSeries() {
        console.log("tv series");
    }

    componentWillUnmount() {
        eventEmitter.off('selectedItem');
    }

    render() {
        return (
            <Box style={{ border: 'solid 1px #eaeaea', marginLeft: 40, width: '90%', borderRadius: 6 }}>
                {this.state.genreData !== null && <ListAllGenre genreData={this.state.genreData} />}
            </Box>
        );
    }
}
export default DisplayEdit;