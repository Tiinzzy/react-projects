import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class UpdateMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: props.toBeUpdated,
            handleClose: props.handleClose,
            movieTitle: props.toBeUpdated.movieTitle,
            releaseDate: props.toBeUpdated.releaseDate,
            rating: props.toBeUpdated.rating
        }
    }

    getMovieTitle(e) {
        this.setState({ movieTitle: e.target.value });
    }

    getReleaseDate(e) {
        this.setState({ releaseDate: e.target.value });
    }

    getRating(e) {
        this.setState({ rating: e.target.value });
    }

    agreeAndClose() {
        let query = { 'oid': this.state.toBeUpdated.oid, 'movieTitle': this.state.movieTitle, 'releaseDate': this.state.releaseDate, 'rating': this.state.rating };
        backend.update_movie(query, (data) => {
            if (data === true) {
                this.state.handleClose('reload movie');
            };
        })
    }

    render() {
        return (
            <>
                <DialogTitle id="alert-dialog-title" mb={2}>
                    {"Update Movie"}
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', width: '500PX' }}>
                    <TextField label="Movie Title" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getMovieTitle(e)} value={this.state.movieTitle} />
                    <TextField label="Release Date" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getReleaseDate(e)} value={this.state.releaseDate} />
                    <TextField label="Rating" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getRating(e)} type="number" InputProps={{
                        inputProps: { max: 10, min: 0 }
                    }} value={this.state.rating} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default UpdateMovie;