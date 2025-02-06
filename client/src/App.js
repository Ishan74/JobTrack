import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import JobForm from './components/JobForm';

// Set up GraphQL API link
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Attach the authentication token to requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token'); // Retrieve token from local storage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-job" element={<JobForm />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
