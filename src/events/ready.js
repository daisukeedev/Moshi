const {
    gameMode
} = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute (client) {
        console.log(`I'm ready and seeing numbers. Game mode: ${gameMode}`);
    }
};