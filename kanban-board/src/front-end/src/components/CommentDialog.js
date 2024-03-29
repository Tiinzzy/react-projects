// TODO: Also testing { lazy, Suspense } 


import React from "react";

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import BackEndConnection from './BackEndConnection';
import { valueExist } from './functions';

const backend = BackEndConnection.INSTANCE();

export default class CommentDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            handleCloseDialog: props.handleCloseDialog,
            selectedTask: props.selectedTask,
            commentError: false,
            alreadyHasComment: false,
            commentId: ''
        }
    }

    componentDidMount() {
        backend.get_comments_from_mongo_db((data) => {
            let exist = valueExist(data.documents, 'task_id', this.state.selectedTask._id);
            this.setState({ avialableComments: exist });
        })
    }

    getComment(e) {
        this.setState({ comment: e.target.value, commentError: false });
    }

    cancelAndClose() {
        this.state.handleCloseDialog();
    }

    submitAndClose() {
        let todaysDate = new Date();
        let finalDate = todaysDate.getFullYear() + '-' + (todaysDate.getMonth() + 1) + '-' + todaysDate.getDate();
        let finalHours = todaysDate.getHours() + ':' + todaysDate.getMinutes() + ':' + todaysDate.getSeconds();
        let timestamp = finalDate + " at " + finalHours;

        let query = { documents: [{ 'comment': this.state.comment, 'task_id': this.state.selectedTask._id, 'timestamp': timestamp }] };
        if (this.state.comment.length > 0) {
            backend.insert_comments_in_mongo_db(query, (data) => {
                if (data.inserted_count > 0) {
                    this.state.handleCloseDialog();
                }
            })
        } else {
            this.setState({ commentError: true });
        }
    }

    render() {
        return (
            <Box style={{ width: 600 }}>
                <DialogTitle>
                    Make Comment for {this.state.selectedTask.title}
                </DialogTitle>
                <DialogContent>
                    <Box style={{ marginTop: 20, display: 'flex', flexDirection: 'column', width: 550 }}>
                        <TextField fullWidth multiline rows={4} label="Comment"
                            variant="outlined" style={{ marginBottom: 12 }} onChange={(e) => this.getComment(e)}
                            value={this.state.comment}
                            error={this.state.commentError}
                            helperText={this.state.commentError && 'You need to make a comment!'} />
                        <Box style={{ height: 150, overflowY: 'scroll', border: 'solid 1px #eaeaea', borderRadius: 3 }}>
                            <table id="comment-table" width="100%" cellPadding={2} cellSpacing={2}
                                style={{ backgroundColor: 'white', maring: 5, border: 'solid 1px #f7f7f7', borderRadius: 4 }}>
                                <tbody>
                                    <tr id="comment-row">
                                        <th style={{ backgroundColor: 'white', fontWeight: 'normal' }}>
                                            Comment
                                        </th>
                                        <th style={{ backgroundColor: 'white', fontWeight: 'normal' }}>
                                            TimeStamp
                                        </th>
                                    </tr>
                                    {this.state.avialableComments && this.state.avialableComments.map((e, i) => (
                                        <tr key={i} id="comment-row">
                                            <td id="comment-column">
                                                <span id="info-styling">{e.comment}</span>
                                            </td>
                                            <td id="comment-column">
                                                <span id="info-styling">{e.timestamp}</span>
                                            </td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </Box>
                    </Box>
                </DialogContent >
                <DialogActions>
                    <Button variant="outlined" onClick={() => this.cancelAndClose()}>Cancel</Button>
                    <Button variant="outlined" onClick={() => this.submitAndClose()}>Submit</Button>
                </DialogActions>
            </Box>
        );
    }
};