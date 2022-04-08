import { withDesign } from 'storybook-addon-designs';
import {
    BookParameters,
    BookProps,
    Decorator,
    DefaultStoryProps,
    StoryFunctionProps,
    StoryParameters,
    StoryProps,
} from './types';
import {
    arrayHasContent,
    defaultPageConfigurationValues,
    generateDecorator,
    generateFunctionName,
    generateTemplate,
    isInPageFolder,
    markdownLinks,
    objectHasContent,
} from './utils';

/**
 * Generates the settings needed to create a book and settings to be passed
 * into a story or default story function.
 * @param {String} props.title - An optional string that configures the
 *        organizational structure for your story
 * @param {Object} props.component - The component you will be testing. Only add
 *        a single component here (eg. { TestComponent })
 * @param {String} props.description - Markdown that will be displayed in the
 *        docs tab for the story.
 * @param {Array} props.events - The name of the emissions from the component.
 *        These emissions will automatically be logged in the actions tab.
 * @param {Array} props.decorators - Content that will wrap every story in the
 *        book.
 */
export function book({
    debug = false,
    component,
    events,
    argTypes = {},
    description,
    decorators,
    links,
    ...other
}: BookProps): StoryFunctionProps {
    const componentName = Object.keys(component)[0];
    const componentObject = Object.values(component)[0];

    let transformedDecorators: Array<Decorator> = [];
    if (decorators) {
        transformedDecorators = decorators.map((decorator) =>
            generateDecorator(decorator)
        );
    }

    if (other.parameters?.design) {
        transformedDecorators.push(withDesign);
    }

    // add book level description while taking care to not override other values
    // that might be set in the parameters object
    if (links) {
        description += markdownLinks(links);
    }
    if (description) {
        other.parameters = {
            ...other.parameters,
            docs: {
                ...other?.parameters?.docs,
                description: {
                    ...other?.parameters?.docs?.description,
                    component: description,
                },
            },
        };
    }

    // default parameter configuration
    if (other?.title && isInPageFolder(other.title)) {
        other.parameters = {
            ...defaultPageConfigurationValues,
            ...other.parameters,
        };
    }

    // binding events
    events?.forEach((event) => {
        const key = generateFunctionName(event);
        argTypes[key] = { action: `${event}` };
    });

    const output = {
        component: componentObject,
        componentName,
        // conditionally add these values if they are defined
        ...(arrayHasContent(events) && { events }),
        ...(objectHasContent(argTypes) && { argTypes }),
        ...(arrayHasContent(transformedDecorators) && {
            decorators: transformedDecorators,
        }),
        ...other,
    };

    if (debug) {
        console.log('book output: ', output);
    }

    return output;
}

/**
 * Translates the input for a story function into the story interface defined
 * by the storybook team. Used to encapsulate modifications and exported to
 * allow developers to inspect how a story is built.
 */
export function storyFunctionPropsToStoryProps({
    debug = false,
    componentName,
    component,
    additionalComponents,
    description,
    decorators = [],
    defaultArgs,
    args,
    events,
    ...props
}: StoryFunctionProps): StoryProps {
    // filter out the non-string decorators and map them to the decorator
    // type that storybook requires
    decorators = (decorators as Array<string>)
        .filter((decorator) => typeof decorator === 'string')
        .map((decorator) => generateDecorator(decorator));

    if (props.parameters?.design) {
        (decorators as Array<Decorator>).push(withDesign);
    }

    let components = {};
    // if a name is provided for the component that is being tested, we know
    // it came from the book function and we can provide some sensible defaults
    // that can reduce the repetitiveness of setting up a story
    if (componentName) {
        // we know every story is going to include the component that we are
        // testing. (eg. components: { ComponentName })
        const testingComponent = { [componentName]: component };
        // always allow the user to extend with additional components
        components = { ...testingComponent, ...additionalComponents };

        // if a template is not provided at the book or story level, then we can
        // assume the user just wants to include the component on its own and
        // bind any props.
        props.template =
            props.template ||
            generateTemplate({
                componentName: componentName,
                events,
            });
    }

    let parameters: StoryParameters = {};
    if (description) {
        if (props.links) {
            description += markdownLinks(props.links);
        }

        parameters = {
            ...props.parameters,
            docs: {
                ...props?.parameters?.docs,
                description: {
                    ...props?.parameters?.docs?.description,
                    story: description,
                },
            },
        };
    }

    // do not pass along the componentName and component values as they are
    // now included in `components`
    const output = {
        ...props,
        decorators,
        args: { ...defaultArgs, ...args },
        components,
        ...(objectHasContent(parameters) && { parameters }),
    };

    if (debug) {
        console.log('storyFunctionPropsToStoryProps output: ', output);
    }

    return output;
}

/**
 * A function that wraps the needed setup to create a story.
 *
 * @param {Object} args Takes a list of components, a vue template, and any
 *        arguments that will be used in the story.
 *
 * @param {String} componentName The name of the component that you will be
 *        testing. This should come from the book settings object. This is a
 *        field added specifically for this story wrapper function.
 *
 * @param {Object} component The component being tested. This should come from
 *        the story settings component.
 *
 * @param {Object} parameters Configuration to change the way a story behaves.
 *        Most notable options are layout 'centered' or 'fullscreen'.
 *
 * @returns An object that storybook requires to create a story
 */
export function story(props: StoryFunctionProps) {
    const newProps: StoryProps = storyFunctionPropsToStoryProps(props);

    const StoryTemplate = (_, { argTypes }) => ({
        props: Object.keys(argTypes),
        template: newProps.template,
        ...newProps,
    });
    const storyExport: any = StoryTemplate.bind({});
    storyExport.args = newProps.args;
    storyExport.decorators = newProps.decorators;
    storyExport.parameters = newProps.parameters;

    if (props.debug) {
        const ouput = {
            template: newProps.template,
            ...newProps,
            args: newProps.args,
            decorators: newProps.decorators,
            parameters: newProps.parameters,
        };
        console.log('story output: ', ouput);
    }

    return storyExport;
}

/**
 * A higher order function that sets a default component for generating stories.
 *
 * @param {Object} defaultParameters The component that will automatically be
 *        included in every story. Additional components can be provided in the
 *        `components` argument.
 *
 * @param {Object} defaultArgs The arguments that will automatically be
 *        included in every story. Additional arguments can be provided in the
 *        `args` argument.
 *
 * @param {Object} defaultTemplate The template that will automatically be
 *        included in every story. The template can be overwritten in the
 *        `template` argument.
 *
 * @param {Object} args The rest of the arguments needed to create a story.
 *        see the `story` function for the argument list
 *
 * @returns A function that generates a story.
 */
export function defaultStory({
    debug = false,
    defaultArgs,
    defaultParameters,
    defaultTemplate,
    parameters,
    args,
    template,
    ...other
}: DefaultStoryProps) {
    const options: StoryFunctionProps = {
        ...other,
        // use default args and overwrite with supplied args
        args: { ...defaultArgs, ...args },
        // use default parameters and overwrite with supplied args.
        // it is alright if the StoryParameters make it into the BookParameters
        // here. Storybook will ignore improper API usage.
        parameters: { ...defaultParameters, ...parameters } as BookParameters,
        // use arg template and fallback to default template if args.template
        // not supplied
        template: template || defaultTemplate,
    };

    if (debug) {
        console.log(`defaultStory output: story(${options})`);
    }

    return story(options);
}
