---
tags: [openshift, networking]
status: stub
created: 2025-07-08
---
# SDN Overview
> OpenShift uses Software-Defined Networking to provide pod-to-pod, service, and external connectivity.

## Network Architecture
- **Pod Network** — Each pod gets a unique IP address
- **Service Network** — ClusterIP / NodePort / LoadBalancer
- **External Access** — Routes (OpenShift) and Ingress
- **Network Policies** — Traffic filtering between pods

## CNI Plugins
| Plugin | Status | Notes |
|---|---|---|
| OVN-Kubernetes | Default (OCP 4.x) | Recommended for new clusters |
| OpenShift SDN | Legacy | Being deprecated |

## Related Notes
- [[OVN-Kubernetes]], [[Ingress-and-Routes]], [[Network-Policies]], [[Service-Mesh]]

---
> [!NOTE]
> #todo — Add network architecture diagram and troubleshooting commands.
