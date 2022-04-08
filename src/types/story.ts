import {
    AnyObject,
    ArgTypes,
    BookParameters,
    CustomWrapperProps,
    LayoutOptions,
    VueComponents,
    VuexStore,
} from '.';

export interface SelectOption {
    name: string;
    value: string;
}

export interface BackgroundOptions {
    default: string;
    values?: Array<SelectOption>;
}

export interface ParameterDescriptionProps {
    story?: string;
}

export interface ParameterDocsProps {
    description?: ParameterDescriptionProps;
}

export interface StoryParameters {
    layout?: LayoutOptions;
    backgrounds?: BackgroundOptions;
    docs?: ParameterDocsProps;
}

export interface StoryTemplate {
    template: string;
}

export interface DefaultArgs {
    debug?: boolean;
    defaultArgs?: AnyObject;
}

export type Decorator = () => StoryTemplate;

export interface StoryFunctionProps
    extends Partial<StoryTemplate>,
        DefaultArgs,
        CustomWrapperProps {
    argTypes?: ArgTypes;
    additionalComponents?: VueComponents;
    args?: AnyObject;
    decorators?: Array<Decorator> | Array<string>;
    componentName?: string;
    parameters?: BookParameters;
    store?: VuexStore;
    // object of any keys holding the value of any kind of function
    methods?: any;
}

export interface DefaultStoryProps
    extends DefaultArgs,
        Omit<StoryFunctionProps, 'parameters' | 'description' | 'links'> {
    defaultParameters?: StoryParameters;
    defaultTemplate?: string;
    parameters?: BookParameters | StoryParameters;
}

export interface StoryProps
    extends Omit<
        StoryFunctionProps,
        'component' | 'componentName' | 'additionalComponents' | 'parameters'
    > {
    components: VueComponents;
    parameters?: StoryParameters;
}
