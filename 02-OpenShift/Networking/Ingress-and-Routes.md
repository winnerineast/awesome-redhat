---
tags: [openshift, networking]
status: stub
created: 2025-07-08
---
# Ingress and Routes
> Routes are the OpenShift-native way to expose services to external traffic. OpenShift also supports standard Kubernetes Ingress resources.

## Route Types
| Type | Encryption | Description |
|---|---|---|
| Edge | TLS at router | Router terminates TLS, forwards HTTP to pod |
| Passthrough | End-to-end TLS | Router passes encrypted traffic directly to pod |
| Re-encrypt | TLS at router + pod | Router terminates and re-encrypts |

## Key Concepts
- **HAProxy Router** — Default ingress controller
- **Sharding** — Route sharding for multi-tenant isolation
- **Custom Domains** — Configure with certificates

## Related Notes
- [[SDN-Overview]], [[Network-Policies]]

---
> [!NOTE]
> #todo — Add route configuration examples and wildcard routing setup.
