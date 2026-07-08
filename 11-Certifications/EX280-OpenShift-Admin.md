---
tags: [certification, openshift, admin, ex280]
status: active
created: 2025-07-08
---

# 🎯 EX280 — Red Hat Certified OpenShift Administrator

> The benchmark certification for configuring, securing, and managing OpenShift clusters. Tests RBAC, identity providers, NetworkPolicies, pod scheduling, and workload storage.

---

## Exam Overview

| | |
|---|---|
| **Code** | EX280 |
| **Duration** | 3 hours |
| **Format** | Performance-based on live OpenShift environment |
| **Prep Course** | [[DO280-OpenShift-Administration-II]] |
| **Learning Path** | [[OpenShift-Administrator-Path]] |

---

## ⚡ EX280 Exam Quick-Reference Cheat Sheet

### 1. User Authentication & Identity Providers (IDP)
```bash
# Upload users file as a Secret in openshift-config
oc create secret generic my-htpasswd-secret --from-file=htpasswd=/tmp/users.htpasswd -n openshift-config

# Edit OAuth cluster configuration
oc edit oauth cluster
# (Inject htpasswd provider configuration)
```

### 2. Access Control (RBAC)
```bash
# Bind local role to user
oc adm policy add-role-to-user edit alice -n project-dev

# Bind local role to group
oc adm policy add-role-to-group view dev-group -n project-prod

# Bind cluster role to user (e.g. cluster-admin)
oc adm policy add-cluster-role-to-user cluster-admin leader-user
```

### 3. Traffic Isolation (NetworkPolicies)
```yaml
# Basic allow-from-project-only NetworkPolicy:
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-ingress-frontend
  namespace: database-ns
spec:
  podSelector: {}
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: frontend-ns
```

### 4. Scheduling & Node Affinities
```bash
# Label a Node
oc label node worker-1.example.com type=fast-storage

# Bind Deployment to labeled Node via selector
oc set env deployment/app-deployment --overwrite nodeSelector="type=fast-storage"

# Taint a Node (stops arbitrary scheduling)
oc adm taint nodes worker-2.example.com dedicated=special:NoSchedule
```

### 5. Enforcing Resource Limits & Quotas
```bash
# Set Pod requests and limits
oc set resources deployment/my-app --requests=cpu=100m,memory=256Mi --limits=cpu=200m,memory=512Mi
```

---

## 🏆 Golden Rules for Passing EX280

1. **Verify Secret Targets first:**
   When setting up identity providers, ensure your HTPasswd secret is created in the **`openshift-config`** namespace. Setting it in a custom project namespace will prevent the OAuth operator from reading it.
   
2. **Watch the OAuth Rollout:**
   After applying changes to `oauth cluster`, watch the progress of the OAuth cluster operator:
   `oc get co/authentication -w`
   Ensure the operator status is `Progressing=False` and `Available=True` before testing logins.

3. **Label Namespaces before referencing them in NetworkPolicies:**
   When targeting specific ingress source namespaces using `namespaceSelector`, ensure those namespaces are labeled appropriately. OpenShift 4 automatically sets the label `kubernetes.io/metadata.name=<namespace-name>` which is the safest selector to use.

4. **Assign the correct ServiceAccount inside Pod specs:**
   If a application workload needs specific permissions (e.g., bypassing SCC restrictions or calling APIs), make sure you assign the custom `ServiceAccount` in the Pod's `spec.serviceAccountName` block.

---

## 📝 EX280 Mock Practice Exam

Complete the following tasks in under **3 hours**.

### Task 1: Local User Identity Provider (IDP)
1. Configure an HTPasswd identity provider named `lab-users`.
2. Create an htpasswd file containing:
   - User `manager` with password `redhat123`
   - User `coder` with password `redhat123`
3. Bind the file to a Secret named `lab-htpasswd-secret` in the `openshift-config` namespace.
4. Update the OAuth resource configuration and ensure both users can log in.

### Task 2: Multi-Project Authorization
1. Create a project named `engineering-dev`.
2. Create a project named `engineering-prod`.
3. Assign the local role `edit` to user `coder` in `engineering-dev`.
4. Assign the local role `view` to user `coder` in `engineering-prod`.
5. Create a cluster group named `qa-staff` and add the user `manager` to it.
6. Grant `qa-staff` group `edit` permissions in `engineering-prod`.

### Task 3: Secure Ingress Routing
1. Deploy an application named `app-secure` inside `engineering-prod` using the image `registry.access.redhat.com/ubi9/nginx-120`.
2. Configure a Service exposing port `8080`.
3. Create a secure **Edge** HTTPS Route named `app-ssl` with the hostname `app-secure.engineering.apps.cluster.example.com`. Use self-signed certificates or let the router generate them.

### Task 4: Ingress Network Security Policy
1. Configure the `engineering-prod` namespace to deny all incoming traffic except:
   - Port `8080` traffic coming from the `engineering-dev` namespace.
   - Any ingress traffic originating from pods inside its own namespace.

### Task 5: Pod Scheduling Controls
1. Identify a worker node.
2. Label the node as `zone=secure`.
3. Configure the `app-secure` deployment to ensure its pods are scheduled *only* on nodes carrying the `zone=secure` label.
4. Taint a different worker node with `restricted=true:NoSchedule`. Ensure no new workloads are scheduled on it unless they tolerate this taint.

### Task 6: Namespace Resource Limits
1. In project `engineering-dev`, create a ResourceQuota named `project-quota` limiting the namespace to a maximum of:
   - 8 Pods
   - 4 CPU requests total
   - 6Gi Memory limits total

---

## Related Notes
- [[DO280-OpenShift-Administration-II]] — Course companion
- [[SCC-Security-Context-Constraints]] — Security context rules
- [[Network-Policies]] — Microsegmentation strategies
- [[OpenShift-Administrator-Path]] — Learning path MOC
