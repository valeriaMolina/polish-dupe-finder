/**
 * @author Valeria Molina Recinos
 */

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../../libraries/db/database');
const user = require('../../users/db/users');
const role = require('./roles');

const userRoles = db.define(
    'user_roles',
    {
        user_role_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: user,
                key: 'user_id',
            },
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: role,
                key: 'role_id',
            },
        },
    },
    {
        timestamps: false,
    }
);

module.exports = userRoles;