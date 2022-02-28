import {
    BookProps,
    DefaultStoryProps,
    LayoutOptions,
    StoryFunctionProps,
    StoryProps,
} from './types';

// pages should not have a padding around the edge to more closely represent
// what the page is going to look like. This can be overwritten at the story
// level.
const defaultPageConfigurationValues = { layout: LayoutOptions.FullScreen };

function isInPageFolder(title: string) {
    return title.toLowerCase().slice(0, 4) === 'page';
}

// if a custom template is not provided, generate a template based on the
// provided component name and events
function generateTemplate({
    componentName,
    events,
}: {
    componentName: string;
    events: Array<string>;
}): string {
    const eventsString = events
        .map((event) => `@${event}="${event}"`)
        .join(' ');
    return `<${componentName} v-bind="$props" ${eventsString} />`;
}

/**
 * Generates the settings needed to create a book and settings to be passed
 * into a story or default story function.
 * @param {String} props.title - An optional string that configures the
 *        organizational structure for your story
 * @param {Object} props.component - The component you will be testing. Only add
 *        a single component here (eg. { TestComponent })
 */
export function book({
    component,
    events,
    argTypes = {},
    ...other
}: BookProps): StoryFunctionProps {
    const componentName = Object.keys(component)[0];
    const componentObject = Object.values(component)[0];

    // default parameter configuration
    if (other?.title && isInPageFolder(other.title)) {
        other.parameters = {
            ...defaultPageConfigurationValues,
            ...other.parameters,
        };
    }

    // binding events
    events?.forEach((event) => {
        argTypes[event] = { action: `${event}` };
    });

    return {
        component: componentObject,
        componentName,
        argTypes,
        events,
        ...other,
    };
}

/**
 * Translates the input for a story function into the story interface defined
 * by the storybook team. Used to encapsulate modifications and exported to
 * allow developers to inspect how a story is built.
 */
export function storyFunctionPropsToStoryProps({
    componentName,
    component,
    ...props
}: StoryFunctionProps): StoryProps {
    let components = {};
    // if a name is provided for the component that is being tested, we know
    // it came from the book function and we can provide some sensible defaults
    // that can reduce the repetitiveness of setting up a story
    if (componentName) {
        // we know every story is going to include the component that we are
        // testing. (eg. components: { ComponentName })
        const testingComponent = { [componentName]: component };
        // always allow the user to extend with additional components
        components = { ...testingComponent, ...props.additionalComponents };

        // if a template is not provided at the book or story level, then we can
        // assume the user just wants to include the component on its own and
        // bind any props.
        props.template =
            props.template ||
            generateTemplate({
                componentName: componentName,
                events: props.events || [],
            });
    }
    // do not pass along the componentName and component values as they are
    // now included in `components`
    return { ...props, components };
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
    defaultArgs,
    defaultParameters,
    defaultTemplate,
    parameters,
    args,
    template,
    ...other
}: DefaultStoryProps) {
    return story({
        ...other,
        // use default args and overwrite with supplied args
        args: { ...defaultArgs, ...args },
        // use default parameters and overwrite with supplied args
        parameters: { ...defaultParameters, ...parameters },
        // use arg template and fallback to default template if args.template
        // not supplied
        template: template || defaultTemplate,
    });
}
