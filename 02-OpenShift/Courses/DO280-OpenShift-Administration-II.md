---
tags: [openshift, course, administration, intermediate]
course_code: DO280
course_title: "OpenShift Administration II: Configuring a Production Cluster"
duration: "5 days"
format: "Classroom, Virtual, Self-paced"
cost: Subscription
prerequisites: "DO180 or equivalent experience"
certification_prep: EX280
status: active
created: 2025-07-08
---

# 📘 DO280 — OpenShift Administration II: Configuring a Production Cluster

> The core cluster administration course for Red Hat OpenShift. Teaches how to configure authentication, set up cluster networking, manage scheduling, enforce resource boundaries, and secure application workloads.

---

## Course Overview

| | |
|---|---|
| **Code** | DO280 |
| **Duration** | 5 days (40 hours) |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | [DO180-OpenShift-Administration-I](DO180-OpenShift-Administration-I.md) or equivalent |
| **Next Step** | [DO380-OpenShift-Administration-III](DO380-OpenShift-Administration-III.md) |
| **Certification** | Maps directly to [EX280-OpenShift-Admin](../../11-Certifications/EX280-OpenShift-Admin.md) |
| **Learning Path** | [OpenShift-Administrator-Path](../../01-Learning-Paths/OpenShift-Administrator-Path.md) |

## Learning Objectives

After completing this course, you will be able to:
1. Configure OpenShift authentication using identity providers (e.g., HTPasswd, LDAP)
2. Enforce secure access control using Role-Based Access Control (RBAC)
3. Manage service network traffic and create secure routes (Edge, Passthrough, Re-encrypt)
4. Enforce namespace boundaries with Kubernetes NetworkPolicies
5. Control pod scheduling using node selectors, taints, tolerations, and affinities
6. Control cluster resource consumption using ResourceQuotas and LimitRanges
7. Configure Security Context Constraints (SCC) to isolate container workloads
8. Perform basic cluster updates and node maintenance tasks

---

## Module 1: Authentication & User Management

### OAuth Architecture in OpenShift
OpenShift includes a built-in OAuth server. When users log in, the OAuth server validates credentials against the configured **Identity Provider (IDP)**. If valid, the OAuth server issues an API token back to the user.

```
  1. Login request
  User ───────────────▶ OAuth Server (Built-in)
                             │
                             │ 2. Validate credentials
                             ▼
                     Identity Provider (IDP)
                (HTPasswd, LDAP, Keycloak, etc.)
```

### Identity Provider Mapping Methods
- **`claim`:** Automatically provisions a new user based on their IDP username. This is the default.
- **`lookup`:** Only allows users who already have an existing `User` object manually created in OpenShift.
- **`add`:** Adds the login identity to an existing user if a matching username exists; otherwise, it fails.

### Configuring HTPasswd Identity Provider
HTPasswd is a quick file-backed provider.

```bash
# 1. Create a local htpasswd file with users
htpasswd -c -B -b /tmp/users.htpasswd admin redhat123
htpasswd -B -b /tmp/users.htpasswd developer dev123

# 2. Upload the file as a Secret in the openshift-config namespace
oc create secret generic htpasswd-secret --from-file=htpasswd=/tmp/users.htpasswd -n openshift-config

# 3. Edit the OAuth cluster configuration to reference this secret
oc edit oauth cluster
```

**OAuth custom resource configuration (`oauth.spec`):**
```yaml
apiVersion: config.openshift.io/v1
kind: OAuth
metadata:
  name: cluster
spec:
  identityProviders:
  - name: my-htpasswd-provider
    mappingMethod: claim
    type: HTPasswd
    htpasswd:
      fileData:
        name: htpasswd-secret
```

### Managing Users and Groups
```bash
# Get all mapped users and identities
oc get users
oc get identities

# Create group for development team
oc create group dev-team

# Add user "developer" to group
oc adm groups add-users dev-team developer
```

---

## Module 2: Role-Based Access Control (RBAC)

### RBAC Hierarchy
OpenShift maps permissions using standard Kubernetes Role-Based Access Control objects.

```
                      ┌──────────────────┐
                      │    Subject       │ (User, Group, ServiceAccount)
                      └────────┬─────────┘
                               │
                       Mapped via Bindings
                               │
                               ▼
                      ┌──────────────────┐
                      │     Role         │ (Set of API action rules)
                      └──────────────────┘
```

### Predefined Roles
- `view`: Read-only access to most resources in a project. Cannot read Secrets.
- `edit`: Read/write access within a project. Cannot modify roles or bindings.
- `admin`: Full control within a project, including managing local RBAC.
- `cluster-admin`: Full superuser access across all projects and cluster configurations.

