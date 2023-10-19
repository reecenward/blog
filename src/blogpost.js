import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './blogpost.css';

function BlogPost() {
  const { title } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://blogbackend-production-023e.up.railway.app/post/${title}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [title]);

  return (
    <div className="container max-w-md mx-auto px-4 py-4">
      {post ? (
        <div className="blog-content">
          <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
          <div className="post-content">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="blog-post-images"
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogPost;
