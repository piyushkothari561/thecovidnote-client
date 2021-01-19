import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import  withStyles  from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
   
//mui stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles= {
    commentimg:{
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData:{
        marginLeft: 20
    },
    seperator:{
        border: 'none',
        margin: 4
    },
    visibleseperator:{
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    }
}
class Comments extends Component {
    render() {
        const {comments, classes } = this.props;
         return(
             <Grid container >
                 {comments.map((comment, index) => {
                 const { body, createdAt, userImage, userHandle } = comment;
                    return(
                        <Fragment key={createdAt} >
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt={userImage} className={classes.commentimg}/>
                                        </Grid> 
                                        <Grid item sm={9}>
                                            <div className={classes.commentData} >
                                            <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="secondary" >{userHandle}</Typography>
                                            <Typography variant="body2">{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}</Typography>
                                            <hr className={classes.seperator} />
                                            <Typography variant="body1">{body}</Typography>
                                            </div>
                                        </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                             <hr className={classes.visibleseperator}/>
                             )}
                        </Fragment>
                    )
                })} 
             </Grid>
         ) 
    }
}


Comment.propTypes = {
    comments: PropTypes.array.isRequired
}
export default withStyles(styles)(Comments);
