/**
 * Ingress is a collection of rules that allow inbound connections to reach the endpoints
 * defined by a backend. An Ingress can be configured to give services externally-reachable
 * urls, load balance traffic, terminate SSL, offer name based virtual hosting etc.
 */
export interface Ingress {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers
   * should convert recognized schemas to the latest internal value, and may reject
   * unrecognized values. More info:
   * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: null | string
  /**
   * Kind is a string value representing the REST resource this object represents. Servers may
   * infer this from the endpoint the client submits requests to. Cannot be updated. In
   * CamelCase. More info:
   * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: Kind
  /**
   * ObjectMeta is metadata that all persisted resources must have, which includes all objects
   * users must create.
   */
  metadata?: null | Metadata
  /**
   * IngressSpec describes the Ingress the user wishes to exist.
   */
  spec?: null | Spec
  /**
   * IngressStatus describe the current state of the Ingress.
   */
  status?: null | Status
}

/**
 * Kind is a string value representing the REST resource this object represents. Servers may
 * infer this from the endpoint the client submits requests to. Cannot be updated. In
 * CamelCase. More info:
 * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
 */
export enum Kind {
  Ingress = 'Ingress',
}

export interface Metadata {
  /**
   * Annotations is an unstructured key value map stored with a resource that may be set by
   * external tools to store and retrieve arbitrary metadata. They are not queryable and
   * should be preserved when modifying objects. More info:
   * http://kubernetes.io/docs/user-guide/annotations
   */
  annotations?: {[key: string]: null | string} | null
  /**
   * The name of the cluster which the object belongs to. This is used to distinguish
   * resources with same name and namespace in different clusters. This field is not set
   * anywhere right now and apiserver is going to ignore it if set in create or update request.
   */
  clusterName?: null | string
  /**
   * Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.
   * Wrappers are provided for many of the factory methods that the time package offers.
   */
  creationTimestamp?: Date | null
  /**
   * Number of seconds allowed for this object to gracefully terminate before it will be
   * removed from the system. Only set when deletionTimestamp is also set. May only be
   * shortened. Read-only.
   */
  deletionGracePeriodSeconds?: number | null
  /**
   * Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.
   * Wrappers are provided for many of the factory methods that the time package offers.
   */
  deletionTimestamp?: Date | null
  /**
   * Must be empty before the object is deleted from the registry. Each entry is an identifier
   * for the responsible component that will remove the entry from the list. If the
   * deletionTimestamp of the object is non-nil, entries in this list can only be removed.
   * Finalizers may be processed and removed in any order.  Order is NOT enforced because it
   * introduces significant risk of stuck finalizers. finalizers is a shared field, any actor
   * with permission can reorder it. If the finalizer list is processed in order, then this
   * can lead to a situation in which the component responsible for the first finalizer in the
   * list is waiting for a signal (field value, external system, or other) produced by a
   * component responsible for a finalizer later in the list, resulting in a deadlock. Without
   * enforced ordering finalizers are free to order amongst themselves and are not vulnerable
   * to ordering changes in the list.
   */
  finalizers?: Array<null | string> | null
  /**
   * GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF
   * the Name field has not been provided. If this field is used, the name returned to the
   * client will be different than the name passed. This value will also be combined with a
   * unique suffix. The provided value has the same validation rules as the Name field, and
   * may be truncated by the length of the suffix required to make the value unique on the
   * server.
   *
   * If this field is specified and the generated name exists, the server will NOT return a
   * 409 - instead, it will either return 201 Created or 500 with Reason ServerTimeout
   * indicating a unique name could not be found in the time allotted, and the client should
   * retry (optionally after the time indicated in the Retry-After header).
   *
   * Applied only if Name is not specified. More info:
   * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency
   */
  generateName?: null | string
  /**
   * A sequence number representing a specific generation of the desired state. Populated by
   * the system. Read-only.
   */
  generation?: number | null
  /**
   * Map of string keys and values that can be used to organize and categorize (scope and
   * select) objects. May match selectors of replication controllers and services. More info:
   * http://kubernetes.io/docs/user-guide/labels
   */
  labels?: {[key: string]: null | string} | null
  /**
   * ManagedFields maps workflow-id and version to the set of fields that are managed by that
   * workflow. This is mostly for internal housekeeping, and users typically shouldn't need to
   * set or understand this field. A workflow can be the user's name, a controller's name, or
   * the name of a specific apply path like "ci-cd". The set of fields is always in the
   * version that the workflow used when modifying the object.
   */
  managedFields?: Array<null | ManagedField> | null
  /**
   * Name must be unique within a namespace. Is required when creating resources, although
   * some resources may allow a client to request the generation of an appropriate name
   * automatically. Name is primarily intended for creation idempotence and configuration
   * definition. Cannot be updated. More info:
   * http://kubernetes.io/docs/user-guide/identifiers#names
   */
  name?: null | string
  /**
   * Namespace defines the space within which each name must be unique. An empty namespace is
   * equivalent to the "default" namespace, but "default" is the canonical representation. Not
   * all objects are required to be scoped to a namespace - the value of this field for those
   * objects will be empty.
   *
   * Must be a DNS_LABEL. Cannot be updated. More info:
   * http://kubernetes.io/docs/user-guide/namespaces
   */
  namespace?: null | string
  /**
   * List of objects depended by this object. If ALL objects in the list have been deleted,
   * this object will be garbage collected. If this object is managed by a controller, then an
   * entry in this list will point to this controller, with the controller field set to true.
   * There cannot be more than one managing controller.
   */
  ownerReferences?: Array<null | OwnerReference> | null
  /**
   * An opaque value that represents the internal version of this object that can be used by
   * clients to determine when objects have changed. May be used for optimistic concurrency,
   * change detection, and the watch operation on a resource or set of resources. Clients must
   * treat these values as opaque and passed unmodified back to the server. They may only be
   * valid for a particular resource or set of resources.
   *
   * Populated by the system. Read-only. Value must be treated as opaque by clients and . More
   * info:
   * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
   */
  resourceVersion?: null | string
  /**
   * SelfLink is a URL representing this object. Populated by the system. Read-only.
   *
   * DEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is
   * planned to be removed in 1.21 release.
   */
  selfLink?: null | string
  /**
   * UID is the unique in time and space value for this object. It is typically generated by
   * the server on successful creation of a resource and is not allowed to change on PUT
   * operations.
   *
   * Populated by the system. Read-only. More info:
   * http://kubernetes.io/docs/user-guide/identifiers#uids
   */
  uid?: null | string
}

