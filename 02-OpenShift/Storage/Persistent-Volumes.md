---
tags: [openshift, storage]
status: stub
created: 2025-07-08
---
# Persistent Volumes
> Persistent Volumes (PV) and Persistent Volume Claims (PVC) provide durable storage for stateful applications.

## Key Concepts
- **PV** — Cluster-level storage resource (provisioned by admin or dynamically)
- **PVC** — User request for storage (binds to a PV)
- **StorageClass** — Defines the provisioner and parameters for dynamic provisioning
- **Access Modes** — ReadWriteOnce (RWO), ReadOnlyMany (ROX), ReadWriteMany (RWX)

## Dynamic Provisioning
Most production clusters use dynamic provisioning via StorageClass + CSI driver.

## Related Notes
- [[CSI-Drivers]], [[ODF-OpenShift-Data-Foundation]]

---
> [!NOTE]
> #todo — Add StorageClass examples, PVC lifecycle diagram.
