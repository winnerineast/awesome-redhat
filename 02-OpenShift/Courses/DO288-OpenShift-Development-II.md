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
| **Prerequisites** | [[DO188-OpenShift-Development-I]] or equivalent |
| **Next Step** | [[DO378-Cloud-Native-Microservices]] |
| **Certification** | Maps directly to [[EX288-OpenShift-Developer]] |
| **Learning Path** | [[OpenShift-Developer-Path]] |

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

### S2I Architecture

Source-to-Image (S2I) is a framework that combines application source code from Git with a pre-configured **Builder Image** to compile and produce a runnable container image.

```
  Git Repo (Code) ──┐
                    ├──▶ S2I Builder engine ──▶ Runnable Image ──▶ ImageStream
  Builder Image  ───┘
```

### Deploying via S2I

```bash
# Deploy Python app using S2I builder image
oc new-app python:3.9~https://github.com/sclorg/django-ex.git --name=django-app

# View build configurations and progress
oc get bc
oc logs -f bc/django-app
```

### Custom S2I Builder Image Structure

To create your own S2I builder image, you must define:
1. A base image containing compile and runtime environments (e.g. Node, Python).
2. S2I scripts located at `/usr/libexec/s2i/` (or configured via labels):
   - **`assemble`:** Copies code to work directory, installs dependencies, and runs build steps.
   - **`run`:** Executable shell script starting the application in foreground.
   - **`save-artifacts` (optional):** Packages dependencies for incremental builds.
   - **`usage` (optional):** Prints usage instructions.

```dockerfile
# Custom Builder Image Containerfile:
FROM registry.access.redhat.com/ubi9/ubi-minimal
LABEL io.openshift.s2i.scripts-url="image:///usr/libexec/s2i"
RUN microdnf install -y tar gzip && microdnf clean all
COPY ./s2i/bin/ /usr/libexec/s2i/
```

---

## Module 2: Workload Customization (Helm & Templates)

### OpenShift Templates

Templates define a list of Kubernetes/OpenShift objects that can be parameterized.

```yaml
apiVersion: template.openshift.io/v1
kind: Template
metadata:
  name: my-app-template
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
# Process and deploy template
oc process -f template.yaml -p APP_NAME=dev-web | oc apply -f -
```

### Packaging Workloads with Helm

Helm manages Kubernetes packages called **Charts**.

```bash
# Install a chart from a repository
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install my-release bitnami/nginx

# Customize installations using value overrides
helm install my-release bitnami/nginx --set service.type=ClusterIP

# List and upgrade releases
helm list
helm upgrade my-release bitnami/nginx --set service.type=LoadBalancer
```

---

## Module 3: Advanced Configurations & Downward API

### Downward API

Allows containers to inspect their own metadata (e.g., namespace, Pod IP, node name) without invoking the Kubernetes API directly.

```yaml
# Mount metadata as environment variables inside a Deployment:
spec:
  containers:
  - name: my-app
    image: registry.access.redhat.com/ubi9/httpd-24
    env:
    - name: MY_POD_NAME
      valueFrom:
        fieldRef:
          fieldPath: metadata.name
    - name: MY_POD_NAMESPACE
      valueFrom:
        fieldRef:
          fieldPath: metadata.namespace
    - name: MY_POD_IP
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
```

---

## Module 4: CI/CD Pipelines with OpenShift Pipelines (Tekton)

OpenShift Pipelines is a cloud-native CI/CD solution based on **Tekton**. It runs each step of the pipeline inside a dedicated container on the cluster.

### Tekton Resource Hierarchy

```
  PipelineRun (Executes a Pipeline with parameters)
       │
       ▼
  Pipeline (Defines order of Tasks to run)
       │
       ▼
  TaskRun (Executes a single Task)
       │
       ▼
  Task (Defines reusable steps inside containers)
```

### Reusable Task Example

```yaml
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: git-clone
spec:
  params:
  - name: repo-url
    type: string
  steps:
  - name: clone
    image: alpine/git
    script: |
      git clone $(params.repo-url) /workspace/source
```

### Execution

```bash
# View pipelines and runs
tkn pipeline list
tkn pipelinerun logs -f my-pipelinerun-xyz
```

---

## Related Notes
- [[OpenShift-Pipelines-Tekton]] — Pipelines deep-dive
- [[Source-to-Image-S2I]] — Advanced builder images
- [[Helm]] — Helm charts workflows
- [[EX288-OpenShift-Developer]] — Exam study guide
- [[OpenShift-Developer-Path]] — MOC
