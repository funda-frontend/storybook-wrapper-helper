import {
    AnyObject,
    CustomWrapperProps,
    StoryFunctionProps,
    StoryParameters,
    VueComponent,
} from '.';

export interface ParameterBookDescriptionProps {
    component?: string;
}

export interface ParameterBookDocsProps {
    description?: ParameterBookDescriptionProps;
}

export interface BookParameters
    extends Pick<StoryParameters, 'layout' | 'backgrounds'> {
    componentSubtitle?: string;
    docs?: ParameterBookDocsProps;
}
export interface BookProps
    extends CustomWrapperProps,
        Partial<StoryFunctionProps> {
    component: VueComponent;
    title?: string;
    // since we have a fallback layout, no need to make the layout optional
    parameters?: BookParameters;
    argTypes?: AnyObject;
}
