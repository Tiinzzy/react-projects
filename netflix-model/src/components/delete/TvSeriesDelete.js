import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class TvSeriesDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toBeDeleted: props.toBeDeleted,
            handleClose: props.handleClose,
            title: props.toBeDeleted.title,
            summary: props.toBeDeleted.summary,
            startDate: props.toBeDeleted.startDate,
            endDate: props.toBeDeleted.endDate
        }
    }

    componentDidMount() {
        let query = { 'oid': this.state.toBeDeleted.oid };
        backend.load_tv_seasons(query, (data) => {
            console.log(data)
            if(data.length >0 ){
                this.setState({ seasons: data });
            }else{
                this.setState({ seasons: 0 });
            }
        })
    }

    agreeAndClose() {
        if (this.state.seasons.length > 0) {
            console.log('delete here')
            let query = { 'oid': this.props.toBeDeleted.oid };
            backend.delete_tvseries(query, (data) => {
                if (data === true) {
                    this.state.closeDialog('reload tvseries');
                };
            });
        } else {
            this.setState({ message: 'You need to delete seasons first!' }, () => {
                console.log(this.state.message)
            });
        }

    }

    render() {
        return (
            <Box>
                <DialogTitle id="alert-dialog-title" mb={2}>
                    {"Delete TV Series OID: " + this.state.toBeDeleted.oid}
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField label="Title" variant="outlined" style={{ margin: 10 }} size='small' value={this.state.title} disabled={true} />
                    <TextField label="Start Date" variant="outlined" style={{ margin: 10 }} size='small' value={this.state.startDate} disabled={true} />
                    <TextField label="End Date" variant="outlined" style={{ margin: 10 }} size='small' value={this.state.endDate} disabled={true} />
                    <TextField label="Summary" variant="outlined" style={{ margin: 10 }} size='small' value={this.state.summary}
                        multiline={true} maxRows={10} minRows={4} disabled={true} />
                    <TextField label="Number of Seasons" variant="outlined" style={{ margin: 10 }} size='small' value={this.state.seasons} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </Box>
        );
    }
}
export default TvSeriesDelete;