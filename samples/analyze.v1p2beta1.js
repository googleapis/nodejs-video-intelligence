/**
 * Copyright 2018, Google, LLC
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
async function analyzeTextGCS(gcsUri) {
  //[START video_detect_text_gcs_beta]
  // Imports the Google Cloud Video Intelligence library
  const Video = require('@google-cloud/video-intelligence').v1p2beta1;
  // Creates a client
  const video = new Video.VideoIntelligenceServiceClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const gcsUri = 'GCS URI of the video to analyze, e.g. gs://my-bucket/my-video.mp4';

  const request = {
    inputUri: gcsUri,
    features: ['TEXT_DETECTION'],
  };
  // Detects text in a video
  const [operation] = await video.annotateVideo(request);
  const results = await operation.promise();
  console.log('Waiting for operation to complete...');
  // Gets annotations for video
  const textAnnotations = results[0].annotationResults[0].textAnnotations;
  textAnnotations.forEach(textAnnotation => {
    console.log(`Text ${textAnnotation.text} occurs at:`);
    textAnnotation.segments.forEach(segment => {
      const time = segment.segment;
      if (time.startTimeOffset.seconds === undefined) {
        time.startTimeOffset.seconds = 0;
      }
      if (time.startTimeOffset.nanos === undefined) {
        time.startTimeOffset.nanos = 0;
      }
      if (time.endTimeOffset.seconds === undefined) {
        time.endTimeOffset.seconds = 0;
      }
      if (time.endTimeOffset.nanos === undefined) {
        time.endTimeOffset.nanos = 0;
      }
      console.log(
        `\tStart: ${time.startTimeOffset.seconds}` +
          `.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s`
      );
      console.log(
        `\tEnd: ${time.endTimeOffset.seconds}.` +
          `${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`
      );
      console.log(`\tConfidence: ${segment.confidence}`);
      segment.frames.forEach(frame => {
        const timeOffset = frame.timeOffset;
        if (timeOffset.seconds === undefined) {
          timeOffset.seconds = 0;
        }
        if (timeOffset.nanos === undefined) {
          timeOffset.nanos = 0;
        }
        console.log(
          `Time offset for the frame: ${timeOffset.seconds}` +
            `.${(timeOffset.nanos / 1e6).toFixed(0)}s`
        );
        console.log(`Rotated Bounding Box Vertices:`);
        frame.rotatedBoundingBox.vertices.forEach(vertex => {
          console.log(`Vertex.x:${vertex.x}, Vertex.y:${vertex.y}`);
        });
      });
    });
  });
  // [END video_detect_text_gcs_beta]
}

async function analyzeObjectTrackingGCS(gcsUri) {
  //[START video_object_tracking_gcs_beta]
  // Imports the Google Cloud Video Intelligence library
  const Video = require('@google-cloud/video-intelligence').v1p2beta1;

  // Creates a client
  const video = new Video.VideoIntelligenceServiceClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const gcsUri = 'GCS URI of the video to analyze, e.g. gs://my-bucket/my-video.mp4';

  const request = {
    inputUri: gcsUri,
    features: ['OBJECT_TRACKING'],
    //recommended to use us-east1 for the best latency due to different types of processors used in this region and others
    locationId: 'us-east1',
  };
  // Detects objects in a video
  const [operation] = await video.annotateVideo(request);
  const results = await operation.promise();
  console.log('Waiting for operation to complete...');
  //Gets annotations for video
  const annotations = results[0].annotationResults[0];
  const objects = annotations.objectAnnotations;
  objects.forEach(object => {
    console.log(`Entity description:  ${object.entity.description}`);
    console.log(`Entity id: ${object.entity.entityId}`);
    const time = object.segment;
    if (time.startTimeOffset.seconds === undefined) {
      time.startTimeOffset.seconds = 0;
    }
    if (time.startTimeOffset.nanos === undefined) {
      time.startTimeOffset.nanos = 0;
    }
    if (time.endTimeOffset.seconds === undefined) {
      time.endTimeOffset.seconds = 0;
    }
    if (time.endTimeOffset.nanos === undefined) {
      time.endTimeOffset.nanos = 0;
    }
    console.log(
      `Segment: ${time.startTimeOffset.seconds}` +
        `.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s to ${
          time.endTimeOffset.seconds
        }.` +
        `${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`
    );
    console.log(`Confidence: ${object.confidence}`);
    const frame = object.frames[0];
    const box = frame.normalizedBoundingBox;
    const timeOffset = frame.timeOffset;
    if (timeOffset.seconds === undefined) {
      timeOffset.seconds = 0;
    }
    if (timeOffset.nanos === undefined) {
      timeOffset.nanos = 0;
    }
    console.log(
      `Time offset for the first frame: ${timeOffset.seconds}` +
        `.${(timeOffset.nanos / 1e6).toFixed(0)}s`
    );
    console.log(`Bounding box position:`);
    console.log(`\tleft   :${box.left}`);
    console.log(`\ttop    :${box.top}`);
    console.log(`\tright  :${box.right}`);
    console.log(`\tbottom :${box.bottom}`);
  });
  // [END video_object_tracking_gcs_beta]
}
async function analyzeText(path) {
  //[START video_detect_text_beta]
  // Imports the Google Cloud Video Intelligence library + Node's fs library
  const Video = require('@google-cloud/video-intelligence').v1p2beta1;
  const fs = require('fs');
  const util = require('util');
  // Creates a client
  const video = new Video.VideoIntelligenceServiceClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const path = 'Local file to analyze, e.g. ./my-file.mp4';

  // Reads a local video file and converts it to base64
  const file = await util.promisify(fs.readFile)(path);
  const inputContent = file.toString('base64');

  const request = {
    inputContent: inputContent,
    features: ['TEXT_DETECTION'],
  };
  // Detects text in a video
  const [operation] = await video.annotateVideo(request);
  const results = await operation.promise();
  console.log('Waiting for operation to complete...');

  // Gets annotations for video
  const textAnnotations = results[0].annotationResults[0].textAnnotations;
  textAnnotations.forEach(textAnnotation => {
    console.log(`Text ${textAnnotation.text} occurs at:`);
    textAnnotation.segments.forEach(segment => {
      const time = segment.segment;
      if (time.startTimeOffset.seconds === undefined) {
        time.startTimeOffset.seconds = 0;
      }
      if (time.startTimeOffset.nanos === undefined) {
        time.startTimeOffset.nanos = 0;
      }
      if (time.endTimeOffset.seconds === undefined) {
        time.endTimeOffset.seconds = 0;
      }
      if (time.endTimeOffset.nanos === undefined) {
        time.endTimeOffset.nanos = 0;
      }
      console.log(
        `\tStart: ${time.startTimeOffset.seconds}` +
          `.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s`
      );
      console.log(
        `\tEnd: ${time.endTimeOffset.seconds}.` +
          `${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`
      );
      console.log(`\tConfidence: ${segment.confidence}`);
      segment.frames.forEach(frame => {
        const timeOffset = frame.timeOffset;
        if (timeOffset.seconds === undefined) {
          timeOffset.seconds = 0;
        }
        if (timeOffset.nanos === undefined) {
          timeOffset.nanos = 0;
        }
        console.log(
          `Time offset for the frame: ${timeOffset.seconds}` +
            `.${(timeOffset.nanos / 1e6).toFixed(0)}s`
        );
        console.log(`Rotated Bounding Box Vertices:`);
        frame.rotatedBoundingBox.vertices.forEach(vertex => {
          console.log(`Vertex.x:${vertex.x}, Vertex.y:${vertex.y}`);
        });
      });
    });
  });
  // [END video_detect_text_beta]
}
async function analyzeObjectTracking(path) {
  //[START video_object_tracking_beta]
  // Imports the Google Cloud Video Intelligence library
  const Video = require('@google-cloud/video-intelligence').v1p2beta1;
  const fs = require('fs');
  const util = require('util');
  // Creates a client
  const video = new Video.VideoIntelligenceServiceClient();
  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const path = 'Local file to analyze, e.g. ./my-file.mp4';

  // Reads a local video file and converts it to base64
  const file = await util.promisify(fs.readFile)(path);
  const inputContent = file.toString('base64');

  const request = {
    inputContent: inputContent,
    features: ['OBJECT_TRACKING'],
    //recommended to use us-east1 for the best latency due to different types of processors used in this region and others
    locationId: 'us-east1',
  };
  // Detects objects in a video
  const [operation] = await video.annotateVideo(request);
  const results = await operation.promise();
  console.log('Waiting for operation to complete...');
  //Gets annotations for video
  const annotations = results[0].annotationResults[0];
  const objects = annotations.objectAnnotations;
  objects.forEach(object => {
    console.log(`Entity description:  ${object.entity.description}`);
    console.log(`Entity id: ${object.entity.entityId}`);
    const time = object.segment;
    if (time.startTimeOffset.seconds === undefined) {
      time.startTimeOffset.seconds = 0;
    }
    if (time.startTimeOffset.nanos === undefined) {
      time.startTimeOffset.nanos = 0;
    }
    if (time.endTimeOffset.seconds === undefined) {
      time.endTimeOffset.seconds = 0;
    }
    if (time.endTimeOffset.nanos === undefined) {
      time.endTimeOffset.nanos = 0;
    }
    console.log(
      `Segment: ${time.startTimeOffset.seconds}` +
        `.${(time.startTimeOffset.nanos / 1e6).toFixed(0)}s to ${
          time.endTimeOffset.seconds
        }.` +
        `${(time.endTimeOffset.nanos / 1e6).toFixed(0)}s`
    );
    console.log(`Confidence: ${object.confidence}`);
    const frame = object.frames[0];
    const box = frame.normalizedBoundingBox;
    const timeOffset = frame.timeOffset;
    if (timeOffset.seconds === undefined) {
      timeOffset.seconds = 0;
    }
    if (timeOffset.nanos === undefined) {
      timeOffset.nanos = 0;
    }
    console.log(
      `Time offset for the first frame: ${timeOffset.seconds}` +
        `.${(timeOffset.nanos / 1e6).toFixed(0)}s`
    );
    console.log(`Bounding box position:`);
    console.log(`\tleft   :${box.left}`);
    console.log(`\ttop    :${box.top}`);
    console.log(`\tright  :${box.right}`);
    console.log(`\tbottom :${box.bottom}`);
  });
  // [END video_object_tracking_beta]
}

async function main() {
  require(`yargs`)
    .demand(1)
    .command(
      `video-text-gcs <gcsUri>`,
      `Analyzes text in a video stored in Google Cloud Storage using the Cloud Video Intelligence API.`,
      {},
      opts => analyzeTextGCS(opts.gcsUri)
    )
    .command(
      `track-objects-gcs <gcsUri>`,
      `Analyzes objects in a video stored in Google Cloud Storage using the Cloud Video Intelligence API.`,
      {},
      opts => analyzeObjectTrackingGCS(opts.gcsUri)
    )
    .command(
      `video-text <path>`,
      `Analyzes text in a video stored in a local file using the Cloud Video Intelligence API.`,
      {},
      opts => analyzeText(opts.path)
    )
    .command(
      `track-objects <path>`,
      `Analyzes objects in a video stored in a local file using the Cloud Video Intelligence API.`,
      {},
      opts => analyzeObjectTracking(opts.path)
    )
    .example(`node $0 video-text ./resources/googlework_short.mp4`)
    .example(
      `node $0 video-text-gcs gs://nodejs-docs-samples/video/googlework_short.mp4`
    )
    .example(`node $0 track-objects ./resources/cat.mp4`)
    .example(`node $0 track-objects-gcs gs://nodejs-docs-samples/video/cat.mp4`)
    .wrap(120)
    .recommendCommands()
    .epilogue(
      `For more information, see https://cloud.google.com/video-intelligence/docs`
    )
    .help()
    .strict().argv;
}

main().catch(console.error);
