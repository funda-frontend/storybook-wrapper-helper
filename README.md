# Storybook wrapper helper

## Why?

Why where these wrapper components created?
Why not write stories just like I see in the storybook documentation?

As long as wrappers do not confuse the developer, any steps that can be taken
to reduce the amount of code that the developer is copying and pasting, the
better. This will reduce errors and will make writing stories more enjoyable.
This makes stories look more cohesive and reduces distractions for a book (a
collection of stories) where most of the stories have their own templates and
args.

Storybook stories will also go through improvements between Story Component
Format (SCF) v2 SCF v3, and breaking changes between Vue v2 and Vue v3.
While updating a single story through a breaking change is a trivial
task, reformatting every story written, would take a lot of
time. This should allow us to move through the breaking changes by only
changing the internals of a function that generates a story.

For more information on why this will still be relevant for the forseeable
future, please read the [roadmap](./ROADMAP.md).

## Usage

All configuration here is built from functional components, so a developer
will be able to easily debug any storybook configuration by seeing the
output of each of these functions. While the helper functions could further
abstract a storybook implementation, this crosses a line where obfuscation
begins to be a hinderende when a developer is debugging, or joining this
project for the first time.

### Single story book

If you just have a single story, then you can use the story function directly.
Any information that you need in your story needs to be added as parameters to
the story function.

```js
import { story, book } from '@funda/storybook-config';

// import your component that you are going to test
import SaveBox from '../SaveBox.vue';

const bookSettings = book({
    // define the folder structure for your component
    title: 'Advertisement/Create/Save Box',
    component: { SaveBox },
});

export default bookSettings;

export const Default = story({
    // all of the work that the book function does for you is included here
    ...bookSettings,
    args: {
        disabled: false,
        canBuy: false,
        waiting: false,
    },
});
```

### Multi story book

```js
import { defaultStory, book } from '@funda/storybook-config';

// import your component that you are going to test
import UiUploadButton from '../UiUploadButton.vue';


const bookSettings = book({
    title: 'UI/Buttons/Upload',
    component: { UiUploadButton },
});

export default bookSettings;

// This uploadButtonStory function will return all the information storybook
// needs to make a story. Args can be passed in to override any default values
function uploadButtonStory(args) {
    return defaultStory({
        // all of the work that the book function does for you is included here
        ...bookSettings,
        // whatever you add here will always be included, but can be overwritten
        // by the 'args' key
        defaultArgs: {
            uploadText: 'Upload a file',
            errorMessage: '',
            accept: '*',
            multiple: false,
            showFileNames: false,
        },
        ...args,
    });
}

// For these stories, we are regularly relying on the default values at the Vue
// component level, which is why we do not include values for these props in the
// defaultArgs parameter on the defaultStory function. 'accept' is the only
// required prop for the component. We are however, overwriting these default
// values on different stories.

export const Default = uploadButtonStory();
export const DifferentUploadText = uploadButtonStory({
    args: {
        uploadText: 'Add an image',
    },
});
export const DifferentUploadValidation = uploadButtonStory({
    args: {
        accept: 'video/*',
        uploadText: 'Add a video',
    },
});
export const Error = uploadButtonStory({
    args: {
        errorMessage: 'The image that you tried to upload is too small',
    },
});
export const MultipleSelection = uploadButtonStory({
    args: {
        multiple: true,
    },
});
export const ShowFileNames = uploadButtonStory({
    args: {
        showFileNames: true,
        multiple: true,
    },
});

```

### A full example

This is an example of a component that makes use of every option in the `story`
function configuration.

```js
import { story, book } from '@funda/storybook-config';

// import your component that you are going to test
import SaveBox from '../SaveBox.vue';
import SuccessNotification from '../SuccessNotification.vue';

const bookSettings = book({
    // define the folder structure for your component
    title: 'Advertisement/Create/Save Box',
    component: { SaveBox },
    // when @close and @save are triggered, it will be logged in the actions pane
    events: ['close', 'save']
});

export default bookSettings;

export const Default = story({
    // all of the work that the book function does for you is included here
    ...bookSettings,
    // arguments for our component
    args: {
        disabled: false,
        canBuy: false,
        waiting: false,
    },
    // allow us to use the SuccessNotification in our custom template
    additionalComponents: { SuccessNotification },
    description: 'A custom description for this component',
    // wrap our story in some custom div that constrains the max width
    decorators: [
      () => ({ template: '<div style="max-width: 800px;"><story/></div>' }),
    ],
    // set our background color to a custom shade of blue
    parameters: {
      backgrounds: {
        default: 'custom-blue',
        values: [
            {
                name: 'custom-blue',
                value: '#139ec1'
            }
        ]
      },
    },
    // include our SuccessNotification, overriding the default slot in our
    // SaveBox component. Note that the props and actions must be bound in this
    // template or you will disconnect them from the story.
    template: `
      <SaveBox v-bind="$props" @close="close" @save="save">
        <SuccessNotification>You did it!</SuccessNotification>
      </SaveBox>
    `
});
```

### Automatic features

If you specify a book that has a title that starts with `page` (case
insensitive), the layout of the story will be fullscreen to closer emulate
what the page will look like (especially on mobile devices). This can be
overwritten at the story level.

```js
const bookSettings = book({
    title: 'Page/Home',
    component: { ... }
});
```

### Typescript

This project is written in TypeScript, which provides helpful hints to
developers consuming this package. Even if you are not using TypeScript in your
project, editors like VSCode include the ability to enable type checking in
normal JS files.

While storybook does have
[some TypeScript support](https://storybook.js.org/docs/vue/configure/typescript)
for the components that you are testing, there seems to be no complete
TypeScript definition for the interface that defines stories in
`@storybook/vue`. Ideally, this project imports types from the
`@storybook/vue` and/or `@storybook/csf` packages and extends them to fit the
needs of this wrapper, but for now, the plan is to define all types here until
the API has been proven to work in a variety of situations across several Funda
applications.

## Getting started

- `npm install`
- `npm run build` (if you want to check the build output)

The directory `src/lib` is where you will spend most of your time.
All remaining directories are just there to help you focus on building the component in an efficient way.

## Contributing

### How to push your changes

This repo uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) and uses [commitlint](https://github.com/conventional-changelog/commitlint) to enforce it. This means that you need to follow a set of rules otherwise you don't be able to commit. This is required for automating the release of the package.

Examples of commit messages:

* `feat(branch_name): new feature added`
* `fix(branch_name): fix added`

PS: It is recommended to use the terminal for commit, if you use any GUI it might be necessary to update you local variable PATH on your GUI.
Reference: [Husky issues](https://typicode.github.io/husky/#/?id=command-not-found)

### Releasing a new version

This project uses [semantic-release](https://semantic-release.gitbook.io/semantic-release/) a tool that will automatically releases, increment the package version and generate a changelog entry based on the new commits.
Simply following the commitlint standard and merging your changes into main will release the project.

## Consuming the package locally

If don't want to publish a new version and you just want to test it locally you can use `npm run link-local` on the package and then `npm link @fundarealestate/fuic-template` on the project.

Keep in mind that some tools don't understand file symlink (what npm link uses) and that can cause problems.

## Ownership

This codebase is owned by **FE Cluster**

For questions about this codebase contact a frontend engineer or email **devteam-frontend@funda.nl**
