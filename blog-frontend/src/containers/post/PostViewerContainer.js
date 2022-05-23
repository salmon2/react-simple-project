import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostViewer from '../../components/post/PostViewer';
import { readPost, unloadPost } from '../../modules/post';
import { useParams } from 'react-router-dom';

const PostViewerContainer = () => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
  }));

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  return <PostViewer post={post} loading={loading} error={error}></PostViewer>;
};

export default PostViewerContainer;
