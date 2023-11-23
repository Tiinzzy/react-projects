import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class AddMoviesDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClick: props.addClick,
            handleClose: props.handleClose,
            movieTitle: '',
            releaseDate: '',
            rating: ''
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
        if (this.props.addClick === "Movies" && (this.state.movieTitle.length !== 0 || this.state.releaseDate.length !== 0 || this.state.rating.length !== 0)) {
            let query = { 'movieTitle': this.state.movieTitle, 'releaseDate': this.state.releaseDate, 'rating': this.state.rating };
            backend.add_movie(query, (data) => {
                if (data === true) {
                    this.state.handleClose('reload movie');
                };
            })
        } else {
            this.setState({ message: 'Please fill all fields!' });
        }

    }

    render() {
        return (
            <>
                <DialogTitle id="alert-dialog-title" mb={2}>
                    {"Add " + this.state.addClick}
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', width: '500PX' }}>
                    <TextField label="Movie Title" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getMovieTitle(e)} />
                    <TextField label="Release Date" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getReleaseDate(e)} />
                    <TextField label="Rating" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getRating(e)} type="number" InputProps={{
                        inputProps: { max: 10, min: 0 }
                    }} />
                </DialogContent>
                <DialogActions>
                    <Typography style={{ color: 'crimson', marginLeft: 25 }}>{this.state.message}</Typography>
                    <Box display="flex" flexGrow={1} />
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default AddMoviesDialog;