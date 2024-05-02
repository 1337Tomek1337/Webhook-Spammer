const { WebhookClient } = require('discord.js');
const chalk = require('chalk');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const terminal = process.stdout.columns;

const webhookText = ' _ _ _     _   _           _      _____                             \n| | | |___| |_| |_ ___ ___| |_   |   __|___ ___ _____ _____ ___ ___ \n| | | | -_| . |   | . | . | \'_|  |__   | . | .\'|     |     | -_|  _|\n|_____|___|___|_|_|___|___|_,_|  |_____|  _|__,|_|_|_|_|_|_|___|_|  \n                                       |_|                          ';

const lines = webhookText.split('\n');

lines.forEach(line => {
    log(centerText(line, terminal));
});

space();
log(centerText('Made in Poland', terminal));
log(centerText('._.tomus._.', terminal));
space();

rl.question(text(centerText('Enter Webhook URL >> ', terminal)), async (webhook) => {
    let hook;

    try {
        hook = new WebhookClient({
            url: webhook,
        });
    } catch (err) {
        space();
        log(centerText('Invalid Webhook URL!', terminal));
        process.exit();
        return;
    }

    space();

    rl.question(text(centerText('Enter message that you want to spam with >> ', terminal)), async (message) => {
        msg = message;

        if (!message) {
            space();
            log(centerText('It can\'t be empty!', terminal));
            process.exit();
            return;
        }

        space();

        rl.question(text(centerText('Enter how many messages you want to send (leave if you want to spam unlimited times) >> ', terminal)), async (number) => {
            if (number) {
                if (isNaN(number)) {
                    space();
                    log(centerText('It must be a number!', terminal));
                    process.exit();
                    return;
                }

                space();
                log(centerText(`Started Spamming Webhook ${number} times...`, terminal));
                space();

                for (let i = 0; i < number; i++) {
                    try {
                        await hook.send({
                            content: message,
                            username: 'Webhook Spammer',
                            avatarURL: 'https://cdn.discordapp.com/attachments/1198618155862478990/1235294843203485716/360_F_556291020_q2ieMiOCKYbtoLITrnt7qcSL1LJYyWrU.png?ex=6633d979&is=663287f9&hm=6cf9bbbe18a880687dad19aa6755d850f1ab34548383205dcd3730f5f977db27&',
                        });

                        log(centerText(`[${getCurrentTime()}] (${i + 1} / ${number}) Sent "${message}"`, terminal));
                    } catch (err) {
                        log(centerText(`Some error occured: ${err}`, terminal));
                    }
                }
                
                space();
                log(centerText(`Successfully Spammed Webhook ${number} times with "${message}".`, terminal));
                process.exit();
            } else {
                space();
                log(centerText(`Started Spamming Webhook ∞ times...`, terminal));
                space();

                for (let i = 0; 0 < 1; i++) {
                    try {
                        await hook.send({
                            content: message,
                            username: 'Webhook Spammer',
                            avatarURL: 'https://cdn.discordapp.com/attachments/1198618155862478990/1235294843203485716/360_F_556291020_q2ieMiOCKYbtoLITrnt7qcSL1LJYyWrU.png?ex=6633d979&is=663287f9&hm=6cf9bbbe18a880687dad19aa6755d850f1ab34548383205dcd3730f5f977db27&',
                        });

                        log(centerText(`[${getCurrentTime()}] (${i + 1}) Sent "${message}"`, terminal));
                    } catch (err) {
                        log(centerText(`Some error occured: ${err}`, terminal));
                    }
                }
            }
        });
    });
});

// some functions

function centerText(text, terminalWidth) {
    const padding = (terminalWidth - text.length) / 2;
    return ' '.repeat(padding) + text;
}

function getCurrentTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

function log(text) {
    console.log(chalk.bold.hex(0x7C0092)(text));
}

function text(text) {
    return chalk.bold.hex(0x7C0092)(text);
}

function space() {
    console.log('');
}
