---
tags: [kubernetes]
status: stub
created: 2025-07-08
---
# ConfigMaps and Secrets
> Decouple configuration from container images.

## ConfigMap
- Non-sensitive key-value pairs
- Consumed as env vars, command args, or mounted files

## Secret
- Sensitive data (passwords, tokens, keys)
- Base64-encoded (not encrypted by default!)
- Types: Opaque, docker-registry, tls, service-account-token

## Best Practices
- Use external secrets operators for production (Vault, AWS Secrets Manager)
- Enable etcd encryption for Secrets at rest

## Related Notes
- [[Core-Concepts]], [[RBAC-Kubernetes]]
