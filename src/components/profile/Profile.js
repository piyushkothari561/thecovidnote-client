import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import  withStyles  from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import ProfileSkeleton from '../../util/ProfileSkeleton';

//MUI stuff
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

//icons
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import LinkTwoToneIcon from '@material-ui/icons/LinkTwoTone';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import KeyboardReturnTwoToneIcon from '@material-ui/icons/KeyboardReturnTwoTone';

//redux stuff
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import Mybutton from '../../util/Mybutton';

const styles= {
    paper: {
        padding: 20,
        backgroundColor: '#B3B6B7',
        borderRadius: '5%'

      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '10%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      },
      typo: {
          textAlign: 'center'
      },
      button: {
        margin: 10
      }
};
class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
    };
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  }
    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img className="profile-image" src={imageUrl} alt="Profile"/>
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                        <Mybutton tip="Edit Profile picture" 
                              onClick={this.handleEditPicture} btnClassName="button">
                          <EditTwoToneIcon className={classes.button} color="secondary" />
                        </Mybutton>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="secondary" variant="h5">
                         <div style={{ color: '#000000' }}>@{handle} </div>
                        </MuiLink>
                         <hr />
                        {bio && <Typography variant="body1">{bio}</Typography>}
                          <hr />
                          {website && (
                             <Fragment>
                                 <LinkTwoToneIcon color="secondary"/>
                                    <a style={{ color: '#000000' }} href={website} target="_blank" rel="noopener noreferrer">
                                        {' '}{website}
                                   </a>
                                    <hr />
                         {location && ( 
                            <Fragment>
                                <LocationOnTwoToneIcon color="secondary"/> <span>{location}</span>
                                <hr />
                            </Fragment>
                         )}   
                         
                             </Fragment>
                         )}
                         <CalendarTodayTwoToneIcon color="secondary"/>{' '}
                         <span>Joined {dayjs(createdAt).format('DD/MM/YYYY')}</span>
                         <hr />
                         <Button className={classes.button}
                                  variant="contained"
                                  color="secondary"
                                  onClick={this.handleLogout}
                                  startIcon={<KeyboardReturnTwoToneIcon />}
                                    >
                                     Logout
                               </Button>
                               <EditDetails />

                    </div>
                 </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography className={classes.typo} variant="body2">
                    No Profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="secondary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="primary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
            
        )) : (
        <ProfileSkeleton />
          )


        return profileMarkup;
                
    }
}

const mapStateToProps = (state) => ({ 
        user: state.user
});

const mapActionsToProps = {logoutUser,uploadImage};

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
