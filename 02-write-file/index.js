const path = require('path');
const fs = require('fs');
const process = require('process');
const { stdin, stdout, exit } = process;


fs.open(
    path.join(__dirname, 'note.txt'), 
    'w', 
    function (err, file) {
    if (err) throw err;
    //console.log('Saved!');
    stdout.write('Ваши любимые книги:\n');
    stdin.on('data', data => {
        fs.appendFile(
            path.join(__dirname, 'note.txt'),
            `${data}`,
            err => {
                if (err) throw err;
            }
        );
        //выходим из процесса при вводе exit//
        if (data.toString().trim() === 'exit') {
            console.log('У Вас отличный вкус!');
            process.exit();
        }
        //слушаем событие Ctr + c//
        process.on('SIGINT', () => {
            console.log('\nУ Вас отличный вкус!');
            process.exit();
        })
    })
  });
