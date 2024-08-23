import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input, Box, Spinner, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.github.com/user/repos`, {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
          params: {
            page: page,
            per_page: 10,
          },
        });
        setRepos(response.data);
        setTotalPages(Math.ceil(response.headers['x-total-count'] / 10));
        setFilteredRepos(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [page]);

  useEffect(() => {
    setFilteredRepos(
      repos.filter(repo =>
        repo.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, repos]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center" // Center horizontally
        alignItems="center"    // Center vertically
        height="100vh"         // Full viewport height to center vertically on the page
      >
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <Box p={4}>
        <Heading mb={4}>3MTT Frontend Project - GitHub Repositories </Heading>
        <Text fontSize='xl'> Welcome, {process.env.REACT_APP_GITHUB_USERNAME}!</Text>

      <Input
      placeholder="Search repos"
      mb={6} mt={8}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      w={{ base: '100%', md: '33%' }} // 100% width on small screens, 33% on medium and up
    />
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>NAME</Th>
            <Th>DESCRIPTION</Th>
            <Th>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredRepos.map((repo) => (
            <Tr key={repo.id}>
                <Td>{repo.id}</Td>
              <Td>{repo.name}</Td>
              <Td>{repo.description || 'No description'}</Td>
              <Td>
                <Button onClick={() => navigate(`/repo/${repo.name}`)}>Details</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={4}
        gap={2} >
            <Button 
                disabled={page <= 1} 
                onClick={() => setPage(page - 1)}
            >
                Previous
            </Button>
            <Button 
                disabled={page >= totalPages} 
                onClick={() => setPage(page + 1)}
            >
                Next
            </Button>
      </Box>
    </Box>
  );
};

export default Home;
