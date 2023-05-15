import React from "react";

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const STATUS = ['Backlog', 'To Do', 'In Progress', 'Completed'];
const PRIORITY = ['High', 'Low', 'Medium'];

export default class BacklogDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: STATUS[0],
            priority: PRIORITY[1]
        }
    }

    handleChangeStatus(e) {
        this.setState({ status: e.target.value });
    }

    handleChangePriority(e) {
        this.setState({ priority: e.target.value });
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Add New Task"}
                </DialogTitle>
                <DialogContent>
                    <Box style={{ marginTop: 20, display: 'flex', flexDirection: 'column', width: 500 }}>
                        <TextField label="Title" variant="outlined" style={{ marginBottom: 18 }} />
                        <TextField fullWidth multiline rows={5} label="Description" variant="outlined" style={{ marginBottom: 18 }} />
                        <FormControl fullWidth style={{ marginBottom: 18 }}>
                            <InputLabel >Status</InputLabel>
                            <Select
                                value={this.state.status}
                                label="Status"
                                onChange={(e) => this.handleChangeStatus(e)}>
                                {STATUS.map((e, i) => (
                                    <MenuItem key={i} value={e}>{e}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth style={{ marginBottom: 18 }}>
                            <InputLabel >Priority</InputLabel>
                            <Select
                                value={this.state.priority}
                                label="Priority"
                                onChange={(e) => this.handleChangePriority(e)}>
                                {PRIORITY.map((e, i) => (
                                    <MenuItem key={i} value={e}>{e}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="outlined">Submit</Button>
                </DialogActions>
            </>
        );
    }
};