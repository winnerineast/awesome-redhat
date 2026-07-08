---
tags: [openshift, installation]
status: stub
created: 2025-07-08
---

# IPI vs UPI Installation

> OpenShift supports two installation approaches: Installer-Provisioned Infrastructure (IPI) and User-Provisioned Infrastructure (UPI).

## Comparison

| Feature | IPI | UPI |
|---|---|---|
| **Infrastructure** | Installer creates & manages | User pre-provisions |
| **Complexity** | Lower (automated) | Higher (manual steps) |
| **Flexibility** | Less (opinionated) | Full control |
| **Supported Platforms** | AWS, Azure, GCP, vSphere, OpenStack | Bare metal, any platform |
| **Use Case** | Quick deployments, cloud | Restricted/air-gapped environments |

## IPI Workflow
1. Create `install-config.yaml`
2. Run `openshift-install create cluster`
3. Installer provisions VMs, networking, DNS, load balancers
4. Cluster bootstraps automatically

## UPI Workflow
1. Prepare infrastructure (VMs, DNS, LB, DHCP)
2. Generate ignition configs: `openshift-install create ignition-configs`
3. Boot RHCOS nodes with ignition
4. Monitor bootstrap process

## Related Notes
- [[AWS-Installation]], [[Azure-ARO]], [[Bare-Metal]], [[ROSA]]
- [[OpenShift-Architecture-Overview]]

---
> [!NOTE]
> #todo — Add detailed install-config.yaml examples and troubleshooting guide.
