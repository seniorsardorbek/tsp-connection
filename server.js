/** @format */

const net = require('net');
const sendMessage = require('./telegraf');
const { Telegraf } = require('telegraf');
const bot = new Telegraf('5689440902:AAEGRJsfpmmvmvokyYBRBWBhzRaYJ3UaPhE');
bot.start((ctx) => {
    ctx.reply('Welcome TCP connection');
});
const targetChatId = '1424297977';
const server = net.createServer((socket) => {
    const clientIpAddress = socket.remoteAddress;

    sendMessage(targetChatId, 'TCP client connected', bot.token);
    socket.write('Hey, Bro You connected to TCP server');
    socket.on('close', () => {
        sendMessage(targetChatId, 'TCP client disconnected', bot.token);
    });
    socket.on('data', (data) => {
        sendMessage(targetChatId, `message:${data.toString()} ip:${clientIpAddress}`, bot.token);
    });
    bot.on('text', (ctx) => {
        const textFromUser = ctx.message.text;
        server.getConnections((err, count) => {
            if (count > 0) {
                socket.write(`${textFromUser}`);
            } else {
                ctx.reply('No active TCP connections');
            }
        });
    });
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
server.listen(8000);
