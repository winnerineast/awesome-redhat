---
tags: [learning-path, openshift, administration, certification]
status: draft
created: 2025-07-08
---

# 🏗️ OpenShift Administrator Path

> From first-time cluster user to advanced platform engineer. This is the core path for anyone managing OpenShift clusters.

---

## Path Overview

```mermaid
graph TD
    PREREQ["🐧 Prerequisites<br/>Linux CLI basics + RHCSA recommended"] --> DO180
    DO180["DO180<br/>OpenShift Administration I<br/>Operating a Production Cluster"] --> EX180["EX180<br/>Certified Technologist"]
    DO180 --> DO280["DO280<br/>OpenShift Administration II<br/>Configuring a Production Cluster"]
    DO280 --> EX280["EX280<br/>Certified OpenShift Administrator"]
    DO280 --> DO380["DO380<br/>OpenShift Administration III<br/>Scaling Deployments in the Enterprise"]
    DO380 --> EX380["EX380<br/>Advanced System Admin in OpenShift"]
    
    EX280 --> SPECIALIST["Specialist Tracks"]
    SPECIALIST --> DO316["DO316<br/>OpenShift Virtualization"]
    SPECIALIST --> DO425["DO425<br/>Security with ACS"]
    SPECIALIST --> DO370["DO370<br/>Enterprise Kubernetes Storage"]
    
    style PREREQ fill:#2d5986,color:#fff
    style EX180 fill:#cc0000,color:#fff
    style EX280 fill:#cc0000,color:#fff
    style EX380 fill:#cc0000,color:#fff
```

---

## Course Details

### 📗 DO180 — OpenShift Administration I: Operating a Production Cluster

📖 **Local course materials:** [[DO180-OpenShift-Administration-I]]

| | |
|---|---|
| **Duration** | 5 days |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | RH124 or equivalent Linux experience |
| **Certification** | → [[EX180-Containers-Kubernetes]] |

**What you'll learn:**
- Deploy and manage Kubernetes workloads on OpenShift
- Manage users, policies, and resource quotas
- Configure application reliability with health probes
- Manage updates for applications and the OpenShift cluster
- Work with the `oc` CLI and web console

**Key topics:** → [[Deployments-and-DeploymentConfigs]], [[RBAC]], [[Core-Concepts]]

---

### 📘 DO280 — OpenShift Administration II: Configuring a Production Cluster

📖 **Local course materials:** [[DO280-OpenShift-Administration-II]]

| | |
|---|---|
| **Duration** | 5 days |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | DO180 or equivalent experience |
| **Certification** | → [[EX280-OpenShift-Admin]] |

**What you'll learn:**
- Configure authentication and authorization (OAuth, LDAP, RBAC)
- Configure networking components (Ingress, Routes, Network Policies)
- Manage cluster node scheduling and scaling
- Configure pod scheduling and resource management
- Monitor cluster events and alerts
- Perform cluster updates

**Key topics:** → [[OAuth-and-Identity-Providers]], [[Network-Policies]], [[Ingress-and-Routes]], [[Machine-Sets-and-Machine-Config]]

---

### 📙 DO380 — OpenShift Administration III: Scaling Deployments in the Enterprise

📖 **Local course materials:** [[DO380-OpenShift-Administration-III]]

| | |
|---|---|
| **Duration** | 5 days |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | DO280 or EX280 recommended |
| **Certification** | → [[EX380-OpenShift-Advanced]] |

**What you'll learn:**
- Plan and implement OpenShift clusters at scale
- Implement GitOps workflows with OpenShift GitOps (Argo CD)
- Configure and manage cluster logging and metrics
- Automate OpenShift cluster management with Ansible
- Implement backup and restore (OADP)
- Manage multiple clusters with ACM

**Key topics:** → [[OpenShift-GitOps-ArgoCD]], [[Cluster-Logging-EFK]], [[ACM-Advanced-Cluster-Management]], [[Ansible-for-OpenShift]]

---

## Specialist Extensions

After completing the core admin path, specialize in:

| Course | Topic | Related Notes |
|---|---|---|
| DO316 | OpenShift Virtualization | [[OpenShift-Virtualization]] |
| DO425 | Security with ACS (StackRox) | [[ACS-Advanced-Cluster-Security]] |
| DO370 | Enterprise Kubernetes Storage | [[ODF-OpenShift-Data-Foundation]] |
| DO322 | OpenShift Installation on Cloud | [[IPI-vs-UPI]], [[AWS-Installation]] |

---

## Study Resources

- [Red Hat OpenShift documentation](https://docs.openshift.com/)
- [OpenShift interactive learning](https://learn.openshift.com/)
- [[EX180-Containers-Kubernetes]] — Containers and Kubernetes exam study guide
- [[EX280-OpenShift-Admin]] — OpenShift Administrator exam study guide
- [[EX380-OpenShift-Advanced]] — OpenShift Advanced Administrator exam study guide
