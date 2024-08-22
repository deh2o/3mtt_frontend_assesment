import React, { useState } from 'react';
import axios from 'axios';

const CreateRepoModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    try {
      await axios.post(process.env.REACT_APP_GITHUB_REPOS_URL, {
        name,
        description
      }, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`
        }
      });
      alert('Repo created successfully');
      onClose();
    } catch (error) {
      console.error('Error creating repo:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create New Repository</h2>
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
        <button onClick={handleCreate} className="p-2 bg-blue-500 text-white">Create Repo</button>
        <button onClick={onClose} className="ml-2 p-2 bg-gray-500 text-white">Cancel</button>
      </div>
    </div>
  );
};

export default CreateRepoModal;
