import React from 'react';
import PostList from '../components/Home/PostList';
import useFetchPosts from '../hooks/useFetchPosts';
import LoadingSpinner from '../components/Home/LoadingSpinner';
import { useParams } from 'react-router-dom';

function Categorie() {
    const { type } = useParams();
  const { posts, loading } = useFetchPosts(type)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-4">DIY solutions for the {type}</h1>
        <div className="w-full justify-center">
          {loading ? <LoadingSpinner /> : <PostList posts={posts} />}
        </div>
      </div>
    </div>
  );
}

export default Categorie;