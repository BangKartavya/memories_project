import React, {useState,useEffect} from 'react';
import useStyles from './styles.js';
import FileBase from 'react-file-base64';
import {TextField, Button, Typography,Paper} from '@material-ui/core';
import { createPost, updatePost } from '../../actions/posts';
import { useDispatch ,useSelector} from 'react-redux';

const Form = ({ currentId,setCurrentId }) => {
    const [postData,setPostData] = useState({title: '',message: '',tags: '',selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.find((message) => message._id === currentId):null);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post);
    },[post])

    const clear = () => {
        setCurrentId(0);
        setPostData({title: '', message: '', tags: '', selectedFile: '' });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(createPost({...postData,name: user?.result?.name}));
        }
        else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        clear();
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to Create your Own Memories and Like Other's
                </Typography>
            </Paper>
        );
    }


    return (
        <Paper className = {classes.paper}>
            <form autoComplete= "off" noValidate className={`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
                <Typography fullwidth="true" variant="h6">{currentId ? 'Editing' : "Creating"} A Memory</Typography>
                <TextField required name = "title" variant = "outlined" label="Title" fullWidth value= {postData.title} onChange = {(e) => setPostData({...postData,title: e.target.value})}/>
                <TextField required name = "message" variant = "outlined" label="Message" fullWidth value= {postData.message} onChange = {(e) => setPostData({...postData,message: e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <div className = {classes.fileInput}><FileBase type="file" multiple={false} onDone={(({ base64 }) => setPostData({...postData,selectedFile:base64}))} /></div>
                <Button className = {classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button className = {classes.buttonSubmit} variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;