const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: String,
    position: String,
    status: { type: String, enum: ['Applied', 'Interview', 'Rejected', 'Offered'], default: 'Applied' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
