import React from "react";

import Box from '@mui/material/Box';

import { eventEmitter } from './DisplayList';

class DisplayEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        console.log("genre");

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
                this is edit page
            </Box>
        );
    }
}
export default DisplayEdit;