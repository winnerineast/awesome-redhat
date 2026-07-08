---
tags: [cloud, ibm, hybrid]
status: active
created: 2025-07-08
---

# ☁️ OpenShift on IBM Cloud (ROKS)

> Red Hat OpenShift on IBM Cloud (ROKS) is a fully managed cloud service delivering automated deployments, updates, security, and scaling on IBM Cloud infrastructure.

---

## IBM Cloud Native Integrations

- **IBM Cloud Satellite:** Run OpenShift workloads on-premises or on external cloud infrastructures (AWS/Azure) while keeping control planes managed centrally within the IBM Cloud console.
- **Key Protect Integration:** Enforce encryption keys using hardware security modules (HSM) to protect secret resources and database volumes.
- **Log Analysis & Activity Tracker:** Native integration for security auditing and telemetry monitoring.

## Cluster Management CLI Basics

```bash
# 1. Log in to IBM Cloud CLI
ibmcloud login --sso

# 2. List available OpenShift clusters
ibmcloud oc clusters

# 3. Download cluster configuration kubeconfig
ibmcloud oc cluster config --cluster <cluster-name-or-id>

# 4. Verify connection using standard OpenShift CLI
oc get nodes
```

## Related Notes
- [[OpenShift-Dedicated]] — Managed OpenShift
- [[Hybrid-Cloud-Strategy]] — Deployment overview
