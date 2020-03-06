import * as gax from 'google-gax';
import { Callback, ClientOptions, LROperation } from 'google-gax';
import * as protosTypes from '../../protos/protos';
/**
 *  Service that implements Google Cloud Video Intelligence API.
 * @class
 * @memberof v1p3beta1
 */
export declare class VideoIntelligenceServiceClient {
    private _descriptors;
    private _innerApiCalls;
    private _terminated;
    auth: gax.GoogleAuth;
    operationsClient: gax.OperationsClient;
    videoIntelligenceServiceStub: Promise<{
        [name: string]: Function;
    }>;
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
    constructor(opts?: ClientOptions);
    /**
     * The DNS address for this API service.
     */
    static get servicePath(): string;
    /**
     * The DNS address for this API service - same as servicePath(),
     * exists for compatibility reasons.
     */
    static get apiEndpoint(): string;
    /**
     * The port for this API service.
     */
    static get port(): number;
    /**
     * The scopes needed to make gRPC calls for every method defined
     * in this service.
     */
    static get scopes(): string[];
    getProjectId(): Promise<string>;
    getProjectId(callback: Callback<string, undefined, undefined>): void;
    annotateVideo(request: protosTypes.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoRequest, options?: gax.CallOptions): Promise<[LROperation<protosTypes.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoResponse, protosTypes.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoProgress>, protosTypes.google.longrunning.IOperation | undefined, {} | undefined]>;
    annotateVideo(request: protosTypes.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoRequest, options: gax.CallOptions, callback: Callback<LROperation<protosTypes.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoResponse, protosTypes.google.cloud.videointelligence.v1p3beta1.IAnnotateVideoProgress>, protosTypes.google.longrunning.IOperation | undefined, {} | undefined>): void;
    /**
     * Terminate the GRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     */
    close(): Promise<void>;
}
