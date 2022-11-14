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
        multiple: false,
        accept: '.txt',
    });

    if (loading) {
        return <Box>Loading...</Box>;
    }

    function callBackIfRequired(len) {
        if (len > 0) {
            props.callback(filesContent[0].content);
        }
        return len > 0;
    }

    return (
        <Box style={{ width: 400, border: 'solid 1px #eaeaea', display: 'inline-block', height: '100%' }}>
            <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box>
                    <Button onClick={() => openFileSelector()} variant="outlined" style={{ marginBottom: 10 }} size="small">Select {props.id}</Button>
                </Box>
                <Box>
                    {filesContent.slice(0,1).map((file, index) => (
                        <Box key={index}>
                            <Box style={{ marginBottom: 6 }} >
                                <Typography variant="body2" component="div" styel={{ color: '#34344A' }} >File Name: {file.name}</Typography>
                            </Box>
                            {callBackIfRequired(filesContent.length) && <textarea readOnly={true} aid="w3review" name="w3review" rows="15" cols="45"
                                defaultValue={file.content} style={{ resize: 'none', marginBottom: 6 }} />}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}