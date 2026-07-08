---
tags: [cloud, aws, rosa]
status: stub
created: 2025-07-08
---
# ROSA — Red Hat OpenShift Service on AWS
> Fully managed OpenShift jointly supported by Red Hat and AWS.

## Key Features
- Native AWS integration (VPC, IAM, CloudWatch, EBS, EFS)
- Pay-as-you-go or annual through AWS Marketplace
- HCP (Hosted Control Planes) — reduces overhead, faster provisioning
- 99.95% SLA
- AWS STS for short-lived credentials

## HCP vs Classic
| Feature | ROSA Classic | ROSA HCP |
|---|---|---|
| Control Plane | Customer's AWS account | Red Hat's AWS account |
| Provisioning Time | ~40 min | ~15 min |
| Cost | Higher (3 control nodes) | Lower (no visible control nodes) |
| Isolation | Dedicated nodes | Shared control plane |

## Related Notes
- [[ROSA]], [[AWS-Installation]], [[Hybrid-Cloud-Strategy]]
