type AnyObject = {
  [x: string]: any;
};

enum LayoutOptions {
  Centered = "centered",
  FullScreen = "fullscreen",
}

interface StoryParameters {
  layout: LayoutOptions;
}

interface PageConfigurationProps {
  defaultParameters?: StoryParameters;
  [x: string]: any;
}

function addPageConfigurationValues(config: PageConfigurationProps) {
  // pages should not have a padding around the edge to more closely represent
  // what the page is going to look like. This can be overwritten at the story
  // level.
  config.defaultParameters = { layout: LayoutOptions.FullScreen };
  return config;
}

function isInPageFolder(title: string) {
  return title.toLowerCase().slice(0, 4) === "page";
}

type VueComponent = {
  [x: string]: any;
};

interface BookProps {
  title: string;
  component: VueComponent;
  [x: string]: any;
}

/**
 * Generates the settings needed to create a book and settings to be passed
 * into a story or default story function.
 * @param {String} props.title - A string that configures the organizational
 *        structure for your story
 * @param {Object} props.component - The component you will be testing. Only add
 *        a single component here (eg. { TestComponent })
 */
export function book({ title, component, ...other }: BookProps) {
  const componentName = Object.keys(component)[0];
  const componentObject = Object.values(component)[0];
  let config: PageConfigurationProps = {
    title,
    component: componentObject,
    componentName,
    ...other,
  };
  if (isInPageFolder(title)) {
    config = addPageConfigurationValues(config);
  }
  return config;
}

interface StoryProps {
  component?: AnyObject;
  additionalComponents?: AnyObject;
  args?: AnyObject;
  componentName?: string;
  parameters?: AnyObject;
  template?: string;
  [x: string]: any;
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
export function story({
  additionalComponents,
  args,
  component,
  componentName,
  parameters,
  template,
  ...other
}: StoryProps) {
  // if a name is provided for the component that is being tested, we can
  // provide some sensible defaults that can reduce the repetitiveness of
  // setting up a story
  if (componentName) {
    // we know every story is going to include the component that we are
    // testing. (eg. components: { ComponentName })
    const testingComponent = { [componentName]: component };
    // always allow the user to overwrite on a story by story basis
    other.components = { ...testingComponent, ...additionalComponents };

    // if a story level template is not provided, or a defaultTemplate at
    // the defaultStory level, then we can assume the user just wants to
    // include the component on its own and bind any props.
    template = template || `<${componentName} v-bind="$props" />`;
  }

  const StoryTemplate = (_, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: other.components,
    template,
    ...other,
  });
  const storyExport: any = StoryTemplate.bind({});
  storyExport.args = args;
  storyExport.parameters = parameters;
  return storyExport;
}

interface DefaultStoryProps {
  defaultArgs: AnyObject;
  defaultComponents: AnyObject;
  defaultParameters: StoryParameters;
  defaultTemplate: string;
  [x: string]: any;
}

/**
 * A higher order function that sets a default component for generating stories.
 *
 * @param {Object} defaultComponent The component that will automatically be
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
  defaultComponents,
  defaultParameters,
  defaultTemplate,
  ...args
}: DefaultStoryProps) {
  return story({
    ...args,
    args: { ...defaultArgs, ...args.args },
    components: { ...defaultComponents, ...args.components },
    parameters: { ...defaultParameters, ...args.parameters },
    template: args.template || defaultTemplate,
  });
}
