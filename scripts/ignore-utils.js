// https://diessi.ca/blog/how-to-exclude-css-images-anything-from-unit-tests/

import requireHacker from 'require-hacker';

requireHacker.hook('css', () => 'module.exports = ""');
