---
tags: [cloud, aws, rosa, hybrid]
status: active
created: 2025-07-08
---

# ☁️ ROSA — Red Hat OpenShift Service on AWS

> Fully managed OpenShift Container Platform running natively on AWS, jointly supported and managed by Red Hat and Amazon.

---

## Architecture & Integration

ROSA integrates with AWS resource networks using:
- **Virtual Private Clouds (VPCs):** Isolates compute node clusters within custom private subnets.
- **AWS STS (Secure Token Service):** Uses short-lived IAM roles for authorization rather than permanent static AWS access keys.
- **AWS Elastic Block Store (EBS) & EFS:** Native CSI drivers provision block and shared file storage.

```
  AWS Customer Account (Compute Nodes, VPC, Storage)
       ▲
       │ Controlled & Managed via API
  Red Hat Management Account (Hosted Control Planes - HCP)
```

## Classic vs Hosted Control Planes (HCP)

| Feature | ROSA Classic | ROSA HCP |
|---|---|---|
| **Control Plane Host** | Inside Customer's AWS account | Inside Red Hat's AWS account |
| **Cluster Overhead** | High (customer pays for 3 control nodes) | Zero (control nodes run in Red Hat account) |
| **Creation Time** | ~40 minutes | ~15 minutes |
| **Upgrades** | Control plane and workers upgraded together | Control plane and worker pools upgraded independently |

## ROSA CLI Quick Start

```bash
# 1. Log in via ROSA CLI
rosa login --token="my-api-token"

# 2. Check AWS account association status
rosa verify quota
rosa verify permissions

# 3. Create a ROSA HCP cluster
rosa create cluster --cluster-name=rosa-demo \
  --sts --mode=auto \
  --hosted-cp --subnet-ids=subnet-xxxx,subnet-yyyy

# 4. Monitor deployment
rosa describe cluster -c rosa-demo
rosa logs install -c rosa-demo --watch
```

## Related Notes
- [[AWS-Installation]] — Self-managed AWS installations
- [[Hybrid-Cloud-Strategy]] — Cloud deployment MOC
- [[OpenShift-Dedicated]] — Managed OpenShift on Google Cloud / AWS
