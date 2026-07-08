---
tags: [openshift, architecture]
status: stub
created: 2025-07-08
---

# Worker Nodes

> Worker nodes run application workloads. They are managed by MachineSets and configured via MachineConfig.

## Key Components on Worker Nodes

- **kubelet** — Node agent that manages pod lifecycle
- **CRI-O** — Container runtime (OCI-compliant)
- **OVN-Kubernetes** — Network plugin (pods, services, network policies)
- **kube-proxy** — Network proxy (or OVN equivalent)

## Node Types

| Type | Purpose |
|---|---|
| Worker | General application workloads |
| Infrastructure | Router, registry, monitoring, logging |
| GPU | AI/ML workloads with NVIDIA GPU operator |

## Red Hat CoreOS (RHCOS)

- Immutable OS designed for OpenShift
- Managed via MachineConfig Operator (MCO)
- Automatic updates as part of cluster upgrades
- Based on Fedora CoreOS

## Related Notes

- [[Machine-Sets-and-Machine-Config]]
- [[Control-Plane]]
- [[OpenShift-Architecture-Overview]]

---

> [!NOTE]
> #todo — Add node sizing recommendations, taint/toleration patterns.
