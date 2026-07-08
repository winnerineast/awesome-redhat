---
tags: [certification, openshift, architecture, rhca]
status: active
created: 2025-07-08
---

# 🎯 RHCA — Red Hat Certified Architect

> The highest level of certification from Red Hat. Represents deep, cross-domain knowledge of enterprise systems, virtualization, cloud computing, and Kubernetes orchestration.

---

## Program Overview

```
                        ┌──────────────────┐
                        │    Active RHCE   │ (Prerequisite)
                        │     (EX294)      │
                        └────────┬─────────┘
                                 │
                     Requires passing 5 Exams
                                 │
                                 ▼
         ┌────────────┬──────────┼────────────┬────────────┐
         ▼            ▼          ▼            ▼            ▼
      [EX280]      [EX380]    [EX288]      [EX447]      [EX316]
     OCP Admin    Adv Admin   OCP Dev     Adv Ansible  Virtualiz.
```

An active **Red Hat Certified Engineer (RHCE)** or **Red Hat Certified Enterprise Microservices Developer** can achieve RHCA status by passing **5 additional** concentration exams from the Red Hat systems management or cloud platform portfolio.

---

## ⚡ Recommended Architect Track Focus Exams

To maximize expertise in OpenShift cloud infrastructure and automation, the following 5 exams are recommended:

### 1. [[EX280-OpenShift-Admin|EX280 — Red Hat Certified OpenShift Administrator]]
- **Focus:** User administration, LDAP integration, RBAC bindings, Route encryption, and basic workload scheduling.

### 2. [[EX380-OpenShift-Advanced|EX380 — Red Hat Certified Advanced System Administrator in OpenShift]]
- **Focus:** Deploying GitOps (Argo CD), log pipelines, Prometheus metrics, node kernel tuning, and ACM governance.

### 3. [[EX288-OpenShift-Developer|EX288 — Red Hat Certified OpenShift Application Developer]]
- **Focus:** Source-to-Image (S2I) image creation, Helm, templates, and Tekton CI/CD automation pipelines.

### 4. [[EX447-Advanced-Ansible|EX447 — Red Hat Certified Specialist in Advanced Automation: Ansible Best Practices]]
- **Focus:** Designing rolling playbook upgrades, error capturing, task delegations, execution environments, and AAP Controller.

### 5. EX316 — Red Hat Certified Specialist in OpenShift Virtualization
- **Focus:** Managing virtual machines side-by-side with container workloads on the same OpenShift cluster.

---

## 🏆 Preparation Strategy for Architects

1. **Establish a Local Lab:**
   Use Red Hat's **Developer Sandbox** or deploy **OpenShift Local (formerly CodeReady Containers - CRC)** on a local workstation to practice API interactions.
   
2. **Review Multi-Cluster Deployments:**
   Familiarize yourself with Red Hat Advanced Cluster Management (ACM) policies. Understand how to push templates to spoke clusters from a single control point.

3. **Master GitOps Synchronization:**
   Ensure you can deploy applications using Argo CD manifests. Practice fixing sync conflicts, setting up automated pruning, and rolling back configurations.

---

## Related Notes
- [[OpenShift-Architect-Path]] — Architect MOC
- [[EX280-OpenShift-Admin]] — Admin study guide
- [[EX380-OpenShift-Advanced]] — Advanced Admin study guide
- [[EX288-OpenShift-Developer]] — Developer study guide
- [[EX447-Advanced-Ansible]] — Advanced Ansible study guide
