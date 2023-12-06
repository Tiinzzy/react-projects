import React from "react";

import Box from '@mui/material/Box';

import { eventEmitter, eventUpdateEmitter } from './DisplayList';
import { customerUpdate } from './list/ListAllCustomer';
import { genreUpdate } from './list/ListAllGenre';
import { movieUpdate } from './list/ListAllMovie';
import { subscriptionUpdate } from './list/ListAllSubscription';
import { tvSeriesUpdate } from './list/ListAllTvSeries';

import BackEndConnection from './BackEndConnection';
import ListAllGenre from './list/ListAllGenre';
import ListAllCustomer from "./list/ListAllCustomer";
import ListAllMovie from "./list/ListAllMovie";
import ListAllSubscription from "./list/ListAllSubscription";
import ListAllTvSeries from "./list/ListAllTvSeries";
import SearchDirectory from "./list/SearchDirectory";
import GameOfLife from "./list/GameOfLife";

const backend = BackEndConnection.INSTANCE();

class DisplayEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genreData: null,
            customerData: null,
            movieData: null,
            subscriptionData: null,
            tvseriesData: null,
            directorySearch: null,
            gol: null
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
            } else if (data.item === "Directory Depth Search") {
                this.setState({
                    directorySearch: true, subscriptionData: null, customerData: null, genreData: null, movieData: null, tvseriesData: null, gol: null
                });
            } else if (data.item === "Game of Life") {
                this.setState({ gol: true, directorySearch: null, subscriptionData: null, customerData: null, genreData: null, movieData: null, tvseriesData: null });
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
        });

        customerUpdate.on('update', (data) => {
            if (data.task === 'update')
                this.handleCustomer();
        });

        genreUpdate.on('update', (data) => {
            if (data.task === 'update')
                this.handleGenre();
        });

        movieUpdate.on('update', (data) => {
            if (data.task === 'update')
                this.handleMovies();
        });

        subscriptionUpdate.on('update', (data) => {
            if (data.task === 'update')
                this.handleSubscription();
        });

        tvSeriesUpdate.on('update', (data) => {
            if (data.task === 'update')
                this.handleTvSeries();
        });

    }

    handleCustomer() {
        backend.get_all_customers((data) => {
            this.setState({
                customerData: data, genreData: null, movieData: null, subscriptionData: null, tvseriesData: null, directorySearch: null, gol: null
            });
        })
    }

    handleGenre() {
        backend.get_all_genre((data) => {
            this.setState({ genreData: data, customerData: null, movieData: null, subscriptionData: null, tvseriesData: null, directorySearch: null, gol: null });
        });
    }

    handleMovies() {
        backend.get_all_movies((data) => {
            this.setState({ movieData: data, customerData: null, genreData: null, subscriptionData: null, tvseriesData: null, directorySearch: null, gol: null });
        });
    }

    handleSubscription() {
        backend.get_all_subscriptions((data) => {
            this.setState({ subscriptionData: data, customerData: null, genreData: null, movieData: null, tvseriesData: null, directorySearch: null, gol: null });
        });
    }

    handleTvSeries() {
        backend.get_all_tvseries((data) => {
            this.setState({ tvseriesData: data, subscriptionData: null, customerData: null, genreData: null, movieData: null, directorySearch: null, gol: null });
        });
    }

    componentWillUnmount() {
        eventEmitter.off('selectedItem');
        eventUpdateEmitter.off('reloadList');
        customerUpdate.off('update');
        genreUpdate.off('update');
        movieUpdate.off('update');
        subscriptionUpdate.off('update');
        tvSeriesUpdate.off('update');
    }

    render() {
        return (
            <Box style={{ border: 'solid 1px #eaeaea', marginLeft: 40, width: '90%', borderRadius: 6, borderBottom: 'none' }}>
                {this.state.genreData !== null && <ListAllGenre genreData={this.state.genreData} />}
                {this.state.customerData !== null && <ListAllCustomer customerData={this.state.customerData} />}
                {this.state.movieData !== null && <ListAllMovie movieData={this.state.movieData} />}
                {this.state.subscriptionData !== null && <ListAllSubscription subscriptionData={this.state.subscriptionData} />}
                {this.state.tvseriesData !== null && <ListAllTvSeries tvseriesData={this.state.tvseriesData} />}
                {this.state.directorySearch !== null && <SearchDirectory />}
                {this.state.gol !== null && <GameOfLife />}
            </Box>
        );
    }
}
export default DisplayEdit;