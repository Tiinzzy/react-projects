import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class AddTvSeriesDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClick: props.addClick,
            handleClose: props.handleClose
        }
    }

    getTitle(e) {
        this.setState({ title: e.target.value });
    }

    getSummary(e) {
        this.setState({ summary: e.target.value });
    }

    getStartDate(e) {
        this.setState({ startDate: e.target.value });
    }

    getEndDate(e) {
        this.setState({ endDate: e.target.value });
    }

    agreeAndClose() {
        if (this.props.addClick === "Subscription") {
            let query = { 'title': this.state.title, 'summary': this.state.summary, 'startDate': this.state.startDate, 'endDate': this.state.endDate };
            backend.add_tvseries(query, (data) => {
                if (data === true) {
                    this.state.handleClose('reload tvseries');
                };
            })
        }
    }

    render() {
        return (
            <>
                <DialogTitle id="alert-dialog-title" mb={2}>
                    {"Add " + this.state.addClick}
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', width: '450px' }}>
                    <TextField label="Title" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getTitle(e)} />
                    <TextField label="Summary" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getSummary(e)} />
                    <TextField label="Start Date" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getStartDate(e)} />
                    <TextField label="End Date" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getEndDate(e)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default AddTvSeriesDialog;