const {Client} = require('discord.js');
const {readdirSync} = require('fs');
const {token} = require('../config.json');

class client extends Client{
    constructor(){
        super({intents: 513});
        readdirSync('./src/events')
        .map(elem => {
            const eventObtained = require(`../events/${elem}`);
            if (eventObtained.once) {
                this.once(eventObtained.name, (...args) => eventObtained.execute(this, ...args));
            } else {
                this.on(eventObtained.name, (...args) => eventObtained.execute(this, ...args));
            }
        });
        this.login(token);
    }
}

module.exports = client;