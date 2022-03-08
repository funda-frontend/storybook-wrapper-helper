import { AnyObject, VueComponent, VueComponents, VuexStore } from '.';

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
    component?: string;
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

export interface StoryFunctionProps extends Partial<StoryTemplate> {
    argTypes?: ArgTypes;
    component?: VueComponent;
    additionalComponents?: VueComponents;
    args?: AnyObject;
    events?: Array<string>;
    decorators?: Array<() => StoryTemplate>;
    componentName?: string;
    parameters?: StoryParameters;
    store?: VuexStore;
}

export interface DefaultStoryProps extends StoryFunctionProps {
    defaultArgs?: AnyObject;
    defaultParameters?: StoryParameters;
    defaultTemplate?: string;
}

export interface StoryProps
    extends Omit<
        StoryFunctionProps,
        'component' | 'componentName' | 'additionalComponents'
    > {
    components: VueComponents;
}