### RBAC API Verb Structure
Permissions are structured as API rules targeting resource groups and actions:

| API Group | Resources | Verbs |
|---|---|---|
| `""` (Core) | `pods`, `services`, `configmaps`, `secrets` | `get`, `list`, `watch`, `create`, `update`, `patch`, `delete` |
| `apps` | `deployments`, `statefulsets` | `get`, `list`, `create`, `update`, `delete` |
| `route.openshift.io` | `routes` | `get`, `list`, `create`, `update`, `delete` |

### CLI Administration Commands
```bash
# Assign local role to a user within a project
oc adm policy add-role-to-user edit developer -n my-project

# Assign local role to a group within a project
oc adm policy add-role-to-group view dev-team -n my-project

# Assign cluster role to a user (across all namespaces)
oc adm policy add-cluster-role-to-user cluster-admin cluster-ops-user

# Check current local bindings in a project
oc get rolebindings -n my-project
```

---

## Module 3: Secure Cluster Ingress & Routes

OpenShift Ingress router is driven by an HAProxy daemon running inside the cluster. It intercepts traffic targeting Route domains and directs them to the target Service IPs.

```
  HTTPS Client ──▶ Router (HAProxy Decrypts Edge) ──▶ Service IP ──▶ Pods
```

### Route Encryption Types

#### 1. Edge Route
TLS is terminated at the router. Traffic from the router to the backend pods is unencrypted HTTP.
```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: edge-route
  namespace: my-project
spec:
  to:
    kind: Service
    name: frontend-svc
  port:
    targetPort: 8080
  tls:
    termination: edge
    key: |-
      -----BEGIN PRIVATE KEY-----
      MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3...
      -----END PRIVATE KEY-----
    certificate: |-
      -----BEGIN CERTIFICATE-----
      MIIDzTCCArWgAwIBAgIQC...
      -----END CERTIFICATE-----
```

#### 2. Passthrough Route
Router does not decrypt the traffic. The encrypted packet is passed directly to the pod. The application running in the pod must manage the SSL handshake and certificates.
```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: passthrough-route
  namespace: my-project
spec:
  to:
    kind: Service
    name: database-ssl-svc
  port:
    targetPort: 8443
  tls:
    termination: passthrough
```

#### 3. Re-encrypt Route
Router terminates TLS with an external certificate, inspects header policies, and then initiates a *new* TLS handshake with the backend pod using an internal CA certificate.
```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: reencrypt-route
  namespace: my-project
spec:
  to:
    kind: Service
    name: backend-secure-svc
  port:
    targetPort: 8443
  tls:
    termination: reencrypt
    key: |
      -----BEGIN PRIVATE KEY-----
      ...
    certificate: |
      -----BEGIN CERTIFICATE-----
      ...
    destinationCACertificate: |
      -----BEGIN CERTIFICATE-----
      ... (CA to validate backend pod cert)
```

---

## Module 4: Network Isolation (NetworkPolicies)

By default, Kubernetes has a flat network where all pods can communicate with all other pods across any project boundaries. OpenShift utilizes OVN-Kubernetes CNI to enforce isolation using **NetworkPolicies**.

### Complete Isolation manifests

#### 1. Default Deny-All Ingress (`deny-all.yaml`)
Ensures no outside traffic can reach pods in the namespace unless explicitly allowed by another policy.
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: my-project
spec:
  podSelector: {} # Targets all pods in this project
  policyTypes:
  - Ingress
```

#### 2. Allow Only from Frontend Namespace (`allow-frontend.yaml`)
Allows incoming traffic to database pods *only* if the traffic originates from pods in the namespace labeled `kubernetes.io/metadata.name: frontend-project`.
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-only
  namespace: my-project
spec:
  podSelector:
    matchLabels:
      role: database
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: frontend-project
```

#### 3. Allow Egress Only to DB Port (`allow-egress-db.yaml`)
Restricts outward traffic from app pods to only allow traffic going to port 5432.
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: limit-app-egress
  namespace: my-project
spec:
  podSelector:
    matchLabels:
      role: app
  policyTypes:
  - Egress
  egress:
  - to:
    - podSelector:
        matchLabels:
          role: database
    ports:
    - protocol: TCP
      port: 5432
```

---

## Module 5: Control Pod Scheduling

### Node Selectors
Specifies basic label requirements for pod scheduling.
```yaml
# Pod spec snippet:
spec:
  nodeSelector:
    node-role.kubernetes.io/infra: ""
```

### Node Affinity
Provides granular placement rules using logical operators (In, NotIn, Exists, etc.).
- **`requiredDuringSchedulingIgnoredDuringExecution`:** Hard constraint (must match or scheduling fails).
- **`preferredDuringSchedulingIgnoredDuringExecution`:** Soft constraint (scheduler attempts to place, but falls back if unavailable).

```yaml
# Pod spec snippet:
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: topology.kubernetes.io/zone
            operator: In
            values:
            - us-east-1a
            - us-east-1b
