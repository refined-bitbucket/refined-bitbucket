import test from 'ava';
import { h } from 'dom-chef';

import * as sourceHandler from './source-handler';

import '../vendor/prism.js';
import '../../test/setup-jsdom';

test('Adds a language-xxxx class to the element that has a data-filename attr', t => {
    const element = <div data-filename="z/path/to/file/the-file.java" />;
    const languageClass = sourceHandler.getClassBasedOnExtension(element);
    t.is(
        languageClass,
        'language-java',
        'proper language-xxxx class added to the element'
    );
});
