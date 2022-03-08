import { SelectOption } from './story';

export * from './book';
export * from './story';

// this is overly permissive and should be removed wherever possible
export type AnyObject = {
    [x: string]: any;
};

// This is a placeholder and should be replaced with something better in the
// future
export type VueComponent = {
    [x: string]: any;
};

// This is a placeholder and should be replaced with something better in the
// future
export type VueComponents = VueComponent;

// These are props that are supposed to interact with this package, and not be
// passed through to the Storybook API.
export interface CustomWrapperProps {
    events?: Array<string>;
    component?: VueComponent;
    description?: string;
    links?: Array<SelectOption>;
}

export type VuexStore = AnyObject;
