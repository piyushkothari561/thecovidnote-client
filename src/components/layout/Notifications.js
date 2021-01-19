import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
//Mui stuff 
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
//icons 
import NotificationsNoneTwoToneIcon from '@material-ui/icons/NotificationsNoneTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
//redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component{
    state = {
        anchorEl: null
    };
    handleOpen = (event) => {
        this.setState({ anchorEl: event.target});
    };
    handleClose = () =>  {
        this.setState({ anchorEl: null });
    };
    onMenuOpened = () =>  {
        let unreadNotificationsIds = this.props.notifications.filter(not => !not.read)
        .map(not => not.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    };
   render(){
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationsIcon;
        if(notifications && notifications.length > 0){
            notifications.filter(not => not.read === false).length > 0
             ? notificationsIcon = (
                 <Badge badgeContent={notifications.filter(not => not.read === false).length}
                 style={{ color: "#000000"}}>
                        <NotificationsNoneTwoToneIcon />
                    </Badge>
             ) : (
                notificationsIcon = <NotificationsNoneTwoToneIcon />
             )
        } else {
            notificationsIcon = <NotificationsNoneTwoToneIcon />
           }
        
           let notificationsMarkup = 
           notifications && notifications.length > 0 ? (
               notifications.map((not) => {
                   const verb = not.type === 'shield' ? 'shielded' : 'commented on';
                   const time = dayjs(not.createdAt).fromNow();
                   const iconColor = not.read ? 'primary' : 'secondary';
                   const icon = not.type === 'shield' ? (
                       <FavoriteTwoToneIcon color={iconColor} style={{ marginRight: 10}}/>
                   ) : (
                       <ChatBubbleTwoToneIcon color={iconColor}  style={{ marginRight: 10}} />
                   )

                    return(
                        <MenuItem key={not.createdAt} onClick={this.handleClose} >
                            {icon}
                            <Typography component={Link}  variant="body1"
                            to={`/users/${not.recipient}/note/${not.noteId}`}>
                                {not.sender} {verb} your note {time}
                            </Typography>
                        </MenuItem>
                    )
               })
           ) : (
               <MenuItem onClick={this.handleClose}>
                   You have no Notifications yet
               </MenuItem>
           )

           return (
               <Fragment>
                   <Tooltip placement="bottom" title="Notifications">
                       <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} 
                       aria-haspopup="true"
                       onClick={this.handleOpen}>
                           {notificationsIcon}
                       </IconButton>
                   </Tooltip>
                   <Menu anchorEl={anchorEl}
                         open={Boolean(anchorEl)}
                         onClose={this.handleClose}
                         onEntered={this.onMenuOpened}>
                             {notificationsMarkup}
                    </Menu>
               </Fragment>
           )
   } 
} 

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
  };

const mapStateToProps= (state) => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications);