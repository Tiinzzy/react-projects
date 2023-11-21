import React from "react";

import Box from '@mui/material/Box';

import { eventEmitter, eventUpdateEmitter } from './DisplayList';

import BackEndConnection from './BackEndConnection';
import ListAllGenre from './list/ListAllGenre';
import ListAllCustomer from "./list/ListAllCustomer";
import ListAllMovie from "./list/ListAllMovie";
import ListAllSubscription from "./list/ListAllSubscription";
import ListAllTvSeries from "./list/ListAllTvSeries";

const backend = BackEndConnection.INSTANCE();

class DisplayEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genreData: null,
            customerData: null,
            movieData: null,
            subscriptionData: null,
            tvseriesData: null
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

        eventUpdateEmitter.on('reloadList', (data) => {
            if (data.for === 'movie') {
                this.handleMovies();
            } else if (data.for === 'customer') {
                this.handleCustomer();
            } else if (data.for === 'genre') {
                this.handleGenre();
            } else if (data.for === 'subsription') {
                this.handleSubscription();
            } else if (data.for === 'tvseries') {
                this.handleTvSeries();
            }
        })
    }

    handleCustomer() {
        backend.get_all_customers((data) => {
            this.setState({ customerData: data, genreData: null, movieData: null, subscriptionData: null, tvseriesData: null });
        })
    }

    handleGenre() {
        backend.get_all_genre((data) => {
            this.setState({ genreData: data, customerData: null, movieData: null, subscriptionData: null, tvseriesData: null });
        });
    }

    handleMovies() {
        backend.get_all_movies((data) => {
            this.setState({ movieData: data, customerData: null, genreData: null, subscriptionData: null, tvseriesData: null });
        });
    }

    handleSubscription() {
        backend.get_all_subscriptions((data) => {
            this.setState({ subscriptionData: data, customerData: null, genreData: null, movieData: null, tvseriesData: null });
        });
    }

    handleTvSeries() {
        backend.get_all_tvseries((data) => {
            this.setState({ tvseriesData: data, subscriptionData: null, customerData: null, genreData: null, movieData: null });
        });
    }

    componentWillUnmount() {
        eventEmitter.off('selectedItem');
        eventUpdateEmitter.off('reloadList');
    }

    render() {
        return (
            <Box style={{ border: 'solid 1px #eaeaea', marginLeft: 40, width: '90%', borderRadius: 6 }}>
                {this.state.genreData !== null && <ListAllGenre genreData={this.state.genreData} />}
                {this.state.customerData !== null && <ListAllCustomer customerData={this.state.customerData} />}
                {this.state.movieData !== null && <ListAllMovie movieData={this.state.movieData} />}
                {this.state.subscriptionData !== null && <ListAllSubscription subscriptionData={this.state.subscriptionData} />}
                {this.state.tvseriesData !== null && <ListAllTvSeries tvseriesData={this.state.tvseriesData} />}
            </Box>
        );
    }
}
export default DisplayEdit;