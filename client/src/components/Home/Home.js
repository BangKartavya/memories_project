import React, { useEffect, useState } from "react";
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from "@material-ui/core";
import Posts from '../Posts/Posts.js';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Form from '../Form/Form.js';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts.js';
import Pagination from '../Pagination.jsx';
import useStyles from './styles.js';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const classes = useStyles();    
    
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete)); 

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
        else {
            navigate('/');
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container jusitfy='space-between' alignitems='stretch' spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} color="inherit" position="static">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onKeyUp = {handleKeyPress}
                                onChange = {(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"

                            />
                            <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained" disabled={!tags.length > 0}>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page = {page} />
                                </Paper>
                            )
                        }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
};

export default Home;