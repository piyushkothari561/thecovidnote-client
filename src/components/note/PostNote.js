import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import  withStyles  from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
//mui stuff
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Mybutton from '../../util/Mybutton';
import CircularProgress from '@material-ui/core/CircularProgress';
//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
//redux stuff
import { connect } from 'react-redux';
import { postNote, clearErrors  } from '../../redux/actions/dataActions';

const styles = {
    submitBtn : {
        position: 'relative',
    float: 'right',
    marginTop: 15
    },
    progressSpin: {
        position: 'absolute'
    },
    closeBtn : {
        position: 'absolute',
        left: "91%",
        top: "2%"
    },
    textField: {
        margin: '10px auto 10px auto'
      }
}

class PostNote extends Component{
    state= {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
              errors: nextProps.UI.errors
            });
          }
          if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} });
          }
        }
           
    handleOpen = () => {
        this.setState({ open: true });
      };
      handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
      };
      handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };
      handleSubmit = (event) => {
        event.preventDefault();
        this.props.postNote({ body: this.state.body });
      };
      
      render(){
        const { classes, UI: {loading} } = this.props;
        const { errors } = this.state;

          return(
              <Fragment>
                  <Mybutton onClick={this.handleOpen} tip="Post a Note!" >
                      <AddCircleOutlineIcon />
                  </Mybutton>
                  <Dialog
                      open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                          <Mybutton tip="Close" onClick={this.handleClose} tipClassName={classes.closeBtn}>
                                <CancelTwoToneIcon />
                          </Mybutton>
                          <DialogTitle>
                              Post a new Note
                          </DialogTitle>
                          <DialogContent>
                              <form>
                                  <TextField
                                 name="body"
                                 type="text"
                                 label="Note"
                                 multiline
                                 rows="3"
                                 placeholder="Updates on Covid-19"
                                 error={errors.body ? true : false}
                                 helperText={errors.body}
                                 className={classes.textField}
                                 onChange={this.handleChange}
                                 fullWidth
                                  />
                                   
                                  <Button type="submit" variant="contained" color="primary"  onClick={this.handleSubmit}
                                  className={classes.submitBtn} disabled={loading}>
                                      Submit
                                      {loading && (
                                          <CircularProgress size={30} className={classes.progressSpin}/>
                                      )}
                                  </Button>
                              </form>
                          </DialogContent>
                  </Dialog>
              </Fragment>
          )
      }

}

PostNote.propTypes = {
    postNote: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired    
};

const mapStateToProps = (state) => ({
    UI: state.UI
});


export default connect(
    mapStateToProps,
    { postNote, clearErrors }
  )(withStyles(styles)(PostNote));