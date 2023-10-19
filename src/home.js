import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of blog posts when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://blogbackend-production-023e.up.railway.app/posts'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false); // Corrected syntax error here
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-4">Where it all begins</h1>
        <div className="w-full">
  {loading ? (
    <p className="text-center text-gray-500">Loading...</p>
  ) : (
    <ul className="post-list">
      {posts.map((post, index) => (
        <li key={post.id} className={`post-item border-black ${index === 0 ? 'border-t border-b' : 'border-b'}`}>
          <Link to={`/blogpost/${post.title}`} className="hover:underline">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">{post.title}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>


      </div>
    </div>
  );
}

export default Home;
