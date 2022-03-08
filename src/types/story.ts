import { AnyObject, CustomWrapperProps, VueComponents, VuexStore } from '.';
import { BookParameters } from './book';

export enum LayoutOptions {
    Centered = 'centered',
    FullScreen = 'fullscreen',
}

export enum ControlTypes {
    Boolean = 'boolean',
    Number = 'number',
    Range = 'range',
    Object = 'object',
    File = 'file',
    Radio = 'radio',
    Check = 'check',
    Select = 'select',
    Text = 'text',
    Color = 'color',
    Date = 'date',
    InlineRadio = 'inline-radio',
    InlineCheck = 'inline-check',
    MultiSelect = 'multi-select',
}

export interface SelectOption {
    name: string;
    value: string;
}

export interface ArgTypes {
    [x: string]: ArgTypeContents;
}

export interface ArgTypeContents extends ParameterDescriptionProps {
    control?: ArgTypeControl;
}

export interface ArgTypeControl {
    type: ControlTypes;
    min?: number;
    max?: number;
    step?: number;
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

export type Decorator = () => StoryTemplate;

export interface StoryFunctionProps
    extends Partial<StoryTemplate>,
        CustomWrapperProps {
    argTypes?: ArgTypes;
    additionalComponents?: VueComponents;
    args?: AnyObject;
    decorators?: Array<Decorator> | Array<string>;
    componentName?: string;
    parameters?: BookParameters;
    store?: VuexStore;
}

export interface DefaultStoryProps
    extends Omit<StoryFunctionProps, 'parameters' | 'description' | 'links'> {
    defaultArgs?: AnyObject;
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
