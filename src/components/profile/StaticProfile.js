import React, {  Fragment } from 'react';
import PropTypes from 'prop-types';
import  withStyles  from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//mui stuff
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

//icons
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import LinkTwoToneIcon from '@material-ui/icons/LinkTwoTone';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';

const styles= {
    paper: {
        padding: 20,
        backgroundColor: '#707070',
        borderRadius: '5%'

      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative'
          
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
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
       
      },
      typo: {
          textAlign: 'center'
      }
    
};


const StaticProfile = (props) => {
    const { classes, profile: { handle, createdAt, imageUrl, bio, website, location }} = props;

    return(
        <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img className="profile-image" src={imageUrl} alt="Profile"/>
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
                       
                    </div>
                 </div>
            </Paper>
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);
