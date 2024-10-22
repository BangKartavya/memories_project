import {AppBar, Container, Grid, Grow, Typography} from "@material-ui/core";
import React from "react";
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form.js';
import memories from './images/memories.png';

import useStyles from './styles.js';

const App =
    () => {
      const classes = useStyles();
      return (
          <Container maxwidth = "lg">
          <AppBar className = {classes.appBar} position = "static" color = "inherit">
            <Typography className = {classes.heading} variant = "h2" align = "center">
              Memories
            </Typography>
            <img className = {classes.image} src={memories} alt="memeories" height = "60" />
          </AppBar>
          <Grow in>
            <Container>
              <Grid container jusitfy='space-between' alignitems='stretch' spacing = '3'>
                <Grid item xs = {12} sm = {7}>
                  <Posts />
                </Grid>
                <Grid item xs = {12} sm = {4}>
                  <Form />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Container>);
    }

export default App
