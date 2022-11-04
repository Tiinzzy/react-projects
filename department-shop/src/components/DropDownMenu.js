import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { getShopDepartments } from './functions.js';

import ProductGrid from "./ProductGrid.js";


class DropDownMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            departments: [],
            showGrid: false
        }
        this.handleClose = this.handleClose.bind(this);
    }

    async componentDidMount() {
        let departments = await getShopDepartments();
        this.setState({ departments });
    }

    handleClose(i) {
        this.setState({ showGrid: false }, function () {
            this.setState({ open: false, showGrid: true, selected: this.state.departments[i] });
        });
    }

    render() {
        return (
            <>
                <Button id="basic-button" onClick={(e) => this.setState({ open: true, anchorEl: e.target })} >Dashboard</Button>
                <Menu
                    id="basic-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={() => this.handleClose()}>
                    {this.state.departments.map((e, i) => (
                        <MenuItem key={i} onClick={() => this.handleClose(i)} >{this.state.departments[i]}</MenuItem>
                    ))}
                </Menu>

                {this.state.showGrid !== false && <ProductGrid departments={this.state.departments} selected={this.state.selected} />}
            </>
        );
    }
}
export default DropDownMenu;