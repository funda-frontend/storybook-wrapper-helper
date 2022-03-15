import {
    ArgTypes,
    DefaultArgs,
    CustomWrapperProps,
    StoryFunctionProps,
    StoryParameters,
    VueComponent,
} from '.';

export interface ParameterBookDescriptionProps {
    component?: string;
}

export interface DesignObject {
    name: string;
    type: string;
    url: string;
    allowFullscreen?: boolean;
    embedHost?: string;
}

export interface ParameterBookDocsProps {
    description?: ParameterBookDescriptionProps;
}

export interface BookParameters
    extends Pick<StoryParameters, 'layout' | 'backgrounds'> {
    componentSubtitle?: string;
    docs?: ParameterBookDocsProps;
    design?: Array<DesignObject> | DesignObject;
}
export interface BookProps
    extends CustomWrapperProps,
        Omit<Partial<StoryFunctionProps>, 'decorators'>,
        DefaultArgs {
    component: VueComponent;
    // since we pass the results of the book function into the story functions,
    // storybook will think that we would like the decorator to be applied both
    // at the book and story level. If we pass in an array of strings, for our
    // decorators, we can have a more simple interface for our developers, while
    // also being able to determine which decorators are passed in at the story
    // level versus the book level.
    decorators?: Array<string>;
    title?: string;
    // since we have a fallback layout, no need to make the layout optional
    parameters?: BookParameters;
    argTypes?: ArgTypes;
}
