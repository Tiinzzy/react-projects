import React from "react";

import Box from '@mui/material/Box';

import { eventEmitter } from './DisplayList';
import BackEndConnection from './BackEndConnection';
import ListAllGenre from './ListAllGenre';
import ListAllCustomer from "./ListAllCustomer";
import ListAllMovie from "./ListAllMovie";

const backend = BackEndConnection.INSTANCE();

class DisplayEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genreData: null,
            customerData: null,
            movieData: null
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
        backend.get_all_customers((data) => {
            this.setState({ customerData: data, genreData: null });
        })
    }

    handleGenre() {
        backend.get_all_genre((data) => {
            this.setState({ genreData: data, customerData: null });
        });
    }

    handleMovies() {
        backend.get_all_movies((data) => {
            this.setState({ movieData: data, customerData: null, genreData: null });
            console.log(data)
        });
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
                {this.state.customerData !== null && <ListAllCustomer customerData={this.state.customerData} />}
                {this.state.movieData !== null && <ListAllMovie movieData={this.state.movieData} />}
            </Box>
        );
    }
}
export default DisplayEdit;