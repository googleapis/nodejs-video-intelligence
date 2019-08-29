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


//TODO: make model path
// Todo make automl config
// todo make video config
// todo make config request
// todo set chunk size
// todo load file content
// todo stream



async function main(path = 'YOUR_LOCAL_FILE') {
  // [START video_streaming_automl_classification_beta]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
 //TODO: Leah - add modelId, and project? or maybs we get the proj elsewhere
   // const path = 'Local file to analyze, e.g. ./my-file.mp4';
   // const modelId = 'autoMl' model

   //TODO: remove later
   const modelId = 'VCN652168724945567744';
   const projectId = 'nodejs-docs-samples-tests';
  const {
    StreamingVideoIntelligenceServiceClient,
  } = require('@google-cloud/video-intelligence').v1p3beta1;
  const fs = require('fs');

  // Instantiates a client
  const client = new StreamingVideoIntelligenceServiceClient();
  //TODO: make model path
// Todo make automl config
  // Streaming configuration
  const modelPath = `projects/${projectId}/locations/us-central1/models/${modelId}`
  const configRequest = {
    videoConfig: {
      feature: 'STREAMING_AUTOML_CLASSIFICATION',
      automlClassificationConfig: {
        modelName: modelPath,
      },
    },
  };
  console.log('configRequest');
  console.log(configRequest);
  //TODO does this need to change?
  const readStream = fs.createReadStream(path, {
    highWaterMark: 5 * 1024 * 1024, //chunk size set to 5MB (recommended less than 10MB)
    encoding: 'base64',
  });
  //Load file content
  const chunks = [];
  readStream
    .on('data', chunk => {
        console.log('here');
      const request = {
        inputContent: chunk.toString(),
      };
      console.log(Object.keys(request));
      chunks.push(request);
    })
    .on('close', function() {
      // configRequest should be the first in the stream of requests
      stream.write(configRequest);
      for (let i = 0; i < chunks.length; i++) {
          console.log("i");
          console.log(i);
        stream.write(chunks[i]);
      }
      stream.end();
    });

    //TODO remove or adjust
  const stream = client.streamingAnnotateVideo().on('data', response => {
    console.log("response");  
    console.log(response);
    //Gets annotations for video
    const annotations = response.annotationResults;
    const labels = annotations.labelAnnotations;
    labels.forEach(label => {
      console.log(
        `Label ${label.entity.description} occurs at: ${label.frames[0]
          .timeOffset.seconds || 0}` +
          `.${(label.frames[0].timeOffset.nanos / 1e6).toFixed(0)}s`
      );
      console.log(` Confidence: ${label.frames[0].confidence}`);
    });
  }).on('error', response => {
      console.error(response);
  });
  // [END video_streaming_automl_classification_beta]
}
main(...process.argv.slice(2)).catch(console.error());
