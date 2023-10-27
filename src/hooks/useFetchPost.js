// import { useEffect, useState } from 'react';
// import API_ENDPOINT from '../utils/api';

// function useFetchPost(title) {
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await fetch(`${API_ENDPOINT}/post/${title}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch post');
//         }
//         const data = await response.json();
//         setPost(data.post);
//       } catch (error) {
//         console.error('Error fetching post:', error);
//       }
//     };

//     fetchPost();
//   }, [title]);

//   return post;
// }

// export default useFetchPost;
import { useEffect, useState } from 'react';
import API_ENDPOINT from '../utils/api';

function useFetchPostWithImages(title) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/post/${title}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();

        // Replace image placeholders in the content with actual image URLs
        const modifiedContent = await replaceImagePlaceholders(data.post.content);

        // Create a new post object with the modified content
        const modifiedPost = { ...data.post, content: modifiedContent };

        setPost(modifiedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [title]);

  return post;
}

async function replaceImagePlaceholders(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const images = doc.getElementsByTagName('img');

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const id = image.getAttribute('src');

    // Fetch the image data by ID and replace the src attribute with the actual URL
    const imageUrl = await getImageUrlById(id);
    if (imageUrl) {
      image.setAttribute('src', imageUrl);
    }
  }

  return doc.body.innerHTML;
}

async function getImageUrlById(id) {
  try {
    const response = await fetch(`${API_ENDPOINT}/image/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data.imageUrl;
    } else {
      console.error(`Failed to fetch image with ID ${id}`);
    }
  } catch (error) {
    console.error(`Error fetching image with ID ${id}:`, error);
  }
}

export default useFetchPostWithImages;
