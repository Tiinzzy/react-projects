import React from "react";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Divider } from "@mui/material";

class DialogContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedRow: props.clickedRow,
            category: props.clickedRow.category
        }
    }

    handleChangeCategory(e) {
        this.setState({ category: e.target.value });
    }

    render() {
        return (
            <>
                <Divider />
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', marginLeft: 30, paddingBottom: 15, paddingTop: 15 }}>
                    <Typography variant="h6">
                        Id: {this.state.clickedRow.id}
                    </Typography>

                    <Typography variant="h6">  Date: {this.state.clickedRow.DATE}
                    </Typography>

                    <Typography variant="h6">  Description: {this.state.clickedRow.DESC}
                    </Typography>

                    <Typography variant="h6">  Amount: ${this.state.clickedRow.AMONT}
                    </Typography>

                    <Box style={{ width: 200, marginTop: 10, marginBottom: 10 }} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.category}
                                onChange={this.handleChangeCategory}
                            >
                                <MenuItem value={'Groceries'}>Groceries</MenuItem>
                                <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
                                <MenuItem value={'Utilities'}>Utilities</MenuItem>
                                <MenuItem value={'Personal'}>Personal</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

            </>
        );
    }
}
export default DialogContent;