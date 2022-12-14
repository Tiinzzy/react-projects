import React from "react";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";

import { editData } from "./functions";

import './style.css';

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
        this.state.close(true, query);
    }

    cancelAndClose(e) {
        this.state.close(false);
    }

    render() {
        return (
            <>
                <Divider />
                <Box className="DialogContentMainBox">
                    <Typography variant="body1">
                        <span className="DialogContentTexts">Id:</span> {this.state.clickedRow.id}
                    </Typography>

                    <Typography variant="body1">  <span className="DialogContentTexts">Date:</span> {this.state.clickedRow.DATE}</Typography>

                    <Typography variant="body1">  <span className="DialogContentTexts" >Description:</span> {this.state.clickedRow.DESC}</Typography>

                    <Typography variant="body1">  <span className="DialogContentTexts" >Amount:</span>  ${(this.state.clickedRow.AMOUNT * 1).toFixed(2)}</Typography>

                    <Box className="DialogContentMenuBox">
                        <Typography variant="body1"> <span className="DialogContentTexts" >Category:</span> </Typography>
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

                    <DialogActions style={{ marginTop: 20, marginRight: 20 }}>
                        <Button onClick={(e) => this.cancelAndClose(e)} variant="outlined" color="error"> Cancel </Button>
                        <Button disabled={this.state.CATEGORY === 'None'} onClick={() => this.submitEdit()} variant="outlined" color="success">Update</Button>
                    </DialogActions>
                </Box>
            </>
        );
    }
}

export default DialogContent;