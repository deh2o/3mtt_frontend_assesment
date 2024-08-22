import React from 'react';
import { Link } from 'react-router-dom';

const RepoCard = ({ repo }) => (
  <div className="border p-4 rounded shadow-md">
    <h2 className="text-xl font-semibold mb-2">{repo.name}</h2>
    <p>{repo.description}</p>
    <Link to={`/repo/${repo.id}`} className="text-blue-500 hover:underline mt-2 block">
      View Details
    </Link>
  </div>
);

export default RepoCard;
