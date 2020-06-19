const Job = require("../models/jobs");

exports.createJob = async (req, res) => {
    const { title, description, price, workerId } = req.body;
    const job = new Job({ title, description, price, workerId });

    await job.save();

    res.status(200).json({
        message: "Job successfully registered!",
    });
};
