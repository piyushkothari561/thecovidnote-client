import React, { Component, Fragment } from 'react';
import  withStyles  from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Mybutton from '../../util/Mybutton';

//mui stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

//icons
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import Alert from '@material-ui/lab/Alert';

import { connect } from 'react-redux';
import { deleteNote } from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%'
      },
      btn: {
        color:"#ff0000"
      },
      root: {
        width: '80%',
        '& > * + *': {
          marginTop: 2,
        }
}
}

class DeleteNote extends Component {
      state = {
        open: false
      };
      handleOpen = () => {
        this.setState({ open: true });
      };
      handleClose = () => {
        this.setState({ open: false });
      };
      deleteNote = () => {
        this.props.deleteNote(this.props.noteId);
        this.setState({ open: false });
      };
    render() {
        const { classes } = this.props;
        return  (
            <Fragment>
                <Mybutton tip="Delete Note" 
                            onClick={this.handleOpen}
                            btnClassName={classes.deleteButton}>
                                <DeleteTwoToneIcon  />
                                </Mybutton>
                <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        fullWidth  
                        maxWidth="sm">
                            <DialogTitle className={classes.root}>
                            <Alert severity="error">Are you sure you want to delete the Note ?</Alert>
                                
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary" >
                                    Cancel
                                </Button>
                                <Button onClick={this.deleteNote} color="secondary" className={classes.btn} >
                                    Delete
                                </Button>
                            </DialogActions>
                            </Dialog>             
            </Fragment>
        );
        
    }
}

DeleteNote.propTypes = {
    deleteNote: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    noteId: PropTypes.string.isRequired
};

export default connect(null, { deleteNote })(withStyles(styles)(DeleteNote));

