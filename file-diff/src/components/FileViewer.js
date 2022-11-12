/*

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



export default function FileViewer(props) {
    return (
        <div style={{ width: props.width, border: 'solid 1px #eaeaea', display: 'inline-block', height: 300 }}>
            <p>
                I am going to be a file viewer {props.id}
            </p>
            <div onClick={(e) => props.callback('my-new-file' + props.id)}>
                <small>Click to call callback</small>
            </div>
        </div>
    );
}


