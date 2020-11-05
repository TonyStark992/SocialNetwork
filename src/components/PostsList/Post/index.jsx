import React from "react";
import { Card } from "react-bootstrap";
import { useSelector,useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { deletePost } from "redux/posts/postsActions";

const Post = ({ post }) => {
  const isAuthenticated = useSelector(state => state.authentification.isAuthenticated);
  const user = useSelector(state => state.authentification.user);
  const token = useSelector(state => state.authentification.token);

  const dispatch = useDispatch();

  const destroyPost = (toDeletePost) => {
    fetch(`https://my-pasteque-space.herokuapp.com/posts/${toDeletePost.id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response
    })
    .then((response) => response.json())
    .then(response => {
      dispatch(deletePost(response))
    })
    .catch(error => {
      alert(error)
    })
  }

  return (
      <Card className="col-lg-3">
        <Card.Body>
          <Card.Text>
            {post.text}
          </Card.Text>
          {isAuthenticated &&
            <Card.Subtitle className="mb-2 text-muted">{post.like} likes</Card.Subtitle>
          }
          {post.user && isAuthenticated &&
            <Card.Link href={`/user/${post.user.id}`}>{post.user.username}</Card.Link>
          }
          {post.user && isAuthenticated && post.user.id === user.id &&
            <Button type="submit" onClick={() => destroyPost(post)}>Supprimer</Button>
          }
        </Card.Body>
      </Card>
  );
};

export default Post;