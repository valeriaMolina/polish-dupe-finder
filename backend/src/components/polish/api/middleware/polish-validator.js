/**
 * @author Valeria Molina Recinos
 */

const { query, validationResult, param } = require('express-validator');

/**
 * Validates the request to search all polishes
 */
exports.validateAllPolishesSearch = [
    query('page', 'Page number is required').isNumeric().not().isEmpty(),
    query('limit', 'Limit is required').isNumeric().not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates the request to search polishes by brand id
 */
exports.validateSearchByBrand = [
    param('brandId', 'Brand id is required').isNumeric().not().isEmpty(),
    query('page', 'Page number is required').isNumeric().not().isEmpty(),
    query('limit', 'Limit is required').isNumeric().not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validates the request to get one polish by its id
 */
exports.validateGetPolishById = [
    param('polishId', 'Polish id is required').isNumeric().not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
