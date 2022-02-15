# Roadmap

Some big changes are coming in the near future.

* Storybook is preparing for a release of version 7.0
* Storybook is in transition from Component Story Format (CSF) 2 to CSF 3
* Vue3 has been out for a while, but the ecosystem is still migrating from Vue2
* CSF3 has an API that is very similar to this wrapper utility

Does this mean that this wrapper is overly complicating things? If the CSF3 API
is similar, why use this wrapper utility at all?

It is my hope that this wrapper utility will actually simplify these complications
and will smooth the transition through breaking changes. Hopefully this can be
seen by taking a look at some of the code examples provided by the storybook
folks.

## Comparisons

Note that all of these examples have the same setup for the default export, so
this will be excluded from the examples.

```js
import Button from './Button.vue';

export default {
  title: 'Button',
  component: Button,
};
```

### React vs Vue (CSF2)

As you can see in the examples below, storybook is easier to work with when
using React. The developers designed storybook to be usable with any framework
or library, but they primarily work with React. With our wrapper, we can develop
with Vue as our top priority.

React example

```js
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
   primary: true,
   label: 'Button',
};
```

Vue2 example

```js
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="$props" />',
});

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: 'Button',
};
```

### Vue2 vs Vue3 (CSF2)

While the default export and setup around our primary story is the same between
both versions, the template definition changes between Vue2 and Vue3.

Vue2 example

```js
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="$props" />',
});

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: 'Button',
};
```

Vue3 example

```js
const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args" />',
});


export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};
```

## CSF2 vs CSF3 (Vue2)

CSFv2 example

```js
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="$props" />',
});

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: 'Button',
};
```

CSFv3 example

```js
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
  render: (args, { argTypes }) => ({
    components: { Button },
    props: Object.keys(argTypes),
    template: '<Button v-bind="$props" />',
  }),
};
```

## Vue2 & CSF2 vs Vue3 & CSF3

Putting it all together, we see that

CSFv2 Vue2 example

```js
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="$props" />',
});

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: 'Button',
};
```

CSFv3 Vue3 example

```js
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" />',
  }),
};
```

## Vue3 & CSF3 vs this module

CSFv3 Vue3 example

```js
import Button from './Button.vue';

export default {
  title: 'Button',
  component: Button,
};

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" />',
  }),
};
```

Ours

```js
import { story, book } from '@funda/storybook-config';
import Button from './Button.vue';

const bookSettings = book({
    title: 'Button',
    component: { Button },
});

export default bookSettings;

export const Default = story({
  ...bookSettings,
  args: {
    primary: true,
    label: 'Button',
  },
});
```
