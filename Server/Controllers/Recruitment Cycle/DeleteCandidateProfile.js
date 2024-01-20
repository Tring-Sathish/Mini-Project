const express = require('express');
const Candidate = require('../../Models/Candidate');

const DeleteCandidateProfile = async (req, res, next) => {

    const { id } = req.body;

    try {
        const candidate = await Candidate.findByIdAndDelete({ _id: id });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        await Candidate.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};




module.exports = DeleteCandidateProfile;