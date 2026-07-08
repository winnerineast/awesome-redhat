# Awesome Red Hat [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated knowledge base, offline learning academy, and skill-progression vault for **Red Hat Enterprise Linux, Ansible, and the OpenShift ecosystem**.
> Designed for wiki-style reading in [Obsidian](https://obsidian.md/), and fully browsable on GitHub.

<p align="center">
  <b>150+ Technical Notes</b> · <b>12 Knowledge Areas</b> · <b>5 Local Skill Paths</b> · <b>8 Certification Guides with Mock Labs</b>
</p>

---

## 🚀 The Local Offline Academy (New in v2.0.0!)

This repository has been upgraded from a simple link aggregator into a **fully-fledged, self-contained offline learning platform**. You no longer need external subscription resources to study the core concepts. All curriculum notes, CLI walkthroughs, architectural design records, and practice exams reside directly inside this vault.

### Option 1: Open in Obsidian (Recommended)
Obsidian connects these markdown files into a browsable local wiki with dynamic graph views, backlinks, and instant search indexers.
```bash
# 1. Clone the repository
git clone https://github.com/winnerineast/awesome-redhat.git

# 2. Open Obsidian -> "Open folder as vault" -> select the awesome-redhat directory
# 3. Start at the Dashboard: 00-Home/Dashboard.md
```

---

## 🗺️ Learning Paths & Local Course Index

Each path contains structured step-by-step progressions mapping localized course materials directly to certification targets.

### 🐧 1. RHEL System Administration Path
*From foundations to managing enterprise servers and storage.*
- 📖 **Local Course Notes:**
  - [[RH066-Fundamentals-of-RHEL]] — Free introductory Linux basics (10 modules)
  - [[RH124-System-Administration-I]] — Linux command line, users, standard permissions, and services (13 modules)
  - [[RH134-System-Administration-II]] — Advanced storage (LVM/Stratis), firewalld, SELinux, and containers (11 modules)
  - [[RH199-RHCSA-Rapid-Track]] — Combined fast-track guide
- 🎯 **Certification Guide:**
  - [[EX200-RHCSA]] — **RHCSA Study Guide** (includes a complete 12-task mock lab)

### 🏗️ 2. OpenShift Administrator Path
*From first-time cluster user to advanced platform engineer.*
- 📖 **Local Course Notes:**
  - [[DO180-OpenShift-Administration-I]] — Core concepts, deployments, logs, probes, and resource requests (8 modules)
  - [[DO280-OpenShift-Administration-II]] — Authentication, RBAC, ingress routing, NetworkPolicies, and scheduling (7 modules)
  - [[DO380-OpenShift-Administration-III]] — Operators, GitOps (Argo CD), metrics scraping, logging, and ACM (7 modules)
- 🎯 **Certification Guides:**
  - [[EX180-Containers-Kubernetes]] — **Specialist Exam Guide** (includes a 5-task local Podman lab)
  - [[EX280-OpenShift-Admin]] — **OCP Administrator Guide** (includes a 6-task mock exam)
  - [[EX380-OpenShift-Advanced]] — **Advanced Administrator Guide** (includes a 5-task mock exam)

### 💻 3. OpenShift Developer Path
*Building, containerizing, and packaging microservices.*
- 📖 **Local Course Notes:**
  - [[DO080-Containerized-Applications-Overview]] — Free containerization overview (2 modules)
  - [[DO188-OpenShift-Development-I]] — Image builds, Podman local networks, and local Pods (4 modules)
  - [[DO288-OpenShift-Development-II]] — S2I custom builder images, Helm, and Tekton pipelines (4 modules)
  - [[DO378-Cloud-Native-Microservices]] — Quarkus, reactive Mutiny, serverless Knative, and Kafka (4 modules)
- 🎯 **Certification Guide:**
  - [[EX288-OpenShift-Developer]] — **OCP Application Developer Guide** (includes a 4-task mock exam)

### ⚙️ 4. Ansible Automation Path
*Automating server configurations, networking, and application deployments.*
- 📖 **Local Course Notes:**
  - [[RH294-Ansible-Automation]] — Configurations, playbooks, variables, loops, templates, roles, and vault (4 modules)
  - [[DO447-Advanced-Ansible]] — Advanced variable scopes, task delegations, serial rolling updates, and AAP (4 modules)
  - [[DO457-Network-Automation]] — Network CLI connection plugins, Cisco/Juniper integrations, and auto-backups (3 modules)
- 🎯 **Certification Guides:**
  - [[EX294-Ansible]] — **RHCE Exam Guide** (includes a 6-task mock exam)
  - [[EX447-Advanced-Ansible]] — **Advanced Specialist Guide** (includes a 3-task mock exam)

### 🏛️ 5. OpenShift Architect Path
*Designing hybrid cloud platforms, fleet management, and security controls.*
- 📖 **Local Architecture Guide:**
  - [[Architect-Path-Overview]] — Node topologies, ROSA/ARO designs, zero-trust ACS, Service Mesh, and ODF
- 🎯 **Certification Guide:**
  - [[RHCA]] — **Red Hat Certified Architect Roadmap** (covers requirements and 5 recommended exams)

---

## 📦 Directory Map & Knowledge Areas

| Folder | Domain | Focus Area | Note Count |
|:-------|:-------|:-----------|-----------:|
| [`00-Home/`](00-Home/) | Home base | Dashboards, terminology glossaries, vault guidelines | 3 |
| [`01-Learning-Paths/`](01-Learning-Paths/) | Skill Paths | MOC pathways linking localized course notes | 6 |
| [`02-OpenShift/`](02-OpenShift/) | OpenShift Core | Architecture, ingress routes, Storage Classes, SCCs, CI/CD | 44 |
| [`03-Kubernetes-Fundamentals/`](03-Kubernetes-Fundamentals/) | Upstream K8s | Pod lifecycles, ConfigMaps, Helm charts, and custom CRDs | 9 |
| [`04-RHEL/`](04-RHEL/) | RHEL Linux | System administration, package managers, SELinux, and systemd | 10 |
| [`05-Ansible/`](05-Ansible/) | Ansible platform | AAP Automation Controller, Collections, and EEs | 7 |
| [`06-Cloud-Services/`](06-Cloud-Services/) | Managed Clouds | Managed offerings (ROSA, ARO, OSD) and Hybrid design | 6 |
| [`07-DevSecOps/`](07-DevSecOps/) | Security Operations | Vulnerability scan engines (ACS), compliance auditing, image signing | 6 |
| [`08-Middleware-and-Runtimes/`](08-Middleware-and-Runtimes/) | Application Runtimes | Quarkus native builds, Spring Boot on UBI, Knative Serverless | 6 |
| [`09-Data-and-Integration/`](09-Data-and-Integration/) | Data Pipelines | AMQ Streams (Kafka), Camel K route integrations, 3scale API | 5 |
| [`10-AI-ML-on-OpenShift/`](10-AI-ML-on-OpenShift/) | AI/ML workloads | OpenShift AI (RHOAI), GPU operators, and model serving | 5 |
| [`11-Certifications/`](11-Certifications/) | Certifications | Exam blueprints, practical study tips, and mock labs | 9 |
| [`12-Awesome-Resources/`](12-Awesome-Resources/) | References | Curated community forums, news, free books, and sandbox labs | 9 |

---

## 🤝 Contributing & License

This is a shared technical reference. If you want to contribute:
1. **Fork** this repository.
2. Create new notes using templates from the [`Templates/`](Templates/) directory.
3. Keep `[[wikilinks]]` format to maintain target nodes mappings.
4. Open a **Pull Request**.

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
