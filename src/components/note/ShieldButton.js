import React, { Component } from 'react'
import Mybutton from '../../util/Mybutton';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
//icons 
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
//redux
import { connect } from 'react-redux';
import { shieldNote, unshieldNote } from '../../redux/actions/dataActions';

export class ShieldButton extends Component {
    shieldedNote = () => {
        if(this.props.user.shields && 
        this.props.user.shields.find(
            (shield) => shield.noteId === this.props.noteId)) 
           return true;
           else return false;
       }
    shieldNote = () => {
        this.props.shieldNote(this.props.noteId);
    }
    unshieldNote = () => {
       this.props.unshieldNote(this.props.noteId);
   } 
    render() {
        const { authenticated } = this.props.user;
        const shieldButton = !authenticated ? (
                <Link to="/login">
                <Mybutton tip="shield">
                <VerifiedUserOutlinedIcon />
            </Mybutton>
                </Link>
               
        ) : (
            this.shieldedNote() ? (
                <Mybutton tip="UnShield" onClick={this.unshieldNote}>
                    <VerifiedUserIcon color="secondary"/>
                </Mybutton>
            ) : (
                <Mybutton tip="Shield" onClick={this.shieldNote} >
                    <VerifiedUserOutlinedIcon  color="secondary"/>
                </Mybutton>
            )
        )
        return shieldButton;
    }
}

ShieldButton.propTypes = {
    user: PropTypes.object.isRequired,
    noteId: PropTypes.string.isRequired,
    shieldNote: PropTypes.func.isRequired,
    unshieldNote: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps =  {
    shieldNote,
    unshieldNote
}

export default connect(mapStateToProps, mapActionsToProps)(ShieldButton);