```

### Taints and Tolerations
Nodes can be tainted to repel pods. Pods will only schedule if they have matching tolerations.
```bash
# Taint node to repel all pods except db
oc adm taint nodes worker-1.example.com dedicated=db-only:NoSchedule
```

```yaml
# Pod spec snippet to tolerate the taint:
spec:
  tolerations:
  - key: "dedicated"
    operator: "Equal"
    value: "db-only"
    effect: "NoSchedule"
```

---

## Module 6: Resource Quotas and LimitRanges

### ResourceQuotas
Defines total aggregate resource consumption limit for a project.
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: project-quota
  namespace: my-project
spec:
  hard:
    pods: "5"
    requests.cpu: "2"
    requests.memory: "4Gi"
    limits.cpu: "4"
    limits.memory: "8Gi"
```

### LimitRanges
Defines default resource requests/limits for individual containers within the project.
```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: container-limits
  namespace: my-project
spec:
  limits:
  - default:
      cpu: 500m
      memory: 512Mi
    defaultRequest:
      cpu: 100m
      memory: 256Mi
    type: Container
```

---

## Module 7: Security Context Constraints (SCC)

OpenShift uses SCCs to govern pod security permissions (e.g. access to host networks, host path storage mounts, or running as root).
- **`restricted-v2`:** Default policy. Forces containers to run with a random non-root UID, blocks host access.
- **`anyuid`:** Allows container to run as user root (`UID 0`). Often needed for legacy database/web server images.
- **`privileged`:** Full container access to host node hardware and kernel features.

### Troubleshooting SCC Failures
- **Issue:** Running a third-party image fails with `CreateContainerConfigError` or `Permission Denied` because it attempts to write to `/var/run` or run as root user.
- **Diagnostics:**
  ```bash
  # Check events to see if pod is rejected due to SCC constraints
  oc get events --sort-by='.metadata.creationTimestamp'
  ```
- **Remediation:** Grant the service account permissions to run under `anyuid` SCC:
  ```bash
  oc adm policy add-scc-to-user anyuid -z default -n my-project
  ```

---

## Practice Lab: Multi-Tenant Security & Isolation

### Objective
Create two projects, isolate them using a NetworkPolicy, and grant restricted access to developer teams.

### Step 1: Create Projects
```bash
oc new-project secure-frontend
oc new-project secure-backend
```

### Step 2: Deploy Workloads
```bash
# Deploy a frontend web server
oc create deployment web --image=registry.access.redhat.com/ubi9/nginx-120 -n secure-frontend
oc expose deployment/web --port=8080 -n secure-frontend

# Deploy a backend application
oc create deployment database --image=registry.access.redhat.com/ubi9/mariadb-105 -n secure-backend
oc expose deployment/database --port=3306 -n secure-backend
```

### Step 3: Verify Cross-Namespace Access (Before Network Policy)
```bash
# Test connectivity from frontend namespace to backend database service
oc exec -it deployment/web -n secure-frontend -- curl -v database.secure-backend.svc:3306
# Output should show "Connected to database" (or connection attempt packets received)
```

### Step 4: Apply Network Isolation Policy
Create a NetworkPolicy in `secure-backend` to reject all traffic except that which comes from the `secure-frontend` project.

Label the frontend project:
```bash
oc label namespace secure-frontend role=frontend
```

Apply the policy in `secure-backend`:
```yaml
# backend-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-only
  namespace: secure-backend
spec:
  podSelector: {} # Target all pods in backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          role: frontend
```
```bash
oc apply -f backend-policy.yaml
```

### Step 5: Verify Isolation
Create a third project `external-sandbox` and attempt to curl the database. It should fail (timeout). Traffic from `secure-frontend` to `secure-backend` should still succeed.

---

## Related Notes

- [OAuth-and-Identity-Providers](../Security/OAuth-and-Identity-Providers.md) — Detailed OAuth steps
- [Network-Policies](../Security/Network-Policies-Security.md) — Microsegmentation strategies
- [Ingress-and-Routes](../Networking/Ingress-and-Routes.md) — Secure routes configurations
- [Machine-Sets-and-Machine-Config](../Scaling-and-Performance/Machine-Sets-and-Machine-Config.md) — Infrastructure configuration
- [EX280-OpenShift-Admin](../../11-Certifications/EX280-OpenShift-Admin.md) — Exam study guide
- [OpenShift-Administrator-Path](../../01-Learning-Paths/OpenShift-Administrator-Path.md) — MOC
