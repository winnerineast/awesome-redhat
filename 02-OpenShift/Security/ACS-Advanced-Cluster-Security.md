---
tags: [openshift, security, acs]
status: stub
created: 2025-07-08
---
# ACS — Advanced Cluster Security
> Red Hat Advanced Cluster Security (formerly StackRox) provides security for the full container lifecycle.

## Capabilities
- **Visibility** — Full inventory of images, deployments, network flows
- **Vulnerability Management** — CVE scanning for images and running deployments
- **Configuration Management** — Detect misconfigurations against CIS benchmarks
- **Network Segmentation** — Visualize and enforce network policies
- **Risk Profiling** — Prioritize risk across deployments
- **Runtime Detection** — Detect anomalous behavior in running containers
- **Compliance** — PCI DSS, HIPAA, NIST, CIS benchmarks

## Architecture
- **Central** — Management server (runs on one cluster)
- **Scanner** — Image vulnerability scanner
- **Sensor** — Per-cluster agent
- **Collector** — Per-node runtime data collector
- **Admission Controller** — Webhook for policy enforcement

## Related Notes
- [[Supply-Chain-Security]], [[StackRox-ACS]], [[Compliance-Operator]]

---
> [!NOTE]
> #todo — Add ACS policy configuration examples and deployment guide.
