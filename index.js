const { Console } = require('console');
const fs = require('fs');
const xlsx = require('node-xlsx');
var argv = require('minimist')(process.argv.slice(2));

const file = argv.file || argv.f;

if (!file) return console.error('You need to specify a file with the -f option');

const workSheetFromFile = xlsx.parse(`${file}`)[0];
const transactions = workSheetFromFile.data.slice(8);

const homeBankTransactions = transactions.map(transaction => {
    const date = transaction[1];
    const payment = 0;
    const info = transaction[4];
    const payee = '';
    const memo = transaction[5];
    const amount = transaction[6];
    const category = '';
    const tags = '';

    return `${date};${payment};${info};${payee};${memo};${amount};${category};${tags}`;
});

const writeStream = fs.createWriteStream(`${file}.csv`);
writeStream.write(`${homeBankTransactions.join('\n')}`);

console.log(`CSV sparad: ${file}.csv`);