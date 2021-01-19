import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import  withStyles  from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import ShieldButton  from './ShieldButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
// Mui stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Mybutton from '../../util/Mybutton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//icons 
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';
// Redux stuff
import { connect } from 'react-redux';
import { getNote, clearErrors } from '../../redux/actions/dataActions';

const styles= {
    closeBtn: {
        position: 'absolute',
        left: '90%'
    },
    profileimg:{
        maxWidth: 200,
         height: 200,
         borderRadius: '50%',
         objectFit: 'cover'
    },
    expandBtn:{
        position: 'absolute',
        left: '70%'
    },
    seperator:{
        border: 'none',
        margin: 4
    },
    dialogContent:{
        padding:20
    },
    spinnerDiv:{
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    visibleseperator:{
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    }

}
class NoteDialog extends Component {
    state= {
        open: false,
        oldPath: '' ,
        newPath: ''
    };
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, noteId } = this.props;
        const newPath = `/users/${userHandle}/note/${noteId}`;

        if(oldPath === newPath) oldPath=`/users/${userHandle}`;
        
        window.history.pushState(null, null , newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getNote(this.props.noteId);
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false});
        this.props.clearErrors();
    }
    render() {
        const { classes, note: {noteId, body, createdAt, shieldCount, commentCount, userImage, userHandle, comments},
                UI:{ loading }} = this.props;
        const dialogMarkup =  loading ? (
            <div className={classes.spinnerDiv}>
              <CircularProgress size={100} thickness={1} />
            </div>
          ) : (
            <Grid container spacing={2}>
                <Grid item sm={5}>
                    <img src={userImage} alt={userHandle} className={classes.profileimg}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.seperator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY' )}
                    </Typography>
                    <hr className={classes.seperator}/>
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        <ShieldButton noteId={noteId} />
        <span>{shieldCount} Shields</span>
        <Mybutton tip="comments">
            <ChatRoundedIcon color="secondary"/>
        </Mybutton>
        <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleseperator}/>
        <CommentForm noteId={noteId}/>
            <Comments comments={comments} />
            </Grid>
        );      
        return (
            <Fragment>
                <Mybutton onClick={this.handleOpen} tip="Expand the Note" tipClassName={classes.expandBtn}>
                    <ImportContactsTwoToneIcon />
                </Mybutton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <Mybutton tip="Close" onClick={this.handleClose} tipClassName={classes.closeBtn}>
                                <CancelTwoToneIcon />
                          </Mybutton>
                          <DialogContent className={classes.dialogContent}>
                                {dialogMarkup}
                          </DialogContent>
                </Dialog>

            </Fragment>
        );
    }
}

NoteDialog.propTypes= {
    clearErrors: PropTypes.func.isRequired,
    getNote: PropTypes.func.isRequired,
    noteId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    note: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    note: state.data.note,
    UI: state.UI
  });
  
  const mapActionsToProps = {
    getNote,
    clearErrors
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)(NoteDialog));