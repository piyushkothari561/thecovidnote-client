import React, { Component } from 'react';
import  withStyles  from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import Mybutton from '../../util/Mybutton';
import DeleteNote from './DeleteNote';
import NoteDialog from './NoteDialog';
import ShieldButton  from './ShieldButton';

//Material UI stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//redux
import { connect } from 'react-redux';


//icons
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        backgroundColor: '#D0D3D4',
        position: 'relative',

    },
        image: {
         minWidth: 150,
         objectFit: 'cover'

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
          width: 120,
          height: 130,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '5%'
        },
       
      },
    content:{
        padding:25,
        objectFit: 'cover' 
    }
};

 class Note extends Component {
        
    render() {
        dayjs.extend(relativeTime);
        const { classes, note: {body, createdAt, userImage, userHandle, noteId,shieldCount, commentCount}, 
                         user: { authenticated, credentials: { handle } }   
    } = this.props
        
        const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteNote noteId={noteId} />
      ) : null;
        return (
            <Card className={classes.card}>
                <div className={classes.profile}>
                    <div className="image-wrapper" >
                    <CardMedia image={userImage} title={userHandle} className="profile-image"/>
                    </div>
                </div>
        <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="secondary" >{userHandle}</Typography>
        {deleteButton}
        <Typography variant="body2">{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant="body1">{body}</Typography>
        <ShieldButton noteId={noteId} />
        <span>{shieldCount} Shields</span>
        <Mybutton tip={commentCount}>
            <ChatRoundedIcon color="secondary"/>
        </Mybutton>
        <span>{commentCount} Comments</span>
            <NoteDialog  noteId={noteId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>          
        )
    }
}

Note.propTypes = {
   
    user: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user
})
 

export default connect(mapStateToProps )(withStyles(styles)(Note));
