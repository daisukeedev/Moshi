const {channelId} = require('../config.json');
const gameStart = require('../functions/gameStart');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute (client, msg) {
        if (msg.author.bot && msg.author.id !== client.user.id) return;
        if (msg.channel.lastMessage && msg.channel.lastMessage.author.id === client.user.id) return;
        if (msg.channel.id !== channelId) return;
        if (isNaN(msg.content)) return;

        let channel;
        if (channelId){
            channel = client.channels.cache.get(channelId);
            if (!channel) return console.log('ERROR: The channel set to count does not exist or is invalid');
            if (!channel.permissionsFor(client.user.id).has('VIEW_CHANNEL')) return console.log('ERROR: The application does not have permission to view the set channel');
            if (!channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return console.log('ERROR: The application does not have permission to send messages to the established channel');
            if (!channel.permissionsFor(client.user.id).has('ADD_REACTIONS')) return console.log('ERROR: The application does not have permission to add reactions to the established channel');
        };

        gameStart(msg, channel);
    }
};