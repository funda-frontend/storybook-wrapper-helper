import { StoryProps } from './story';

export type VueComponent = {
    [x: string]: any;
};

export type VueComponents = VueComponent;

export interface BookProps extends Partial<StoryProps> {
    component: VueComponent;
    title?: string;
    [x: string]: any;
}
