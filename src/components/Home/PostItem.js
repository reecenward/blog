import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/PostItem.css'; 

function PostItem({ post, isFirst }) {
  return (
    <li className='post-item-wrapper'>
      <Link to={`/blogpost/${post.title}`} className="post-item-link">
        <div className="post-item">
          <span className="post-item-text">{post.title}</span>
        </div>
      </Link>
          <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          </div>
    </li>
  );
}

export default PostItem;
