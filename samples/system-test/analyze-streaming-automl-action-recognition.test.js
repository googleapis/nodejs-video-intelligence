// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const cp = require('child_process');
const {assert} = require('chai');
const {describe, it} = require('mocha');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const cmd = 'node analyze-streaming-automl-action-recognition.js';
const modelId = '5922534776178212864';
const project = process.env.GCLOUD_PROJECT;
const file = 'resources/googlework_short.mp4';

describe('streaming automl action recognition', function () {
  this.retries(3);
  it('should recognize action in a streaming video', async () => {
    const output = execSync(`${cmd} ${file} ${project} ${modelId}`);
    assert.match(output, /Label/);
  });
});
