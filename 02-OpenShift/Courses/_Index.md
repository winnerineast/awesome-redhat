---
tags: [openshift, course, moc]
created: 2025-07-08
---

# 📖 OpenShift Administrator Courses

> Course materials for the OpenShift Administrator learning path. Each note contains detailed configurations, workflows, real-world CLI examples, and verification steps.

---

## Core Curriculum

| Course | Title | Duration | Certification |
|---|---|---|---|
| [[DO180-OpenShift-Administration-I]] | Operating a Production Cluster | 5 days | → [[EX180-Containers-Kubernetes]] |
| [[DO280-OpenShift-Administration-II]] | Configuring a Production Cluster | 5 days | → [[EX280-OpenShift-Admin]] |
| [[DO380-OpenShift-Administration-III]] | Scaling Deployments in the Enterprise | 5 days | → [[EX380-OpenShift-Advanced]] |

---

## Study Track & Certifications

The OpenShift Administrator curriculum is structured to prepare platform engineers for three tiers of certification:

```mermaid
graph TD
    DO180[DO180 Admin I] --> EX180[EX180 Certified Technologist]
    DO280[DO280 Admin II] --> EX280[EX280 Certified Administrator]
    DO380[DO380 Admin III] --> EX380[EX380 Certified Advanced Admin]
    
    EX180 -.-> EX280
    EX280 -.-> EX380
```

- [[EX180-Containers-Kubernetes]] — Containers, basic Podman usage, and simple Kubernetes workloads.
- [[EX280-OpenShift-Admin]] — OAuth, identity management, local routing, RBAC, scheduling, and NetworkPolicies.
- [[EX380-OpenShift-Advanced]] — Argo CD GitOps, central logging, Prometheus metric scrapes, upgrades, and ACM.

---

## Learning Path

→ [[OpenShift-Administrator-Path]] — Full platform engineer MOC
