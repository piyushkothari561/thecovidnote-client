import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import  withStyles  from '@material-ui/core/styles/withStyles';

//redux stuff
import { connect } from 'react-redux';
import { editUserDetails  } from '../../redux/actions/userActions';
//mui stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Mybutton from '../../util/Mybutton';
//icons
import EditRoundedIcon from '@material-ui/icons/EditRounded';
const styles = {
    
}

class EditDetails extends Component {
    state ={
        bio: '',
        website: '',
        location: '',
        open: false
    };
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ?  credentials.bio : '',
            website: credentials.website ?  credentials.website : '',
            location: credentials.location ?  credentials.location : ''
        });
    }
    handleOpen = () => {
        this.setState({ open: true});
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({ open: false});
    }
    componentDidMount= () => {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
     }
     handleSubmit = () => {
         const userDetails = {
             bio: this.state.bio,
             website: this.state.website,
             location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
     }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
               
                <Mybutton tip="Edit Details" onClick={this.handleOpen}
                btnClassName="button">
                    <EditRoundedIcon color="secondary" />
                </Mybutton>
                <Dialog 
                PaperProps={{
                    style: {
                      backgroundColor: '#515A5A'                    },
                  }}
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                >
                    <DialogTitle align="center">Edit your Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                name="bio" type="text" label="Bio" placeholder="A brief bio about You :)"
                className={classes.TextField} value={this.state.bio} onChange={this.handleChange} fullWidth
                />
                <hr  />
                <TextField
                name="website" type="text" label="Website"  placeholder="Your website"
                className={classes.TextField} value={this.state.website} onChange={this.handleChange} fullWidth
                />
                <hr />
                <TextField
                name="location" type="text" label="Location"  placeholder="Your Location"
                className={classes.TextField} value={this.state.location} onChange={this.handleChange} fullWidth
                /><hr />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

            </Fragment>
        )
    }
}
    EditDetails.propTypes = {
        editUserDetails: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired
      };
      
      const mapStateToProps = (state) => ({
        credentials: state.user.credentials
      });
      
      export default connect(
        mapStateToProps,
        { editUserDetails }
      )(withStyles(styles)(EditDetails));