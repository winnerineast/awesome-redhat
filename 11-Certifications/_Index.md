---
tags: [certification, moc]
created: 2025-07-08
---
# 🎓 Certifications

## Exam Study Guides
- [[EX180-Containers-Kubernetes]] — Red Hat Certified Technologist in OpenShift
- [[EX200-RHCSA]] — Red Hat Certified System Administrator
- [[EX280-OpenShift-Admin]] — Red Hat Certified OpenShift Administrator
- [[EX380-OpenShift-Advanced]] — Advanced System Administrator in OpenShift
- [[EX288-OpenShift-Developer]] — Red Hat Certified OpenShift Application Developer
- [[EX294-Ansible]] — Red Hat Certified Engineer (Ansible)
- [[Study-Tips-and-Resources]] — General exam preparation strategies

## Certification Hierarchy
```mermaid
graph TD
    EX200["EX200 — RHCSA"] --> EX294["EX294 — RHCE"]
    EX200 --> EX180["EX180 — Containers"]
    EX180 --> EX280["EX280 — OCP Admin"]
    EX280 --> EX380["EX380 — Advanced OCP"]
    EX180 --> EX288["EX288 — OCP Developer"]
    EX294 --> RHCA["RHCA — Architect"]
    EX280 --> RHCA
    EX380 --> RHCA
    EX288 --> RHCA
    style RHCA fill:#cc0000,color:#fff
```
