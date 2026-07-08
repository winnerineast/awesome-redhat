---
tags: [openshift, installation, aws]
status: stub
created: 2025-07-08
---
# AWS Installation
> Installing OpenShift on Amazon Web Services using IPI.

## Prerequisites
- AWS account with appropriate IAM permissions
- Route 53 hosted zone for cluster domain
- Service quotas for EC2, EBS, VPC, ELB

## Key Steps
1. Configure AWS credentials (`~/.aws/credentials`)
2. Create `install-config.yaml` with AWS platform section
3. Run `openshift-install create cluster --dir=<dir>`
4. Access cluster via `kubeconfig` or web console

## Related Notes
- [[IPI-vs-UPI]], [[ROSA-Red-Hat-OpenShift-on-AWS]]

---
> [!NOTE]
> #todo — Add install-config.yaml template and IAM policy requirements.
