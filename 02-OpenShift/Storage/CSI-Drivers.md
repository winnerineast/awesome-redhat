---
tags: [openshift, storage]
status: stub
created: 2025-07-08
---
# CSI Drivers
> Container Storage Interface (CSI) is the standard for exposing block and file storage to Kubernetes workloads.

## Common CSI Drivers for OpenShift
| Provider | Driver | Access Modes |
|---|---|---|
| AWS EBS | `ebs.csi.aws.com` | RWO |
| AWS EFS | `efs.csi.aws.com` | RWX |
| Azure Disk | `disk.csi.azure.com` | RWO |
| Azure Files | `file.csi.azure.com` | RWX |
| GCP PD | `pd.csi.storage.gke.io` | RWO |
| vSphere | `csi.vsphere.vmware.com` | RWO |
| ODF (Ceph) | `openshift-storage.rbd.csi.ceph.com` | RWO/RWX |

## Related Notes
- [[Persistent-Volumes]], [[ODF-OpenShift-Data-Foundation]]

---
> [!NOTE]
> #todo — Add CSI snapshot and clone examples.
