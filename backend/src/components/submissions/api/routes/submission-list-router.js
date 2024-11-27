/**
 * @author Valeria Molina Recinos
 */

const express = require('express');
const router = express.Router();
const logger = require('../../../../libraries/logger/logger');
const dupeSubmissionService = require('../../service/dupe-submission-service');

/**
 * @swagger
 * /dupes:
 *   get:
 *     summary: Get all dupe submissions
 *     description: Fetches all dupe submissions from the database.
 *     responses:
 *       200:
 *         description: A JSON array of all dupe submissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   submissionId:
 *                     type: integer
 *                     description: The ID of the submission.
 *                   polish:
 *                     type: string
 *                     description: The name of the polish.
 *                   dupe:
 *                     type: string
 *                     description: The name of the dupe.
 *                   user:
 *                     type: string
 *                     description: The name of the user who submitted the dupe.
 *                   status:
 *                     type: string
 *                     description: The status of the submission.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the submission was created.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
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
