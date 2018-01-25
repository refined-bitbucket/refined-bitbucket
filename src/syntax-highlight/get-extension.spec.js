import test from 'ava';
import { getExtension } from './source-handler';

test('get extension', t => {
    t.is('.java', getExtension('/path/to/whatever/file.java'));
    t.is('.go', getExtension('/path/to/whatever/file.go'));
    t.is('.html', getExtension('/path/to/whatever/file.html'));
});
