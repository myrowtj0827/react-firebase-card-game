import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
    title?: string
    content?: string
    open: boolean
    onClickOk: Function
    onClickCancel: Function
}

export default function ModalDialog({
                                        open,
                                        title,
                                        content,
    onClickOk,
    onClickCancel,
                                    }: Props) {

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => onClickCancel()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClickCancel()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => onClickOk()} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
