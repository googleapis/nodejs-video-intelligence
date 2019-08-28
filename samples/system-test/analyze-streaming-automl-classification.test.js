/**
 * Copyright 2019, Google, LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const cp = require('child_process');
const {assert} = require('chai');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const cmd = `node analyze-streaming-automl-classification.js`;
const modelId = `VCN6363999689846554624`; //TODO: mkae a model in the nodejs testing project
const project = process.env.GLCOUD_PROJECT;
const file = 'resources/cat.mp4';

describe.only('streaming automl classification', () => { //TODO: remove .only
    it('should classify the action in the streaming video', async () => {
      const output = execSync(`${cmd} ${file} ${project} ${modelId}`);
      assert.match(output, /cat/); //Change
      assert.match(output, /Confidence: \d+\.\d+/); //Change
    });
  });
