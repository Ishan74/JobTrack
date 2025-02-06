const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Job {
        _id: ID
        company: String
        position: String
        status: String
        date: String
    }

    type Auth {
        token: String
        user: User
    }

    type Query {
        getJobs: [Job]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addJob(company: String!, position: String!, status: String): Job
    }
`;

module.exports = typeDefs;
