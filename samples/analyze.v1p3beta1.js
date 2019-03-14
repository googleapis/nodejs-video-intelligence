/**
 * Copyright 2019, Google, LLC
 * Licensed under the Apache License, Version 2.0 (the `License`);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an `AS IS` BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
async function analyzeStreamingObject(path) {
  const Video = require('@google-cloud/video-intelligence').v1p3beta1;
  const fs = require('fs');
  const util = require('util');
  // Creates a client
  const video = new Video.StreamingVideoIntelligenceServiceClient();
  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // Reads a local video file and converts it to base64
  const file = await util.promisify(fs.readFile)(path);
  const inputContent = file.toString('base64');
  const configRequest = {
    videoConfig: {
      streamingFeature: ['STREAMING_OBJECT_TRACKING'],
    },
  };

  const stream = video.streamingAnnotateVideo().on('data', response => {
    console.log(response);
  });
  stream.write(configRequest);
  const request = {
    inputContent: inputContent,
  };
  stream.write(request);
}

async function main() {
  require(`yargs`)
    .demand(1)
    .command(
      `stream-object  <path>`,
      `Analyzes text in a video stored in Google Cloud Storage using the Cloud Video Intelligence API.`,
      {},
      opts => analyzeStreamingObject(opts.path)
    )
    .example(`node $0 stream-object ./resources/cat.mp4`)
    .wrap(120)
    .recommendCommands()
    .epilogue(
      `For more information, see https://cloud.google.com/video-intelligence/docs`
    )
    .help()
    .strict().argv;
}

main().catch(console.error);
