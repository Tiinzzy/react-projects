import React from "react";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import { getShopDepartments } from './functions.js';

import ProductGrid from "./ProductGrid.js";
import OrdersList from "./OrdersList.js";

const menuStyle = {
    display: 'flex',
    border: 'solid 1px black',
    color: 'white',
    backgroundColor: '#1c4966',
    cursor: 'pointer',
    textDecoration: 'none',
    padding: 1,
    marginBottom: 10,
    justifyContent: 'flex-start'
}

class DropDownMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            departments: [],
            showGrid: false,
            showOrderList: false,
        }
        this.handleClose = this.handleClose.bind(this);
        // this.handleListClick = this.handleListClick.bind(this);
    }

    async componentDidMount() {
        let departments = await getShopDepartments();
        this.setState({ departments });
    }

    handleClose(i) {
        this.setState({ showOrderList: false, showGrid: false }, function () {
            this.setState({ open: false, showGrid: true, selected: this.state.departments[i] });
        });
    }

    // handleListClick() {
    //     this.setState({ showOrderList: false, showGrid: false }, function () {
    //         this.setState({ showOrderList: true });
    //     })
    // }

    render() {
        return (
            <>
                {/* <Button id="basic-button" onClick={this.handleListClick} >Orders List</Button> */}

                <Box style={menuStyle}>
              
                        <Button id="basic-button" onClick={(e) => this.setState({ open: true, anchorEl: e.target })} style={{ color: '#2196f3' }}>ALL</Button>
                
                    <Menu
                        id="basic-menu"
                        anchorEl={this.state.anchorEl}
                        open={this.state.open}
                        onClose={() => this.handleClose()}>
                        {this.state.departments.map((e, i) => (
                            <MenuItem key={i} onClick={() => this.handleClose(i)} >{this.state.departments[i]}</MenuItem>
                        ))}
                    </Menu>

                    {this.state.departments.map((e, i) => (
                        <MenuItem key={i} onClick={() => this.handleClose(i)} >{this.state.departments[i]}</MenuItem>
                    ))}
                </Box>


                {this.state.showGrid && <ProductGrid departments={this.state.departments} selected={this.state.selected} />}
                {this.state.showOrderList && <OrdersList />}


            </>
        );
    }
}
export default DropDownMenu;