export interface ManagedField {
  /**
   * APIVersion defines the version of this resource that this field set applies to. The
   * format is "group/version" just like the top-level APIVersion field. It is necessary to
   * track the version of a field set because it cannot be automatically converted.
   */
  apiVersion?: null | string
  /**
   * FieldsType is the discriminator for the different fields format and version. There is
   * currently only one possible value: "FieldsV1"
   */
  fieldsType?: null | string
  /**
   * FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.
   *
   * Each key is either a '.' representing the field itself, and will always map to an empty
   * set, or a string representing a sub-field or item. The string will follow one of these
   * four formats: 'f:<name>', where <name> is the name of a field in a struct, or key in a
   * map 'v:<value>', where <value> is the exact json formatted value of a list item
   * 'i:<index>', where <index> is position of a item in a list 'k:<keys>', where <keys> is a
   * map of  a list item's key fields to their unique values If a key maps to an empty Fields
   * value, the field that key represents is part of the set.
   *
   * The exact format is defined in sigs.k8s.io/structured-merge-diff
   */
  fieldsV1?: {[key: string]: any} | null
  /**
   * Manager is an identifier of the workflow managing these fields.
   */
  manager?: null | string
  /**
   * Operation is the type of operation which lead to this ManagedFieldsEntry being created.
   * The only valid values for this field are 'Apply' and 'Update'.
   */
  operation?: null | string
  /**
   * Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.
   * Wrappers are provided for many of the factory methods that the time package offers.
   */
  time?: Date | null
}

