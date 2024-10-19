const logger = require('../../../../libraries/logger/logger'); //-
const router = require('express').Router();
const polishService = require('../../service/polish-service'); //-
const {
    validateAllPolishesSearch,
    validateSearchByBrand,
    validateGetPolishById,
} = require('../middleware/polish-validator'); //-

/**
 * Handles the GET request to fetch all polishes.
 *
 * @param {import('express').Request} req - The request object containing query parameters.
 * @param {import('express').Response} res - The response object to send back to the client.
 * @returns {void}
 *
 * @throws Will throw an error if there is a problem fetching the polishes.
 *
 * @example
 * GET /polishes/all?page=1&limit=10
 *
 * @author Valeria Molina Recinos
 */
router.get('/all', validateAllPolishesSearch, async (req, res) => {
    logger.info('Fetching all polishes');
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const polishes = await polishService.getAllPolishes(page, limit);
        res.json(polishes);
    } catch (error) {
        logger.error(`Error fetching all polishes: ${error.message}`);
        res.status(500).send({ message: 'Error fetching all polishes' });
    }
});

/**
 * Handles the GET request to get a polish by its id
 */
router.get('/:polishId', validateGetPolishById, async (req, res) => {
    logger.info(`Fetching polish with id: ${req.params.polishId}`);
    try {
        const polishId = req.params.polishId;
        const polish = await polishService.findOnePolish(polishId);
        res.json(polish);
    } catch (error) {
        if (error.statusCode) {
            res.status(error.statusCode).send({ message: error.message });
        } else {
            // error not anticipated
            logger.error(error);
            logger.error(
                `Error fetching polish with id: ${req.params.polishId}`
            );
            res.status(500).send({ message: 'Error fetching polish' });
        }
    }
});

/**
 * Handles the GET request to fetch polishes by brand id
 * @param {import('express').Request} req - The request object containing query parameters.
 * @param {import('express').Response} res - The response object to send back to the client.
 * @returns {void}
 *
 * @throws Will throw an error if there is a problem fetching the polishes.
 *
 * @example GET /by-brand/123?page=1&limit=10
 *
 */
router.get('/by-brand/:brandId', validateSearchByBrand, async (req, res) => {
    try {
        logger.info(`Fetching polishes by brand id - ${req.params.brandId}`);
        const { page, limit } = req.query;
        const offset = (page - 1) * limit;
        const filterBy = { brand_id: req.params.brandId };
        const polishes = await polishService.search(filterBy, limit, offset);
        res.json(polishes);
    } catch (error) {
        if (error.statusCode) {
            res.status(error.statusCode).send({ message: error.message });
        } else {
            // error not anticipated
            logger.error(error);
            logger.error(
                `Error fetching polish with id: ${req.params.polishId}`
            );
            res.status(500).send({ message: 'Internal server error' });
        }
    }
});

module.exports = router;
