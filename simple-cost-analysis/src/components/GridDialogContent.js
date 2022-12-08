import React from "react";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";
import Checkbox from '@mui/material/Checkbox';

import { stringWordsEqual, setCategory } from "./functions";
import { constants } from './constants';

import './design.css';

class GridDialogContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedRow: props.clickedRow,
            CATEGORY: props.clickedRow.CATEGORY,
            close: props.close,
            rows: props.rows,
            checkBox: false
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.cancelAndClose = this.cancelAndClose.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }

    componentDidMount() {
    }

    handleChangeCategory(e) {
        this.setState({ CATEGORY: e.target.value });
    }

    async submitEdit(e) {
        console.log(111, this.state.checkBox);
        if (this.state.checkBox) {
            let query = {
                id: this.state.rows.filter(e => stringWordsEqual(this.state.clickedRow.DESC, e.DESC)).map(e => e.id),
                CATEGORY: this.state.CATEGORY
            };
            await setCategory(query);
            this.state.close(true, query);
        } else {
            let query = {
                id: this.state.clickedRow.id,
                CATEGORY: this.state.CATEGORY
            };
            await setCategory(query);
            this.state.close(true, query);
        }
    }

    cancelAndClose(e) {
        this.state.close(false);
    }

    handleCheckBox(e) {
        this.setState({ checkBox: e.target.checked })
    }

    render() {
        return (
            <>
                <Divider />
                <Box className="GridDialogContentBox">
                    <Typography variant="body1">
                        <span className="GridDialogText">Id:</span> {this.state.clickedRow.id}
                    </Typography>

                    <Typography sx={{ mt: 1 }} variant="body1">  <span className="GridDialogText">Date:</span> {this.state.clickedRow.DATE}</Typography>

                    <Typography sx={{ mt: 1 }} variant="body1">  <span className="GridDialogText">Description:</span> {this.state.clickedRow.DESC}</Typography>

                    <Typography sx={{ mt: 1 }} variant="body1">  <span className="GridDialogText">Amount:</span>  ${(this.state.clickedRow.AMOUNT * 1).toFixed(2)}</Typography>

                    <Box className="GridDialogMenuBox">
                        <Typography variant="body1"> <span className="GridDialogText">Category:</span> </Typography>
                        <Select
                            size='small'
                            style={{ width: 300, marginLeft: 10 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.CATEGORY}
                            onChange={(e) => this.handleChangeCategory(e)}>
                            {constants.categories.map((e, i) => (<MenuItem key={i} value={e}>{e}</MenuItem>))}
                        </Select>
                    </Box>

                    <Box className="Checkbox">
                        <Box mt={1.2}>
                            Apply "{this.state.CATEGORY}" category for similar descriptions?
                        </Box>
                        <Box>
                            <Checkbox
                                checked={this.state.checkBox}
                                onChange={(e) => this.handleCheckBox(e)} />
                        </Box>
                    </Box>

                    <Divider />

                    <DialogActions style={{ marginTop: 20, marginRight: 20 }}>
                        <Button size='small' onClick={(e) => this.cancelAndClose(e)} variant="outlined" color="error"> Cancel </Button>
                        <Button size='small' disabled={this.state.CATEGORY === 'None'} onClick={() => this.submitEdit()} variant="outlined" color="success">Update</Button>
                    </DialogActions>
                </Box>
            </>
        );
    }
}

export default GridDialogContent;