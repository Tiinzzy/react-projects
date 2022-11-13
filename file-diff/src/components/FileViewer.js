/*


NOTE: b4 anything try this one, even not the first option

==> https://www.npmjs.com/package/use-file-picker
==>  https://codesandbox.io/s/inspiring-swartz-pjxze?file=/src/App.js



First try this => https://www.npmjs.com/package/react-file-reader


If didn't work, go this way => 
---------------------------------------------------------------------------------------------------
use something like this => https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
to get a file name and read it and yes, show it on the screen.

You need to use FileReader to read the file.

let fr = new FileReader(); 

and use fr to read this file => this.fileInput.current.files[0]
that  the above example returns from file explorer.


*/

import React from 'react';

import { useFilePicker } from 'use-file-picker';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function FileViewer(props) {
    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        accept: '.txt',
    });

    if (loading) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box style={{ width: 400, border: 'solid 1px #eaeaea', display: 'inline-block', height: '100%' }}>
            <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" component="h5" style={{ marginTop: 10, marginBottom: 10, color: '#34344A' }}>  Upload {props.id}</Typography>
                <Box>
                    <Button onClick={() => openFileSelector()} variant="outlined" style={{ marginBottom: 10 }} size="small">Select file </Button>
                    <br />
                    {filesContent.map((file, index) => (
                        <Box>
                            <Box style={{ marginBottom: 6 }} >
                                <Typography variant="body2" component="body2" styel={{ color: '#34344A' }} >File Name: {file.name}
                                </Typography>
                            </Box>
                            <textarea id="w3review" name="w3review" rows="30" cols="45" key={index} style={{ resize: 'none', marginBottom: 6 }}>
                                {file.content}
                            </textarea>
                            <br />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}