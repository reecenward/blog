import React from 'react';
import PostItem from './PostItem';
import LoadingSpinner from './LoadingSpinner';

function PostList({ posts }) {
  return (
    <ul className="post-list">
      {posts.map((post, index) => (
        <PostItem key={post.id} post={post} isFirst={index === 0} />
      ))}
    </ul>
  );
}

export default PostList;
