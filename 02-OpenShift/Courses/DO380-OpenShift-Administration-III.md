---
tags: [openshift, course, administration, advanced]
course_code: DO380
course_title: "OpenShift Administration III: Scaling Deployments in the Enterprise"
duration: "5 days"
format: "Classroom, Virtual, Self-paced"
cost: Subscription
prerequisites: "DO280 or EX280 recommended"
certification_prep: EX380
status: active
created: 2025-07-08
---

# 📙 DO380 — OpenShift Administration III: Scaling Deployments in the Enterprise

> The advanced administration course for Red Hat OpenShift. Teaches how to scale operations, implement GitOps workflows, customize logging/monitoring, automate cluster changes, and govern multi-cluster environments.

---

## Course Overview

| | |
|---|---|
| **Code** | DO380 |
| **Duration** | 5 days (40 hours) |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | [[DO280-OpenShift-Administration-II]] or [[EX280-OpenShift-Admin]] |
| **Certification** | Maps directly to [[EX380-OpenShift-Advanced]] |
| **Learning Path** | [[OpenShift-Administrator-Path]] |

## Learning Objectives

After completing this course, you will be able to:
1. Manage Operators using the Operator Lifecycle Manager (OLM)
2. Deploy applications using GitOps workflows with OpenShift GitOps (Argo CD)
3. Customize cluster monitoring, metrics collections, and alerting
4. Configure centralized cluster logging for auditing and troubleshooting
5. Apply cluster node OS changes using MachineConfigs and the Machine Config Operator (MCO)
6. Manage cluster updates and upgrade channels
7. Implement cluster backup and restore strategies using OADP (Velero)
8. Administer and govern multiple clusters using Red Hat Advanced Cluster Management (ACM)

---

## Module 1: Operator Lifecycle Manager (OLM)

### What is an Operator?
An Operator is a method of packaging, deploying, and managing a Kubernetes application. It extends the Kubernetes API with **Custom Resource Definitions (CRDs)** and runs a control loop controller to manage their state.

### OLM Components

```
┌────────────────────────────────────────────────────────┐
│             Operator Lifecycle Manager (OLM)           │
├─────────────────┬─────────────────┬────────────────────┤
│  CatalogSource  │   Subscription  │  ClusterService-   │
│                 │                 │    Version (CSV)   │
└─────────────────┴─────────────────┴────────────────────┘
```

- **CatalogSource:** Defines a repository of available operators (e.g., OperatorHub).
- **Subscription:** Links a namespace to an operator stream, ensuring automatic updates.
- **ClusterServiceVersion (CSV):** The manifest representation of an operator release version.
- **InstallPlan:** Created by OLM to install the required resources for a CSV.

### Installing an Operator via CLI

```bash
# 1. Create a Namespace for the Operator (if not global)
oc create namespace my-operator-ns

# 2. Create an OperatorGroup (defines target namespaces)
cat <<EOF | oc apply -f -
apiVersion: operators.coreos.com/v1
kind: OperatorGroup
metadata:
  name: my-operatorgroup
  namespace: my-operator-ns
spec:
  targetNamespaces:
  - my-operator-ns
EOF

# 3. Create a Subscription to install the operator
cat <<EOF | oc apply -f -
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: my-subscription
  namespace: my-operator-ns
spec:
  channel: stable
  name: elasticsearch-operator
  source: redhat-operators
  sourceNamespace: openshift-marketplace
EOF

# Verify installation progress
oc get csv -n my-operator-ns
```

---

## Module 2: GitOps Workflows with OpenShift GitOps

OpenShift GitOps is based on **Argo CD**. It uses a Git repository as the single source of truth for cluster state, automatically synchronizing changes.

```
 Git Repository (YAMLs) ──▶ Argo CD Controller ──▶ OpenShift Cluster (Desired State)
```

### Syncing an Application via CLI

