import React, { Fragment } from 'react';
import img from '../images/no-img.png';
import PropTypes from 'prop-types';
import  withStyles  from '@material-ui/core/styles/withStyles';

//mui 
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    cover: {
        width: 150,
        height: 130,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '5%'
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    handle:{
        width: 60,
        height: 18,
        backgroundColor: '#707070',
        marginBottom: 7
    },
    date:{
        height: 14,
        width: 100,
        backgroundColor: '#707070',
        marginBottom: 10
    },
    fullLine:{
        height: 15,
        width: '90%',
        backgroundColor: '#707070',
        marginBottom: 10
    },
    halfLine:{
        height:15,
        width:'50%',
        backgroundColor: '#707070',
        marginBottom: 10
    }

}
const NoteSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
                        <CardMedia className={classes.cover} image={img} /> 
            <CardContent className={classes.cardContent} >
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />

            </CardContent>

        </Card>
    ))

return <Fragment>{content}</Fragment>
}

NoteSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};



export default (withStyles(styles)(NoteSkeleton));