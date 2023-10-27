import React from 'react';

function BlogContent({ post }) {
  return (
    <div className="blog-content">
      <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
      <div className="post-content">
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="blog-post-images"
        />
      </div>
    </div>
  );
}

export default BlogContent;
