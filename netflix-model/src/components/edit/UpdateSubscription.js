import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import BackEndConnection from '../BackEndConnection';
import PriceMenu from "../add/PriceMenu";
import TypeMenu from "../add/TypeMenu";

const backend = BackEndConnection.INSTANCE();

class UpdateSubscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: props.toBeUpdated,
            handleClose: props.handleClose,
            price: props.toBeUpdated.price,
            type: props.toBeUpdated.subscriptionType,
            startDate: props.toBeUpdated.subscriptionDate,
            endDate: props.toBeUpdated.expiryDate
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
        let query = { 'oid': this.state.toBeUpdated.oid, 'subscriptionType': this.state.type, 'price': this.state.price, 'expiryDate': this.state.endDate, 'subscriptionDate': this.state.startDate };
        backend.update_subscription(query, (data) => {
            if (data === true) {
                this.state.handleClose('reload subscription');
            };
        })
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
                    {"Update Subscription OID: " + this.state.toBeUpdated.oid}
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField label="Subscription Start Date" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getStartDate(e)} value={this.state.startDate} />
                    <TextField label="Subscription End Date" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getEndDate(e)} value={this.state.endDate} />
                    <PriceMenu priceCallback={this.priceCallback} value={this.state.price} />
                    <TypeMenu typeCallBack={this.typeCallBack} value={this.state.type} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default UpdateSubscription;