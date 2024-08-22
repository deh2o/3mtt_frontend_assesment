// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import RepoCard from '../components/RepoCard';
// import Pagination from '../components/Pagination';
// import { SearchInput, FilterSelect } from '@shadcn/ui';

// const ReposList = () => {
//   const { user, authenticate } = useAuth();
//   const [repos, setRepos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     const fetchRepos = async () => {
//       try {
//         await authenticate(); // Ensure user is authenticated
//         const response = await axios.get(`${process.env.REACT_APP_GITHUB_REPOS_URL}?page=${page}&per_page=10`, {
//           headers: {
//             Authorization: `token ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`
//           }
//         });
//         setRepos(response.data);
//         setTotalPages(Math.ceil(response.headers['x-total-count'] / 10));
//       } catch (error) {
//         console.error('Error fetching repos:', error);
//       }
//     };

//     fetchRepos();
//   }, [page, search, filter]);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">GitHub Repositories</h1>
//       <SearchInput placeholder="Search Repositories" onChange={(e) => setSearch(e.target.value)} />
//       <FilterSelect onChange={(e) => setFilter(e.target.value)}>
//         <option value="all">All</option>
//         <option value="forks">Forks</option>
//         <option value="stars">Stars</option>
//       </FilterSelect>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {repos
//           .filter(repo => repo.name.includes(search) && (filter === 'all' || repo[filter]))
//           .map(repo => <RepoCard key={repo.id} repo={repo} />)}
//       </div>
//       <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
//     </div>
//   );
// };

// export default ReposList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import RepoCard from '../components/RepoCard';
import Pagination from '../components/Pagination';

const ReposList = () => {
  const { user, authenticate } = useAuth(); // Use user if needed
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        await authenticate(); // Ensure user is authenticated
        const response = await axios.get(`${process.env.REACT_APP_GITHUB_REPOS_URL}?page=${page}&per_page=10`, {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`
          }
        });
        setRepos(response.data);
        setTotalPages(Math.ceil(response.headers['x-total-count'] / 10));
      } catch (error) {
        console.error('Error fetching repos:', error);
      }
    };

    fetchRepos();
  }, [page, search, filter, authenticate]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">GitHub Repositories</h1>
      {user && <p>Welcome, {user.name}!</p>} {/* Example usage of user */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Repositories"
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="forks">Forks</option>
          <option value="stars">Stars</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos
          .filter(repo => repo.name.includes(search) && (filter === 'all' || repo[filter]))
          .map(repo => <RepoCard key={repo.id} repo={repo} />)}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ReposList;

