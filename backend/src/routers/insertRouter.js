/**
 * @author Valeria Molina Recinos
 */

const logger = require('../config/logger');
const router = require('express').Router();
const brandService = require('../services/brandService');
const polishService = require('../services/polishService');
const userSubmissionService = require('../services/userSubmissionService');
const userService = require('../services/userService');

// define the route to insert a new polish
router.post('/api/uploadPolish', async (req, res) => {
    logger.info('Received request to upload a new polish');
    const {
        brandName,
        type,
        primaryColor,
        effectColors,
        formulas,
        name,
        description,
    } = req.body;

    // Check if required fields are provided
    if (
        !brandName ||
        !type ||
        !primaryColor ||
        !effectColors ||
        !formulas ||
        !name ||
        !description
    ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // check for the brand name
    const brand = await brandService.findBrandNameInTable(brandName);
    if (!brand) {
        // if the brand is not found, we return an error
        return res
            .status(400)
            .json({ error: `Brand ${name} is not in database` });
    }

    // insert into polish database withbthe following attributes
    const attributes = {
        brand_id: brand.brand_id,
        type_id: type,
        primary_color: primaryColor,
        effect_colors: effectColors,
        formula_ids: formulas,
        name: name,
        description: description,
    };

    // INSERT new polish into database
    logger.info(`Adding new polish ${name}`);
    const newPolish = await polishService.insertNewPolish(attributes);
    logger.info(
        `Added new polish ${name} with auto-generated ID: ${newPolish.polish_id}`
    );
    res.status(201).json({ newPolish });
});

// Define the route to insert a new brand
router.post('/api/brand', async (req, res) => {
    logger.info(`Received request to add new brand`);
    const { name } = req.body;

    // Check if the required field is provided
    if (!name) {
        return res.status(400).json({ error: 'Missing required field: name' });
    }

    // Check if brand is already in the database
    const brandQuery = await brandService.findBrandNameInTable(name);
    if (brandQuery) {
        logger.error(`Brand ${name} already exists`);
        return res
            .status(400)
            .json({ error: `${name} is already in the database` });
    }

    // otherwise insert new brand into db
    const newBrand = await brandService.insertNewBrand(name);
    logger.info(
        `Added new brand ${name} with auto-generated ID: ${newBrand.brand_id}`
    );
    res.status(201).json({ brand: `${name}`, id: newBrand.brand_id });
});

router.post('/api/linkDupe', async (req, res) => {
    logger.info('Received request to upload new polish dupe');
    // insert submission into user_submissions table
    const { polishId, dupeId } = req.query;
    const { username } = req.body;
    // get the user's id based on the username
    const userId = await userService.getUserId(username);
    if (!userId) {
        return res.status(400).json({ error: 'User not found' });
    }
    // first check if this submission already exists
    const findSubmission = await userSubmissionService.findUserSubmission(
        userId,
        polishId,
        dupeId
    );
    if (findSubmission) {
        logger.error(
            `User ${username} has ALREADY submitted dupe ${dupeId} for polish ${polishId}`
        );
        return res.status(400).json({
            error: 'Duplicate submission. Please wait for admin approval',
        });
    }
    const submission = {
        user_id: userId,
        polish_id: polishId,
        similar_to_polish_id: dupeId,
    };
    const newSubmission =
        await userSubmissionService.insertNewUserSubmission(submission);
    res.status(201).json({ submission: newSubmission });
});

module.exports = router;
