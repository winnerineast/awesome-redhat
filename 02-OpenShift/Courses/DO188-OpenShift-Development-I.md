---
tags: [openshift, course, development, beginner]
course_code: DO188
course_title: "Red Hat OpenShift Development I: Introduction to Containers with Podman"
duration: "5 days"
format: "Classroom, Virtual, Self-paced"
cost: Subscription
prerequisites: "Programming experience in any language"
certification_prep: EX180
status: active
created: 2025-07-08
---

# 📗 DO188 — Red Hat OpenShift Development I: Introduction to Containers with Podman

> The core developer course on building, running, and managing containers with Podman, and introducing basic container deployment workflows on Red Hat OpenShift.

---

## Course Overview

| | |
|---|---|
| **Code** | DO188 |
| **Duration** | 5 days (40 hours) |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | Basic programming experience |
| **Next Step** | [[DO288-OpenShift-Development-II]] |
| **Certification** | Maps directly to [[EX180-Containers-Kubernetes]] |
| **Learning Path** | [[OpenShift-Developer-Path]] |

## Learning Objectives

After completing this course, you will be able to:
1. Explain container terminology and structural layers.
2. Build custom container images using Containerfiles.
3. Manage multi-container applications using Podman networks and local pods.
4. Mount persistent storage volumes and configure port forwarding locally.
5. Deploy containerized applications directly to OpenShift.

---

## Module 1: Image Construction with Containerfiles

### Containerfile Syntax Reference

```dockerfile
# 1. Base Image
FROM registry.access.redhat.com/ubi9/ubi-minimal:latest

# 2. Metadata Labels
LABEL maintainer="developer@example.com"
LABEL version="1.0"

# 3. Environment Variables
ENV PORT=8080
ENV APP_ROOT=/opt/app

# 4. User and Working Directory
WORKDIR ${APP_ROOT}

# 5. Installing packages (always clean cache to reduce layer size!)
RUN microdnf install -y python3 && microdnf clean all

# 6. Copying files
COPY app.py ./

# 7. Port definition
EXPOSE ${PORT}

# 8. Executable Entrypoint
CMD ["python3", "app.py"]
```

### Build Commands

```bash
# Build image from local path
podman build -t my-app:1.0 .

# Build using an alternative file name
podman build -f custom.Containerfile -t my-app:1.0 .

# Remove built images
podman rmi my-app:1.0
```

---

## Module 2: Local Multi-Container Networking

```
┌────────────────────────────────────────────────────────┐
│                   Podman Network                       │
│ ┌───────────────────────┐    ┌───────────────────────┐ │
│ │  Container: frontend  │    │  Container: backend   │ │
│ │  (Exposes 8080:8080)  │◀──▶│  (Accessible via IP)   │ │
│ └───────────────────────┘    └───────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

```bash
# Create custom user-defined network (enables DNS name lookup)
podman network create dev-network

# Start backend database inside the network
podman run -d --name db-srv --network dev-network \
  -e MYSQL_ROOT_PASSWORD=secret \
  docker.io/library/mariadb:latest

# Start frontend application connecting to backend database via container name DNS resolver
podman run -d --name app-web --network dev-network -p 8080:8080 \
  -e DB_HOST=db-srv \
  quay.io/donschenck/todo-app:latest
```

---

## Module 3: Local Pods with Podman

Podman introduces the concept of **Pods** locally, mirroring Kubernetes pod architectures. Containers in the same pod share a network namespace, loopback interface, and port space.

```bash
# 1. Create a pod exposing port 8080
podman pod create --name my-pod -p 8080:8080

# 2. Run a container inside the pod (Note: port mapping is defined on the pod, not the container!)
podman run -d --name web-container --pod my-pod \
  registry.access.redhat.com/ubi9/httpd-24

# 3. List pods and their containers
podman pod ps
podman ps --pod
```

---

## Module 4: Deploying to OpenShift

```bash
# Log in to cluster
oc login -u developer -p developer https://api.cluster.example.com:6443

# Deploy application directly from local registry image
oc new-app --docker-image=quay.io/myorg/myapp:latest --name=myapp

# Verify deployment logs and pod status
oc get pods
oc logs deployment/myapp
```

---

## Related Notes
- [[DO180-OpenShift-Administration-I]] — Admin track equivalent
- [[DO288-OpenShift-Development-II]] — Advanced developer course
- [[EX180-Containers-Kubernetes]] — Exam study guide
- [[OpenShift-Developer-Path]] — MOC
