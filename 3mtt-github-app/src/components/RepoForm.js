import React, { useState } from 'react';
import axios from 'axios';

const RepoForm = ({ repo }) => {
  const [name, setName] = useState(repo.name);
  const [description, setDescription] = useState(repo.description);

  const handleUpdate = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_GITHUB_REPOS_URL}/${repo.id}`, {
        name,
        description
      }, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`
        }
      });
      alert('Repo updated successfully');
    } catch (error) {
      console.error('Error updating repo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_GITHUB_REPOS_URL}/${repo.id}`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`
        }
      });
      alert('Repo deleted successfully');
    } catch (error) {
      console.error('Error deleting repo:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Edit Repo</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Repo Name"
        className="block mb-2 p-2 border"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Repo Description"
        className="block mb-4 p-2 border"
      />
      <button onClick={handleUpdate} className="p-2 bg-blue-500 text-white">Update Repo</button>
      <button onClick={handleDelete} className="ml-2 p-2 bg-red-500 text-white">Delete Repo</button>
    </div>
  );
};

export default RepoForm;
