---
tags: [openshift, course, development, intermediate]
course_code: DO288
course_title: "Red Hat OpenShift Development II: Building Kubernetes Applications"
duration: "5 days"
format: "Classroom, Virtual, Self-paced"
cost: Subscription
prerequisites: "DO188 or equivalent experience"
certification_prep: EX288
status: active
created: 2025-07-08
---

# 📘 DO288 — Red Hat OpenShift Development II: Building Kubernetes Applications

> The advanced application developer course on Red Hat OpenShift. Covers customizing image builds, deploying templated workloads, packaging with Helm, configuring ingress, and designing CI/CD pipelines.

---

## Course Overview

| | |
|---|---|
| **Code** | DO288 |
| **Duration** | 5 days (40 hours) |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | [DO188-OpenShift-Development-I](DO188-OpenShift-Development-I.md) or equivalent |
| **Next Step** | [DO378-Cloud-Native-Microservices](DO378-Cloud-Native-Microservices.md) |
| **Certification** | Maps directly to [EX288-OpenShift-Developer](../../11-Certifications/EX288-OpenShift-Developer.md) |
| **Learning Path** | [OpenShift-Developer-Path](../../01-Learning-Paths/OpenShift-Developer-Path.md) |

## Learning Objectives

After completing this course, you will be able to:
1. Design containerized applications for deployment on OpenShift clusters.
2. Build custom container images using Source-to-Image (S2I) builder images.
3. Customize application deployment using OpenShift templates and Helm charts.
4. Expose applications using secure HTTPS Ingress Routes.
5. Inject configuration parameters using ConfigMaps, Secrets, and the Downward API.
6. Design and implement CI/CD pipelines using OpenShift Pipelines (Tekton).

---

## Module 1: Source-to-Image (S2I) Builds

Source-to-Image (S2I) compiles application source code from Git directly inside a pre-built **Builder Image** to create a runnable container image.

### Custom S2I Builder Image Structure
To create your own custom builder image, your project must include:
1. **Containerfile:** Installs runtimes/compilers and sets the S2I scripts location.
2. **S2I Scripts (written in shell script):**
   - **`assemble`:** Copies code to work directory, downloads package libraries, and compiles binaries.
   - **`run`:** Starts the application (must run in foreground to keep container running).
   - **`save-artifacts` (optional):** Packages build dependencies to accelerate incremental builds.

```dockerfile
# Builder Containerfile:
FROM registry.access.redhat.com/ubi9/ubi-minimal:latest
LABEL io.openshift.s2i.scripts-url="image:///usr/libexec/s2i"
RUN microdnf install -y tar gzip && microdnf clean all
COPY ./s2i/bin/ /usr/libexec/s2i/
```

### CLI Build Triggers
```bash
# Trigger an S2I build from Git repository
oc new-app python:3.9~https://github.com/sclorg/django-ex.git --name=django-web

# Stream build logs
oc logs -f bc/django-web
```

---

## Module 2: Workload Customization (Templates & Helm)

### OpenShift Templates
Templates represent parameterizable resource blueprints.

```yaml
apiVersion: template.openshift.io/v1
kind: Template
metadata:
  name: web-template
objects:
- apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: ${APP_NAME}
  spec:
    replicas: 1
    template:
      spec:
        containers:
        - name: app
          image: ${IMAGE_NAME}
parameters:
- name: APP_NAME
  value: webserver
- name: IMAGE_NAME
  value: registry.access.redhat.com/ubi9/httpd-24
```
```bash
# Deploy template with parameters
oc process -f template.yaml -p APP_NAME=dev-web | oc apply -f -
```

### Packaging Workloads with Helm
Helm handles packages called Charts. A typical chart folder:
```
my-chart/
  ├── Chart.yaml          # Metadata
  ├── values.yaml          # Default variables
  └── templates/           # Kubernetes manifests
      ├── deployment.yaml
      └── service.yaml
```
```bash
# Register repository and install release
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install my-app-release bitnami/nginx --set service.type=ClusterIP
```

---

