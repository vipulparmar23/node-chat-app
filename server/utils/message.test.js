var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Vipul';
        var text = 'How are ya?';
        var res = generateMessage(from, text);

        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({ from, text });
        // expect(res.from).toBe(from);
        // expect(res.text).toBe(text);
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var from = 'Vipul';
        var latitude = 10;
        var longitude = 15;

        var res = generateLocationMessage(from, latitude, longitude);
        var url = 'https://www.google.com/maps?q=10,15';

        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({ from, url });;
    });
});