---
tags: [openshift, workloads]
status: stub
created: 2025-07-08
---
# Deployments and DeploymentConfigs
> Two approaches to managing application rollouts in OpenShift.

## Kubernetes Deployment (Recommended)
- Standard K8s resource, portable across clusters
- Rolling update and recreate strategies
- ReplicaSet-based rollback

## OpenShift DeploymentConfig (Legacy)
- OpenShift-specific, being phased out
- Supports lifecycle hooks, custom strategies
- Uses ReplicationControllers

## Deployment Strategies
| Strategy | Zero Downtime | Rollback | Use Case |
|---|---|---|---|
| Rolling | ✅ | ✅ | Most applications |
| Recreate | ❌ | ✅ | DB migrations, breaking changes |
| Blue-Green | ✅ | ✅ | Critical applications |
| Canary | ✅ | ✅ | Progressive rollouts |

## Related Notes
- [[StatefulSets]], [[DaemonSets]], [[HPA-and-VPA]]

---
> [!NOTE]
> #todo — Add deployment YAML examples and rollback procedures.
