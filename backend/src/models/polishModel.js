/**
 * @author Valeria Molina Recinos
 */

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const brand = require('./brandModel');
const color = require('./colorModel');
const formula = require('./formulaModel');
const type = require('./typeModel');

const polishes = db.define(
    'polishes',
    {
        polish_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        effect_colors: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        formula_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

// create associations with foreign keys
polishes.belongsTo(brand, { foreignKey: 'brand_id' });
polishes.belongsTo(type, { foreignKey: 'type_id' });
polishes.belongsTo(type, { foreignKey: 'primary_color' });

module.exports = polishes;
