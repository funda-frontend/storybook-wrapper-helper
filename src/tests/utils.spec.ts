import { isInPageFolder, generateTemplate } from '../utils';

describe('isInPageFolder', () => {
    it('should find a page', () => {
        expect(isInPageFolder('Pages/story')).toBe(true);
        expect(isInPageFolder('Page/story')).toBe(true);
        expect(isInPageFolder('page/story')).toBe(true);
    });

    it('should ignore stories that are not pages', () => {
        expect(isInPageFolder('story')).toBe(false);
        expect(isInPageFolder('story/page')).toBe(false);
    });
});

describe('generateTemplate', () => {
    it('should return the component with standard v-bind', () => {
        expect(generateTemplate({ componentName: 'Component' })).toEqual(
            '<Component v-bind="$props"/>'
        );
    });

    it('should return the component with events', () => {
        expect(
            generateTemplate({ componentName: 'Component', events: ['click'] })
        ).toEqual('<Component v-bind="$props" @click="click"/>');
    });
});
