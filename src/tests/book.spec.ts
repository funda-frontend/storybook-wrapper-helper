import { withDesign } from 'storybook-addon-designs';
import { book } from '../lib';

const ExampleObject = { example: 'object' };

describe('book', () => {
    const defaultBookProps = { component: { ExampleObject } };

    const setup = (args = {}) =>
        book({
            ...defaultBookProps,
            ...args,
        });

    it('should transform component input', () => {
        const result = setup();
        expect(result.component).toEqual(ExampleObject);
        expect(result.componentName).toEqual('ExampleObject');
    });

    it('should generate proper decorators', () => {
        const decoratorString = '<div><story/></div>';

        const bookSettings = setup({
            decorators: [decoratorString],
        });

        expect((bookSettings.decorators as any)[0]()).toEqual({
            template: decoratorString,
        });
    });

    it('should bind events', () => {
        const events = ['close'];
        const result = setup({ events });

        expect(result.argTypes).toEqual({ close: { action: 'close' } });
        expect(result.events).toEqual(events);
    });

    it('should add a description', () => {
        const description = 'hello world';
        const result = setup({ description });

        expect(result.parameters?.docs?.description?.component).toEqual(
            description
        );
    });

    it('should add links when a description is not present', () => {
        const url = 'https://example.com';
        const result = setup({
            links: [{ name: 'link', value: url }],
        });

        expect(result.parameters?.docs?.description?.component).toContain(
            `<a href=\"${url}\"`
        );
    });

    it('should allow defaultArgs to pass through', () => {
        const defaultArgs = { key: 'value' };
        const result = setup({ defaultArgs });

        expect(result.defaultArgs).toEqual(defaultArgs);
    });

    describe('when using design decorator', () => {
        const design = { type: 'figma', url: 'https://example.com' };

        it('should add the withDesign decorator when given a design object', () => {
            const result = setup({
                parameters: { design },
            });

            expect(result.decorators?.length).toEqual(1);
            expect((result.decorators as Array<any>)[0]).toEqual(withDesign);
        });

        it('should add the withDesign decorator when given a design array', () => {
            const result = setup({
                parameters: {
                    design: [design],
                },
            });

            expect(result.decorators?.length).toEqual(1);
            expect((result.decorators as Array<any>)[0]).toEqual(withDesign);
        });
    });

    describe('when testing a page component', () => {
        const storyTitle = { title: 'Page/content' };

        it('should set the default page configuration values', () => {
            const result = setup(storyTitle);
            expect(result.parameters?.layout).toEqual('fullscreen');
        });

        it('should pass custom parameters through for a page', () => {
            const color = 'light';
            const result = setup({
                ...storyTitle,
                parameters: {
                    backgrounds: {
                        default: color,
                        values: [
                            {
                                value: '#F2F2F2',
                                name: color,
                            },
                        ],
                    },
                },
            });

            expect(result.parameters?.backgrounds?.default).toEqual(color);
        });
    });
});
