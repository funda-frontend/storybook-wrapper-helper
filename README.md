# JS Package template

This is the base template for a **JS package with build and semantic release**.

# Getting started

- `npm install`
- `npm run build` (if you want to check the build output)

The directory `src/lib` is where you will spend most of your time.
All remaining directories are just there to help you focus on building the component in an efficient way.

# Contributing

## How to push your changes

This repo uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) and uses [commitlint](https://github.com/conventional-changelog/commitlint) to enforce it. This means that you need to follow a set of rules otherwise you don't be able to commit. This is required for automating the release of the package.

Examples of commit messages:

* `feat(branch_name): new feature added`
* `fix(branch_name): fix added`

PS: It is recommended to use the terminal for commit, if you use any GUI it might be necessary to update you local variable PATH on your GUI.
Reference: [Husky issues](https://typicode.github.io/husky/#/?id=command-not-found)

## Releasing a new version

This project uses [semantic-release](https://semantic-release.gitbook.io/semantic-release/) a tool that will automatically releases, increment the package version and generate a changelog entry based on the new commits.
Simply following the commitlint standard and merging your changes into main will release the project.

# Consuming the package locally

If don't want to publish a new version and you just want to test it locally you can use `npm run link-local` on the package and then `npm link @fundarealestate/fuic-template` on the project.

Keep in mind that some tools don't understand file symlink (what npm link uses) and that can cause problems.

# Ownership

This codebase is owned by **FE Cluster**

For questions about this codebase contact a frontend engineer or email **devteam-frontend@funda.nl**
