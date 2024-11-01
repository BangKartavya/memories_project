import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, CardActionArea } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete.js';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz.js';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles.js';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);

    const userId = user?.result?.sub || user?.result?._id; 
    const hasLikedPost = post.likes.find((like) => like === userId);


    const handleLike = async () => {

        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== (userId)));
        }
        else {
            setLikes([...post.likes, userId]);
        }
    };


    const Likes = () => {
        if (likes.length > 0) {
            return hasLikedPost ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp; {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`} </>
            ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            )
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

   

    const openPost = (e) => {
        navigate(`/posts/${post._id}`);
    };

    return (
        <Card className={classes.card} raised elevation={6}>
                <CardActionArea onClick={openPost}>
                    <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                    <div className={classes.overlay}>
                        <Typography variant="h6">{post.name}</Typography>
                        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                    </div>
                    {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                        <div className={classes.overlay2} name="edit">
                            <Button style={{ color: 'white' }} size="small" onClick={(e) => {
                                e.stopPropagation();
                                setCurrentId(post._id);
                                }
                            }>
                                <MoreHorizIcon fontSize="medium" />
                            </Button>
                        </div>
                    )}
                    <div className={classes.details}>
                        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    </div>
                    <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
                    </CardContent>
                    </CardActionArea >
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                        <Likes />
                    </Button>
                    {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) &&
                        (<Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                            <DeleteIcon fontSize="small" />
                            Delete
                    </Button>
                    )}
                </CardActions>
            </Card>
    );
};

export default Post;