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
            priority: PRIORITY[1],
            handleCloseDialog: props.handleCloseDialog,
            title: '',
            description: ''
        }
    }

    getTitle(e) {
        this.setState({ title: e.target.value });
    }

    getDescription(e) {
        this.setState({ description: e.target.value });
    }

    handleChangeStatus(e) {
        this.setState({ status: e.target.value });
    }

    handleChangePriority(e) {
        this.setState({ priority: e.target.value });
    }

    cancelAndClose() {
        this.state.handleCloseDialog();
    }

    submitAndClose() {
        let query = { title: this.state.title, description: this.state.description, status: this.state.status, priority: this.state.priority };
        this.state.handleCloseDialog(query);
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Add New Task"}
                </DialogTitle>
                <DialogContent>
                    <Box style={{ marginTop: 20, display: 'flex', flexDirection: 'column', width: 500 }}>
                        <TextField label="Title" variant="outlined" style={{ marginBottom: 18 }} onChange={(e) => this.getTitle(e)} />
                        <TextField fullWidth multiline rows={3} label="Description" variant="outlined" style={{ marginBottom: 18 }} onChange={(e) => this.getDescription(e)} />
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
                    <Button variant="outlined" onClick={() => this.cancelAndClose()}>Cancel</Button>
                    <Button variant="outlined" onClick={() => this.submitAndClose()}>Submit</Button>
                </DialogActions>
            </>
        );
    }
};