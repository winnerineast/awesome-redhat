---
tags: [openshift, course, free, beginner]
course_code: DO080
course_title: "Deploying Containerized Applications Technical Overview"
duration: "~3 hours"
format: "Self-paced video"
cost: Free
prerequisites: None
status: active
created: 2025-07-08
---

# 🆓 DO080 — Deploying Containerized Applications Technical Overview

> A free, video-based introduction to container technologies, runtimes, registries, and basic container orchestration.

---

## Course Overview

| | |
|---|---|
| **Code** | DO080 |
| **Duration** | ~3 hours |
| **Format** | Self-paced video |
| **Cost** | Free |
| **Prerequisites** | None |
| **Next Step** | [[DO188-OpenShift-Development-I]] |
| **Learning Path** | [[OpenShift-Developer-Path]] |

## Learning Objectives

After completing this course, you will be able to:
1. Explain container terminology and key technology layers.
2. Outline the benefits of containerizing applications.
3. Contrast containers with virtual machines.
4. Describe the basic role of Kubernetes and Red Hat OpenShift in container orchestration.

---

## Module 1: Container Technology Basics

- **Operating System Virtualization:** Containers are sandboxed processes running on a shared host Linux kernel.
- **Images:** Immutable templates containing application source code, runtimes, configurations, and core system libraries.
- **Registries:** Central storage repositories for sharing and downloading container images.
- **Runtimes:** The software layer executing OCI containers (e.g. `crun`, `runc`, `CRI-O`).

---

## Module 2: The Role of Orchestration

When managing applications at scale, single-host engines like Podman or Docker are insufficient. Orchestrators (Kubernetes/OpenShift) provide:
- **High Availability:** Scheduling pods across multiple physical nodes.
- **Self-Healing:** Automatically restarting containers that fail health checks.
- **Load Balancing:** Directing ingress traffic across replicated instances.

---

## Related Notes
- [[DO188-OpenShift-Development-I]] — Next logical course
- [[Core-Concepts]] — Underpinnings of Kubernetes
- [[OpenShift-Developer-Path]] — MOC
