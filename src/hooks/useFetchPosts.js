import { useState, useEffect } from 'react';
import API_ENDPOINT from '../utils/api';

function useFetchPosts(type) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/posts/${type}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading };
}

export default useFetchPosts;
