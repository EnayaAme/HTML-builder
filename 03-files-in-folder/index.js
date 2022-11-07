const path = require('path');
const fs = require('fs');

fs.readdir (
    path.resolve(__dirname, 'secret-folder'),
    {withFileTypes: true},
    (err, files) => {
        if (err) {console.log(err);}
        else {
            files.forEach(file => {
                if(file.isFile()) {
                    let fileName = path.basename(file.name).split('.')[0];
                    let extention = path.extname(file.name).slice(1);
                    let size;
                        fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (error, stats) => {
                           //console.log(stats.size);
                           size = stats.size
                           console.log(`${fileName} - ${extention} - ${size}b`);
                        })
                    //console.log(`${fileName} - ${extention} - ${size}`);
                }
              })
        }
    }
)

//<имя файла>-<расширение файла>-<вес файла>. 
//Пример: example - txt - 128.369kb