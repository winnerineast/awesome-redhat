---
tags: [openshift, workloads, virtualization]
status: stub
created: 2025-07-08
---
# OpenShift Virtualization
> Run virtual machines alongside containers on OpenShift using KubeVirt technology.

## Key Features
- Run existing VM workloads without re-architecting
- Live migration between nodes
- VM snapshots and cloning
- Import VMs from VMware, RHV, or OVA
- Unified management (VMs + containers in same platform)

## Architecture
- Based on **KubeVirt** — runs VMs inside pods
- **CDI (Containerized Data Importer)** — imports VM images
- **VirtualMachine (VM)** and **VirtualMachineInstance (VMI)** CRDs

## Related Notes
- [[OpenShift-Architecture-Overview]]

## Training
- **DO316** — Managing Virtual Machines with Red Hat OpenShift Virtualization

---
> [!NOTE]
> #todo — Add VM creation walkthrough and migration guide.
