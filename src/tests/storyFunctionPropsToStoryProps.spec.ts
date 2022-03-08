import { generateTemplate } from '../utils';
import { storyFunctionPropsToStoryProps } from '../lib';

const ExampleObject = { example: 'object' };
const AdditionalComponent = { additional: 'component' };

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