## Module 3: Downward API Configurations

The Downward API allows containers to inspect their own runtime metadata (e.g. Node name, Pod IP, limits) without making direct queries to the Kubernetes API server.

```yaml
# Pod spec snippet:
spec:
  containers:
  - name: app-container
    image: registry.access.redhat.com/ubi9/ubi-minimal
    env:
    - name: POD_NAME
      valueFrom:
        fieldRef:
          fieldPath: metadata.name
    - name: POD_NAMESPACE
      valueFrom:
        fieldRef:
          fieldPath: metadata.namespace
    - name: CPU_LIMIT
      valueFrom:
        resourceFieldRef:
          containerName: app-container
          resource: limits.cpu
```

---

## Module 4: CI/CD Pipelines with OpenShift Pipelines (Tekton)

OpenShift Pipelines runs cloud-native CI/CD workloads. Every Task executes inside a dedicated Pod on the cluster.

```
  Git Webhook ──▶ EventListener ──▶ TriggerTemplate ──▶ PipelineRun (Pod)
```

### Tekton Resource Elements
- **Task:** Reusable step-by-step shell execution units running in separate containers.
- **Pipeline:** Links multiple Tasks together in a directed acyclic graph (DAG).
- **Workspaces:** Shared persistent storage volumes mapping code directories across Task runs.

### Automating with Tekton Triggers
To trigger builds automatically on Git commit pushes:
1. **EventListener:** Listens for HTTP webhook payloads outside the cluster.
2. **TriggerBinding:** Extracts Git parameters (e.g. Git URL, Branch commit).
3. **TriggerTemplate:** Generates a `PipelineRun` manifest using parameters from the binding.

---

## Practice Lab: Building a Tekton CI/CD Pipeline

### Objective
Create a Tekton pipeline that clones a Git repository, prints the contents, and deploys a web server.

### Step 1: Create a Project
```bash
oc new-project pipelining
```

### Step 2: Define the Git Clone Task
```yaml
# task-clone.yaml
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: clone-repo
spec:
  workspaces:
  - name: shared-workspace
  steps:
  - name: git-clone
    image: alpine/git:v2.26.2
    script: |
      git clone https://github.com/sclorg/django-ex.git $(workspaces.shared-workspace.path)/source
```
```bash
oc apply -f task-clone.yaml
```

### Step 3: Define the Pipeline
```yaml
# pipeline.yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: build-pipeline
spec:
  workspaces:
  - name: pipeline-workspace
  tasks:
  - name: fetch-source
    taskRef:
      name: clone-repo
    workspaces:
    - name: shared-workspace
      workspace: pipeline-workspace
```
```bash
oc apply -f pipeline.yaml
```

### Step 4: Run the Pipeline using a PipelineRun
Create a local PersistentVolumeClaim (PVC) to back the Workspace first:
```yaml
# workspace-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pipeline-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```
```bash
oc apply -f workspace-pvc.yaml
```

Run the pipeline:
```yaml
# pipelinerun.yaml
apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  name: run-1
spec:
  pipelineRef:
    name: build-pipeline
  workspaces:
  - name: pipeline-workspace
    persistentVolumeClaim:
      claimName: pipeline-pvc
```
```bash
oc apply -f pipelinerun.yaml
```

### Step 5: Verify Progress
Use the Tekton CLI tool `tkn` to watch execution:
```bash
tkn pipelinerun logs -f run-1
```

---

## Related Notes
- [OpenShift-Pipelines-Tekton](../CI-CD/OpenShift-Pipelines-Tekton.md) — Pipelines deep-dive
- [Source-to-Image-S2I](../CI-CD/Source-to-Image-S2I.md) — Advanced builder images
- [Helm](../../03-Kubernetes-Fundamentals/Helm.md) — Helm charts workflows
- [EX288-OpenShift-Developer](../../11-Certifications/EX288-OpenShift-Developer.md) — Exam study guide
- [OpenShift-Developer-Path](../../01-Learning-Paths/OpenShift-Developer-Path.md) — MOC
