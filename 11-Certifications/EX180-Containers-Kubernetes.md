---
tags: [certification, openshift, k8s, ex180]
status: active
created: 2025-07-08
---

# 🎯 EX180 — Red Hat Certified Specialist in Containers and Kubernetes

> Evaluates foundational container technologies, including Podman, basic image builds, and deploying workloads onto a Red Hat OpenShift cluster.

---

## Exam Overview

| | |
|---|---|
| **Code** | EX180 |
| **Duration** | 2 hours |
| **Format** | Performance-based on live OpenShift environment |
| **Prep Course** | [[DO180-OpenShift-Administration-I]] or [[DO188-OpenShift-Development-I]] |
| **Learning Path** | [[OpenShift-Administrator-Path]] / [[OpenShift-Developer-Path]] |

---

## ⚡ EX180 Exam Quick-Reference Cheat Sheet

### 1. Podman Container Management
```bash
# Search and pull images
podman search httpd --filter=is-official
podman pull registry.access.redhat.com/ubi9/httpd-24

# Running background container with limits
podman run -d --name labapp -p 8080:8080 -v /opt/data:/var/www/html:Z registry.access.redhat.com/ubi9/httpd-24

# Container lifecycle checks
podman ps -a
podman logs labapp
podman inspect labapp | grep -i IPAddress
```

### 2. Custom Images & Builds
```bash
# Build custom image
podman build -t myapp:1.0 -f ./Containerfile

# Push/tag images
podman tag myapp:1.0 quay.io/myorg/myapp:latest
podman push quay.io/myorg/myapp:latest
```

### 3. OpenShift CLI Fundamentals
```bash
# Login and project switching
oc login -u developer -p developer https://api.cluster.example.com:6443
oc new-project dev-sandbox
oc project dev-sandbox

# Quick application deployment
oc new-app https://github.com/sclorg/nginx-ex.git --name=frontend
oc get pods -w
```

### 4. Basic Workloads & Exposing
```bash
# Deploy an image
oc create deployment app-srv --image=registry.access.redhat.com/ubi9/httpd-24

# Scale replicas
oc scale deployment/app-srv --replicas=3

# Expose internally (Service)
oc expose deployment/app-srv --port=8080 --target-port=8080

# Expose externally (Route)
oc expose service/app-srv --hostname=apps.cluster.example.com
```

---

## 📝 EX180 Mock Practice Lab

Complete the following tasks in under **2 hours**.

### Task 1: Podman Container Operation
1. Pull the official image `registry.access.redhat.com/ubi9/nginx-120`.
2. Run a container named `local-web` in the background.
3. Map host port `8080` to container port `8080`.
4. Ensure the container runs automatically after host system reboot using user-level systemd services. Enable user lingering.

### Task 2: Custom Containerfile Build
1. Create a `Containerfile` that:
   - Uses `registry.access.redhat.com/ubi9/ubi-minimal` as base.
   - Installs the package `httpd`.
   - Exposes port `8080`.
   - Copies a local file `hello.html` into `/var/www/html/`.
2. Build the image locally and name it `custom-httpd:v1`.

### Task 3: OpenShift Project Configuration
1. Log in to the OpenShift cluster.
2. Create a new namespace called `ex180-sandbox`.
3. Create a ServiceAccount named `app-runner` inside this namespace.

### Task 4: Deployment & Scaling
1. Deploy an application named `web-app` using the image `registry.access.redhat.com/ubi9/httpd-24`.
2. Configure the deployment to run with 3 replicas.
3. Inject the environment variable `APP_ENV=production` into the containers of this deployment.

### Task 5: Services & Ingress Routes
1. Expose the `web-app` deployment via a service on port `8080`.
2. Create an OpenShift Route named `web-route` exposing this service externally under the hostname `web.sandbox.apps.cluster.example.com`.

---

## Related Notes
- [[DO180-OpenShift-Administration-I]] — Course companion
- [[OpenShift-Administrator-Path]] — Full platform path MOC
