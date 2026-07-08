---
tags: [security, devsecops, acs, stackrox]
status: active
created: 2025-07-08
---

# 🔒 Red Hat Advanced Cluster Security (ACS)

> Based on StackRox, ACS provides Kubernetes-native security auditing, compliance scanning, vulnerability management, and runtime threat detection.

---

## ACS Core Architecture

ACS uses a Kubernetes-native model with components separated into Central (management) and Sensor (collection):

```
  Central Hub Cluster (Web UI, API database, Scanner)
       ▲
       │ Secure gRPC tunnels
  Managed Cluster spoke (Sensor, Collector DaemonSet, Admission Controller)
```

- **Central:** Main control plane dashboard and vuln engine databases.
- **Sensor:** Active control agent running in the managed cluster.
- **Collector:** DaemonSet collecting system calls from the node kernel to capture runtime threats.
- **Admission Controller:** Blocks deployments that violate cluster policies.

---

## ⚡ Key Policy CLI Commands

Administrators can use the `roxctl` CLI to scan images during S2I builds:

```bash
# 1. Export authentication credentials
export ROX_API_TOKEN="my-acs-token"
export ROX_ENDPOINT="https://central.acs.example.com:443"

# 2. Check if roxctl is available
roxctl version

# 3. Scan a container image for vulnerabilities
roxctl image check --image=quay.io/myorg/myapp:v1

# 4. Check a Deployment YAML before applying
roxctl deployment check --file=deployment.yaml
# Blocks deployment if it violates configured rules (e.g. running as root)
```

## Related Notes
- [[Compliance-Operator]] — Compliance auditing
- [[Supply-Chain-Security]] — Secure pipeline configurations
- [[Quay-Registry]] — Quay registry integrations
