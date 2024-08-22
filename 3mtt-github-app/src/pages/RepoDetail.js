import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RepoForm from '../components/RepoForm';

const RepoDetail = () => {
  const { id } = useParams();
  const { authenticate } = useAuth();
  const [repo, setRepo] = useState(null);
  const [error, setError] = useState(null);

  // Memoize authenticate function if it's stable
  const memoizedAuthenticate = useCallback(() => authenticate(), [authenticate]);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        await memoizedAuthenticate(); // Ensure user is authenticated
        const response = await axios.get(`${process.env.REACT_APP_GITHUB_REPOS_URL}/${id}`, {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`
          }
        });
        setRepo(response.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching repo details:', error);
      }
    };

    fetchRepo();
  }, [id, memoizedAuthenticate]);

  if (error) return <div>Error: {error}</div>;
  if (!repo) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{repo.name}</h1>
      <p>{repo.description}</p>
      <RepoForm repo={repo} />
    </div>
  );
};

export default RepoDetail;
