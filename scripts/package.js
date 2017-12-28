const AdmZip = require('adm-zip');

// Archive the extension folder into 'extension.zip'
const zip = new AdmZip();
zip.addLocalFolder('extension');
zip.writeZip('extension.zip');
