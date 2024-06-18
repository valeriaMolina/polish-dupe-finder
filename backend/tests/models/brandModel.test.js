const sinon = require('sinon');
const Sequelize = require('sequelize');
const db = require('../../src/config/database');
const Brand = require('../../src/models/brandModel');

describe('Brand Model', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should have correct model name', () => {
        expect(Brand.name).toEqual('brands');
    });

    it('should have correct fields', () => {
        const brand = Brand.build();
        expect(brand).toHaveProperty('brand_id');
        expect(brand).toHaveProperty('name');
    });

    it('should have correct validation', () => {
        const brand = Brand.build({ name: '' });
        brand.validate().then((msg) => {
            expect(msg).toBeDefined();
        });
    });
});
