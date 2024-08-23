import React, { Component } from 'react';
import { Box, Heading } from '@chakra-ui/react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box textAlign="center" p={4}>
          <Heading>Error Occurred</Heading>
          <p>Something went wrong. Please try again later.</p>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
