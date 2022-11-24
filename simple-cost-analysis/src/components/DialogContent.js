import React from "react";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";

import { editData } from "./functions";
import { DialogActions } from "@mui/material";

class DialogContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedRow: props.clickedRow,
            CATEGORY: props.clickedRow.CATEGORY,
            close: props.close
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.cancelAndClose = this.cancelAndClose.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
    }

    handleChangeCategory(e) {
        this.setState({ CATEGORY: e.target.value });
    }

    async submitEdit(e) {
        let query = {
            id: this.state.clickedRow.id,
            DATE: this.state.clickedRow.DATE,
            DESC: this.state.clickedRow.DESC,
            AMOUNT: this.state.clickedRow.AMOUNT,
            CATEGORY: this.state.CATEGORY
        };

        await editData(query);
        this.state.close(e, 'Category Changed Successfully');

        setTimeout(function () { window.location.reload(); }, 3000);
    }

    cancelAndClose(e) {
        this.state.close(e);
    }

    render() {
        return (
            <>
                <Divider />
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', marginLeft: 30, paddingBottom: 15, paddingTop: 15 }}>
                    <Typography variant="h6">
                        Id: {this.state.clickedRow.id}
                    </Typography>

                    <Typography variant="h6">  Date: {this.state.clickedRow.DATE}</Typography>

                    <Typography variant="h6">  Description: {this.state.clickedRow.DESC}</Typography>

                    <Typography variant="h6">  Amount: ${(this.state.clickedRow.AMOUNT * 1).toFixed(2)}</Typography>

                    <Box display='flex' alignItems='center' style={{ marginTop: 10, marginBottom: 10 }} >
                        <Typography variant="h6"> Category: </Typography>
                        <Select
                            style={{ width: 300, marginLeft: 10 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.CATEGORY}
                            onChange={(e) => this.handleChangeCategory(e)}>
                            <MenuItem value={'None'}>Not selected yet!</MenuItem>
                            <Divider />
                            <MenuItem value={'Commute'}>Commute</MenuItem>
                            <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
                            <MenuItem value={'Groceries'}>Groceries</MenuItem>
                            <MenuItem value={'Houseware'}>Houseware</MenuItem>
                            <MenuItem value={'Outfits'}>Outfits</MenuItem>
                            <MenuItem value={'Utilities'}>Utilities</MenuItem>
                            <Divider />
                            <MenuItem value={'Misc'}>Misc</MenuItem>
                        </Select>
                    </Box>

                    <Divider />

                    <DialogActions>
                        <Button onClick={(e) => this.cancelAndClose(e)} variant="outlined" color="error"> Cancel </Button>
                        <Button disabled={this.state.CATEGORY === 'None'} onClick={() => this.submitEdit()} variant="outlined" color="success">Update</Button>
                    </DialogActions>
                </Box>
            </>
        );
    }
}

export default DialogContent;