/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const router = express.Router();
const logger = require('../../../../libraries/logger/logger');
const dupeSubmissionService = require('../../service/dupe-submission-service');

router.get('/dupes', async (_, res) => {
    try {
        logger.info('Received request to display dupe submissions');
        const submissions = await dupeSubmissionService.getAllDupeSubmissions();
        return res.json(submissions);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).send({ error: error.message });
        } else {
            // error was not anticipated
            logger.error(`Error not anticipated: ${error.message}`);
            return res.status(500).send({ error: error.message });
        }
    }
});

module.exports = router;
