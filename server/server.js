require('dotenv').config({ path: __dirname + '/.env' }); // Ensure .env is loaded
console.log("MONGODB_URI:", process.env.MONGODB_URI); // Debugging output
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

mongoose.connect(dbURI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: ({ req }) => ({ req, jwtSecret }) 
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(4000, () => console.log(`Server running at http://localhost:4000${server.graphqlPath}`));
}

startServer();
