import { AnyObject, VueComponent, VueComponents } from '.';

export enum LayoutOptions {
    Centered = 'centered',
    FullScreen = 'fullscreen',
}

export interface SelectOption {
    name: string;
    value: string;
}

export interface BackgroundOptions {
    default: string;
    values: Array<SelectOption>;
}

export interface StoryParameters {
    layout: LayoutOptions;
    backgrounds?: BackgroundOptions;
}

export interface StoryTemplate {
    template: string;
}

export interface StoryProps extends Partial<StoryTemplate> {
    component?: AnyObject;
    additionalComponents?: VueComponents;
    args?: AnyObject;
    decorators?: Array<() => StoryTemplate>;
    componentName?: string;
    parameters?: StoryParameters;
    [x: string]: any;
}

export interface DefaultStoryProps {
    defaultArgs: AnyObject;
    defaultComponents: VueComponent;
    defaultParameters: StoryParameters;
    defaultTemplate: string;
    [x: string]: any;
}
