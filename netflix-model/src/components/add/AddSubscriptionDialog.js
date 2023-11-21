import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import BackEndConnection from '../BackEndConnection';
import PriceMenu from "./PriceMenu";
import TypeMenu from "./TypeMenu";

const backend = BackEndConnection.INSTANCE();

class AddSubscriptionDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClick: props.addClick,
            handleClose: props.handleClose
        }
        this.priceCallback = this.priceCallback.bind(this);
        this.typeCallBack = this.typeCallBack.bind(this);
    }

    getStartDate(e) {
        this.setState({ startDate: e.target.value });
    }

    getEndDate(e) {
        this.setState({ endDate: e.target.value });
    }

    agreeAndClose() {
        if (this.props.addClick === "Subscription") {
            let query = { 'subscriptionType': this.state.type, 'price': this.state.price, 'expiryDate': this.state.endDate, 'subscriptionDate': this.state.startDate };
            backend.add_subscription(query, (data) => {
                if (data === true) {
                    this.state.handleClose();
                };
            })
        }
    }

    priceCallback(price) {
        this.setState({ price: price });
    }

    typeCallBack(type) {
        this.setState({ type: type });
    }

    render() {
        return (
            <>
                <DialogTitle id="alert-dialog-title" mb={2}>
                    {"Add " + this.state.addClick}
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', width: '450px' }}>
                    <TextField label="Subscription Start Date" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getStartDate(e)} />
                    <TextField label="Subscription End Date" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getEndDate(e)} />
                    <PriceMenu priceCallback={this.priceCallback} />
                    <TypeMenu typeCallBack={this.typeCallBack} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default AddSubscriptionDialog;