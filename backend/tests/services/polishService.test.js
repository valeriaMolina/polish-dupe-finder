const sinon = require('sinon');
const polishModel = require('../../src/models/polishModel');
const polishService = require('../../src/services/polishService');

describe('polishService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should find polish by id', async () => {
        const mockPolish = { polish_id: 1 };
        sinon.stub(polishModel, 'findOne').returns(Promise.resolve(mockPolish));

        const polish = await polishService.findPolishById(1);
        expect(polish).toEqual(mockPolish);
    });

    it('should return null if polish is not found', async () => {
        sinon.stub(polishModel, 'findOne').returns(Promise.resolve(null));

        const polish = await polishService.findPolishById(1);
        expect(polish).toBeNull();
    });

    it('should add dupe polish id', async () => {
        const mockPolish = { polish_id: 1, dupes: [] };
        const dupePolish = { polish_id: 2 };
        sinon.stub(polishModel, 'findOne').callsFake((query) => {
            if (query.where.polish_id === 1) return Promise.resolve(mockPolish);
            if (query.where.polish_id === 2) return Promise.resolve(dupePolish);
            return Promise.resolve(null);
        });
        sinon.stub(polishModel, 'update').returns(Promise.resolve([1]));

        const updatedPolish = await polishService.addDupePolishId(1, 2);
        expect(updatedPolish).toEqual([1]);
    });
});