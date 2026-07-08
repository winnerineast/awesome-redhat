---
tags: [openshift, security]
status: stub
created: 2025-07-08
---
# SCC — Security Context Constraints
> SCCs are OpenShift-specific resources that control what a pod is allowed to do at the host level.

## Default SCCs (from most to least restrictive)
1. `restricted` — Default for most pods
2. `nonroot` — Similar to restricted but allows any non-root UID
3. `anyuid` — Allows running as any UID (including root)
4. `hostaccess` — Allows host networking and ports
5. `hostnetwork` — Allows host networking
6. `privileged` — Full access (use sparingly)

## Key Controls
- RunAsUser, FSGroup, SELinux context
- Host networking, ports, PID namespace
- Volume types allowed
- Capabilities (add/drop)

## Related Notes
- [[RBAC]], [[OAuth-and-Identity-Providers]]

---
> [!NOTE]
> #todo — Add SCC troubleshooting guide and custom SCC examples.
