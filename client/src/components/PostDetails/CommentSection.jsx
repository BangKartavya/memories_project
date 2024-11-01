import React, { useState, useRef ,useEffect} from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import {commentPost} from '../../actions/posts';

const CommentSection = ({post}) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
    const commentsRef = useRef();

    useEffect(() => {
        if (commentsRef.current) {
            commentsRef.current.scrollTo({
                top: commentsRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [comments]); 

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        
        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComment('');
        setComments(newComments);

    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>

                <div className={classes.commentsInnerContainer} ref={commentsRef}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong>{c.split(`: `)[0]}:</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant='h6'>
                            Write a comment
                        </Typography>
                        <TextField
                            fullWidth
                            maxRows={4}
                            variant='outlined'
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} color="primary" fullWidth disabled={!comment} variant="contained" onClick={handleClick} >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;