const client = require('discord-rich-presence')('770788926058397726');

client.updatePresence({
    state: 'Playing Trivia!',
    startTimestamp: Date.now(),
    largeImageKey: 'brain',
    largeImageText: 'Playing Trivia!',
    instance: true,
});