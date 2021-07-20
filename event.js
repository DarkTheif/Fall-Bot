const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    async performEvents(client) {
        const eventFiles = (await fs.promises.readdir('./handlers/events', {
            encoding: "utf-8"t
        })).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`./handlers/events/${file}`);
            
            try {
                client.on(event.type, (args) => {
                    event.run(client, args);
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
}
