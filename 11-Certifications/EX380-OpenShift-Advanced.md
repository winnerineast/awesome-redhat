---
tags: [certification, openshift, admin, advanced, ex380]
status: active
created: 2025-07-08
---

# 🎯 EX380 — Red Hat Certified Advanced System Administrator in OpenShift

> The pinnacle certification for OpenShift administration. Tests advanced operations at scale, GitOps workflow deployments, central logging customization, Prometheus metric integrations, Node OS configurations, and ACM cluster governance.

---

## Exam Overview

| | |
|---|---|
| **Code** | EX380 |
| **Duration** | 3 hours |
| **Format** | Performance-based on live OpenShift environment |
| **Prep Course** | [[DO380-OpenShift-Administration-III]] |
| **Learning Path** | [[OpenShift-Administrator-Path]] |

---

## ⚡ EX380 Exam Quick-Reference Cheat Sheet

### 1. GitOps Sync Tactic (Argo CD)
```yaml
# Apply application sync mapping:
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: deployment-sync
  namespace: openshift-gitops
spec:
  project: default
  source:
    repoURL: https://github.com/mygit/infra-apps.git
    targetRevision: HEAD
    path: k8s-yamls
  destination:
    server: https://kubernetes.default.svc
    namespace: target-app-ns
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

### 2. User Workload Monitoring
```yaml
# Enable metrics scraping via ServiceMonitor:
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: app-metrics-scrape
  namespace: my-app-dev
spec:
  selector:
    matchLabels:
      app: web-server
  endpoints:
  - port: web-metrics
    path: /metrics
    interval: 15s
```

### 3. Node Configuration (MachineConfig)
```bash
# Verify MachineConfigPool states
oc get mcp

# List all MachineConfigs applied to nodes
oc get mc
```

### 4. Cluster Upgrade commands
```bash
# Check upgrade progress
oc get clusterversion

# View upgrade status details
oc describe clusterversion

# Upgrade to target version
oc adm upgrade --to=4.12.30
```

---

## 🏆 Golden Rules for Passing EX380

1. **Verify GitOps Namespace:**
   Always run your Argo CD applications in the namespace where the Argo CD operator controller is running (typically **`openshift-gitops`**). Placing the `Application` resource in your target workspace namespace will not trigger synchronization.
   
2. **Double Check Prometheus Service Names:**
   Ensure the `matchLabels` under the `ServiceMonitor` selector targets the **Service** object labels, not the Pod labels directly. The Service must have matching labels and expose the port name specified in your ServiceMonitor.

3. **Monitor Node Reboot Loops during MachineConfig Rollout:**
   Applying a new `MachineConfig` changes node files and can trigger a node reboot. Monitor with `oc get nodes -w` and `oc get mcp` to make sure nodes recover and report `UPDATED=True`.

4. **Verify Persistent Storage for Logs:**
   Central logging operators will fail to instantiate logging databases if there is no default dynamic `StorageClass` or if the storage allocation exceeds available limits. Verify disk availability with `oc get sc` and `oc describe pvc` before applying logging manifests.

---

## 📝 EX380 Mock Practice Exam

Complete the following tasks in under **3 hours**.

### Task 1: GitOps Workload Synchronizer
1. Configure an Argo CD application named `prod-deployment` inside the `openshift-gitops` namespace.
2. Synchronize resources from the repository `https://github.com/redhat-developer-demos/openshift-gitops-examples.git`.
3. Set the target folder path to `apps/bgd/overlays/bgd-green/`.
4. Deploy the application into a target namespace named `gitops-bgd`.
5. Enforce automatic pruning and self-healing.

### Task 2: Service Metrics Scraper (Prometheus)
1. Enable user workload monitoring on the cluster by modifying the `cluster-monitoring-config` ConfigMap in the `openshift-monitoring` namespace.
2. Create a namespace called `metrics-lab`.
3. Deploy an application that exposes metrics on port `8080` at path `/metrics`.
4. Create a Service named `app-metrics-service` exposing port `8080`.
5. Create a `ServiceMonitor` named `app-monitor` targeting the service to collect application metrics every `15 seconds`.

### Task 3: MachineConfig Host Customization
1. Create a `MachineConfig` named `99-worker-timezone` targeting the **worker** pool role.
2. The config must copy a timezone file or configure a systemd service that writes a message `Machine Config Rollout Successful` to `/etc/motd` on all worker nodes.
3. Apply the configuration and verify the MCO rolls out the changes successfully across all worker nodes.

### Task 4: Log Forwarding Pipeline
1. Deploy the Cluster Logging Operator.
2. Configure a centralized log forwarding pipeline named `forward-to-internal` that:
   - Collects all container logs.
   - Forwards them to the default cluster Elasticsearch store.
3. Verify logging dashboards are active in the OpenShift web console.

### Task 5: Cluster Maintenance & Upgrades
1. Investigate available upgrade channels.
2. Change the cluster update channel to `stable-4.12`.
3. Verify if there is an upgrade path available. Do not execute the upgrade unless requested by the grader VM, but verify the update commands.

---

## Related Notes
- [[DO380-OpenShift-Administration-III]] — Course companion
- [[OpenShift-GitOps-ArgoCD]] — GitOps architecture
- [[Cluster-Logging-EFK]] — Logging architecture
- [[OpenShift-Administrator-Path]] — MOC
