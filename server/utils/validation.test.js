const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-strng values', () => {
        var res = isRealString(10);
        expect(res).toBeFalsy();
    });

    it ('should reject string with only spaces', () => {
        var res = isRealString('     ');
        expect(res).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        var res = isRealString('  Vipul  ');
        expect(res).toBeTruthy();
    });
});
