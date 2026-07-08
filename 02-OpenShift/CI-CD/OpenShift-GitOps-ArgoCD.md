---
tags: [openshift, cicd, gitops, argocd]
status: stub
created: 2025-07-08
---
# OpenShift GitOps (Argo CD)
> Declarative GitOps continuous delivery for OpenShift using Argo CD.

## GitOps Principles
1. **Declarative** — Desired state described in Git
2. **Versioned** — Git as the single source of truth
3. **Automated** — Automatically applied to clusters
4. **Self-healing** — Drift detection and correction

## Key Components
- **Argo CD** — Core GitOps controller
- **ApplicationSet** — Multi-cluster / multi-environment deployments
- **App of Apps** — Pattern for managing multiple applications

## Related Notes
- [[OpenShift-Pipelines-Tekton]], [[ACM-Advanced-Cluster-Management]]

---
> [!NOTE]
> #todo — Add Argo CD Application examples and multi-env patterns.
