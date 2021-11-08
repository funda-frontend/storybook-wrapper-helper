const path = require('path');
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'StorybookWrapper',
            fileName: (format) => `storybook-wrapper.${format}.js`,
        },
    },
});
