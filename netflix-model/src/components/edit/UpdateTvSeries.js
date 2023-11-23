import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Divider from "@mui/material/Divider";

import BackEndConnection from '../BackEndConnection';
import { Typography } from "@mui/material";

const backend = BackEndConnection.INSTANCE();

class UpdateTvSeries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: props.toBeUpdated,
            handleClose: props.handleClose,
            title: props.toBeUpdated.title,
            summary: props.toBeUpdated.summary,
            startDate: props.toBeUpdated.startDate,
            endDate: props.toBeUpdated.endDate,
        }
    }

    componentDidMount() {
        let query = { 'oid': this.state.toBeUpdated.oid };
        backend.load_tv_seasons(query, (data) => {
            if (data.length > 0) {
                this.setState({ seasons: data });
            } else {
                this.setState({ hasSeason: false });
            }
        })
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
        let query = {
            'oid': this.state.toBeUpdated.oid, 'title': this.state.title, 'summary': this.state.summary,
            'startDate': this.state.startDate, 'endDate': this.state.endDate
        };
        if (this.state.hasSeason) {
            query.seasonNumber = this.state.seasonNum * 1;
            query.seasonStartDate = this.state.seasonStartDate;
            query.seasonEndDate = this.state.seasonEndDate;
            query.action = this.state.toDoAction;
            if (this.state.toDoAction === 'update') {
                query.seasonOid = this.state.seasonOid;
            }
        }
        backend.update_tvseries(query, (data) => {
            if (data === true) {
                this.state.handleClose('reload tvseries');
            };
        })
    }

    handleClickedSeason(e) {
        this.setState({ hasSeason: true, seasonNum: e.seasonNumber, seasonStartDate: e.startDate, seasonEndDate: e.endDate, toDoAction: 'update', seasonOid: e.oid });
    }

    getSeasonNum(e) {
        this.setState({ seasonNum: e.target.value * 1 });
    }

    getSeasonStartDate(e) {
        this.setState({ seasonStartDate: e.target.value });
    }

    getSeasonEndDate(e) {
        this.setState({ seasonEndDate: e.target.value });
    }

    addSeason() {
        let condition = this.state.seasons === undefined ? 1 : this.state.seasons.length + 1;
        this.setState({ toDoAction: 'addNew', hasSeason: true, seasonNum: condition, seasonStartDate: '', seasonEndDate: '' });
    }

    render() {
        return (
            <Box>
                <DialogTitle id="alert-dialog-title" mb={2}>
                    {"Update TV Series OID: " + this.state.toBeUpdated.oid}
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <Box style={{ paddingRight: 0 }}>
                        <Box mt={3}>
                            <TextField sx={{ mr: 2 }} label="Title" variant="outlined" onChange={(e) => this.getTitle(e)} size='small' value={this.state.title} />
                            <TextField sx={{ mr: 2 }} label="Start Date" variant="outlined" onChange={(e) => this.getStartDate(e)} size='small' value={this.state.startDate} />
                            <TextField label="End Date" variant="outlined" onChange={(e) => this.getEndDate(e)} size='small' value={this.state.endDate} />
                        </Box>

                        <Box mt={3}>
                            <TextField label="Summary" variant="outlined" onChange={(e) => this.getSummary(e)} size='small' value={this.state.summary}
                                fullWidth={true} multiline={true} maxRows={10} minRows={4} />
                        </Box>


                        <Box display="flex" width={1} mt={2}>
                            <Typography style={{ display: 'flex', alignItems: 'center' }}>Seasons:
                                {this.state.seasons && this.state.seasons.map((e, i) => (
                                    <span key={i} style={{ paddingLeft: 5, fontWeight: 'bold', cursor: 'pointer' }} onClick={() => this.handleClickedSeason(e)}>
                                        {e.seasonNumber}</span>))}
                            </Typography>
                            <Box flexGrow={1} />
                            <AddBoxIcon onClick={() => this.addSeason()} style={{ 'cursor': 'pointer' }} />
                        </Box>

                    </Box>
                    <Divider />
                    {this.state.hasSeason &&
                        <Box style={{ marginTop: 15 }}>
                            <TextField label="Season Number" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getSeasonNum(e)} size='small'
                                value={this.state.seasonNum} disabled={this.state.seasons.length > 0} />
                            <TextField label="Start Date" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getSeasonStartDate(e)} size='small'
                                value={this.state.seasonStartDate} />
                            <TextField label="End Date" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getSeasonEndDate(e)} size='small'
                                value={this.state.seasonEndDate} />
                        </Box>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </Box>
        );
    }
}
export default UpdateTvSeries;