import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const keyValue = {
    marginRight: 10,
}

export default function ShowResults(props) {
    return (
        <Box style={{ display: 'inline-block', marginRight: 10, width: 400, marginTop: 15, marginBottom: 15, border: 'solid 1px #eaeaea', height: '100%' }}>
            <Box style={{ width: 400, textAlign: 'left', height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
                <Typography variant="body2" component="div">
                    {props.diff.map((line, l) => (<div key={l}>
                        {line.map((diff, d) => (<div key={d}>
                            {diff.sign} {diff.word} @ index {diff.position}
                        </div>))}
                    </div>))}
                </Typography>
            </Box>
        </Box>
    );
}


