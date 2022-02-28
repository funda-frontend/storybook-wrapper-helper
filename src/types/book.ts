import { AnyObject, StoryParameters, StoryFunctionProps } from '.';

export type VueComponent = {
    [x: string]: any;
};

export type VueComponents = VueComponent;

export interface BookProps
    extends Pick<StoryFunctionProps, 'events' | 'decorators'> {
    component: VueComponent;
    title?: string;
    // since we have a fallback layout, no need to make the layout optional
    parameters?: Partial<StoryParameters>;
    argTypes?: AnyObject;
}
