const { WebhookClient } = require('discord.js');
const chalk = require('chalk');
const readline = require('readline');
const { url } = require('inspector');

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

rl.question(text(centerText('Enter Webhook URL >> ', terminal)), (webhook) => {
    try {
        const hook = new WebhookClient({
            url: webhook,
        });
    } catch (err) {
        space();
        log(centerText('Invalid Webhook URL!', terminal));
        process.exit();
        return;
    }

    console.log('Works Perfect');
});

// some functions

function centerText(text, terminalWidth) {
    const padding = (terminalWidth - text.length) / 2;
    return ' '.repeat(padding) + text;
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
