import React from "react";

import { DataGrid } from "@mui/x-data-grid";

import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/system/Box";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import AddingItemToCart from "./AddingItemToCart.js";

import { getTheDepartmentsPrducts, productColumns } from './functions.js';

const gridStyle = {
    height: 600,
    marginTop: 10,

}

const dialogStyle = {
    margin: 10,
    padding: 5
}

class ProductGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected,
            columns: [],
            rows: [],
            departments: props.departments,
            dialogOpen: false,
            selectedRow: null,
            message: null,
            openSnack: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleCloseSnack = this.handleCloseSnack.bind(this);
    }

    async componentDidMount(department) {
        let products = await getTheDepartmentsPrducts(this.state.selected);
        let columns = productColumns(products[0]);

        let id = 0;
        for (let p in products) {
            products[p].id = id;
            id += 1;
        }
        this.setState({ rows: products, columns: columns });
    }

    handleClick(d, e, a) {
        this.setState({ dialogOpen: true, selectedRow: d.row });
    }

    handleCloseDialog(e, message) {
        let openSnack = false;
        if (message) {
            openSnack = true;
        }
        this.setState({ dialogOpen: false, selectedRow: null, message, openSnack });
    }

    handleCloseSnack() {
        this.setState({ openSnack: false, message: null })
    }

    render() {
        return (
            <>
                <Box display='flex' flexDirection='row' justifyContent="center">{this.state.selected} Department</Box>
                <DataGrid style={gridStyle}
                    hideFooterPagination={true}
                    hideFooter={true}
                    rows={this.state.rows}
                    columns={this.state.columns}
                    onCellDoubleClick={(d, e, a) => this.handleClick(d, e, a)}
                />
                {this.state.dialogOpen && <Dialog onClose={(e) => this.handleCloseDialog(e)} open={this.state.dialogOpen} maxWidth='sm' fullWidth={true} style={dialogStyle}>
                    <DialogTitle> Would you like to add the following item to your cart?</DialogTitle>
                    <Divider />
                    {this.state.selectedRow !== null && <AddingItemToCart alertParent={this.alertParent} closeDialog={this.handleCloseDialog} selectedRow={this.state.selectedRow} />}
                </Dialog>}

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                    open={this.state.openSnack}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnack}
                >
                    <SnackbarContent style={{ backgroundColor: '#63A355', color: 'white' }}
                        message={this.state.message} />
                </Snackbar>

            </>
        );
    }
}
export default ProductGrid;
