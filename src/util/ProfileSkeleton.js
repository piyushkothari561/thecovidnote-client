import React from 'react';
import img from '../images/no-img.png';
import PropTypes from 'prop-types';
import  withStyles  from '@material-ui/core/styles/withStyles';
//mui 
import { Paper } from '@material-ui/core';
//icons
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import LinkTwoToneIcon from '@material-ui/icons/LinkTwoTone';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';

const styles = {
    paper: {
        padding: 20,
        backgroundColor: '#707070',
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
        
      },
      
      handle:{
        height: 20,
        backgroundColor: "#A9A9A9",
        width: 60,
        margin: '0 auto 7px auto'
    },
    fullLine:{
        height: 15,
        backgroundColor: '#A9A9A9',
        width: '100%',
        marginBottom: 10
    }
     
};


const ProfileSkeleton = (props) => {
    const {classes} = props;
    return(
        <Paper className={classes.paper}>
            <div className={classes.profile} >
                <div className="image-wrapper">
                    <img src={img} alt="profile" className="profile-image"/>
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle} />
                     <hr />
                     <div className={classes.fullLine} />
                     <div className={classes.fullLine} />
                     <hr />
                     <LocationOnTwoToneIcon color="primary" /> <span>Location</span>
                     <hr />
                     <LinkTwoToneIcon color="primary" /> https://website.com
                     <hr />
                     <CalendarTodayTwoToneIcon color="primary"/>Joined On
                </div>                
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes ={
    classes: PropTypes.object.isRequired

}




export default withStyles(styles)(ProfileSkeleton);