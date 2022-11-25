import React from "react";

import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";

import { saveCsv } from './functions';

class SaveUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jCsv: props.jCsv,
            handleCloseDialog: props.handleCloseDialog,
            openSnack: false
        }
        this.cancelAndClose = this.cancelAndClose.bind(this);
        this.save = this.save.bind(this);
        this.handleCloseSnack = this.handleCloseSnack.bind(this);
    }

    async save(e) {
        await saveCsv(this.state.jCsv);
        this.state.handleCloseDialog();
    }

    cancelAndClose(e) {
        this.state.handleCloseDialog();
    }

    handleCloseSnack() {
        this.setState({ openSnack: false })
    }

    render() {
        return (
            <>
                    <DialogTitle>Would you like to save the uploaded file?</DialogTitle>
                    <Divider />

                    <Typography variant="body1" style={{marginLeft: 30, marginTop: 20, fontWeight: 'bold', marginBottom: 20}}>
                            Saving the new file will remove any pre existing data.
                    </Typography>
                    <Divider />

                    <DialogActions style={{marginTop: 20, marginBottom: 20,marginRight: 20}}>
                        <Button onClick={(e) => this.cancelAndClose(e)} variant="outlined" color="error"> Cancel </Button>
                        <Button onClick={(e) => this.save(e)} variant="outlined" color="success">Save</Button>
                    </DialogActions>
            </>
        );
    }
}
export default SaveUpload;