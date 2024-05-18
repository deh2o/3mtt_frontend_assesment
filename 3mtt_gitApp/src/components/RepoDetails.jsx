import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button } from './ui/button';

function RepoDetails() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/deh2o/repos')
      .then(response => response.json())
      .then(data => setRepos(data));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-1/3 h-auto flex flex-col justify-center items-center bg-white shadow-md rounded-lg">
        
      </Card>
    </div>
  );
}

export default RepoDetails;