export interface OwnerReference {
  /**
   * API version of the referent.
   */
  apiVersion: string
  /**
   * If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot
   * be deleted from the key-value store until this reference is removed. Defaults to false.
   * To set this field, a user needs "delete" permission of the owner, otherwise 422
   * (Unprocessable Entity) will be returned.
   */
  blockOwnerDeletion?: boolean | null
  /**
   * If true, this reference points to the managing controller.
   */
  controller?: boolean | null
  /**
   * Kind of the referent. More info:
   * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind: string
  /**
   * Name of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#names
   */
  name: string
  /**
   * UID of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#uids
   */
  uid: string
}

export interface Spec {
  /**
   * IngressBackend describes all endpoints for a given service and port.
   */
  backend?: null | SpecBackend
  /**
   * IngressClassName is the name of the IngressClass cluster resource. The associated
   * IngressClass defines which controller will implement the resource. This replaces the
   * deprecated `kubernetes.io/ingress.class` annotation. For backwards compatibility, when
   * that annotation is set, it must be given precedence over this field. The controller may
   * emit a warning if the field and annotation have different values. Implementations of this
   * API should ignore Ingresses without a class specified. An IngressClass resource may be
   * marked as default, which can be used to set a default value for this field. For more
   * information, refer to the IngressClass documentation.
   */
  ingressClassName?: null | string
  /**
   * A list of host rules used to configure the Ingress. If unspecified, or no rule matches,
   * all traffic is sent to the default backend.
   */
  rules?: Array<null | Rule> | null
  /**
   * TLS configuration. Currently the Ingress only supports a single TLS port, 443. If
   * multiple members of this list specify different hosts, they will be multiplexed on the
   * same port according to the hostname specified through the SNI TLS extension, if the
   * ingress controller fulfilling the ingress supports SNI.
   */
  tls?: Array<null | Tl> | null
}

export interface SpecBackend {
  /**
   * TypedLocalObjectReference contains enough information to let you locate the typed
   * referenced object inside the same namespace.
   */
  resource?: null | PurpleResource
  /**
   * Specifies the name of the referenced service.
   */
  serviceName?: null | string
  servicePort?: number | null | string
}

export interface PurpleResource {
  /**
   * APIGroup is the group for the resource being referenced. If APIGroup is not specified,
   * the specified Kind must be in the core API group. For any other third-party types,
   * APIGroup is required.
   */
  apiGroup?: null | string
  /**
   * Kind is the type of resource being referenced
   */
  kind: string
  /**
   * Name is the name of resource being referenced
   */
  name: string
}

export interface Rule {
  /**
   * Host is the fully qualified domain name of a network host, as defined by RFC 3986. Note
   * the following deviations from the "host" part of the URI as defined in RFC 3986: 1. IPs
   * are not allowed. Currently an IngressRuleValue can only apply to
   * the IP in the Spec of the parent Ingress.
   * 2. The `:` delimiter is not respected because ports are not allowed.
   * Currently the port of an Ingress is implicitly :80 for http and
   * :443 for https.
   * Both these may change in the future. Incoming requests are matched against the host
   * before the IngressRuleValue. If the host is unspecified, the Ingress routes all traffic
   * based on the specified IngressRuleValue.
   *
   * Host can be "precise" which is a domain name without the terminating dot of a network
   * host (e.g. "foo.bar.com") or "wildcard", which is a domain name prefixed with a single
   * wildcard label (e.g. "*.foo.com"). The wildcard character '*' must appear by itself as
   * the first DNS label and matches only a single label. You cannot have a wildcard label by
   * itself (e.g. Host == "*"). Requests will be matched against the Host field in the
   * following way: 1. If Host is precise, the request matches this rule if the http host
   * header is equal to Host. 2. If Host is a wildcard, then the request matches this rule if
   * the http host header is to equal to the suffix (removing the first label) of the wildcard
   * rule.
   */
  host?: null | string
  /**
   * HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example:
   * http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to
   * RFC 3986, this resource will be used to match against everything after the last '/' and
   * before the first '?' or '#'.
   */
  http?: null | HTTP
}

export interface HTTP {
  /**
   * A collection of paths that map requests to backends.
   */
  paths: Array<null | Path>
}

