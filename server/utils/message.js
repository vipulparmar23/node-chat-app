var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

var generateLocationMessage = (from, longitude, latitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${longitude},${latitude}`,
        createdAt: new Date().getTime()
    }
}

module.exports = { generateMessage, generateLocationMessage };