```bash
# Create an Argo CD Application resource
cat <<EOF | oc apply -f -
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: guestbook
  namespace: openshift-gitops
spec:
  project: default
  source:
    repoURL: https://github.com/argoproj/argocd-example-apps.git
    targetRevision: HEAD
    path: guestbook
  destination:
    server: https://kubernetes.default.svc
    namespace: my-guestbook-app
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
EOF

# Verify synchronization
oc get pods -n my-guestbook-app
```

---

## Module 3: Advanced Cluster Monitoring

OpenShift provides a pre-configured monitoring stack based on Prometheus, Grafana, and Alertmanager.

### Monitoring User-Defined Projects

By default, monitoring is only active for cluster-level services. You must enable it for your applications:

```bash
# Enable user workload monitoring
oc edit configmap cluster-monitoring-config -n openshift-monitoring
```

**ConfigMap specification configuration:**
```yaml
data:
  config.yaml: |
    enableUserWorkload: true
```

### Creating a ServiceMonitor

A ServiceMonitor tells Prometheus which endpoints to scrape for metrics.

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: app-monitor
  namespace: my-app-dev
spec:
  selector:
    matchLabels:
      app: my-app # Targets pods with this label
  endpoints:
  - port: web # Scrape port named "web"
    path: /metrics
    interval: 30s
```

---

## Module 4: Centralized Cluster Logging

OpenShift logging aggregates stdout/stderr logs from all pods, nodes, and system services.

### Installation Architecture
- **Collector:** Fluentd or Vector (runs as DaemonSet on all nodes)
- **Store:** Elasticsearch or Loki (central database)
- **Visualization:** Kibana or Grafana (user interface)

```bash
# View active log forwarding pipelines
oc get logforwarding -n openshift-logging
```

---

## Module 5: Node OS Configuration (MachineConfigs)

On Red Hat OpenShift, the underlying node operating system is **RHCOS**. Administrators do not log in via SSH to edit files; they apply **MachineConfigs** which are rolled out by the Machine Config Operator (MCO).

```
 Admin edits MachineConfig ──▶ MCO ──▶ Nodes (Ignition file rewrite + reboot if needed)
```

### Example: Setting SSH Banner via MachineConfig

```yaml
apiVersion: machineconfiguration.openshift.io/v1
kind: MachineConfig
metadata:
  labels:
    machineconfiguration.openshift.io/role: worker
  name: 99-worker-ssh-banner
spec:
  config:
    ignition:
      version: 3.2.0
    storage:
      files:
      - contents:
          source: data:,WARNING%3A%20Authorized%20access%20only%21
        mode: 420
        overwrite: true
        path: /etc/issue
```

```bash
# Apply configuration
oc apply -f mc-banner.yaml

# Check rollout progress across workers
oc get machineconfigpools
# worker pool will show UPDATING=True, then UPDATED=True
```

---

## Module 6: Cluster Upgrades

OpenShift clusters use **update graphs** (channels) to ensure safe upgrade paths:
- **EUS (Extended Update Support):** Annual, long-term support release tracks.
- **Fast:** Quick updates as soon as releases are available.
- **Stable:** Recommended path after releases undergo soak testing.

```bash
# View current cluster version and updates
oc get clusterversion

# Start a cluster upgrade to a target version
oc adm upgrade --to=4.12.15
```

---

## Module 7: Multi-Cluster Management (ACM)

Red Hat Advanced Cluster Management (ACM) allows management of multiple OpenShift clusters from a single hub cluster:
- **Hub Cluster:** The primary cluster running the ACM management software.
- **Managed Clusters:** Spoke clusters governed by the Hub cluster.

```bash
# List governed clusters on Hub
oc get managedclusters
```

---

## Related Notes

- [[OpenShift-GitOps-ArgoCD]] — GitOps workflows
- [[Cluster-Logging-EFK]] — Logging pipelines
- [[ACM-Advanced-Cluster-Management]] — Multi-cluster control plane
- [[EX380-OpenShift-Advanced]] — Study guide
- [[OpenShift-Administrator-Path]] — MOC
