import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Note from '../components/note/Note';
import Profile from '../components/profile/Profile';
import NoteSkeleton from '../util/NoteSkeleton';
import { connect } from 'react-redux';
import { getNotes } from '../redux/actions/dataActions';

 class home extends Component {
     componentDidMount(){
        this.props.getNotes();
     }
    render() {
        const { notes, loading } = this.props.data;
        let recentNotesMarkup = !loading ? (
        notes.map(note => <Note key={note.noteId} note={note}/>)
        ) : (
        <NoteSkeleton />
            );
        return (
           <Grid container spacing={2}>
               <Grid item sm={8} xs={12}>
                {recentNotesMarkup}
               </Grid>
               <Grid item sm={4} xs={12}>
                <Profile/>
               </Grid>
           </Grid>
        )
    }
};

home.propTypes = {
    getNotes: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})


export default connect(mapStateToProps,{ getNotes })(home)
