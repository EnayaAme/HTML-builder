const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if (err) throw err;
    console.log('New folder created successfully!');
});
fs.readdir (
    path.resolve(__dirname, 'files'),
    {withFileTypes: true},
    (err, files) => {
        if (err) {console.log(err);}
        else {
            files.forEach(file => {
                if(file.isFile()) {
                    fs.copyFile( 
                        path.join(__dirname, 'files', file.name), 
                        path.join(__dirname, 'files-copy', file.name), 
                        (err) => {
                            if (err) console.log("Error Found:", err);
                            console.log(`${file.name} copy created!`)  
                        })
                }
              })
        }
    }
)