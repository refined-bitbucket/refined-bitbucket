const del = require('del');
const AdmZip = require('adm-zip');

// Delete source maps
del.sync(['extension/*.js.map']);

// Archive the extension folder into 'extension.zip'
const zip = new AdmZip();
zip.addLocalFolder('extension');
zip.writeZip('extension.zip');
