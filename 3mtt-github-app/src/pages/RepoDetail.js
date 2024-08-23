import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Button, Spinner, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input,  Card, CardHeader, CardBody, CardFooter  } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

const RepoDetail = () => {
  const { repoName } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState(null);
  const [repos, setRepos] = useState([]); // List of all repos
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [repoDetails, setRepoDetails] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchReposAndRepo = async () => {
      try {
        // Fetch all repositories
        const reposResponse = await axios.get(`https://api.github.com/user/repos`, {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        });
        setRepos(reposResponse.data);

        // Fetch the specific repository
        const repoResponse = await axios.get(`https://api.github.com/repos/${process.env.REACT_APP_GITHUB_USERNAME}/${repoName}`, {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        });
        setRepo(repoResponse.data);
        setRepoDetails({ name: repoResponse.data.name, description: repoResponse.data.description });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReposAndRepo();
  }, [repoName]);

  const updateRepo = async () => {
    try {
      await axios.patch(`https://api.github.com/repos/${process.env.REACT_APP_GITHUB_USERNAME}/${repoName}`, repoDetails, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      });
      setRepo(prevRepo => ({ ...prevRepo, ...repoDetails }));
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRepo = async () => {
    try {
      await axios.delete(`https://api.github.com/repos/${process.env.REACT_APP_GITHUB_USERNAME}/${repoName}`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      });
      alert('Repository deleted');
      navigate('/'); // Redirect to home page or another appropriate route
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigation = (direction) => {
    if (repos.length === 0) return; // No repositories to navigate

    const currentIndex = repos.findIndex(r => r.name === repoName);
    let newRepoIndex;

    if (direction === 'prev') {
      newRepoIndex = currentIndex > 0 ? currentIndex - 1 : repos.length - 1; // Loop to last if at the beginning
    } else {
      newRepoIndex = currentIndex < repos.length - 1 ? currentIndex + 1 : 0; // Loop to first if at the end
    }

    const newRepoName = repos[newRepoIndex].name;
    navigate(`/repo/${newRepoName}`);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <Box
      p={4}
      mt={30}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >

    <Card align='center' mt={50}>
    <CardHeader>
        <Heading size='md'> {repo.name}</Heading>
    </CardHeader>
    <CardBody>
        <Text>Description: {repo.description || 'No description'}</Text>
        <Text>Visibility: {repo.visibility}</Text>
        <Text>Branch: {repo.default_branch}</Text>
        <Text>Repo URL: {repo.url}</Text>
        <Text>Owner Username: {repo.owner.login}</Text>
    </CardBody>
    <CardFooter>
        <Button colorScheme="blue" onClick={onOpen}>Edit</Button>
        <Button colorScheme="red" ml={4} onClick={deleteRepo}>Delete</Button>
    </CardFooter>
    </Card>

      <Box mt={8} mb={4}>
        <Button
          colorScheme="teal"
          onClick={() => handleNavigation('prev')}
          mr={48}
          disabled={repos.length <= 1} // Disable if there is no previous repo
        >
          Previous
        </Button>
        <Button
          colorScheme="teal"
          onClick={() => handleNavigation('next')}
          disabled={repos.length <= 1} // Disable if there is no next repo
        >
          Next
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Repository</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Repository Name"
              value={repoDetails.name}
              onChange={(e) => setRepoDetails({ ...repoDetails, name: e.target.value })}
              mb={4}
            />
            <Input
              placeholder="Description"
              value={repoDetails.description}
              onChange={(e) => setRepoDetails({ ...repoDetails, description: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updateRepo}>Save</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RepoDetail;
