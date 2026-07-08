---
tags: [cloud, managed, hybrid]
status: active
created: 2025-07-08
---

# ☁️ OpenShift Dedicated (OSD)

> Fully managed OpenShift service hosted on AWS or Google Cloud (GCP). Hosted and managed directly by Red Hat Operations.

---

## Service Architecture

OpenShift Dedicated allows enterprises to deploy managed Kubernetes clusters without operational overhead:
- **Red Hat Managed:** Red Hat SRE teams monitor, upgrade, and secure control plane systems 24/7/365.
- **Hosted Options:** Deploy either inside Red Hat's cloud accounts or using Customer Owned Cloud Accounts (BYOC - Bring Your Own Cloud).
- **99.95% SLA:** Backed by SLA metrics for enterprise applications.

## Shared Responsibility Model

| Responsibility | Red Hat SRE | Enterprise Customer |
|---|---|---|
| **Control Plane Upgrades** | ✅ Yes | ❌ No |
| **Cluster OS Security Patches** | ✅ Yes | ❌ No |
| **Workload Configurations** | ❌ No | ✅ Yes |
| **Application Scaling & Pods** | ❌ No | ✅ Yes |
| **Ingress Routes SSL certs** | ✅ Yes (default routes) | ✅ Yes (custom routes) |

## Related Notes
- [[ROSA-Red-Hat-OpenShift-on-AWS]] — Managed OpenShift on AWS
- [[ARO-Azure-Red-Hat-OpenShift]] — Managed OpenShift on Azure
- [[Hybrid-Cloud-Strategy]] — Deployment strategies
