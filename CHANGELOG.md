# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/@google-cloud/video-intelligence?activeTab=versions

## v1.5.1

02-05-2019 15:05 PST

### Fixes
- fix: increase gRPC timeout window ([#139](https://github.com/googleapis/nodejs-video-intelligence/pull/139))

### Dependencies
- fix(deps): update dependency google-gax to ^0.25.0 ([#183](https://github.com/googleapis/nodejs-video-intelligence/pull/183))
- refactor: remove unused deps and fix lint ([#141](https://github.com/googleapis/nodejs-video-intelligence/pull/141))

### Documentation
- docs: add lint/fix example to contributing guide ([#185](https://github.com/googleapis/nodejs-video-intelligence/pull/185))
- docs: remove unused long running operation message typesed  to pick up changes in the API or client library generator. ([#176](https://github.com/googleapis/nodejs-video-intelligence/pull/176))
- docs: fix filepath of example command in README ([#160](https://github.com/googleapis/nodejs-video-intelligence/pull/160))
- docs: fix typo in samples/analyze.js ([#159](https://github.com/googleapis/nodejs-video-intelligence/pull/159))
- docs: update readme badges ([#156](https://github.com/googleapis/nodejs-video-intelligence/pull/156))
- docs(samples): update samples to use GA APIs ([#153](https://github.com/googleapis/nodejs-video-intelligence/pull/153))
- docs(samples): updated samples code to use async await ([#151](https://github.com/googleapis/nodejs-video-intelligence/pull/151))

## v1.5.0

### New features
- feat: add speech transcription

### Documentation
- docs(samples): video beta samples ([#123](https://github.com/googleapis/nodejs-video-intelligence/pull/123))

### Internal / Testing Changes
- chore: update issue templates ([#128](https://github.com/googleapis/nodejs-video-intelligence/pull/128))
- chore: remove old issue template ([#124](https://github.com/googleapis/nodejs-video-intelligence/pull/124))
- build: run tests on node11 ([#122](https://github.com/googleapis/nodejs-video-intelligence/pull/122))
- chores(build): do not collect sponge.xml from windows builds ([#121](https://github.com/googleapis/nodejs-video-intelligence/pull/121))
- chores(build): run codecov on continuous builds ([#120](https://github.com/googleapis/nodejs-video-intelligence/pull/120))
- chore: update new issue template ([#119](https://github.com/googleapis/nodejs-video-intelligence/pull/119))

## v1.4.1

### Implementation Changes
- chore: minor generator changes ([#110](https://github.com/googleapis/nodejs-video-intelligence/pull/110))

### Internal / Testing Changes
- build: fix codecov uploading on Kokoro ([#112](https://github.com/googleapis/nodejs-video-intelligence/pull/112))
- Update kokoro config ([#109](https://github.com/googleapis/nodejs-video-intelligence/pull/109))
- chore(deps): update dependency eslint-plugin-prettier to v3 ([#108](https://github.com/googleapis/nodejs-video-intelligence/pull/108))
- Update CI config ([#105](https://github.com/googleapis/nodejs-video-intelligence/pull/105))
- test: remove appveyor config ([#106](https://github.com/googleapis/nodejs-video-intelligence/pull/106))
- Enable prefer-const in the eslint config ([#102](https://github.com/googleapis/nodejs-video-intelligence/pull/102))
- Enable no-var in eslint ([#101](https://github.com/googleapis/nodejs-video-intelligence/pull/101))

## v1.4.0

### New Features
- feat: release v1p2beta1 client (Object tracking and Text detecting beta) ([#98](https://github.com/googleapis/nodejs-video-intelligence/pull/98))

### Dependencies
- fix(deps): update dependency google-gax to ^0.20.0 ([#96](https://github.com/googleapis/nodejs-video-intelligence/pull/96))

### Internal / Testing Changes
- Switch to let/const ([#97](https://github.com/googleapis/nodejs-video-intelligence/pull/97))
- test: throw on deprecation ([#72](https://github.com/googleapis/nodejs-video-intelligence/pull/72))
- Update CI config ([#95](https://github.com/googleapis/nodejs-video-intelligence/pull/95))
- Retry npm install in CI ([#93](https://github.com/googleapis/nodejs-video-intelligence/pull/93))
- add templates to synth.py ([#91](https://github.com/googleapis/nodejs-video-intelligence/pull/91))

