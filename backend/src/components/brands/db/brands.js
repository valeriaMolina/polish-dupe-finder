/**
 * @author Valeria Molina Recinos
 */

const Sequelize = require('sequelize');
const db = require('../../../libraries/db/database');
const brands = db.define(
    'brands',
    {
        brand_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        logo_url: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        website: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = brands;
