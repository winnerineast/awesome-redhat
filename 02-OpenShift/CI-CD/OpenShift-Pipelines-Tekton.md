---
tags: [openshift, cicd, tekton]
status: stub
created: 2025-07-08
---
# OpenShift Pipelines (Tekton)
> Cloud-native CI/CD based on Tekton, running pipelines as Kubernetes resources.

## Key Concepts
- **Task** — A series of steps (each step is a container)
- **Pipeline** — Ordered collection of Tasks
- **PipelineRun** — Instance of a Pipeline execution
- **Workspace** — Shared storage between tasks
- **Trigger** — Webhook-driven pipeline execution

## Why Tekton over Jenkins?
| Feature | Tekton | Jenkins |
|---|---|---|
| Kubernetes-native | ✅ | ❌ (runs on K8s but not native) |
| Declarative | ✅ (YAML) | ❌ (Groovy/scripted) |
| Serverless | ✅ (no persistent server) | ❌ (requires running server) |
| Scalability | Per-pipeline pods | Single server bottleneck |

## Related Notes
- [[OpenShift-GitOps-ArgoCD]], [[Source-to-Image-S2I]], [[Image-Streams]]

---
> [!NOTE]
> #todo — Add Tekton pipeline examples and Trigger configuration.
