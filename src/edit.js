import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import Cookies from "js-cookie";
import API_ENDPOINT from "./utils/api";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function EditPage() {
  //Blog Data
  const [title, setTitle] = useState("");
  const [id, setID] = useState("");
  const [content, setContent] = useState("");

  //Blog Data Actions
  const [existingTitles, setExistingTitles] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  //Actions
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Image Actions
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    // Fetch the list of existing blog posts (titles and IDs) from your server
    const fetchExistingTitles = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/posts`);
        if (response.ok) {
          const data = await response.json();

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
  }, [isEditMode, content]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleQuillChange = (value) => {
    // Add a custom class to all images
    const modifiedContent = value.replace(/<img/g, '<img class="custom-image"');
    setContent(modifiedContent);
  };
  

  // // Function to replace image URLs with IDs
  const replaceImageUrlsWithIds = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.getElementsByTagName("img");
  
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageId = image.getAttribute("alt"); // Get the image ID from the alt attribute
  
      if (imageId) {
        console.log("Matched image ID:", imageId);
        image.setAttribute("src", imageId.toString()); // Replace src with the image ID
      }
    }
  
    return doc.body.innerHTML;
  };
  
  
  // const replaceImageUrlsWithIds = (content) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(content, "text/html");
  //   const images = doc.getElementsByTagName("img");

  //   for (let i = 0; i < images.length; i++) {
  //     const image = images[i];
  //     const imageUrl = image.getAttribute("src");

  //     const matchedImage = uploadedImages.find((img) =>
  //       imageUrl.includes(img.imageUrl)
  //     );
  //     if (matchedImage) {
  //       console.log("Matched image:", matchedImage);
  //       image.setAttribute("src", matchedImage.id.toString());
  //     }
  //   }

  //   return doc.body.innerHTML;
  // };



//Function to load the content of a post and replace image placeholders with actual URLs
const loadAndSetPostContent = async (selectedTitle) => {
  try {
    const jwtToken = Cookies.get("jwt-token");
    const response = await fetch(`${API_ENDPOINT}/edit/${selectedTitle.id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.post.content;
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const images = doc.getElementsByTagName("img");

      // Array to store promises for fetching image URLs
      const imagePromises = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const id = image.getAttribute("src");

        // Assuming you have an endpoint to fetch image data by ID
        const imageIdPromise = fetch(`${API_ENDPOINT}/image/${id}`)
          .then((response) => response.json())
          .then((imageData) => {
            if (imageData.imageUrl) {
              // Replace the image src attribute with the fetched URL
              image.setAttribute("src", imageData.imageUrl);
            }
          });

        imagePromises.push(imageIdPromise);
      }

      // Wait for all imagePromises to complete before updating the component
      await Promise.all(imagePromises);

      const modifiedContent = doc.body.innerHTML;

      // Update the component's state
      setTitle(data.post.title);
      setContent(modifiedContent);
      setID(data.post.id);
      setSelectedPost(data.post);
      setIsEditMode(true); // Set edit mode
    } else {
      setError("Failed to fetch selected post");
    }
  } catch (error) {
    console.error("Error fetching and updating selected post:", error);
    setError("Error fetching and updating selected post");
  }
};





// Example usage in your component
const handleTitleClick = async (selectedTitle) => {
  // Load and set the post content in one step
  await loadAndSetPostContent(selectedTitle);
};


  useEffect(() => {
    // Fetch the list of uploaded images when the component mounts.
    fetch(`${API_ENDPOINT}/image`)
      .then((response) => response.json())
      .then((data) => setUploadedImages(data))
      .catch((error) =>
        console.error("Failed to fetch uploaded images", error)
      );
  }, []);

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
      const jwtToken = Cookies.get("jwt-token");
      console.log("JWT Token:", jwtToken);
      const response = await fetch(`${API_ENDPOINT}/edit/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        console.log("Post deleted successfully");
        handleCreateNew();
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
      // Replace image URLs with IDs in the content
      const updatedContent = replaceImageUrlsWithIds(content);
  
      if (isEditMode) {
        const jwtToken = Cookies.get("jwt-token");
        const updatedPost = { id, title, content: updatedContent };
        const response = await fetch(`${API_ENDPOINT}/edit/${id}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(updatedPost),
        });
        if (response.ok) {
          console.log("Post updated successfully");
          handleCreateNew();
        } else {
          setError("Failed to update post");
        }
      } else {
        const jwtToken = Cookies.get("jwt-token");
        const response = await fetch(`${API_ENDPOINT}/edit`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ title, content: updatedContent }), // Ensure title and content are included
        });
        if (response.ok) {
          console.log("Post created successfully");
          handleCreateNew();
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
      <h1 className="text-2xl font-semibold mb-4">
        {isEditMode ? "Edit Post" : "Create Post"}
      </h1>
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md">
        <Formik
          initialValues={{
            title: title,
            content: content,
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            content: Yup.string().required("Content is required"),
          })}
          onSubmit={(values) => {
            // Your form submission logic here
            console.log("Form values:", values);
          }}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter title"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content:
              </label>
              <ReactQuill
                value={content}
                onChange={handleQuillChange}
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                  ],
                }}
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Render the list of uploaded images with the option to select and insert them */}
            <ul>
              {uploadedImages.map((image, index) => (
                <li key={index}>
                  <img
                    src={image.imageUrl}
                    alt={image.id}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </li>
              ))}
            </ul>

            {/* Display the rich text content with inserted images */}
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600"
            >
              {isEditMode ? "Save" : "Create"}
            </button>
          </Form>
        </Formik>

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
        className="p-4 mt-4 bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600"
      >
        New
      </button>
    </div>
  );
}

export default EditPage;
