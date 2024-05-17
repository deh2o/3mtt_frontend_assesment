// RepoDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RepoDetails() {
  const { owner, repo } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then(response => response.json())
      .then(data => setRepoDetails(data));
  }, [owner, repo]);

  if (!repoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{repoDetails.name}</h1>
      <p>{repoDetails.description}</p>
      {/* Add other details you want to display */}
    </div>
  );
}

export default RepoDetails;