export interface Path {
  /**
   * IngressBackend describes all endpoints for a given service and port.
   */
  backend: PathBackend
  /**
   * Path is matched against the path of an incoming request. Currently it can contain
   * characters disallowed from the conventional "path" part of a URL as defined by RFC 3986.
   * Paths must begin with a '/'. When unspecified, all paths from incoming requests are
   * matched.
   */
  path?: null | string
  /**
   * PathType determines the interpretation of the Path matching. PathType can be one of the
   * following values: * Exact: Matches the URL path exactly. * Prefix: Matches based on a URL
   * path prefix split by '/'. Matching is
   * done on a path element by element basis. A path element refers is the
   * list of labels in the path split by the '/' separator. A request is a
   * match for path p if every p is an element-wise prefix of p of the
   * request path. Note that if the last element of the path is a substring
   * of the last element in request path, it is not a match (e.g. /foo/bar
   * matches /foo/bar/baz, but does not match /foo/barbaz).
   * * ImplementationSpecific: Interpretation of the Path matching is up to
   * the IngressClass. Implementations can treat this as a separate PathType
   * or treat it identically to Prefix or Exact path types.
   * Implementations are required to support all path types. Defaults to
   * ImplementationSpecific.
   */
  pathType?: null | string
}

/**
 * IngressBackend describes all endpoints for a given service and port.
 */
export interface PathBackend {
  /**
   * TypedLocalObjectReference contains enough information to let you locate the typed
   * referenced object inside the same namespace.
   */
  resource?: null | FluffyResource
  /**
   * Specifies the name of the referenced service.
   */
  serviceName?: null | string
  servicePort?: number | null | string
}

export interface FluffyResource {
  /**
   * APIGroup is the group for the resource being referenced. If APIGroup is not specified,
   * the specified Kind must be in the core API group. For any other third-party types,
   * APIGroup is required.
   */
  apiGroup?: null | string
  /**
   * Kind is the type of resource being referenced
   */
  kind: string
  /**
   * Name is the name of resource being referenced
   */
  name: string
}

export interface Tl {
  /**
   * Hosts are a list of hosts included in the TLS certificate. The values in this list must
   * match the name/s used in the tlsSecret. Defaults to the wildcard host setting for the
   * loadbalancer controller fulfilling this Ingress, if left unspecified.
   */
  hosts?: Array<null | string> | null
  /**
   * SecretName is the name of the secret used to terminate TLS traffic on port 443. Field is
   * left optional to allow TLS routing based on SNI hostname alone. If the SNI host in a
   * listener conflicts with the "Host" header field used by an IngressRule, the SNI host is
   * used for termination and value of the Host header is used for routing.
   */
  secretName?: null | string
}

export interface Status {
  /**
   * LoadBalancerStatus represents the status of a load-balancer.
   */
  loadBalancer?: null | LoadBalancer
}

export interface LoadBalancer {
  /**
   * Ingress is a list containing ingress points for the load-balancer. Traffic intended for
   * the service should be sent to these ingress points.
   */
  ingress?: Array<null | IngressL> | null
}

export interface IngressL {
  /**
   * Hostname is set for load-balancer ingress points that are DNS based (typically AWS
   * load-balancers)
   */
  hostname?: null | string
  /**
   * IP is set for load-balancer ingress points that are IP based (typically GCE or OpenStack
   * load-balancers)
   */
  ip?: null | string
  /**
   * Ports is a list of records of service ports If used, every port defined in the service
   * should have an entry in it
   */
  ports?: Array<null | Port> | null
}

export interface Port {
  /**
   * Error is to record the problem with the service port The format of the error shall comply
   * with the following rules: - built-in error values shall be specified in this file and
   * those shall use
   * CamelCase names
   * - cloud provider specific error values must have names that comply with the
   * format foo.example.com/CamelCase.
   */
  error?: null | string
  /**
   * Port is the port number of the service port of which status is recorded here
   */
  port: number
  /**
   * Protocol is the protocol of the service port of which status is recorded here The
   * supported values are: "TCP", "UDP", "SCTP"
   */
  protocol: string
}
