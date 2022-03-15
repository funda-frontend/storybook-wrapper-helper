import { withDesign } from 'storybook-addon-designs';
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

    it('should merge book defaultArgs with story args', () => {
        const result = setup({
            defaultArgs: { key: 'value' },
            args: { item: 1 },
        });
        expect(result.args).toEqual({ key: 'value', item: 1 });
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
});
