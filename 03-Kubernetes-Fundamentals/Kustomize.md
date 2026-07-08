---
tags: [kubernetes, kustomize]
status: stub
created: 2025-07-08
---
# Kustomize
> Template-free configuration customization for Kubernetes manifests.

## Key Concepts
- **Base** — Common manifests shared across environments
- **Overlay** — Environment-specific patches (dev, staging, prod)
- **kustomization.yaml** — Declares resources, patches, and generators
- Built into `kubectl` (`kubectl apply -k`)

## vs Helm
| Feature | Helm | Kustomize |
|---|---|---|
| Templating | Go templates | No templates (patches) |
| Package mgmt | ✅ | ❌ |
| Built into kubectl | ❌ | ✅ |
| Complexity | Higher | Lower |

## Related Notes
- [[Helm]], [[OpenShift-GitOps-ArgoCD]]
