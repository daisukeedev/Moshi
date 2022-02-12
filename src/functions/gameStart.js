const {
    gameMode,
    emoji
} = require('../config.json');
const {Collection} = require('discord.js');
const registerNumber = new Collection();

function gameStart (msg, channel) {
    const lastMessage = channel.lastMessage;

    switch (gameMode) {
        case 'cpu' : {
            if (registerNumber.has('cpu')) {
                const currentNumber = registerNumber.get('cpu');
                const userNumber = Number(msg.content);

                if (currentNumber === userNumber) {
                    lastMessage.react(emoji.correct);
                    registerNumber.set('cpu', currentNumber+2);
                    channel.send(`${currentNumber+1}`);
                } else {
                    lastMessage.react(emoji.incorrect);
                    registerNumber.delete('cpu');
                    channel.send(`${msg.author} you failed, the correct number was **${currentNumber}**`);
                };

            } else {
                const userNumber = Number(msg.content);
                if (userNumber !== 1) return;

                lastMessage.react(emoji.correct);
                registerNumber.set('cpu', 3);
                channel.send('2');
            };
        };
        break;
        case 'normal' : {
            if (registerNumber.has('normal')) {
                const currentNumber = registerNumber.get('normal');
                const userNumber = Number(msg.content);

                if (currentNumber.authorId === msg.author.id) {
                    lastMessage.react(emoji.incorrect);
                    registerNumber.delete('normal');
                    return channel.send(`${msg.author} you failed it was not your turn to count, the count ended in **${currentNumber.number-1}**`);
                };

                if (currentNumber.number === userNumber) {
                    lastMessage.react(emoji.correct);
                    registerNumber.set('normal', {
                        number: currentNumber.number+1,
                        authorId: lastMessage.author.id
                    });
                } else {
                    lastMessage.react(emoji.incorrect);
                    registerNumber.delete('normal');
                    channel.send(`${msg.author} you failed, the correct number was **${currentNumber}**`);
                };

            } else {
                const userNumber = Number(msg.content);
                if (userNumber !== 1) return;

                lastMessage.react(emoji.correct);
                registerNumber.set('normal', {
                    number: 2,
                    authorId: lastMessage.author.id
                });
            }
        };
        break;
        default : {
            console.log('ERROR: You did not correctly select a game mode. Available game modes: cpu, normal');
        };
    };
};

module.exports = gameStart;