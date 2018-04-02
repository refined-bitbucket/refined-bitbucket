const fs = require('fs');
const del = require('del');
const archiver = require('archiver');

// Delete source maps
del.sync(['extension/*.js.map']);

// Archive the extension folder into 'extension.zip'
const output = fs.createWriteStream('extension.zip');
const archive = archiver('zip');

output.on('close', () => {
    const kbytes = Math.round(archive.pointer() / 1024 * 100) / 100;
    console.log(`'extension.zip' (${kbytes} KB) file generated.`);
});

archive.on('error', err => {
    throw err;
});

archive.pipe(output);
archive.directory('extension', false);
archive.finalize();
