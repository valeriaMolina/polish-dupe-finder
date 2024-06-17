/**
 * @author  Valeria Molina Recinos
 */

const express = require('express');
const router = express.Router();
const userSubmissionService = require('../services/userSubmissionService');
const polishService = require('../services/polishService');
const logger = require('../config/logger');

router.put('/api/approveDupe', async (req, res) => {
    // after human review, approve the user submission
    const { submissionId } = req.query;
    logger.info(
        `Received request to approve dupe submission id: ${submissionId}`
    );
    // find the user submission in table, if it doesn't exist
    // then return an error message
    const findSubmission =
        await userSubmissionService.findUserSubmissionById(submissionId);
    if (!findSubmission) {
        logger.error(`Submission not found for id: ${submissionId}`);
        return res.status(400).json({ error: 'Submission not found' });
    } else {
        logger.info(`Approving submission id: ${submissionId}`);
        const polishId = findSubmission.polish_id;
        const dupeId = findSubmission.similar_to_polish_id;
        // add the dupe to the submitted polishes array
        const linkDupeMain = await polishService.addDupePolishId(
            polishId,
            dupeId
        );
        const linkDupeSecondary = await polishService.addDupePolishId(
            dupeId,
            polishId
        );
        // update user submission to be approved
        const approveUserSubmission =
            await userSubmissionService.approveUserSubmission(submissionId);
        res.status(200).json(
            approveUserSubmission,
            linkDupeMain,
            linkDupeSecondary
        );
    }
});

module.exports = router;
