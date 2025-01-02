/**
 * @author Valeria Molina Recinos
 */
// external dependencies
const polishSubmissionsModel = require('../db/polish-submissions');

async function insertNewPolishSubmission(attributes) {
    // assuming it's not in db already
    const newSubmission = await polishSubmissionsModel.create(attributes);
    return newSubmission;
}

async function addImageUrlToPolishSubmissions(submissionId, imageUrl) {
    const submission = await findSubmissionById(submissionId);
    submission.image_url = imageUrl;
    await submission.save();
    return submission;
}

async function submissionExists(brandId, name) {
    const submissionExists = await polishSubmissionsModel.findOne({
        where: {
            brand_id: brandId,
            name: name,
        },
    });
    return submissionExists;
}

async function findSubmissionById(submissionId) {
    const submission = await polishSubmissionsModel.findOne({
        where: {
            submission_id: submissionId,
        },
    });
    return submission;
}

async function updatePolishSubmissionStatus(polishSubmission, status) {
    polishSubmission.status = status;
    await polishSubmission.save();
    return polishSubmission;
}

module.exports = {
    insertNewPolishSubmission,
    submissionExists,
    findSubmissionById,
    updatePolishSubmissionStatus,
    addImageUrlToPolishSubmissions,
};
