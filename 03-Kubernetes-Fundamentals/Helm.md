---
tags: [kubernetes, helm]
status: stub
created: 2025-07-08
---
# Helm
> The package manager for Kubernetes. Uses charts (templated manifests).

## Key Concepts
- **Chart** — Package of K8s manifest templates
- **Release** — Instance of a chart deployed to a cluster
- **Repository** — Collection of charts (like apt/yum repos)
- **values.yaml** — Customization file for chart parameters

## Common Commands
```bash
helm repo add <name> <url>
helm install <release> <chart>
helm upgrade <release> <chart>
helm rollback <release> <revision>
helm list
```

## Related Notes
- [[Kustomize]], [[CRDs-and-Operators]]
