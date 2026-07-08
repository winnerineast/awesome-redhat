---
tags: [openshift, architecture]
status: stub
created: 2025-07-08
---

# Control Plane

> The OpenShift control plane consists of master nodes running API Server, Controller Manager, Scheduler, and etcd.

## Components

- **API Server (kube-apiserver)** — Central hub; all communication goes through it
- **Controller Manager** — Runs core control loops (node controller, replication controller, etc.)
- **Scheduler** — Assigns pods to nodes based on resource requirements and constraints
- **etcd** — Distributed key-value store for all cluster state

## OpenShift-Specific Control Plane Components

- **OAuth Server** — Handles authentication
- **OpenShift API Server** — Extension of K8s API for OpenShift resources (Routes, Projects, etc.)
- **OpenShift Controller Manager** — Manages OpenShift-specific controllers

## High Availability

- Production clusters run 3 control plane nodes (odd number for etcd quorum)
- Control plane nodes are typically not schedulable for workloads

## Related Notes

- [[OpenShift-Architecture-Overview]]
- [[etcd]]
- [[Worker-Nodes]]

---

> [!NOTE]
> #todo — Expand with control plane sizing guidelines and troubleshooting.
