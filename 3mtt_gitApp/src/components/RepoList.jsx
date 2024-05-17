import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from './ui/button';

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/users/deh2o/repos')
      .then(response => response.json())
      .then(data => setRepos(data));
  }, []);

  // Get current repositories
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  
  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-1/3 h-auto flex flex-col justify-center items-center bg-white shadow-md rounded-lg">
        <CardHeader className="text-center">
          <CardTitle>My Git Repositories</CardTitle>
          <CardDescription>List of git repositories for user: <b>deh2o</b></CardDescription>
        </CardHeader>
        <div className="w-full p-4">
          <input
            type="text"
            placeholder="Search repositories"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <Table>
          <TableCaption>A list of your Repositories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">ID</TableHead>
              <TableHead className="w-[200px]">Repository</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRepos.map(repo => (
              <TableRow key={repo.id}>
                <TableCell className="">{repo.id}</TableCell>
                <TableCell className="w-[220px]">
                  {repo.name}
                </TableCell>
                <TableCell>
                  <Link to={`/repos/${repo.owner.login}/${repo.id}`}>
                  <Button className="px-1 py-1 text-sm">View Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className="cursor-pointer" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            </PaginationItem>
            {Array.from({ length: Math.ceil(filteredRepos.length / reposPerPage) }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink className="cursor-pointer" onClick={() => paginate(index + 1)}>{index + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext className="cursor-pointer" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredRepos.length / reposPerPage)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </div>
  );
}

export default RepoList;
