/**
 * @author Valeria Molina Recinos
 */

const typeModel = require('../db/types');

async function findTypeByName(name) {
    // get the id of the type
    const type = await typeModel.findOne({ where: { name: name } });
    return type;
}

module.exports = {
    findTypeByName,
};