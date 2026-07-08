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
| **Prerequisites** | [[DO180-OpenShift-Administration-I]] or equivalent |
| **Next Step** | [[DO380-OpenShift-Administration-III]] |
| **Certification** | Maps directly to [[EX280-OpenShift-Admin]] |
| **Learning Path** | [[OpenShift-Administrator-Path]] |

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

OpenShift includes a built-in OAuth server. Users request tokens from the OAuth server, which validates credentials against a configured **Identity Provider (IDP)**.

```
  1. Login request
  User ───────────────▶ OAuth Server (Built-in)
                            │
                            │ 2. Validate credentials
                            ▼
                    Identity Provider (IDP)
               (HTPasswd, LDAP, Keycloak, etc.)
```

### Configuring HTPasswd Identity Provider

HTPasswd is a quick, file-backed identity provider useful for testing or local admin configuration.

```bash
# 1. Create a local htpasswd file with users
htpasswd -c -B -b /tmp/users.htpasswd admin redhat123
htpasswd -B -b /tmp/users.htpasswd developer dev123

# 2. Upload the file as a Secret in the openshift-config namespace
oc create secret generic htpasswd-secret --from-file=htpasswd=/tmp/users.htpasswd -n openshift-config

# 3. Edit the OAuth cluster configuration to use this provider
oc edit oauth cluster
```

**OAuth Resource configuration snippet (`oauth.spec`):**
```yaml
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
# List local cluster users
oc get users
oc get identities

# Create a local group
oc create group dev-team

# Add users to a group
oc adm groups add-users dev-team developer
oc get groups
```

---

## Module 2: Role-Based Access Control (RBAC)

### RBAC Hierarchy

OpenShift differentiates between **Cluster Roles** (cluster-wide access) and **Local Roles** (namespace-scoped access).

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

**Common Predefined Roles:**
- `admin` — Full control within a single project (can manage permissions).
- `edit` — Modify resources in a project, but cannot manage local roles.
- `view` — Read-only access to resources in a project.
- `cluster-admin` — Superuser access across the entire cluster.

### Configuring Permissions via CLI

```bash
# Assign local role to a user
oc adm policy add-role-to-user edit developer -n my-app-dev

# Assign local role to a group
oc adm policy add-role-to-group view dev-team -n my-app-prod

# Assign cluster-wide admin role (use with caution!)
oc adm policy add-cluster-role-to-user cluster-admin admin-user

# Remove permission mappings
oc adm policy remove-role-from-user edit developer -n my-app-dev
```

---

## Module 3: Secure Cluster Ingress & Routes

### Service to Route Mechanics

OpenShift Routes expose Services externally by registering DNS names on the OpenShift Ingress Controller (HAProxy-based).

```
 External Traffic ──▶ Router (HAProxy) ──▶ Service (Cluster IP) ──▶ Pod (Container)
```

### HTTPS Route Encryption Types

| Type | Decryption Point | Router-to-Pod Protocol | Notes |
|---|---|---|---|
| **Edge** | At the Router | Unencrypted (HTTP) | Easiest to manage; certificates hosted on Router |
| **Passthrough** | At the Pod | Encrypted (HTTPS) | Most secure; certificate managed inside application |
| **Re-encrypt** | At Router AND Pod | Encrypted (HTTPS) | Double encryption; certificate changed at Router |

### Creating Secure Routes via CLI

```bash
# Create an Edge HTTPS Route
oc create route edge secure-web --service=webserver \
  --hostname=secure.apps.cluster.example.com \
  --key=/tmp/tls.key --cert=/tmp/tls.crt

# Create a Passthrough HTTPS Route (no certs uploaded to router)
oc create route passthrough secure-db --service=mysql-ssl \
  --hostname=db.apps.cluster.example.com
```

---

## Module 4: Network Isolation (NetworkPolicies)

By default in Kubernetes and OpenShift, all pods in all projects can talk to each other. **NetworkPolicies** define firewall rules between namespace boundaries.

### Default Deny-All ingress policy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: my-app-dev
spec:
  podSelector: {} # Selects all pods in this project
  policyTypes:
  - Ingress
```

### Allowing Ingress Traffic from Specific Projects

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-only
  namespace: my-app-dev
spec:
  podSelector:
    matchLabels:
      role: database # Apply rule only to database pods
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: frontend-ns # Only allow traffic from this namespace
```

---

## Module 5: Control Pod Scheduling

### Node Selectors (Simple Placement)

Assign labels to nodes, and tell deployments to run only on nodes with matching labels.

```bash
# Label a node
oc label node worker-1.example.com node-role.kubernetes.io/infra=

# Update deployment to target this label
oc set env deployment/router -c=router --overwrite \
  nodeSelector="node-role.kubernetes.io/infra="
```

### Taints and Tolerations

Taints allow a node to **repel** a set of pods. A pod must have a matching **toleration** to run on a tainted node.

```bash
# Taint a node
oc adm taint nodes node-2.example.com dedicated=db:NoSchedule
#   Effect: NoSchedule, PreferNoSchedule, or NoExecute

# Add toleration to a Pod specification:
spec:
  tolerations:
  - key: "dedicated"
    operator: "Equal"
    value: "db"
    effect: "NoSchedule"
```

---

## Module 6: Resource Quotas and LimitRanges

### ResourceQuotas (Project-wide constraints)

Restricts the total sum of CPU, Memory, or Resource count in a project.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-resources
  namespace: my-app-dev
spec:
  hard:
    pods: "10"
    requests.cpu: "4"
    requests.memory: "8Gi"
    limits.cpu: "8"
    limits.memory: "16Gi"
```

### LimitRanges (Default container constraints)

Defines default requests and limits for any container created *without* them, and defines min/max acceptable requests.

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: my-app-dev
spec:
  limits:
  - default: # Default limits
      cpu: 500m
      memory: 512Mi
    defaultRequest: # Default requests
      cpu: 200m
      memory: 256Mi
    type: Container
```

---

## Module 7: Security Context Constraints (SCC)

SCCs govern what actions a pod can perform in OpenShift (similar to Pod Security Standards in K8s).

| SCC | Permissions |
|---|---|
| **restricted-v2** | Default SCC. No root execution, no host network, no host path mount |
| **anyuid** | Allows running containers as any user ID (including root) |
| **privileged** | Full administrative system rights on host node |

```bash
# Check SCCs mapped to a service account
oc describe scc restricted-v2

# Grant a ServiceAccount permissions to run as root (anyuid)
oc adm policy add-scc-to-user anyuid -z default -n my-app-dev
#   -z = service account name
```

---

## Related Notes

- [[OAuth-and-Identity-Providers]] — Detailed OAuth steps
- [[Network-Policies]] — Microsegmentation strategies
- [[Ingress-and-Routes]] — Secure routes configurations
- [[Machine-Sets-and-Machine-Config]] — Infrastructure configuration
- [[EX280-OpenShift-Admin]] — Exam study guide
- [[OpenShift-Administrator-Path]] — MOC
