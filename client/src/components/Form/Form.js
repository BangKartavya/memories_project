import React, {useState,useEffect} from 'react';
import useStyles from './styles.js';
import FileBase from 'react-file-base64';
import {TextField, Button, Typography,Paper} from '@material-ui/core';
import { createPost, updatePost } from '../../actions/posts';
import { useDispatch ,useSelector} from 'react-redux';

const Form = ({ currentId,setCurrentId }) => {
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId):null);
    const [postData,setPostData] = useState({creator: '',title: '',message: '',tags: '',selectedFile: ''});
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post);
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId,postData))
        }
        else dispatch(createPost(postData))
    }
    const clear = () => {

    }
    return (
        <Paper className = {classes.paper}>
            <form autoComplete= "off" noValidate className={`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
                <Typography fullwidth variant="h6">Creating A Memory</Typography>
                <TextField name = "creator" variant = "outlined" label="Creator" value= {postData.creator} onChange = {(e) => setPostData({...postData,creator: e.target.value})}/>
                <TextField name = "title" variant = "outlined" label="Title" fullwidth value= {postData.title} onChange = {(e) => setPostData({...postData,title: e.target.value})}/>
                <TextField name = "message" variant = "outlined" label="Message" fullwidth value= {postData.message} onChange = {(e) => setPostData({...postData,message: e.target.value})}/>
                <TextField name = "tags" variant = "outlined" label="Tags" fullwidth value= {postData.tags} onChange = {(e) => setPostData({...postData,tags: e.target.value})}/>
                <div className = {classes.fileInput}><FileBase type="file" multiple={false} onDone={(({ base64 }) => setPostData({...postData,selectedFile:base64}))} /></div>
                <Button className = {classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth={true}>Submit</Button>
                <Button className = {classes.buttonSubmit} variant="contained" color="secondary" size="large" onClick={clear} fullWidth={true}>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;