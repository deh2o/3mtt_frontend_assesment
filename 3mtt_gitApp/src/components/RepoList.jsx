// RepoList.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Input, Button } from './ui';

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const location = useLocation();
  const { search } = location;

  useEffect(() => {
    const parsed = queryString.parse(search);
    const newPage = parsed.page ? Number(parsed.page) : 1;
    setPage(newPage);
  }, [search]);

  useEffect(() => {
    fetch(`https://api.github.com/users/deh2o/repos?page=${page}`)
      .then(response => response.json())
      .then(data => setRepos(data));
  }, [page]);

  const handleSearch = () => {
    // Perform search logic here
  };

  return (
    <div>
      <h1>My GitHub Repositories</h1>
      <Input
        placeholder="Search repositories"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <Link to={`/repo/${repo.id}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
      <div>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous Page
        </Button>
        <span>{page}</span>
        <Button onClick={() => setPage(page + 1)}>Next Page</Button>
      </div>
    </div>
  );
}

export default RepoList;
