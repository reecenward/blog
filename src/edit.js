import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import Cookies from 'js-cookie';

function EditPage() {
  const [title, setTitle] = useState("");
  const [id, setID] = useState("");
  const [content, setContent] = useState("");
  const [existingTitles, setExistingTitles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [richTextContent, setRichTextContent] = useState('');




  useEffect(() => {
    // Fetch the list of existing blog post titles and IDs from your server
    const fetchExistingTitles = async () => {
      try {
        const response = await fetch("https://blogbackend-production-023e.up.railway.app/posts");
        if (response.ok) {
          const data = await response.json();
          console.log(data);

          // Extract titles and IDs from the data.posts array
          const titlesWithIds = data.posts.map((post) => ({
            title: post.title,
            id: post.id,
          }));
          setExistingTitles(titlesWithIds);

          setLoading(false); // Data loaded successfully
        } else {
          setError("Failed to fetch existing titles");
          setLoading(false); // Data loading failed
        }
      } catch (error) {
        console.error("Error fetching existing titles:", error);
        setError("Error fetching existing titles");
        setLoading(false); // Data loading failed
      }
    };


    fetchExistingTitles();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleQuillChange = (value) => {
    setContent(value);
  };

  useEffect(() => {
    // Fetch the list of uploaded images when the component mounts.
    fetch('https://blogbackend-production-023e.up.railway.app/image')
      .then((response) => response.json())
      .then((data) => setUploadedImages(data))
      .catch((error) => console.error('Failed to fetch uploaded images', error));
  }, []);

  const handleAddImage = (image) => {
    // Handle the insertion of the selected image into rich text content.
    if (image) {
      // You would need to update this code based on your rich text editor implementation.
      const imgElement = `<img src="${image.imageUrl}" alt="Selected Image" />`;
      

      // Append the image to the current content.
      setRichTextContent((prevContent) => prevContent + imgElement);
    }
  };

  const handleTitleClick = async (selectedTitle) => {
    // Fetch the content of the selected post based on its id
    try {
      const jwtToken = Cookies.get('jwt-token');
      console.log('JWT Token:', jwtToken);
      const response = await fetch(
        `https://blogbackend-production-023e.up.railway.app/edit/${selectedTitle.id}`, {
          method: "GET",
          credentials: 'include',
          headers: {
              'Authorization': `Bearer ${jwtToken}`
          },
        });
      if (response.ok) {
        const data = await response.json();
        setTitle(data.post.title);
        setContent(data.post.content);
        setID(data.post.id);
        setSelectedPost(data.post);
        setIsEditMode(true); // Set edit mode
      } else {
        setError("Failed to fetch selected post");
      }
    } catch (error) {
      console.error("Error fetching selected post:", error);
      setError("Error fetching selected post");
    }
  };

  const handleCreateNew = () => {
    setTitle("");
    setContent("");
    setID("");
    setSelectedPost(null);
    setIsEditMode(false);
  };

  const handleDelete = async () => {
    if (!isEditMode || !selectedPost) {
      setError("No post selected for deletion");
      return;
    }

    try {
        const jwtToken = Cookies.get('jwt-token');
        console.log('JWT Token:', jwtToken);
        const response = await fetch(`https://blogbackend-production-023e.up.railway.app/edit/${id}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        },
      });

      if (response.ok) {
        console.log("Post deleted successfully");
        setTitle("");
        setContent("");
        setSelectedPost(null);
        setIsEditMode(false);
      } else {
        setError("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Error deleting post");
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        const jwtToken = Cookies.get('jwt-token');
        console.log('JWT Token:', jwtToken);
        const updatedPost = { id, title, content };
        const response = await fetch(`https://blogbackend-production-023e.up.railway.app/edit/${id}`, {
          method: "PUT",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify(updatedPost),
        });
        if (response.ok) {
          console.log("Post updated successfully");
          setTitle("");
          setContent("");
          setSelectedPost(null);
          setIsEditMode(false);
        } else {
          setError("Failed to update post");
        }
      } else {
        const jwtToken = Cookies.get('jwt-token');
        console.log('JWT Token:', jwtToken);
        const newPost = { title, content };
        console.log(newPost);
        const response = await fetch("https://blogbackend-production-023e.up.railway.app/edit", {
            method: "POST",
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({ title: title, content: content }), // Ensure title and content are included
          });          
        if (response.ok) {
          console.log("Post created successfully");
          setTitle("");
          setContent("");
        } else {
          setError("Failed to create post");
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      setError("Error submitting post");
    }
  };

 
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4">{isEditMode ? "Edit Post" : "Create Post"}</h1>
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
          <ReactQuill 
            value={content} 
            onChange={handleQuillChange} 
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link'],
              ],
            }}
          />
        </div>
        <button onClick={() => handleAddImage(selectedImage)}>Add Image</button>

      {/* Render the list of uploaded images with the option to select and insert them */}
      <ul>
        {uploadedImages.map((image, index) => (
          <li key={index}>
            <img
              src={image.imageUrl}
              alt={`Image ${index}`}
              style={{ maxWidth: '100px', maxHeight: '100px' }}
              onClick={() => setSelectedImage(image)}
            />
          </li>
        ))}
      </ul>

      {/* Display the rich text content with inserted images */}
      <div contentEditable={true} dangerouslySetInnerHTML={{ __html: richTextContent }}></div>
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600"
        >
          {isEditMode ? "Save" : "Create"}
        </button>
        <button
          onClick={handleDelete}
          className="w-full mt-4 bg-red-500 text-white rounded-md py-2 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <h2 className="mt-4 text-xl font-semibold">Existing Titles</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : existingTitles.length === 0 ? (
        <p>No existing titles found.</p>
      ) : (
        <ul className="mt-2">
          {existingTitles.map((existingTitle) => (
            <li key={existingTitle.id}>
              <button
                onClick={() => handleTitleClick(existingTitle)}
                className="text-indigo-500 hover:underline"
              >
                {existingTitle.title}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleCreateNew}
        className="mt-4 bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600"
      >
        Create New
      </button>
    </div>
  );
}

export default EditPage;
