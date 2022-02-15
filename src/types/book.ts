export type VueComponent = {
    [x: string]: any;
};

export type VueComponents = VueComponent;

export interface BookProps {
    component: VueComponent;
    title?: string;
    [x: string]: any;
}
