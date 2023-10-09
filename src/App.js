import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('');
  const [editingNameId, setEditingNameId] = useState(null);
  const [editingNameValue, setEditingNameValue] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://blogbackend-production-023e.up.railway.app//add-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ namex: newName }),
      });

      if (response.ok) {
        // Update the list of names with the new name
        setNames([...names, { name: newName }]);
        setNewName(''); // Clear the input field
      } else {
        console.error('Failed to add name');
      }
    } catch (error) {
      console.error('Error adding name:', error);
    }
  };

  // Function to fetch the list of names from the server
  const fetchNames = async () => {
    try {
      const response = await fetch('https://blogbackend-production-023e.up.railway.app/');
      if (response.ok) {
        const data = await response.json();
        setNames(data.names);
      } else {
        console.error('Failed to fetch names');
      }
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  // Function to handle name update
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`https://blogbackend-production-023e.up.railway.app//update-name/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ namex: editingNameValue }),
      });

      if (response.ok) {
        // Update the list of names with the updated name
        const updatedNames = names.map((name) =>
          name.id === id ? { ...name, name: editingNameValue } : name
        );
        setNames(updatedNames);
        setEditingNameId(null); // Clear the editing state
      } else {
        console.error('Failed to update name');
      }
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  // Function to handle name deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://blogbackend-production-023e.up.railway.app//delete-name/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted name from the list
        const updatedNames = names.filter((name) => name.id !== id);
        setNames(updatedNames);
      } else {
        console.error('Failed to delete name');
      }
    } catch (error) {
      console.error('Error deleting name:', error);
    }
  };

  useEffect(() => {
    // Fetch the initial list of names when the component mounts
    fetchNames();
  }, []);

  return (
    <div className="App">
      <h1>Add a New Name</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit">Add Name</button>
      </form>

      <h2>Names List</h2>
      <ul id="names-list">
        {names.map((name) => (
          <li key={name.id}>
            {editingNameId === name.id ? (
              <div>
                <input
                  type="text"
                  value={editingNameValue}
                  onChange={(e) => setEditingNameValue(e.target.value)}
                />
                <button onClick={() => handleUpdate(name.id)}>Save</button>
              </div>
            ) : (
              <div>
                {name.name}
                <button onClick={() => setEditingNameId(name.id)}>Edit</button>
                <button onClick={() => handleDelete(name.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
