// RepoDetails.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


function RepoDetails(props) {
  const [repoDetails, setRepoDetails] = useState(null);
  const { location } = props;
  const repoName = location.state

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await fetch(`https://api.github.com/deh2o/${repoName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch repository details');
        }
        const data = await response.json();
        setRepoDetails(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchRepoDetails();
  }, [repoName]);

  return (
    <div>
      <h1>Repository Details</h1>
      {repoDetails ? (
        <div>
          <h2>{repoDetails.name}</h2>
          <p>{repoDetails.description}</p>
          {/* Display other details */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

RepoDetails.propTypes = {
  location: PropTypes.object.isRequired, // Validate location prop
};

export default RepoDetails;
