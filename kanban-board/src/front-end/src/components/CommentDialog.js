// TODO:
// 1- Every task could have multiple comments
// 2- We only add comments
// 3- When double-clicking on a task, show task infor in dialog and history of the comments and just let user add a new comment. NOT EDIT.

// TODO: Writing an application using React.createContext() and understanding it. <= MONDAY
// TODO: Also testing { lazy, Suspense } 
// TODO: Start a type script example next time (You may convert kanban to typescript as well)


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
            let exist = valueExist(data.documents, 'task_id', this.state.selectedTask);
            if (exist !== null) {
                this.setState({ comment: exist.comment, alreadyHasComment: true, commentId: exist._id });
            } else {
                this.setState({ comment: '' });
            }
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

        let query = { documents: [{ 'comment': this.state.comment, 'task_id': this.state.selectedTask, 'timestamp': finalDate }] };
        if (this.state.comment.length > 0 && this.state.alreadyHasComment === false) {
            backend.insert_comments_in_mongo_db(query, (data) => {
                if (data.inserted_count > 0) {
                    this.state.handleCloseDialog();
                }
            })
        } else if (this.state.comment.length > 0 && this.state.alreadyHasComment === true) {
            let query = { document_id: this.state.commentId, documents: { 'comment': this.state.comment, 'task_id': this.state.selectedTask, 'timestamp': finalDate } };
            backend.update_comment_mongo_db(query, (data) => {
                if (data.result) {
                    this.state.handleCloseDialog();
                };
            })
        } else {
            this.setState({ commentError: true });
        }
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Make Comment"}
                </DialogTitle>
                <DialogContent>
                    <Box style={{ marginTop: 20, display: 'flex', flexDirection: 'column', width: 500 }}>
                        <TextField fullWidth multiline rows={6} label="Comment"
                            variant="outlined" style={{ marginBottom: 12 }} onChange={(e) => this.getComment(e)}
                            value={this.state.comment}
                            error={this.state.commentError}
                            helperText={this.state.commentError && 'You need to make a comment!'} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => this.cancelAndClose()}>Cancel</Button>
                    <Button variant="outlined" onClick={() => this.submitAndClose()}>Submit</Button>
                </DialogActions>
            </>
        );
    }
};