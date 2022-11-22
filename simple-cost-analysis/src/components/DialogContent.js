import React from "react";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', marginLeft: 30, paddingBottom: 10 }}>
                    <Typography>
                        Id: {this.state.clickedRow.id}
                    </Typography>

                    <Typography>  Date: {this.state.clickedRow.DATE}
                    </Typography>

                    <Typography>  Description: {this.state.clickedRow.DESC}
                    </Typography>

                    <Typography>  Amount: ${this.state.clickedRow.AMONT}
                    </Typography>

                    <Box style={{ width: 200 }} mb={2}>
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