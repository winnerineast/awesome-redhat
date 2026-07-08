---
tags: [kubernetes]
status: stub
created: 2025-07-08
---
# Pods and Containers
> Pods are the atomic unit of scheduling in Kubernetes.

## Pod Lifecycle
`Pending` → `Running` → `Succeeded`/`Failed`

## Multi-Container Patterns
| Pattern | Description |
|---|---|
| Sidecar | Helper container (logging, proxy) |
| Init | Runs before main container |
| Ambassador | Proxy to external services |
| Adapter | Transform output format |

## Health Probes
- **livenessProbe** — Is the container alive? Restart if not.
- **readinessProbe** — Is it ready for traffic? Remove from service if not.
- **startupProbe** — Has it started? Disable other probes until success.

## Related Notes
- [[Core-Concepts]], [[Deployments-and-DeploymentConfigs]]
