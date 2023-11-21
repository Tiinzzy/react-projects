import React from "react";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

const TYPE_OPTIONS = ['Monthly', 'Annualy', 'Not Defined'];

class TypeMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            selectedOption: 'Not Defined',
            typeCallBack: props.typeCallBack
        };
    }

    handleClick(e) {
        this.setState({ anchorEl: e.currentTarget });
    };

    handleClose() {
        this.setState({ anchorEl: null });
    };

    handleSelect(option) {
        this.setState({ selectedOption: option, anchorEl: null }, () => {
            this.state.typeCallBack(this.state.selectedOption);
        });
    };

    render() {
        return (
            <Box style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>
                <Typography mb={1}>Subscription Type:</Typography>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => this.handleClick(e)} variant="outlined">
                    {this.state.selectedOption}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={() => this.handleClose()}>
                    {TYPE_OPTIONS.map((e, i) => (
                        <MenuItem key={i} selected={e === this.state.selectedOption} onClick={() => this.handleSelect(e)}>
                            {e}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        );
    }
} export default TypeMenu;