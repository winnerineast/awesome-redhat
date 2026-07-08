# Awesome Red Hat [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated knowledge base and learning centre for **Red Hat technologies** — especially the **OpenShift** ecosystem.
> Built as an [Obsidian](https://obsidian.md/) vault for wiki-style reading, but also fully browsable on GitHub.

<p align="center">
  <b>131 notes</b> · <b>12 knowledge areas</b> · <b>5 learning paths</b> · <b>6 certification guides</b>
</p>

---

## 📦 How to Use This Knowledge Base

### Option 1: Obsidian Vault (Recommended)

[Obsidian](https://obsidian.md/) turns this repo into an interconnected wiki with graph view, backlinks, and instant search.

```bash
# 1. Clone the repo
git clone https://github.com/winnerineast/awesome-redhat.git

# 2. Open Obsidian → "Open folder as vault" → select the awesome-redhat folder

# 3. Start at the Dashboard: 00-Home/Dashboard.md
```

**Tips for Obsidian users:**
- Press `Ctrl+G` (or `Cmd+G`) to open **Graph View** — visualize all topic connections
- Press `Ctrl+O` (or `Cmd+O`) to **Quick Open** any note by name
- Press `Ctrl+Shift+F` to **search** across all notes
- Use the left sidebar to browse the folder tree
- Install community plugins for enhanced experience:
  - **Dataview** — dynamic queries across notes
  - **Templater** — use the templates in `Templates/` when creating new notes
  - **Calendar** — track your learning progress

### Option 2: Browse on GitHub

Every folder has an `_Index.md` file that serves as a table of contents. Start from the links below and follow the folder structure.

### Option 3: Clone and Read Locally

Use any markdown editor (VS Code, Typora, etc.) to read the `.md` files. The `[[wikilinks]]` won't resolve, but the content is fully readable.

---

## 🗺️ Vault Map

| Section | Description | Notes |
|:--------|:------------|------:|
| [`00-Home/`](00-Home/) | Dashboard, vault guide, glossary | 3 |
| [`01-Learning-Paths/`](01-Learning-Paths/) | Structured skill progressions with course→certification mapping | 6 |
| [`02-OpenShift/`](02-OpenShift/) | **Core** — architecture, networking, storage, security, CI/CD, scaling | 44 |
| [`03-Kubernetes-Fundamentals/`](03-Kubernetes-Fundamentals/) | Upstream K8s concepts | 9 |
| [`04-RHEL/`](04-RHEL/) | Red Hat Enterprise Linux foundations | 10 |
| [`05-Ansible/`](05-Ansible/) | Ansible Automation Platform | 7 |
| [`06-Cloud-Services/`](06-Cloud-Services/) | ROSA, ARO, Dedicated, Hybrid Cloud | 6 |
| [`07-DevSecOps/`](07-DevSecOps/) | Supply chain security, ACS, compliance | 6 |
| [`08-Middleware-and-Runtimes/`](08-Middleware-and-Runtimes/) | Quarkus, Spring Boot, JBoss, Serverless | 6 |
| [`09-Data-and-Integration/`](09-Data-and-Integration/) | Kafka, Camel, API Management | 5 |
| [`10-AI-ML-on-OpenShift/`](10-AI-ML-on-OpenShift/) | OpenShift AI, GPU, Model Serving | 5 |
| [`11-Certifications/`](11-Certifications/) | Exam study guides & prep strategies | 8 |
| [`12-Awesome-Resources/`](12-Awesome-Resources/) | Curated links: docs, books, labs, videos | 9 |
| [`Templates/`](Templates/) | Reusable note templates for consistency | 4 |

---

## 📚 Learning Paths

> Structured skill paths based on [Red Hat's official training curriculum](https://www.redhat.com/en/resources/openshift-skill-paths-datasheet). Each path maps courses to certifications.

### 🏗️ OpenShift Administrator

```
DO180 (Admin I) → DO280 (Admin II) → DO380 (Admin III)
  ↓                  ↓                   ↓
EX180 (Technologist) EX280 (OCP Admin)   EX380 (Advanced)
```
→ [Full path details](01-Learning-Paths/OpenShift-Administrator-Path.md)

### 💻 OpenShift Developer

```
DO080 (Free Overview) → DO188 (Containers) → DO288 (OCP Dev) → DO378 (Cloud-Native)
                           ↓                     ↓
                        EX180 (Technologist)   EX288 (OCP Developer)
```
→ [Full path details](01-Learning-Paths/OpenShift-Developer-Path.md)

### 🏛️ OpenShift Architect

Cross-domain path covering admin + dev + multi-cluster + security → [RHCA](01-Learning-Paths/OpenShift-Architect-Path.md)

### ⚙️ Ansible Automation

```
RH294 (Ansible Basics) → DO447 (Advanced) → DO457 (Network)
  ↓                        ↓
EX294 (RHCE)             EX447
```
→ [Full path details](01-Learning-Paths/Ansible-Automation-Path.md)

### 🐧 RHEL System Administration

```
RH066 (Free) → RH124 (SysAdmin I) → RH134 (SysAdmin II) → EX200 (RHCSA)
```
→ [Full path details](01-Learning-Paths/RHEL-SysAdmin-Path.md)

---

## 🏗️ OpenShift Ecosystem

**Core Platform**

- [OpenShift Architecture Overview](02-OpenShift/Architecture/OpenShift-Architecture-Overview.md) — Control plane, workers, etcd, operators
- [IPI vs UPI](02-OpenShift/Installation/IPI-vs-UPI.md) — Installation methods comparison
- [Operators Framework](02-OpenShift/Architecture/Operators-Framework.md) — OLM, OperatorHub, custom operators

**Networking**

- [SDN Overview](02-OpenShift/Networking/SDN-Overview.md) — Software-Defined Networking in OpenShift
- [OVN-Kubernetes](02-OpenShift/Networking/OVN-Kubernetes.md) — Default network provider
- [Ingress and Routes](02-OpenShift/Networking/Ingress-and-Routes.md) — Exposing applications
- [Network Policies](02-OpenShift/Networking/Network-Policies.md) — Traffic control & microsegmentation
- [Service Mesh](02-OpenShift/Networking/Service-Mesh.md) — Istio-based service mesh

**Storage**

- [Persistent Volumes](02-OpenShift/Storage/Persistent-Volumes.md) — PV/PVC lifecycle
- [CSI Drivers](02-OpenShift/Storage/CSI-Drivers.md) — Container Storage Interface
- [ODF](02-OpenShift/Storage/ODF-OpenShift-Data-Foundation.md) — OpenShift Data Foundation

**Security**

- [RBAC](02-OpenShift/Security/RBAC.md) — Role-Based Access Control
- [SCC](02-OpenShift/Security/SCC-Security-Context-Constraints.md) — Security Context Constraints
- [OAuth & Identity](02-OpenShift/Security/OAuth-and-Identity-Providers.md) — Authentication & SSO
- [ACS](02-OpenShift/Security/ACS-Advanced-Cluster-Security.md) — Advanced Cluster Security (StackRox)

**Workloads**

- [Deployments](02-OpenShift/Workloads/Deployments-and-DeploymentConfigs.md) — Application deployment strategies
- [StatefulSets](02-OpenShift/Workloads/StatefulSets.md) — Stateful applications
- [OpenShift Virtualization](02-OpenShift/Workloads/OpenShift-Virtualization.md) — Running VMs on OpenShift

**CI/CD**

- [OpenShift Pipelines (Tekton)](02-OpenShift/CI-CD/OpenShift-Pipelines-Tekton.md) — Cloud-native pipelines
- [OpenShift GitOps (Argo CD)](02-OpenShift/CI-CD/OpenShift-GitOps-ArgoCD.md) — Declarative GitOps
- [Source-to-Image (S2I)](02-OpenShift/CI-CD/Source-to-Image-S2I.md) — Build strategies
- [Image Streams](02-OpenShift/CI-CD/Image-Streams.md) — Image management

**Observability**

- [Cluster Monitoring](02-OpenShift/Monitoring-and-Logging/Cluster-Monitoring.md) — Built-in Prometheus stack
- [Prometheus & AlertManager](02-OpenShift/Monitoring-and-Logging/Prometheus-and-AlertManager.md) — Metrics & alerting
- [Cluster Logging](02-OpenShift/Monitoring-and-Logging/Cluster-Logging-EFK.md) — Centralized log aggregation

**Scaling & Multi-Cluster**

- [HPA and VPA](02-OpenShift/Scaling-and-Performance/HPA-and-VPA.md) — Pod autoscaling
- [Machine Sets & Config](02-OpenShift/Scaling-and-Performance/Machine-Sets-and-Machine-Config.md) — Node management
- [ACM](02-OpenShift/Multi-Cluster/ACM-Advanced-Cluster-Management.md) — Multi-cluster governance

---

## ☸️ Kubernetes Fundamentals

- [Core Concepts](03-Kubernetes-Fundamentals/Core-Concepts.md) — Pods, ReplicaSets, Deployments, Services
- [Pods and Containers](03-Kubernetes-Fundamentals/Pods-and-Containers.md) — Pod lifecycle, multi-container patterns
- [ConfigMaps and Secrets](03-Kubernetes-Fundamentals/ConfigMaps-and-Secrets.md) — Configuration management
- [RBAC](03-Kubernetes-Fundamentals/RBAC-Kubernetes.md) — Authorization in K8s
- [Helm](03-Kubernetes-Fundamentals/Helm.md) — Package manager for Kubernetes
- [Kustomize](03-Kubernetes-Fundamentals/Kustomize.md) — Template-free configuration
- [CRDs and Operators](03-Kubernetes-Fundamentals/CRDs-and-Operators.md) — Extending Kubernetes

---

## 🐧 Red Hat Enterprise Linux (RHEL)

- [System Administration](04-RHEL/System-Administration.md) — Users, groups, permissions, processes
- [Package Management](04-RHEL/Package-Management-DNF-RPM.md) — DNF, RPM, repositories
- [SELinux](04-RHEL/SELinux.md) — Security-Enhanced Linux
- [Systemd](04-RHEL/Systemd.md) — Service management
- [Podman and Containers](04-RHEL/Podman-and-Containers.md) — Rootless containers on RHEL
- [RHEL Image Mode](04-RHEL/RHEL-Image-Mode.md) — Image-based OS deployments (RHEL 10+)

---

## ⚙️ Ansible Automation Platform

- [Ansible Basics](05-Ansible/Ansible-Basics.md) — Modules, tasks, plays, inventories
- [Playbooks and Roles](05-Ansible/Playbooks-and-Roles.md) — Reusable automation
- [Automation Platform](05-Ansible/Ansible-Automation-Platform.md) — Controller, Hub, Execution Environments
- [Ansible for OpenShift](05-Ansible/Ansible-for-OpenShift.md) — K8s/OCP modules & collections
- [Ansible Lightspeed](05-Ansible/Ansible-Lightspeed.md) — AI-assisted automation

---

## ☁️ Cloud Services

- [ROSA](06-Cloud-Services/ROSA-Red-Hat-OpenShift-on-AWS.md) — Red Hat OpenShift Service on AWS
- [ARO](06-Cloud-Services/ARO-Azure-Red-Hat-OpenShift.md) — Azure Red Hat OpenShift
- [OpenShift Dedicated](06-Cloud-Services/OpenShift-Dedicated.md) — Fully-managed single-tenant clusters
- [Hybrid Cloud Strategy](06-Cloud-Services/Hybrid-Cloud-Strategy.md) — Multi-cloud & hybrid architecture

---

## 🔒 DevSecOps

- [Supply Chain Security](07-DevSecOps/Supply-Chain-Security.md) — Sigstore, SBOM, provenance
- [Container Image Signing](07-DevSecOps/Container-Image-Signing.md) — Cosign & image verification
- [Compliance Operator](07-DevSecOps/Compliance-Operator.md) — Automated compliance scanning
- [StackRox / ACS](07-DevSecOps/StackRox-ACS.md) — Runtime security & vulnerability management
- [Quay Registry](07-DevSecOps/Quay-Registry.md) — Enterprise container registry

---

## 🧩 Middleware & Runtimes

- [Quarkus](08-Middleware-and-Runtimes/Quarkus.md) — Supersonic Subatomic Java
- [Spring Boot on OpenShift](08-Middleware-and-Runtimes/Spring-Boot-on-OpenShift.md) — Spring on containers
- [JBoss EAP](08-Middleware-and-Runtimes/JBoss-EAP.md) — Enterprise Application Platform
- [Serverless (Knative)](08-Middleware-and-Runtimes/Serverless-Knative.md) — Event-driven serverless

---

## 🔗 Data & Integration

- [AMQ Streams (Kafka)](09-Data-and-Integration/AMQ-Streams-Kafka.md) — Apache Kafka on OpenShift
- [Camel K](09-Data-and-Integration/Camel-K.md) — Integration framework
- [3scale API Management](09-Data-and-Integration/3scale-API-Management.md) — API gateway & management
- [Red Hat Data Grid](09-Data-and-Integration/Red-Hat-Data-Grid.md) — In-memory data grid

---

## 🤖 AI/ML on OpenShift

- [OpenShift AI (RHOAI)](10-AI-ML-on-OpenShift/OpenShift-AI-RHOAI.md) — Red Hat OpenShift AI platform
- [GPU & NVIDIA Integration](10-AI-ML-on-OpenShift/GPU-and-NVIDIA-Integration.md) — GPU operator & accelerated computing
- [Model Serving](10-AI-ML-on-OpenShift/Model-Serving.md) — Serving ML models at scale
- [OpenShift Lightspeed](10-AI-ML-on-OpenShift/OpenShift-Lightspeed.md) — AI-powered cluster assistant

---

## 🎓 Certifications

| Exam | Certification | Prep Course | Study Guide |
|:-----|:-------------|:------------|:------------|
| EX180 | Certified Technologist in OpenShift | DO180 / DO188 | [Guide](11-Certifications/EX180-Containers-Kubernetes.md) |
| EX200 | RHCSA (System Administrator) | RH124 + RH134 | [Guide](11-Certifications/EX200-RHCSA.md) |
| EX280 | Certified OpenShift Administrator | DO280 | [Guide](11-Certifications/EX280-OpenShift-Admin.md) |
| EX288 | Certified OpenShift Developer | DO288 | [Guide](11-Certifications/EX288-OpenShift-Developer.md) |
| EX294 | RHCE (Ansible) | RH294 | [Guide](11-Certifications/EX294-Ansible.md) |
| EX380 | Advanced System Admin in OpenShift | DO380 | [Guide](11-Certifications/EX380-OpenShift-Advanced.md) |

→ [Study Tips and Resources](11-Certifications/Study-Tips-and-Resources.md)

---

## 📖 Resources

- [Official Documentation](12-Awesome-Resources/Official-Documentation.md) — Red Hat docs, product guides
- [Community and Forums](12-Awesome-Resources/Community-and-Forums.md) — Stack Overflow, Reddit, mailing lists
- [Books and eBooks](12-Awesome-Resources/Books-and-eBooks.md) — Recommended reading
- [YouTube Channels](12-Awesome-Resources/YouTube-Channels.md) — Video learning resources
- [Blogs and Newsletters](12-Awesome-Resources/Blogs-and-Newsletters.md) — Stay up to date
- [Hands-On Labs](12-Awesome-Resources/Hands-On-Labs.md) — Interactive learning environments
- [GitHub Repos](12-Awesome-Resources/GitHub-Repos.md) — Useful open-source projects
- [Conferences and Events](12-Awesome-Resources/Conferences-and-Events.md) — Red Hat Summit, KubeCon, etc.

---

## 🏗️ Vault Structure

```
awesome-redhat/                        ← Git repo root & Obsidian vault root
├── README.md                          ← This file (awesome-list index)
├── .obsidian/                         ← Obsidian config (auto-configured)
├── 00-Home/                           ← Dashboard, guide, glossary
├── 01-Learning-Paths/                 ← Skill path roadmaps
├── 02-OpenShift/                      ← Core OpenShift KB (largest section)
│   ├── Architecture/
│   ├── Installation/
│   ├── Networking/
│   ├── Storage/
│   ├── Security/
│   ├── Workloads/
│   ├── CI-CD/
│   ├── Monitoring-and-Logging/
│   ├── Scaling-and-Performance/
│   └── Multi-Cluster/
├── 03-Kubernetes-Fundamentals/
├── 04-RHEL/
├── 05-Ansible/
├── 06-Cloud-Services/
├── 07-DevSecOps/
├── 08-Middleware-and-Runtimes/
├── 09-Data-and-Integration/
├── 10-AI-ML-on-OpenShift/
├── 11-Certifications/
├── 12-Awesome-Resources/
├── Templates/                         ← Note templates for consistency
└── Assets/images/                     ← Diagrams & screenshots
```

---

## 🤝 Contributing

This is a personal learning vault, but contributions are welcome!

1. **Fork** this repo
2. **Create** new notes using templates from [`Templates/`](Templates/)
3. Follow the frontmatter convention:
   ```yaml
   ---
   tags: [topic-tag]
   status: stub | draft | review | done
   created: YYYY-MM-DD
   ---
   ```
4. Use `[[wikilinks]]` to connect related notes
5. **Submit** a pull request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
