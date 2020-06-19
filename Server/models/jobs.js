const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
    title: {
        type: String,
        required: "Title is a required field!",
    },
    description: {
        type: String,
        required: "Description is a required field!",
    },
    price: {
        type: Number,
        required: "Price is a required field!",
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Specific user must be assigned to the job",
    },
    transactionId: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'done', 'expired'],
        default: 'pending'
    }
});


module.exports = JobSchema;