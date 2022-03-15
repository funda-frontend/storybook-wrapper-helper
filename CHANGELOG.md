# [2.0.0](https://github.com/funda-frontend/storybook-wrapper-helper/compare/v1.1.0...v2.0.0) (2022-03-15)


### Bug Fixes

* correct story props type inheritance ([11d767f](https://github.com/funda-frontend/storybook-wrapper-helper/commit/11d767f89c798434b142bacb282efcaf63b19773))
* remove default export ([f8968be](https://github.com/funda-frontend/storybook-wrapper-helper/commit/f8968be9c771c799ad8cdcee633ce47342b2f85e))
* set optional default story props ([abd466c](https://github.com/funda-frontend/storybook-wrapper-helper/commit/abd466ceef2b9f74ecdef6c9313113d99915fb0c))


### Features

* add defaultArgs to book parameters ([9b8b385](https://github.com/funda-frontend/storybook-wrapper-helper/commit/9b8b385e3d849a3b29285d826f1c541c1ad5836c))
* add more detailed story parameters types ([3daccc6](https://github.com/funda-frontend/storybook-wrapper-helper/commit/3daccc6abc00f8c23b1c103c8c70c8a528352112))
* add more specific types for argTypes parameter ([d37b7da](https://github.com/funda-frontend/storybook-wrapper-helper/commit/d37b7da1d6b9c4f48458b3d37e4f2dfe8a11fed5))
* add support for automatic action bindings ([71b9f35](https://github.com/funda-frontend/storybook-wrapper-helper/commit/71b9f3555ce0426a1aa3eb86256494130e071811))
* add support for linking figma designs ([f5e97e4](https://github.com/funda-frontend/storybook-wrapper-helper/commit/f5e97e453144513b68625b23c467397c7bd599df))
* add support for story level decorators ([7a316c9](https://github.com/funda-frontend/storybook-wrapper-helper/commit/7a316c964e6527c1d95afcb1f6fcb710411a8a40))
* extend book interface by story interface ([d2faf29](https://github.com/funda-frontend/storybook-wrapper-helper/commit/d2faf29db466dadbab80029b6597a693f1a6ea45))
* restrict typescript interfaces ([d1df505](https://github.com/funda-frontend/storybook-wrapper-helper/commit/d1df505eceb1f00af905a58abf1512b71ffaaf16))
* simplify decorator interface ([e462fcd](https://github.com/funda-frontend/storybook-wrapper-helper/commit/e462fcd3402013660bc43ce9301ab3ebd93ae070))
* simplify documentation interface ([73a9739](https://github.com/funda-frontend/storybook-wrapper-helper/commit/73a9739de8158ce21880a316a3c0a0b9daabdd8d))
* update interface for storybook v6.4 ([a2923c3](https://github.com/funda-frontend/storybook-wrapper-helper/commit/a2923c33584ee7c1f158ecd922a7c2cde4728bcc))


### BREAKING CHANGES

* decorators prop now takes an array of strings

This has the added bonus of fixing a bug where the book level decorator
was included twice at the story level.

Since we pass the results of the book function into the story functions,
storybook will think that we would like the decorator to be applied both
at the book and story level. If we pass in an array of strings, for our
decorators, we can have a more simple interface for our developers, while
also being able to determine which decorators are passed in at the story
level versus the book level.
* TypeScript will show errors for extraneous API inputs.

Most functions no longer accept an object with any number of additional
key-value pairs. If a key-value pair is provided that does not match the
new restricted interfaces, typescript will alert the developer that the
API is being used incorrectly.

This also includes a few refactors to simplify the code a bit.

# [1.1.0](https://github.com/funda-frontend/storybook-wrapper-helper/compare/v1.0.0...v1.1.0) (2021-11-11)


### Features

* generate type definition files ([a7b65cf](https://github.com/funda-frontend/storybook-wrapper-helper/commit/a7b65cf858943fcbe3ef98323b01d95cfb02fdbc))

# 1.0.0 (2021-10-22)


### Bug Fixes

* **build:** fix npm token ([e3f2ae9](https://github.com/funda-frontend/storybook-wrapper-helper/commit/e3f2ae9fcbea4e2858c0e8f00545b6c978597663))


### Features

* **build:** add build config ([ebd9ce7](https://github.com/funda-frontend/storybook-wrapper-helper/commit/ebd9ce7eba0e4d7a922fda4746901f9d8ea734ed))
