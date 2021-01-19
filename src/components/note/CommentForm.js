import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  withStyles  from '@material-ui/core/styles/withStyles';

//mui stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//redux stuff
import { connect } from 'react-redux';
import { submitComment  } from '../../redux/actions/dataActions';

const styles= {
    textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
}

export class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: ''})
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.submitComment(this.props.noteId, {body: this.state.body});
    }
    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup  = authenticated ? (
            <Grid item sm={12} style={{ textAlign: ' center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                            name="body"
                            type="text"
                            label="Comment on the Note"
                            error={errors.comment ? true: false}
                            helperText={errors.comment}
                            value={this.state.body}
                            onChange={this.handleChange}
                            fullWidth
                            className={classes.textField} />
                     <Button type="submit" variant="contained" color="primary"
                     className={classes.button}>Submit</Button>       
                </form>
                <hr className={classes.seperator}/>
            </Grid>
        ) : null
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    noteId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const  mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps,{submitComment})(withStyles(styles)(CommentForm));
