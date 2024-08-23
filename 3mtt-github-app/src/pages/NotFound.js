import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const NotFound = () => (
  <Box textAlign="center" p={4}>
    <Heading>404 - Page Not Found</Heading>
    <p>The page you are looking for does not exist.</p>
  </Box>
);

export default NotFound;
