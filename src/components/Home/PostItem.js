import React from 'react';
import { Link } from 'react-router-dom';

function PostItem({ post, isFirst }) {
  return (
    <li className={`post-item border-black ${isFirst ? 'border-t border-b' : 'border-b'}`}>
      <Link to={`/blogpost/${post.title}`} className="hover:underline">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">{post.title}</span>
        </div>
      </Link>
    </li>
  );
}

export default PostItem;
