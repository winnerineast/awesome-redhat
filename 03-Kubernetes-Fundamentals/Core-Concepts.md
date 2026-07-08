---
tags: [kubernetes]
status: stub
created: 2025-07-08
---
# Core Concepts
> The fundamental building blocks of Kubernetes.

## Workload Resources
- **Pod** — Smallest deployable unit (1+ containers)
- **ReplicaSet** — Ensures desired number of pod replicas
- **Deployment** — Declarative updates for pods and ReplicaSets
- **StatefulSet** — Stable identity and storage for stateful apps
- **DaemonSet** — One pod per node
- **Job / CronJob** — Batch and scheduled workloads

## Service & Networking
- **Service** — Stable endpoint for a set of pods
- **Ingress** — HTTP/HTTPS routing to services
- **NetworkPolicy** — Traffic control between pods

## Configuration
- **ConfigMap** — Non-sensitive configuration data
- **Secret** — Sensitive data (base64-encoded)
- **Namespace** — Logical isolation of resources

## Storage
- **PersistentVolume (PV)** / **PersistentVolumeClaim (PVC)**

## Related Notes
- [[Pods-and-Containers]], [[Services-and-Endpoints]], [[ConfigMaps-and-Secrets]]
