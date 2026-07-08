---
tags: [home, glossary, reference]
aliases: [Terms, Definitions]
created: 2025-07-08
---

# 📗 Glossary

> Key terminology for Red Hat, OpenShift, Kubernetes, and cloud-native technologies.

---

## A

- **ACM** — Advanced Cluster Management for Kubernetes. Multi-cluster lifecycle, governance, and observability.
- **ACS** — Advanced Cluster Security (StackRox). Runtime security and vulnerability scanning.
- **Ansible** — Agentless IT automation platform using YAML playbooks.
- **API Server** — The central management entity of a Kubernetes cluster, serving the Kubernetes API.
- **ArgoCD** — Declarative GitOps continuous delivery tool for Kubernetes. Powers OpenShift GitOps.
- **ARO** — Azure Red Hat OpenShift. Jointly managed OpenShift on Microsoft Azure.

## B

- **BuildConfig** — OpenShift resource defining how to build container images (S2I, Docker, Custom).

## C

- **CaaS** — Containers as a Service.
- **CBO** — Cluster Bot Operator.
- **CCS** — Customer Cloud Subscription (managed OpenShift deployment model).
- **CI/CD** — Continuous Integration / Continuous Delivery.
- **CLI** — Command-Line Interface. See `oc` (OpenShift), `kubectl` (Kubernetes), `ansible` (Ansible).
- **ClusterOperator** — A Kubernetes operator that manages a core OpenShift component.
- **CNI** — Container Network Interface. Plugin standard for Kubernetes networking.
- **CoreOS** — Red Hat CoreOS (RHCOS), the immutable OS running on OpenShift nodes.
- **CRD** — Custom Resource Definition. Extends the Kubernetes API with custom resource types.
- **CSI** — Container Storage Interface. Standard for exposing storage to container workloads.

## D

- **DaemonSet** — Ensures a pod runs on all (or selected) nodes.
- **Deployment** — Kubernetes resource for managing stateless application rollouts.
- **DeploymentConfig** — OpenShift-specific deployment resource (legacy, being replaced by Deployments).
- **DNF** — Dandified YUM, the package manager for RHEL 8+.

## E

- **EFK** — Elasticsearch, Fluentd, Kibana. The legacy logging stack in OpenShift.
- **etcd** — Distributed key-value store used as Kubernetes' backing store for all cluster data.

## G

- **GitOps** — Operational framework using Git repositories as the source of truth for infrastructure.

## H

- **Helm** — Kubernetes package manager using charts (templated manifests).
- **HPA** — Horizontal Pod Autoscaler. Automatically scales pods based on metrics.

## I

- **IPI** — Installer-Provisioned Infrastructure. OpenShift installer manages the cloud resources.
- **ImageStream** — OpenShift abstraction for tracking container image references and updates.

## K

- **Knative** — Kubernetes-based platform for serverless workloads. Powers OpenShift Serverless.
- **KubeVirt** — Technology for running VMs on Kubernetes. Powers OpenShift Virtualization.
- **Kustomize** — Template-free Kubernetes configuration customization tool.

## M

- **MachineConfig** — OpenShift resource for managing node-level OS configuration.
- **MachineSet** — Defines a group of machines (nodes) with the same configuration.
- **MCO** — Machine Config Operator. Manages OS-level config on RHCOS nodes.

## N

- **Namespace** — Kubernetes mechanism for isolating groups of resources within a cluster.
- **Node** — A worker machine in Kubernetes/OpenShift (physical or virtual).

## O

- **`oc`** — The OpenShift CLI tool (superset of `kubectl`).
- **OCP** — OpenShift Container Platform.
- **ODF** — OpenShift Data Foundation (formerly OCS). Software-defined storage.
- **OLM** — Operator Lifecycle Manager. Manages operator installation and updates.
- **Operator** — A Kubernetes controller that encodes operational knowledge for an application.
- **OperatorHub** — Catalogue of available operators in OpenShift.
- **OVN** — Open Virtual Network. The default network provider in OpenShift 4.x.

## P

- **PaaS** — Platform as a Service.
- **PersistentVolume (PV)** — A piece of storage in the cluster provisioned by an administrator or dynamically.
- **PersistentVolumeClaim (PVC)** — A request for storage by a user/pod.
- **Pod** — The smallest deployable unit in Kubernetes — one or more containers sharing network/storage.
- **Podman** — Daemonless container engine for developing, managing, and running OCI containers.
- **Prometheus** — Open-source monitoring and alerting toolkit. Core of OpenShift's monitoring stack.
- **Project** — OpenShift wrapper around a Kubernetes namespace with additional metadata and RBAC.

## Q

- **Quarkus** — Kubernetes-native Java framework optimized for GraalVM and OpenJDK HotSpot.
- **Quay** — Red Hat's enterprise container registry (Quay.io).

## R

- **RBAC** — Role-Based Access Control.
- **RHCOS** — Red Hat CoreOS. Immutable, container-optimized OS for OpenShift nodes.
- **RHCSA** — Red Hat Certified System Administrator (EX200).
- **RHCE** — Red Hat Certified Engineer (EX294, focuses on Ansible).
- **RHEL** — Red Hat Enterprise Linux.
- **RHOAI** — Red Hat OpenShift AI.
- **ROSA** — Red Hat OpenShift Service on AWS. Jointly managed by Red Hat and AWS.
- **Route** — OpenShift resource that exposes a service to external traffic (with hostname-based routing).

## S

- **S2I** — Source-to-Image. OpenShift build strategy that produces ready-to-run images from source code.
- **SCC** — Security Context Constraints. OpenShift-specific policy for pod security.
- **SDN** — Software-Defined Networking.
- **SELinux** — Security-Enhanced Linux. Mandatory Access Control system.
- **Service** — Kubernetes abstraction for exposing an application running on pods.
- **StatefulSet** — Manages the deployment of stateful applications with stable network identities.

## T

- **Tekton** — Cloud-native CI/CD framework for Kubernetes. Powers OpenShift Pipelines.

## U

- **UPI** — User-Provisioned Infrastructure. User manages the cloud/bare-metal resources; installer handles OpenShift.

## V

- **VPA** — Vertical Pod Autoscaler. Adjusts pod resource requests based on usage.
