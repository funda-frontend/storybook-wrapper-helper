const path = require('path');
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib/example-package.js'),
            name: 'ExamplePackage',
            fileName: (format) => `example-package.${format}.js`,
        }
    },
});
