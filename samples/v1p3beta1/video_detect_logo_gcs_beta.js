// DO NOT EDIT! This is a generated sample ("LongRunningPromiseAwait",  "video_detect_logo_gcs_beta")
'use strict';

// sample-metadata:
//   title:
//   description: Performs asynchronous video annotation for logo recognition on a file hosted in GCS.
//   usage: node samples/v1p3beta1/video_detect_logo_gcs_beta.js

// [START video_detect_logo_gcs_beta]

const videoIntelligence = require('@google-cloud/video-intelligence').v1p3beta1;

/** Performs asynchronous video annotation for logo recognition on a file hosted in GCS. */
async function sampleAnnotateVideo() {
  const client = new videoIntelligence.VideoIntelligenceServiceClient();
  const inputUri = 'gs://cloud-samples-data/video/googlework_short.mp4';
  const featuresElement = 'LOGO_RECOGNITION';
  const features = [featuresElement];
  const request = {
    inputUri: inputUri,
    features: features,
  };

  // Create a job whose results you can either wait for now, or get later
  const [operation] = await client.annotateVideo(request);

  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();

  // Get the first response, since we sent only one video.
  const annotationResult = response.annotationResults[0];
  // Annotations for list of logos detected, tracked and recognized in video.
  for (const logoRecognitionAnnotation of annotationResult.logoRecognitionAnnotations) {
    const entity = logoRecognitionAnnotation.entity;
    // Opaque entity ID. Some IDs may be available in [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/).
    console.log(`Entity Id : ${entity.entityId}`);
    // Textual description, e.g. `Google`.
    console.log(`Description : ${entity.description}`);
    // All logo tracks where the recognized logo appears. Each track corresponds to one logo instance appearing in consecutive frames.
    for (const track of logoRecognitionAnnotation.tracks) {
      // Video segment of a track.
      const segment = track.segment;
      const segmentStartTimeOffset = segment.startTimeOffset;
      console.log(
        `\n\tStart Time Offset : ${segmentStartTimeOffset.seconds}.${segmentStartTimeOffset.nanos}`
      );
      const segmentEndTimeOffset = segment.endTimeOffset;
      console.log(
        `\tEnd Time Offset : ${segmentEndTimeOffset.seconds}.${segmentEndTimeOffset.nanos}`
      );
      console.log(`\tConfidence : ${track.confidence}`);
      // The object with timestamp and attributes per frame in the track.
      for (const timestampedObject of track.timestampedObjects) {
        // Normalized Bounding box in a frame, where the object is located.
        const normalizedBoundingBox = timestampedObject.normalizedBoundingBox;
        console.log(`\n\t\tLeft : ${normalizedBoundingBox.left}`);
        console.log(`\t\tTop : ${normalizedBoundingBox.top}`);
        console.log(`\t\tRight : ${normalizedBoundingBox.right}`);
        console.log(`\t\tBottom : ${normalizedBoundingBox.bottom}`);
        // Optional. The attributes of the object in the bounding box.
        for (const attribute of timestampedObject.attributes) {
          console.log(`\n\t\t\tName : ${attribute.name}`);
          console.log(`\t\t\tConfidence : ${attribute.confidence}`);
          console.log(`\t\t\tValue : ${attribute.value}`);
        }
      }
      // Optional. Attributes in the track level.
      for (const trackAttribute of track.attributes) {
        console.log(`\n\t\tName : ${trackAttribute.name}`);
        console.log(`\t\tConfidence : ${trackAttribute.confidence}`);
        console.log(`\t\tValue : ${trackAttribute.value}`);
      }
    }
    // All video segments where the recognized logo appears. There might be multiple instances of the same logo class appearing in one VideoSegment.
    for (const logoRecognitionAnnotationSegment of logoRecognitionAnnotation.segments) {
      const logoRecognitionAnnotationSegmentStartTimeOffset =
        logoRecognitionAnnotationSegment.startTimeOffset;
      console.log(
        `\n\tStart Time Offset : ${logoRecognitionAnnotationSegmentStartTimeOffset.seconds}.${logoRecognitionAnnotationSegmentStartTimeOffset.nanos}`
      );
      const logoRecognitionAnnotationSegmentEndTimeOffset =
        logoRecognitionAnnotationSegment.endTimeOffset;
      console.log(
        `\tEnd Time Offset : ${logoRecognitionAnnotationSegmentEndTimeOffset.seconds}.${logoRecognitionAnnotationSegmentEndTimeOffset.nanos}`
      );
    }
  }
}

// [END video_detect_logo_gcs_beta]
// tslint:disable-next-line:no-any

sampleAnnotateVideo().catch(console.error);
