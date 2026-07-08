---
tags: [ai, lightspeed, admin, assistant]
status: active
created: 2025-07-08
---

# 🤖 OpenShift Lightspeed

> OpenShift Lightspeed is an AI-powered assistant integrated directly into the OpenShift console, helping administrators troubleshoot, write YAML, and manage clusters.

---

## Capabilities & Architecture

OpenShift Lightspeed acts as an intelligent copilot for cluster operations:
- **Natural Language Command Translation:** Translates user requests (e.g. "deploy a secure apache webserver with CPU limit 200m") into ready-to-apply Kubernetes YAML manifests.
- **Log and Event Analysis:** Automatically scans pod logs and cluster events to diagnose crash loop failures and suggest remediations.
- **Troubleshooting Assistant:** Interactively guides administrators through diagnosing networking issues or correcting security constraints.

```
  OpenShift Console (Lightspeed Chat) ──▶ LLM Gateway (Red Hat AI) ──▶ Local Cluster API
```

## Related Notes
- [[OpenShift-AI-RHOAI]] — AI Platform
- [[Model-Serving]] — Model serving infrastructure
