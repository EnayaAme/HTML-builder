const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

///////////////////////////////////////////////////////////////////////////////////////////


// Удаляем старую project-dist //
const deleteDist = async () => {
    await fsPromises.rm(path.resolve(__dirname, "project-dist"), { recursive: true, force: true });
}

// Создаём пустую папку project-dist //
let createDist = async () => {
    fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) throw err;
    });
}

// Создаем и копируем папку assets в project-dist //
let createAssets = async (from = path.join(__dirname, 'assets'), to = path.join(__dirname, 'project-dist', 'assets')) => {
    await fsPromises.mkdir(to, { recursive: true }, (err) => {
        if (err) throw err;
    });

    let assets = await fsPromises.readdir(from, {withFileTypes: true}, (err, assets) => {
        if (err) throw err;
    });
    //console.log(assets);

    for (let i = 0; i < assets.length; i++) {
        let asset = assets[i];
        let newFrom = path.join(from, asset.name);
        let newTo = path.join(to, asset.name);
        if (asset.isDirectory()) {
            //делаем рекурсию//
            await createAssets(newFrom, newTo);
        } else {
            await fsPromises.copyFile(newFrom, newTo);
        }
    }
}

// собираем стили //
let bundleStyles = async () => {
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
                                // забрасываем их содержимое в style.css //
                                fs.appendFile(
                                    path.join(__dirname, 'project-dist', 'style.css'),
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
}

// собираем html //
let bundleHTML = async () => {
    //начальный текст//
    let content = await fsPromises.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, data) => {
        if (err) console.log(err)
    });
    //console.log(content);

    let components = await fsPromises.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, files) => {
        if (err) console.log(err)
    });
    //console.log(components);

    for (let i = 0; i<components.length; i++) {
        let component = components[i];
        if(component.isFile()) {
            if (path.extname(component.name) === ".html") {
                let componentText = await fsPromises.readFile(path.join(__dirname, 'components', component.name), 'utf8', (err, data) => {
                    if (err) console.log(err)
                });
                let name = component.name.split('.')[0];
                content = content.replace(`{{${name}}}`, componentText);
            }
        }
    }

    //console.log(content)
    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), content, 'utf8', (err) => {
        if (err) console.log(err);
    });
}



                              
const mainFunction = async () => {
    await deleteDist();
    await createDist();
    await bundleStyles();
    await bundleHTML();
    await createAssets();

    return true;
};
mainFunction()  