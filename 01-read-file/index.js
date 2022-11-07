const path = require('path');
const fs = require('fs');

fs.readFile(
    path.join(__dirname, 'text.txt'),
    'utf-8',
    (err, data) => {
        if (err) throw err;
        console.log(data);
    }
);


/////////////////////// ВСЕ, ЧТО НИЖЕ, ЭТО Я УЧИЛА НОДУ, НЕ ОБРАЩАЙТЕ ВНИМАНИЯ ///////////////////////







// const path = require('path');
// const fs = require('fs');
// const os = require('os');


// process.stdout



// const { stdout } = process;
// stdout.write('Node.js');

// const { stdin, stdout } = process;
// stdin.on('data', data => stdout.write(data));


// stdout.write('Как тебя зовут?\n');
// stdin.on('data', data => {
//     stdout.write(`приветствую тебя, ${data}`);
//     process.exit();
// });
// process.on('exit', () => stdout.write('Удачи!'));

// stdout.write('');
// stdin.on('data', data => {
//     stdout.write(data.toString().split('').reverse().join(''));
//     process.exit();
// });

// const flagIndex = process.argv.indexOf('-m');
// if (flagIndex !== -1) {
//   const message = process.argv[flagIndex + 1];
//   console.log(message);
// }






// const { stdout, stdin, exit } = process;
// const flag = process.argv[2];
// const allowedFlags = ['-m', '-s'];
// if (!allowedFlags.includes(flag)) {
//     stdout.write('Попробуйте ещё раз запустить файл с флагом -s или -m');
//     exit();
// }
// stdout.write('Введите, пожалуйста, два числа\n');
// stdin.on('data', data => {
//     const numStringsArray = data.toString().split(' ');
//     const hasIncorrectLength = numStringsArray.length !== 2;
//     const hasIncorrectValues = numStringsArray.some(numStr => Number.isNaN(+numStr));
//     console.log(hasIncorrectValues)
//     if (hasIncorrectLength || hasIncorrectValues) {
//         stdout.write('Нужно ввести 2 числа, разделенных пробелом');
//         exit();
//     }
//     const [firstNum, secondNum] = numStringsArray.map(numStr => +numStr);
//     if (flag === '-s') {
//         const sum = firstNum + secondNum;
//         stdout.write(`${firstNum} + ${secondNum} = ${sum}`);
//     } else {
//         const mult = firstNum * secondNum;
//         stdout.write(`${firstNum} * ${secondNum} = ${mult}`);
//     }
//     exit();
// });

// console.log(__dirname);
// console.log(__filename);


