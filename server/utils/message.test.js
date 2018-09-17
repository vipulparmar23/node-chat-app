var expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Vipul';
        var text = 'How are ya?';
        var res = generateMessage(from, text);

        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({ from, text});
        // expect(res.from).toBe(from);
        // expect(res.text).toBe(text);
    });
});