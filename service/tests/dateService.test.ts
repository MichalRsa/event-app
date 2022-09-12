import dateService from '../dateService';

describe('dateService tests', () => {
  describe('isPastDate tests', () => {
    describe('Is past date', () => {
      it('Should return true', async () => {
        await expect(dateService.isPastDate('2012-12-12')).toBe(true);
      });
    });
    describe('Is future date', () => {
      it('Should return true', async () => {
        await expect(dateService.isPastDate('2032-12-12')).toBe(false);
      });
    });
  });
});
