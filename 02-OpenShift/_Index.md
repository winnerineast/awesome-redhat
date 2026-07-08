---
tags: [openshift, moc]
aliases: [OpenShift, OCP]
created: 2025-07-08
---

# 🏗️ OpenShift Knowledge Base

> Comprehensive knowledge base for Red Hat OpenShift Container Platform (OCP). Organized by domain areas.

---

## Architecture
- [[OpenShift-Architecture-Overview]] — Platform architecture & components
- [[Control-Plane]] — API Server, Controller Manager, Scheduler, etcd
- [[Worker-Nodes]] — Compute nodes, machine management
- [[etcd]] — Distributed key-value store
- [[Operators-Framework]] — OLM, OperatorHub, Operator SDK

## Installation & Configuration
- [[IPI-vs-UPI]] — Installation methods comparison
- [[AWS-Installation]] — Installing on Amazon Web Services
- [[Azure-ARO]] — Azure Red Hat OpenShift
- [[Bare-Metal]] — Bare-metal installation
- [[ROSA]] — Red Hat OpenShift Service on AWS

## Networking
- [[SDN-Overview]] — Software-Defined Networking overview
- [[OVN-Kubernetes]] — Default network provider (OVN-K)
- [[Ingress-and-Routes]] — Exposing services externally
- [[Network-Policies]] — Traffic control & microsegmentation
- [[Service-Mesh]] — Istio-based service mesh

## Storage
- [[Persistent-Volumes]] — PV/PVC lifecycle & storage classes
- [[CSI-Drivers]] — Container Storage Interface drivers
- [[ODF-OpenShift-Data-Foundation]] — Software-defined storage (Ceph-based)

## Security
- [[RBAC]] — Role-Based Access Control
- [[SCC-Security-Context-Constraints]] — Pod security policies
- [[OAuth-and-Identity-Providers]] — Authentication configuration
- [[Network-Policies-Security]] — Network-level security
- [[ACS-Advanced-Cluster-Security]] — StackRox / RHACS

## Workloads
- [[Deployments-and-DeploymentConfigs]] — Application deployment
- [[StatefulSets]] — Stateful workloads
- [[DaemonSets]] — Node-level workloads
- [[Jobs-and-CronJobs]] — Batch processing
- [[OpenShift-Virtualization]] — Running VMs on OpenShift

## CI/CD
- [[OpenShift-Pipelines-Tekton]] — Cloud-native CI/CD
- [[OpenShift-GitOps-ArgoCD]] — GitOps with Argo CD
- [[Source-to-Image-S2I]] — Build strategies
- [[Image-Streams]] — Image management & triggers

## Monitoring & Logging
- [[Cluster-Monitoring]] — Built-in monitoring stack
- [[Prometheus-and-AlertManager]] — Metrics & alerting
- [[Grafana-Dashboards]] — Visualization
- [[Cluster-Logging-EFK]] — Logging infrastructure

## Scaling & Performance
- [[HPA-and-VPA]] — Pod autoscaling
- [[Cluster-Autoscaler]] — Cluster-level autoscaling
- [[Machine-Sets-and-Machine-Config]] — Node management
- [[Performance-Tuning]] — Optimization techniques

## Multi-Cluster Management
- [[ACM-Advanced-Cluster-Management]] — Fleet governance
- [[Multi-Cluster-Networking]] — Cross-cluster connectivity
- [[Fleet-Management]] — Managing clusters at scale
