import { camelCase } from 'change-case';
import { LayoutOptions, SelectOption } from './types';

/**
 * Pages should not have a padding around the edge to more closely represent
 * what the page is going to look like. This can be overwritten at the story
 * level.
 */
export const defaultPageConfigurationValues = {
    layout: LayoutOptions.FullScreen,
};

export function isInPageFolder(title: string) {
    return title.toLowerCase().slice(0, 4) === 'page';
}

export function generateFunctionName(input) {
    return camelCase(input);
}

/**
 * Storybook always needs a template for vue components, but in most cases, they
 * are just going to be the name of the component and include bindings for props
 * and events. This function generates these basic templates.
 */
export function generateTemplate({
    componentName,
    events = [],
}: {
    componentName: string;
    events?: Array<string>;
}): string {
    const eventsString = events
        .map((event) => `@${event}="${generateFunctionName(event)}"`)
        .join(' ');

    let str = `<${componentName} v-bind="$props"`;
    if (eventsString) {
        str += ` ${eventsString}`;
    }
    str += '/>';

    return str;
}

/**
 * Generate a markdown section for links that will open in a new tab when clicked
 */
export function markdownLinks(links: Array<SelectOption>): string {
    const linksHeader = '\n### Links\n';
    const linksBody = links
        .map(
            (link) =>
                `* <a href="${link.value}" target="_blank">${link.name}</a>`
        )
        .join('\n');
    return linksHeader + linksBody;
}

/** Transform a string generator into the template storybook requires */
export function generateDecorator(decoratorString) {
    return () => ({
        template: decoratorString,
    });
}

export function objectHasContent(obj) {
    return obj && Object.keys(obj).length;
}

export function arrayHasContent(arr) {
    return arr && arr.length;
}
