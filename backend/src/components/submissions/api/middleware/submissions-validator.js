/**
 * @author Valeria Molina Recinos
 */

const { check, query, validationResult } = require('express-validator');
const brandService = require('../../../brands/service/brand-service');
const typeService = require('../../../polish/service/type-service');
const colorService = require('../../../polish/service/color-service');
const formulaService = require('../../../polish/service/formula-service');
const polishService = require('../../../polish/service/polish-service');
const status = require('../../../../libraries/constants/status');
const logger = require('../../../../libraries/logger/logger');

/**
 * Middleware function to validate the polish submission data.
 */
exports.validatePolishSubmission = [
    check('brandName', 'Brand name is required').not().isEmpty(),
    check('type', 'Type of polish is required').not().isEmpty(),
    check('primaryColor', 'Primary color is required').not().isEmpty(),
    check('effectColors').isArray(),
    check('formulas').isArray(),
    check('name').isString().not().isEmpty(),
    check('description').isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Middleware function to validate the brand submission data.
 */
exports.validateBrandSubmission = [
    check('brandName', 'Brand name is required').not().isEmpty().isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
/**
 * Middleware function to validate the dupe submission data.
 */
exports.validateDupeSubmission = [
    query('polishId', 'Polish ID is required').isNumeric().not().isEmpty(),
    query('dupeId', 'DupeID is required').isNumeric().not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Middleware function to format and validate polish submission data.
 *
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function in the stack
 * @returns {object} - The formatted submission data or an error response
 */
exports.formatPolishSubmission = async (req, res, next) => {
    const {
        brandName,
        type,
        primaryColor,
        effectColors,
        formulas,
        name,
        description,
    } = req.body;
    const submission = {};
    // validate that brand exists
    const brandExists = await brandService.findBrandNameInTable(brandName);
    if (!brandExists) {
        logger.errors(`Brand ${brandName} does not exist in database`);
        return res.status(400).json({
            error: `Brand ${brandName} does not exist in database`,
        });
    }
    submission.brand_id = brandExists.brand_id;
    // get type id
    const typeId = await typeService.findTypeByName(type);
    if (!typeId) {
        logger.error(`Type ${type} does not exist in database`);
        return res.status(400).json({
            error: `Type ${type} does not exist in database`,
        });
    }
    submission.type_id = typeId.type_id;
    // get the primary color id
    const pColor = await colorService.findColorByName(primaryColor);
    if (!pColor) {
        logger.error(
            `Primary color ${primaryColor} does not exist in database`
        );
        return res.status(400).json({
            error: `Primary color ${primaryColor} does not exist in database`,
        });
    }
    submission.primary_color_id = pColor.color_id;
    // get the effect color ids
    const effectColorIds = await Promise.all(
        effectColors.map((color) => colorService.findColorByName(color))
    ).catch((err) => {
        logger.error(err);
        return res.status(400).json({
            error: err,
        });
    });
    submission.effect_color_ids = effectColorIds.map((color) => color.color_id);
    // get the formula ids
    const formulaIds = await Promise.all(
        formulas.map((formula) => formulaService.findFormulaByName(formula))
    ).catch((err) => {
        logger.error(err);
        return res.status(400).json({ error: err });
    });
    submission.formula_ids = formulaIds.map((formula) => formula.formula_id);
    // check if there is already a polish with the brand and name specified
    const existingPolish = await polishService.polishExists(
        name,
        brandExists.brand_id
    );
    if (existingPolish) {
        logger.error(`${name} by ${brandName} is already in the database`);
    }
    submission.name = name;
    submission.description = description;
    req.body.submission = submission;
    next();
};

exports.validateUpdateQuery = [
    query('id', 'Missing id').exists().isInt(),
    query('status', 'Status is required')
        .exists()
        .isString()
        .custom((value) =>
            [status.PENDING, status.APPROVED, status.REJECTED].includes(value)
        )
        .withMessage(
            `Status must be: ${status.PENDING}, ${status.APPROVED}, ${status.REJECTED}`
        ),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];