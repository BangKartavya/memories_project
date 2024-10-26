import { AppBar, Container, Grid, Grow, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form.js';
import memories from './images/memories.png';
import { useDispatch } from 'react-redux';
import useStyles from './styles.js';
import { getPosts } from './actions/posts.js';
const App =
  () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPosts);
    }, [dispatch]);
    return (
      <Container maxwidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">
            Memories
          </Typography>
          <img className={classes.image} src={memories} alt="memeories" height="60" />
        </AppBar>
        <Grow in>
          <Container>
            <Grid container jusitfy='space-between' alignitems='stretch' spacing='3'>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>);
  }

export default App
