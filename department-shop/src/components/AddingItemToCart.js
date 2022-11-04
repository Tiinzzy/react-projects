import React from "react";

import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

import { submitOrder } from './functions';

class AddingItemToCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            closeDialog: props.closeDialog,
            selectedRow: props.selectedRow,
            quantity: '',
            customerName: '',
            customerAddress: '',
            error: null,
            nameError: null,
            addressError: null
        }
        this.cancelAndClose = this.cancelAndClose.bind(this);
        this.addAndClose = this.addAndClose.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
    }

    componentDidMount() {
    }

    cancelAndClose(e) {
        this.state.closeDialog(e);

    }

    async addAndClose(e) {

        let query = {
            customerName: this.state.customerName,
            customerAddress: this.state.customerAddress,
            productName: this.state.selectedRow.Name,
            quantity: this.state.quantity
        }

        let productQuantity = this.state.quantity * 1;
        let typeOK = typeof query.customerName === "string" && typeof query.customerAddress === "string" && typeof query.productName === "string" && !isNaN(productQuantity);
        let valueOK = query.customerName.length > 1 && query.customerAddress.length > 1 && productQuantity > 0;

        if (typeOK && valueOK) {
            await submitOrder(query);
            this.state.closeDialog(e, 'Order submited successfully.');
        } else {
            this.setState({ error: '', nameError: '', addressError: '' })
        }
    }

    handleQuantity(e) {
        let productQuantity = e.target.value * 1;
        if (!isNaN(productQuantity)) {
            if (productQuantity > 0) {
                this.setState({ quantity: productQuantity, error: null, quantityError: null });
                return;
            }
        }

        this.setState({ error: 'Quantity should be a positive number!', nameError: null,  addressError: null});

    }

    handleName(e) {
        this.setState({ customerName: e.target.value, error: null, nameError: null, addressError: null })
    }

    handleAddress(e) {
        this.setState({ customerAddress: e.target.value, error: null, nameError: null, addressError: null })
    }

    render() {
        return (
            <>
                <Box display="flex" flexDirection="row">
                    <Box display="flex" flexDirection="column" marginLeft={3} paddingTop={5} paddingBottom={5}>
                        <Typography>Item Name: {this.state.selectedRow.Name}</Typography>
                        <br />

                        <Typography>Size: {this.state.selectedRow.Size}</Typography>
                        <br />

                        <Typography>Price: {this.state.selectedRow.Price}</Typography>
                        <br />

                        <TextField label="Quantity" variant="outlined" style={{ width: '500px' }} value={this.state.quantity} onChange={(e) => this.handleQuantity(e)}
                            error={this.state.error !== null} helperText={this.state.error}></TextField>
                        <br />

                        <TextField label="Name" variant="outlined" style={{ width: '500px' }} value={this.state.customerName} onChange={(e) => this.handleName(e)}
                            error={this.state.nameError !== null} helperText={this.state.nameError} />
                        <br />

                        <TextField label="Address" variant="outlined" style={{ width: '500px' }} value={this.state.customerAddress} onChange={(e) => this.handleAddress(e)}
                            error={this.state.addressError !== null} helperText={this.state.addressError} />
                    </Box>
                </Box>
                <Divider />
                <DialogActions>
                    <Button onClick={(e) => this.cancelAndClose(e)} variant="outlined" color="error"> No </Button>
                    <Button onClick={(e) => this.addAndClose(e)} variant="outlined" color="success">Add to Cart</Button>
                </DialogActions>

            </>
        );
    }
}
export default AddingItemToCart;