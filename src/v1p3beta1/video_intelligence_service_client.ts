// Copyright 2022 Google LLC
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

/* global window */
import * as gax from 'google-gax';
import {
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  GrpcClientOptions,
  LROperation,
} from 'google-gax';

import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v1p3beta1/video_intelligence_service_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './video_intelligence_service_client_config.json';
import {operationsProtos} from 'google-gax';
const version = require('../../../package.json').version;

/**
 *  Service that implements the Video Intelligence API.
 * @class
 * @memberof v1p3beta1
 */
export class VideoIntelligenceServiceClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _providedCustomServicePath: boolean;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  warn: (code: string, message: string, warnType?: string) => void;
  innerApiCalls: {[name: string]: Function};
  operationsClient: gax.OperationsClient;
  videoIntelligenceServiceStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of VideoIntelligenceServiceClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance).
   * The common options are:
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
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
   *     Follows the structure of {@link gapicConfig}.
   * @param {boolean | "rest"} [options.fallback] - Use HTTP fallback mode.
   *     Pass "rest" to use HTTP/1.1 REST API instead of gRPC.
   *     For more information, please check the
   *     {@link https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#http11-rest-api-mode documentation}.
   */
  constructor(opts?: ClientOptions) {
    // Ensure that options include all the required fields.
    const staticMembers = this
      .constructor as typeof VideoIntelligenceServiceClient;
    const servicePath =
      opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    this._providedCustomServicePath = !!(
      opts?.servicePath || opts?.apiEndpoint
    );
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback =
      opts?.fallback ??
      (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Set useJWTAccessWithScope on the auth object.
    this.auth.useJWTAccessWithScope = true;

    // Set defaultServicePath on the auth object.
    this.auth.defaultServicePath = staticMembers.servicePath;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    } else if (opts.fallback === 'rest') {
      clientHeader.push(`rest/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    this._protos = this._gaxGrpc.loadProtoJSON(jsonProtos);

    const protoFilesRoot = this._gaxModule.protobuf.Root.fromJSON(jsonProtos);
    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    const lroOptions: GrpcClientOptions = {
      auth: this.auth,
      grpc: 'grpc' in this._gaxGrpc ? this._gaxGrpc.grpc : undefined,
    };
    if (opts.fallback === 'rest') {
      lroOptions.protoJson = protoFilesRoot;
      lroOptions.httpRules = [
        {
          selector: 'google.longrunning.Operations.ListOperations',
          get: '/v1p3beta1/{name=projects/*/locations/*}/operations',
        },
        {
          selector: 'google.longrunning.Operations.GetOperation',
          get: '/v1p3beta1/{name=projects/*/locations/*/operations/*}',
          additional_bindings: [
            {
              get: '/v1p3beta1/operations/{name=projects/*/locations/*/operations/*}',
            },
          ],
        },
        {
          selector: 'google.longrunning.Operations.DeleteOperation',
          delete: '/v1p3beta1/{name=projects/*/locations/*/operations/*}',
          additional_bindings: [
            {
              delete:
                '/v1p3beta1/operations/{name=projects/*/locations/*/operations/*}',
            },
          ],
        },
        {
          selector: 'google.longrunning.Operations.CancelOperation',
          post: '/v1p3beta1/{name=projects/*/locations/*/operations/*}:cancel',
          body: '*',
          additional_bindings: [
            {
              post: '/v1p3beta1/operations/{name=projects/*/locations/*/operations/*}:cancel',
            },
          ],
        },
      ];
    }
    this.operationsClient = this._gaxModule
      .lro(lroOptions)
      .operationsClient(opts);
    const annotateVideoResponse = protoFilesRoot.lookup(
      '.google.cloud.videointelligence.v1p3beta1.AnnotateVideoResponse'
    ) as gax.protobuf.Type;
    const annotateVideoMetadata = protoFilesRoot.lookup(
      '.google.cloud.videointelligence.v1p3beta1.AnnotateVideoProgress'
    ) as gax.protobuf.Type;

    this.descriptors.longrunning = {
      annotateVideo: new this._gaxModule.LongrunningDescriptor(
        this.operationsClient,
        annotateVideoResponse.decode.bind(annotateVideoResponse),
        annotateVideoMetadata.decode.bind(annotateVideoMetadata)
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.videointelligence.v1p3beta1.VideoIntelligenceService',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};

    // Add a warn function to the client constructor so it can be easily tested.
    this.warn = gax.warn;
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.videoIntelligenceServiceStub) {
      return this.videoIntelligenceServiceStub;
    }

    // Put together the "service stub" for
    // google.cloud.videointelligence.v1p3beta1.VideoIntelligenceService.
    this.videoIntelligenceServiceStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.videointelligence.v1p3beta1.VideoIntelligenceService'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.videointelligence.v1p3beta1
            .VideoIntelligenceService,
      this._opts,
      this._providedCustomServicePath
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const videoIntelligenceServiceStubMethods = ['annotateVideo'];
    for (const methodName of videoIntelligenceServiceStubMethods) {
      const callPromise = this.videoIntelligenceServiceStub.then(
        stub =>
          (...args: Array<{}>) => {
            if (this._terminated) {
              return Promise.reject('The client has already been closed.');
            }
            const func = stub[methodName];
            return func.apply(stub, args);
          },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const descriptor = this.descriptors.longrunning[methodName] || undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.videoIntelligenceServiceStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'videointelligence.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'videointelligence.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
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
   *   [Cloud Storage](https://cloud.google.com/storage/) URIs are
   *   supported. URIs must be specified in the following format:
   *   `gs://bucket-id/object-id` (other URI formats return
   *   {@link google.rpc.Code.INVALID_ARGUMENT|google.rpc.Code.INVALID_ARGUMENT}). For
   *   more information, see [Request
   *   URIs](https://cloud.google.com/storage/docs/request-endpoints). To identify
   *   multiple videos, a video URI may include wildcards in the `object-id`.
   *   Supported wildcards: '*' to match 0 or more characters;
   *   '?' to match 1 character. If unset, the input video should be embedded
   *   in the request as `input_content`. If set, `input_content` must be unset.
   * @param {Buffer} request.inputContent
   *   The video data bytes.
   *   If unset, the input video(s) should be specified via the `input_uri`.
   *   If set, `input_uri` must be unset.
   * @param {number[]} request.features
   *   Required. Requested video annotation features.
   * @param {google.cloud.videointelligence.v1p3beta1.VideoContext} request.videoContext
   *   Additional video context and/or feature-specific parameters.
   * @param {string} [request.outputUri]
   *   Optional. Location where the output (in JSON format) should be stored.
   *   Currently, only [Cloud Storage](https://cloud.google.com/storage/)
   *   URIs are supported. These must be specified in the following format:
   *   `gs://bucket-id/object-id` (other URI formats return
   *   {@link google.rpc.Code.INVALID_ARGUMENT|google.rpc.Code.INVALID_ARGUMENT}). For
   *   more information, see [Request
   *   URIs](https://cloud.google.com/storage/docs/request-endpoints).
   * @param {string} [request.locationId]
   *   Optional. Cloud region where annotation should take place. Supported cloud
   *   regions are: `us-east1`, `us-west1`, `europe-west1`, `asia-east1`. If no
   *   region is specified, the region will be determined based on video file
   *   location.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing
   *   a long running operation. Its `promise()` method returns a promise
   *   you can `await` for.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
   *   for more details and examples.
   * @example <caption>include:samples/generated/v1p3beta1/video_intelligence_service.annotate_video.js</caption>
   * region_tag:videointelligence_v1p3beta1_generated_VideoIntelligenceService_AnnotateVideo_async
   */
  annotateVideo(
    request?: protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoRequest,
    options?: CallOptions
  ): Promise<
    [
      LROperation<
        protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoResponse,
        protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoProgress
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  annotateVideo(
    request: protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoRequest,
    options: CallOptions,
    callback: Callback<
      LROperation<
        protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoResponse,
        protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoProgress
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  annotateVideo(
    request: protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoRequest,
    callback: Callback<
      LROperation<
        protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoResponse,
        protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoProgress
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  annotateVideo(
    request?: protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          LROperation<
            protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoResponse,
            protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoProgress
          >,
          protos.google.longrunning.IOperation | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      LROperation<
        protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoResponse,
        protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoProgress
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      LROperation<
        protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoResponse,
        protos.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoProgress
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    this.initialize();
    return this.innerApiCalls.annotateVideo(request, options, callback);
  }
  /**
   * Check the status of the long running operation returned by `annotateVideo()`.
   * @param {String} name
   *   The operation name that will be passed.
   * @returns {Promise} - The promise which resolves to an object.
   *   The decoded operation object has result and metadata field to get information from.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
   *   for more details and examples.
   * @example <caption>include:samples/generated/v1p3beta1/video_intelligence_service.annotate_video.js</caption>
   * region_tag:videointelligence_v1p3beta1_generated_VideoIntelligenceService_AnnotateVideo_async
   */
  async checkAnnotateVideoProgress(
    name: string
  ): Promise<
    LROperation<
      protos.google.cloud.videointelligence.v1p3beta1.AnnotateVideoResponse,
      protos.google.cloud.videointelligence.v1p3beta1.AnnotateVideoProgress
    >
  > {
    const request = new operationsProtos.google.longrunning.GetOperationRequest(
      {name}
    );
    const [operation] = await this.operationsClient.getOperation(request);
    const decodeOperation = new gax.Operation(
      operation,
      this.descriptors.longrunning.annotateVideo,
      gax.createDefaultBackoffSettings()
    );
    return decodeOperation as LROperation<
      protos.google.cloud.videointelligence.v1p3beta1.AnnotateVideoResponse,
      protos.google.cloud.videointelligence.v1p3beta1.AnnotateVideoProgress
    >;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    if (this.videoIntelligenceServiceStub && !this._terminated) {
      return this.videoIntelligenceServiceStub.then(stub => {
        this._terminated = true;
        stub.close();
        this.operationsClient.close();
      });
    }
    return Promise.resolve();
  }
}
