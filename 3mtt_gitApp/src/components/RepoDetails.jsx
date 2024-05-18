import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from './ui/button';

function RepoDetails() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/deh2o/repos')
      .then(response => response.json())
      .then(data => setRepos(data));
  }, []);

  const handleCreate = () => {
    alert('Create functionality is not implemented yet.');
  };

  const handleUpdate = (repoId) => {
    alert(`Update functionality for repo ID ${repoId} is not implemented yet.`);
  };

  const handleDelete = (repoId) => {
    alert(`Delete functionality for repo ID ${repoId} is not implemented yet.`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Carousel className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg">
        <CarouselContent>
          {repos.map(repo => (
            <CarouselItem key={repo.id} className="w-[100px]" id={repo.id}>
              <Card>
                <CardHeader className="justify-center items-center">
                  <CardTitle>{repo.name}</CardTitle>
                  <CardDescription>{repo.visibility}</CardDescription>
                </CardHeader>
              </Card>
              <table className="w-full">
                <thead>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Info</th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Repo ID</td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{repo.id}</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Owner</td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{repo.owner.login}</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Link (url)</td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a>
                    </td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Default Branch</td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{repo.default_branch}</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Created</td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{new Date(repo.created_at).toLocaleDateString()}</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Last Updated</td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{new Date(repo.updated_at).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
              <div className='mt-8 mb-8 flex justify-center items-center space-x-8'>
                <Button onClick={handleCreate}>Create</Button>
                <Button variant="outline" onClick={() => handleUpdate(repo.id)}>Update</Button>
                <Button variant="destructive" onClick={() => handleDelete(repo.id)}>Delete</Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default RepoDetails;
