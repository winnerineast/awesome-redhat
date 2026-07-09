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
| **Next Step** | [DO288-OpenShift-Development-II](DO288-OpenShift-Development-II.md) |
| **Certification** | Maps directly to [EX180-Containers-Kubernetes](../../11-Certifications/EX180-Containers-Kubernetes.md) |
| **Learning Path** | [OpenShift-Developer-Path](../../01-Learning-Paths/OpenShift-Developer-Path.md) |

## Learning Objectives

After completing this course, you will be able to:
1. Explain container terminology and structural layers.
2. Build custom container images using Containerfiles.
3. Manage multi-container applications using Podman networks and local pods.
4. Mount persistent storage volumes and configure port forwarding locally.
5. Deploy containerized applications directly to OpenShift.

---

## Module 1: Image Construction & Containerfile Best Practices

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

# 5. Package Installation (always clean cache to reduce image layer size!)
RUN microdnf install -y python3 && microdnf clean all

# 6. Copying files
COPY app.py ./

# 7. Port definition
EXPOSE ${PORT}

# 8. Executable Entrypoint
CMD ["python3", "app.py"]
```

### Build Caching & Optimization
- **Caching mechanism:** Every instruction (`RUN`, `COPY`, `ADD`) creates a read-only filesystem layer. Podman caches these layers. If an instruction's dependencies do not change, Podman skips execution on rebuilds.
- **Optimization Tip:** Order instructions from least-frequently-changing to most-frequently-changing. (e.g. install system packages *before* copying application code).

### Multi-Stage Builds
Multi-stage builds compile applications in a heavy build container, then copy only the compiled binary artifacts to a clean, minimal runtime base image. This minimizes image size and removes compiler vulnerabilities.

```dockerfile
# Stage 1: Build & Compile
FROM registry.access.redhat.com/ubi9/openjdk-17:latest AS builder
WORKDIR /workspace
COPY pom.xml .
COPY src src
RUN ./mvnw package -DskipTests

# Stage 2: Runtime
FROM registry.access.redhat.com/ubi9/openjdk-17-runtime:latest
WORKDIR /app
COPY --from=builder /workspace/target/app.jar ./app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

---

## Module 2: Local Multi-Container Networking

By default, Podman container network names can only be resolved via DNS if they run inside a user-defined bridge network.

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
  docker.io/library/mariadb:10.11

# Start frontend application connecting to backend database via container name DNS resolver
podman run -d --name app-web --network dev-network -p 8080:8080 \
  -e DB_HOST=db-srv \
  quay.io/donschenck/todo-app:latest
```

---

## Module 3: Local Pods & Persistent Storage with Podman

### Local Pods
In Podman, you can create local **Pods** that model Kubernetes architectures. All containers inside a pod share:
- Network namespace (ports, localhost routing)
- IPC namespace
- UTC hostname

```bash
# 1. Create a pod exposing port 8080 (Port mapping is defined on the POD, not the containers!)
podman pod create --name dev-pod -p 8080:8080

# 2. Run a container inside the pod
podman run -d --name web-container --pod dev-pod registry.access.redhat.com/ubi9/nginx-120
```

### Persistent Storage: Host Mounts vs. Named Volumes
Containers are ephemeral (data is lost on exit). To persist data:
- **Host (Bind) Mounts:** Mounts a specific absolute directory path on the host computer. Good for development source code.
  ```bash
  podman run -d -v /home/user/src:/opt/app:Z my-app:1.0
  ```
  *Note the `:Z` flag: Instructs Podman to automatically label the directory with SELinux permissions so the container can write to it.*
- **Named Volumes:** Managed internally by Podman. Easier to backup and independent of host directory layouts.
  ```bash
  # Create volume
  podman volume create db-volume
  # Mount it
  podman run -d -v db-volume:/var/lib/mysql mariadb
  ```

---

## Module 4: Deploying to OpenShift

```bash
# Log in to cluster
oc login -u developer -p developer https://api.cluster.example.com:6443

# Deploy application directly from external registry image
oc new-app --docker-image=quay.io/myorg/myapp:latest --name=myapp

# View logs and status
oc get pods
oc logs deployment/myapp
```

---

## Practice Lab: Local Multi-Container Pod Development

### Objective
Create a local database-driven application running inside a single Podman Pod, utilizing persistent storage volumes.

### Step 1: Create Named Volume
```bash
podman volume create sql-data
```

### Step 2: Create local Pod
Create a pod mapping HTTP port 8080.
```bash
podman pod create --name lab-pod -p 8080:8080
```

### Step 3: Run Database Container inside Pod
```bash
podman run -d --name lab-db --pod lab-pod \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=items \
  -v sql-data:/var/lib/mysql \
  docker.io/library/mariadb:10.11
```

### Step 4: Run Web App Container inside same Pod
Because containers in the same pod share the localhost network namespaces, the web app can access the database directly on `localhost:3306`!
```bash
podman run -d --name lab-web --pod lab-pod \
  -e DB_HOST=localhost \
  -e DB_USER=root \
  -e DB_PASSWORD=secret \
  -e DB_NAME=items \
  quay.io/donschenck/todo-app:latest
```

### Step 5: Verify & Clean Up
Open a web browser to `http://localhost:8080` to verify the application loads and successfully registers values in the database.
```bash
# Delete the entire pod and all its containers
podman pod rm -f lab-pod
```

---

## Related Notes
- [DO180-OpenShift-Administration-I](DO180-OpenShift-Administration-I.md) — Admin track equivalent
- [DO288-OpenShift-Development-II](DO288-OpenShift-Development-II.md) — Advanced developer course
- [EX180-Containers-Kubernetes](../../11-Certifications/EX180-Containers-Kubernetes.md) — Exam study guide
- [OpenShift-Developer-Path](../../01-Learning-Paths/OpenShift-Developer-Path.md) — MOC
