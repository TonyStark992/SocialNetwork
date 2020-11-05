import React, { useEffect } from 'react';
import PostCreator from 'components/PostCreator';
import PostsList from 'components/PostsList';
import { Jumbotron } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { loadPostsCount } from "redux/posts/postsActions";


const Home = () => {
  const isAuthenticated = useSelector(state => state.authentification.isAuthenticated)
  const posts = useSelector((state) => state.posts.posts);
  const postsCount = useSelector((state) => state.posts.postsCount);
  const dispatch = useDispatch();
  const token = useSelector(state => state.authentification.token);
  
  useEffect(() => {
    const loadCount = () => {
      fetch("https://my-pasteque-space.herokuapp.com/posts/count", {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((response) => {
        dispatch(loadPostsCount(response));
      })
      .catch((error) => {
        alert(error);
      });
    }
    if (isAuthenticated) {
      loadCount()
    }
  }, [token, posts, postsCount, dispatch, isAuthenticated])

  return (
    <div>
      <Jumbotron>
        <h1>Bienvenue sur My Social Network</h1>
        <p>
          Ce site est un entraînement à Redux et React. Nous utilisons l'authentification et le routing pour créer un petit réseau social.
        </p>
        { postsCount &&
        <small>
          Il y a actuellement {postsCount} messages sur notre réseau social ! 😲
        </small>
        }
      </Jumbotron>
      <PostCreator />
      <PostsList />
    </div>
  );
};

export default Home;