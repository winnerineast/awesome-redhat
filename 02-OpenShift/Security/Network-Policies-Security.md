---
tags: [openshift, security, networking]
status: stub
created: 2025-07-08
---
# Network Policies — Security Perspective
> Network policies as a security tool for microsegmentation and zero-trust networking.

See [[Network-Policies]] for detailed implementation. This note focuses on security patterns.

## Security Patterns
- **Default Deny** — Block all traffic, then allow explicitly
- **Namespace Isolation** — Prevent cross-namespace communication
- **Egress Control** — Restrict outbound traffic

## Related Notes
- [[Network-Policies]], [[ACS-Advanced-Cluster-Security]]

---
> [!NOTE]
> #todo — Add zero-trust networking patterns.
