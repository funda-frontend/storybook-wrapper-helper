// Since storybook does not define types, this file should house all types that
// storybook directly consumes. Since this project extends these types, a
// separation between our interface and the storybook interface is good.

export interface ArgTypes {
    [x: string]: Partial<ArgType>;
}

export interface ArgType {
    control: ArgTypeControl;
    description: string;
    name: string;
    options: Array<string>;
    table: Partial<ArgTypeTable>;
    type: Partial<ArgTypeType>;
}

export interface ArgTypeControl {
    type: ControlTypes;
    min?: number;
    max?: number;
    step?: number;
}

export enum ControlTypes {
    Boolean = 'boolean',
    Check = 'check',
    Color = 'color',
    Date = 'date',
    File = 'file',
    InlineCheck = 'inline-check',
    InlineRadio = 'inline-radio',
    MultiSelect = 'multi-select',
    Number = 'number',
    Object = 'object',
    Radio = 'radio',
    Range = 'range',
    Select = 'select',
    Text = 'text',
}

export enum LayoutOptions {
    Centered = 'centered',
    FullScreen = 'fullscreen',
}

export interface ArgTypeTable {
    category: string;
    defaultValue: Partial<ArgTypeSummary>;
    type: Partial<ArgTypeSummary>;
}

export interface ArgTypeSummary {
    summary: string;
    detail: string;
}

export interface ArgTypeType {
    name: string;
    required: boolean;
}
