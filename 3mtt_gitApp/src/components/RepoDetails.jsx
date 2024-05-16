// RepoDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RepoDetails() {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/your-username/${id}`)
      .then(response => response.json())
      .then(data => setRepo(data));
  }, [id]);

  if (!repo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
    </div>
  );
}

export default RepoDetails;
