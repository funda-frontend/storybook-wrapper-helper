const path = require('path');
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'StorybookWrapper',
            fileName: (format) => `storybook-wrapper.${format}.js`,
        }
    },
});
