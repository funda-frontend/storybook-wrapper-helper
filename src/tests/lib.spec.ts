import { generateTemplate } from '../utils';
import { book, storyFunctionPropsToStoryProps } from '../lib';

const ExampleObject = { example: 'object' };
const AdditionalComponent = { additional: 'component' };

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
});

describe('storyFunctionPropsToStoryProps', () => {
    const baseStoryFunctionProps = {
        componentName: 'ExampleObject',
        component: ExampleObject,
    };

    const setup = (args = {}) =>
        storyFunctionPropsToStoryProps({ ...baseStoryFunctionProps, ...args });

    it('should define a template and components', () => {
        const result = setup();

        expect(result.components).toEqual({ ExampleObject });
        expect(result.template).toEqual(
            generateTemplate({
                componentName: 'ExampleObject',
            })
        );
    });

    it('should overwrite the default template with a custom one', () => {
        const customTemplate = '<ExampleObject/>';
        const result = setup({
            template: customTemplate,
        });

        expect(result.template).toEqual(customTemplate);
    });

    it('should allow for additional components', () => {
        const result = setup({
            additionalComponents: {
                AdditionalComponent,
            },
        });

        expect(Object.keys(result.components)).toContain('AdditionalComponent');
    });

    it('should add a description', () => {
        const description = 'hello world';
        const result = setup({ description });

        expect(result.parameters?.docs?.description?.story).toEqual(
            description
        );
    });
});

describe('snapshot tests', () => {
    const bookSettings = book({
        title: 'Component/Path',
        args: { key: 'value' },
        component: { ExampleObject },
        decorators: ['<div><story/></div>'],
        description: 'hello world',
        links: [{ name: 'link', value: 'https://example.com' }],
        events: ['close'],
        template: `
            <ExampleObject v-bind="$props" @close="close">
                Slot Content
            </ExampleObject>`,
        argTypes: {
            showPrefix: {
                control: {
                    type: 'boolean',
                },
            },
            objectProp: {
                description: 'Documentation for an opaque object structure',
            },
        },
    });
    it('should match the expected book results', () => {
        expect(bookSettings).toMatchSnapshot();
    });
    it('should match the story props results', () => {
        const result = storyFunctionPropsToStoryProps({
            ...bookSettings,
            additionalComponents: { AdditionalComponent },
            decorators: ['<p><story/></p>'],
            description: 'hello world',
            links: [{ name: 'link', value: 'https://example.com' }],
            parameters: {
                backgrounds: {
                    default: 'custom-blue',
                    values: [
                        {
                            name: 'custom-blue',
                            value: '#139ec1',
                        },
                    ],
                },
            },
        });
        expect(result).toMatchSnapshot({});
    });
});
