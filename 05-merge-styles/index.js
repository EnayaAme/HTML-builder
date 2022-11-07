const fs = require('fs');
const path = require('path');

// создаем пустой bundle.css //
fs.open(
    path.join(__dirname, 'project-dist', 'bundle.css'), 
    'w', 
    function (err, file) {
        if (err) {
            return console.error(err);
         }
         console.log("bundle.css created!!");  
    }
)

// отбираем нужные нам файлы для сборки //
fs.readdir (
    path.join(__dirname, 'styles'),
    {withFileTypes: true},
    (err, files) => {
        if (err) {console.log(err);}
        else {
            files.forEach(file => {
                if(file.isFile()) {
                    if (path.extname(file.name) == ".css") {
                        // читаем их содержимое //
                        fs.readFile(
                            path.join(__dirname, 'styles', file.name),
                            'utf-8',
                            (err, data) => {
                                if (err) throw err;
                                // забрасываем их содержимое в bundle.css //
                                fs.appendFile(
                                    path.join(__dirname, 'project-dist', 'bundle.css'),
                                    `${data}`,
                                    err => {
                                        if (err) throw err;
                                    }
                                );
                            }
                        );
                    }
                }
              })
        }
    }
)