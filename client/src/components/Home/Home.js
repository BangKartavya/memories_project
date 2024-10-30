import React, { useEffect, useState } from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts.js';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    return (
        <Grow in>
            <Container>
                <Grid container className={classes.mainContainer} jusitfy='space-between' alignitems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
};

export default Home;