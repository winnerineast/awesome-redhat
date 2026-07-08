---
tags: [openshift, security]
status: stub
created: 2025-07-08
---
# RBAC — Role-Based Access Control
> RBAC controls who can do what within an OpenShift cluster.

## Key Resources
- **Role / ClusterRole** — Defines permissions (verbs on resources)
- **RoleBinding / ClusterRoleBinding** — Assigns roles to users/groups/service accounts
- **Default Roles:** `admin`, `edit`, `view`, `cluster-admin`, `self-provisioner`

## OpenShift vs Kubernetes RBAC
- OpenShift adds Project-scoped roles
- `self-provisioner` ClusterRole allows users to create Projects
- OAuth integration for user identity

## Related Notes
- [[OAuth-and-Identity-Providers]], [[SCC-Security-Context-Constraints]], [[RBAC-Kubernetes]]

---
> [!NOTE]
> #todo — Add RBAC policy examples and least-privilege patterns.
