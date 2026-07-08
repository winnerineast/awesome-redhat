---
tags: [kubernetes]
status: stub
created: 2025-07-08
---
# Services and Endpoints
> Services provide stable networking for dynamic pods.

## Service Types
| Type | Scope | Use Case |
|---|---|---|
| ClusterIP | Internal only | Default; inter-pod communication |
| NodePort | External via node port | Development, testing |
| LoadBalancer | External via cloud LB | Production |
| ExternalName | DNS alias | External service integration |

## Related Notes
- [[Core-Concepts]], [[Ingress-and-Routes]]
