import React from "react";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

class DialogContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedRow: props.clickedRow
        }
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

                    <Typography>  Category: {this.state.clickedRow.category}
                    </Typography>
                </Box>

            </>
        );
    }
}
export default DialogContent;