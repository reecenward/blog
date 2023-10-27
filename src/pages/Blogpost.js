import React from 'react';
import { useParams } from 'react-router-dom';
import BlogContent from '../components/Blogpost/BlogContent';
import useFetchPost from '../hooks/useFetchPost';
import '../styles/blogpost.css';

function BlogPost() {
  const { title } = useParams();
  const post = useFetchPost(title);

  return (
    <div className="container max-w-md mx-auto px-4 py-4">
      {post ? <BlogContent post={post} /> : <p>Loading...</p>}
    </div>
  );
}

export default BlogPost;
