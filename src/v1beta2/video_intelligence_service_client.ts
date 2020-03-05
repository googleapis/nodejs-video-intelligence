// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {
  APICallback,
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  LROperation,
} from 'google-gax';
import * as path from 'path';

import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './video_intelligence_service_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Service that implements Google Cloud Video Intelligence API.
 * @class
 * @memberof v1beta2
 */
export class VideoIntelligenceServiceClient {
  private _descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}};
  private _innerApiCalls: {[name: string]: Function};
  private _terminated = false;
  auth: gax.GoogleAuth;
  operationsClient: gax.OperationsClient;
  videoIntelligenceServiceStub: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of VideoIntelligenceServiceClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {function} [options.promise] - Custom promise module to use instead
   *     of native Promises.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this
      .constructor as typeof VideoIntelligenceServiceClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    const gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this
      .constructor as typeof VideoIntelligenceServiceClient).scopes;
    const gaxGrpc = new gaxModule.GrpcClient(opts);

    // Save the auth object to the client, for use by other methods.
    this.auth = gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    const protos = gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    const protoFilesRoot = opts.fallback
      ? gaxModule.protobuf.Root.fromJSON(require('../../protos/protos.json'))
      : gaxModule.protobuf.loadSync(nodejsProtoPath);

    this.operationsClient = gaxModule
      .lro({
        auth: this.auth,
        grpc: 'grpc' in gaxGrpc ? gaxGrpc.grpc : undefined,
      })
      .operationsClient(opts);
    const annotateVideoResponse = protoFilesRoot.lookup(
      '.google.cloud.videointelligence.v1beta2.AnnotateVideoResponse'
    ) as gax.protobuf.Type;
    const annotateVideoMetadata = protoFilesRoot.lookup(
      '.google.cloud.videointelligence.v1beta2.AnnotateVideoProgress'
    ) as gax.protobuf.Type;

    this._descriptors.longrunning = {
      annotateVideo: new gaxModule.LongrunningDescriptor(
        this.operationsClient,
        annotateVideoResponse.decode.bind(annotateVideoResponse),
        annotateVideoMetadata.decode.bind(annotateVideoMetadata)
      ),
    };

    // Put together the default options sent with requests.
    const defaults = gaxGrpc.constructSettings(
      'google.cloud.videointelligence.v1beta2.VideoIntelligenceService',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.cloud.videointelligence.v1beta2.VideoIntelligenceService.
    this.videoIntelligenceServiceStub = gaxGrpc.createStub(
      opts.fallback
        ? (protos as protobuf.Root).lookupService(
            'google.cloud.videointelligence.v1beta2.VideoIntelligenceService'
          )
        : // tslint:disable-next-line no-any
          (protos as any).google.cloud.videointelligence.v1beta2
            .VideoIntelligenceService,
      opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const videoIntelligenceServiceStubMethods = ['annotateVideo'];

    for (const methodName of videoIntelligenceServiceStubMethods) {
      const innerCallPromise = this.videoIntelligenceServiceStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          return stub[methodName].apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = gaxModule.createApiCall(
        innerCallPromise,
        defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.stream[methodName] ||
          this._descriptors.longrunning[methodName]
      );

      this._innerApiCalls[methodName] = (
        argument: {},
        callOptions?: CallOptions,
        callback?: APICallback
      ) => {
        return apiCall(argument, callOptions, callback);
      };
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'videointelligence.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'videointelligence.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------

  annotateVideo(
    request: protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      LROperation<
        protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoResponse,
        protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoProgress
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  annotateVideo(
    request: protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoRequest,
    options: gax.CallOptions,
    callback: Callback<
      LROperation<
        protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoResponse,
        protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoProgress
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Performs asynchronous video annotation. Progress and results can be
   * retrieved through the `google.longrunning.Operations` interface.
   * `Operation.metadata` contains `AnnotateVideoProgress` (progress).
   * `Operation.response` contains `AnnotateVideoResponse` (results).
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.inputUri
   *   Input video location. Currently, only
   *   [Google Cloud Storage](https://cloud.google.com/storage/) URIs are
   *   supported, which must be specified in the following format:
   *   `gs://bucket-id/object-id` (other URI formats return
   *   [google.rpc.Code.INVALID_ARGUMENT][google.rpc.Code.INVALID_ARGUMENT]). For
   *   more information, see [Request URIs](https://cloud.google.com/storage/docs/request-endpoints). A video
   *   URI may include wildcards in `object-id`, and thus identify multiple
   *   videos. Supported wildcards: '*' to match 0 or more characters;
   *   '?' to match 1 character. If unset, the input video should be embedded
   *   in the request as `input_content`. If set, `input_content` should be unset.
   * @param {Buffer} request.inputContent
   *   The video data bytes.
   *   If unset, the input video(s) should be specified via `input_uri`.
   *   If set, `input_uri` should be unset.
   * @param {number[]} request.features
   *   Required. Requested video annotation features.
   * @param {google.cloud.videointelligence.v1beta2.VideoContext} request.videoContext
   *   Additional video context and/or feature-specific parameters.
   * @param {string} [request.outputUri]
   *   Optional. Location where the output (in JSON format) should be stored.
   *   Currently, only [Google Cloud Storage](https://cloud.google.com/storage/)
   *   URIs are supported, which must be specified in the following format:
   *   `gs://bucket-id/object-id` (other URI formats return
   *   [google.rpc.Code.INVALID_ARGUMENT][google.rpc.Code.INVALID_ARGUMENT]). For
   *   more information, see [Request URIs](https://cloud.google.com/storage/docs/request-endpoints).
   * @param {string} [request.locationId]
   *   Optional. Cloud region where annotation should take place. Supported cloud
   *   regions: `us-east1`, `us-west1`, `europe-west1`, `asia-east1`. If no region
   *   is specified, a region will be determined based on video file location.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  annotateVideo(
    request: protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          LROperation<
            protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoResponse,
            protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoProgress
          >,
          protosTypes.google.longrunning.IOperation | undefined,
          {} | undefined
        >,
    callback?: Callback<
      LROperation<
        protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoResponse,
        protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoProgress
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): Promise<
    [
      LROperation<
        protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoResponse,
        protosTypes.google.cloud.videointelligence.v1beta2.IAnnotateVideoProgress
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    return this._innerApiCalls.annotateVideo(request, options, callback);
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    if (!this._terminated) {
      return this.videoIntelligenceServiceStub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
