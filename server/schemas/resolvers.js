const User = require('../models/User');
const Job = require('../models/Job');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const resolvers = {
    Query: {
        getJobs: async (_, __, context) => {
            if (!context.user) {
              console.warn("⚠️ User not authenticated, returning empty job list.");
              return []; // Return an empty array instead of throwing an error
            }
            return await Job.find({ userId: context.user._id });
          },
    },
    Mutation: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token, user };
        },
        addUser: async (_, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token, user };
        },
        addJob: async (_, { company, position, status }, context) => {
            if (!context.user) {
              throw new Error("User not authenticated");
            }
            return await Job.create({ userId: context.user._id, company, position, status });
        },
    },
};

module.exports = resolvers;
