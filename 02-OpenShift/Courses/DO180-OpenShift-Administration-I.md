---
tags: [openshift, course, administration, beginner]
course_code: DO180
course_title: "OpenShift Administration I: Operating a Production Cluster"
duration: "5 days"
format: "Classroom, Virtual, Self-paced"
cost: Subscription
prerequisites: "RH124 or equivalent Linux experience"
certification_prep: EX180
status: active
created: 2025-07-08
---

# 📗 DO180 — OpenShift Administration I: Operating a Production Cluster

> The introductory course for Red Hat OpenShift cluster administrators and developers. Teaches the basics of containers, Kubernetes orchestration, and core OpenShift platform workflows.

---

## Course Overview

| | |
|---|---|
| **Code** | DO180 |
| **Duration** | 5 days (40 hours) |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | [[RH124-System-Administration-I]] or equivalent Linux experience |
| **Next Step** | [[DO280-OpenShift-Administration-II]] |
| **Certification** | Maps directly to [[EX180-Containers-Kubernetes]] |
| **Learning Path** | [[OpenShift-Administrator-Path]] |

## Learning Objectives

After completing this course, you will be able to:
1. Understand container architecture and container runtimes (Podman, CRI-O)
2. Deploy containerized applications locally using Podman
3. Understand the differences between Kubernetes and Red Hat OpenShift
4. Navigate the OpenShift Web Console and use the `oc` Command Line Interface (CLI)
5. Deploy applications to OpenShift using various build strategies (S2I, Containerfile)
6. Manage application resources (Pods, Deployments, Services, Routes)
7. Configure container application scaling, reliability, and security settings
8. Manage environment variables, ConfigMaps, and Secrets
9. Diagnose and troubleshoot application deployment issues

---

## Module 1: Introduction to Container Technology

### Monolithic vs Microservices Architecture

- **Monolith:** All functionality built into a single deployable unit. Scaling is resource-intensive. Single point of failure.
- **Microservices:** Applications decomposed into small, independent services communicating over APIs. Easy scaling, technology flexibility, and fast deployment.

### Containerization vs Virtualization

```
       Virtual Machines (VMs)                       Containers
┌─────────────────────────────────┐      ┌─────────────────────────────────┐
│ App A  │ App B  │ App C  │ App D│      │ App A  │ App B  │ App C  │ App D│
├────────┼────────┼────────┼────────┤      ├────────┼────────┼────────┼────────┤
│Guest OS│Guest OS│Guest OS│Guest OS│      │  Libs  │  Libs  │  Libs  │  Libs  │
├────────┴────────┴────────┴────────┤      ├────────┴────────┴────────┴────────┤
│           Hypervisor              │      │       Container Engine (Podman)   │
├───────────────────────────────────┤      ├───────────────────────────────────┤
│        Host Operating System      │      │        Host Operating System      │
├───────────────────────────────────┤      ├───────────────────────────────────┤
│         Physical Hardware         │      │         Physical Hardware         │
└───────────────────────────────────┘      └───────────────────────────────────┘
```

- **Hypervisors** virtualize the hardware layer. Each VM requires its own full Guest OS kernel, memory, and CPU overhead.
- **Containers** share the host Linux kernel. They are lightweight, start in milliseconds, and utilize only the necessary library binaries.

### Open Container Initiative (OCI)

The OCI defines industry standards for container formats and runtimes:
- **OCI Image Specification:** Defines how an image is packaged (layers, metadata).
- **OCI Runtime Specification:** Defines how to unpack and execute a container (e.g., runc, crun).

---

## Module 2: Creating Containerized Services

This module builds on the foundational Podman commands covered in [[RH134-System-Administration-II#Module-11-Running-Containers-with-Podman|RH134 Module 11]].

### Container registries
Container registries store and distribute container images:
- Red Hat Ecosystem: `registry.access.redhat.com` (public catalog) and `registry.redhat.io` (authenticated gateway)
- Public Hubs: `quay.io`, `docker.io`

```bash
# Log in to an authenticated registry
podman login registry.redhat.io
```

### Multi-Container Network Management

```bash
# Create a local OCI network
podman network create app-net

# Run a database in the network
podman run -d --name db --network app-net \
  -e MYSQL_ROOT_PASSWORD=redhat \
  -e MYSQL_DATABASE=items \
  docker.io/library/mariadb:latest

# Run a web application connecting to the database container name
podman run -d --name web --network app-net -p 8080:8080 \
  -e DB_HOST=db \
  -e DB_USER=root \
  -e DB_PASSWORD=redhat \
  -e DB_NAME=items \
  quay.io/donschenck/todo-app:latest
```

---

## Module 3: Introduction to Kubernetes and OpenShift

### What is Kubernetes (K8s)?
An open-source platform for automating deployment, scaling, and operations of application containers. It handles:
- Service discovery and load balancing
- Storage orchestration
- Automated rollouts and rollbacks
- Self-healing

### What is Red Hat OpenShift Container Platform (OCP)?
An enterprise-ready Kubernetes platform built on Red Hat Enterprise Linux CoreOS (RHCOS). It adds comprehensive developer and operations tools:

```
┌────────────────────────────────────────────────────────┐
│             OpenShift Developer & Operations UI        │
├──────────────────────────┬─────────────────────────────┤
│   Builds & S2I Pipelines │  Cluster Monitoring (Prom)  │
├──────────────────────────┼─────────────────────────────┤
│   Integrated Registry    │  Ingress Router (Routes)    │
├──────────────────────────┴─────────────────────────────┤
│                 Enterprise Kubernetes Core             │
├────────────────────────────────────────────────────────┤
│         Red Hat Enterprise Linux CoreOS (RHCOS)        │
└────────────────────────────────────────────────────────┘
```

- **Enterprise Security:** Default-deny cluster settings, strict Security Context Constraints (SCCs).
- **Integrated Registry:** Auto-build and store images directly inside the cluster.
- **Routes:** Out-of-the-box Ingress routing mapping external hostnames to internal services.
- **Pipelines & GitOps:** Native integrations with Tekton and Argo CD.

---

## Module 4: Deploying Applications to OpenShift

### Logging in and Command Line Navigation

```bash
# Log in to an OpenShift cluster API
oc login -u developer -p developer https://api.sandbox.openshift.com:6443

# Show current connection context
oc whoami
oc project                            # Show active namespace / project

# Create a new project
oc new-project my-app-dev

# Switch projects
oc project default
```

### Resource Types in OpenShift

| Resource | Short Name | Purpose |
|---|---|---|
| `Pod` | `po` | The smallest deployable unit (one or more containers) |
| `Service` | `svc` | Stable internal IP and load balancer for Pods |
| `Route` | `route` | Exposes a Service externally (DNS route) |
| `Deployment` | `deploy` | Manages Pod replication and update rollouts |
| `DeploymentConfig` | `dc` | Legacy OpenShift-specific Deployment with triggers |
| `ImageStream` | `is` | Tracks and references container images |

### Creating Workloads via CLI

```bash
# Method 1: Build from Source-to-Image (S2I)
oc new-app https://github.com/sclorg/django-ex.git --name=my-django

# Method 2: Deploy directly from an image
oc create deployment webserver --image=registry.access.redhat.com/ubi9/nginx-120

# View deployment progress
oc rollout status deployment/webserver
```

---

## Module 5: Managing Workloads on OpenShift

### Inspecting Resources

```bash
# Get resource summaries
oc get pods
oc get services
oc get routes

# Detailed structural inspect (YAML format)
oc get pod/webserver-7c98f869-abc12 -o yaml

# Describe resource events and operational history
oc describe pod/webserver-7c98f869-abc12

# Stream container logs
oc logs deployment/webserver
oc logs -f deployment/webserver --tail=50

# Exec into a running container
oc rsh deployment/webserver
# or
oc exec -it deployment/webserver -- /bin/bash
```

### Exposing Services Externally (Routes)

```bash
# 1. Create internal Service (exposing port 80 of target containers)
oc expose deployment/webserver --port=80 --target-port=80

# 2. Expose the Service to the public via a Route
oc expose service/webserver --hostname=web.apps.mycluster.example.com

# 3. View the generated Route
oc get route webserver
```

---

## Module 6: Application Configuration

### ConfigMaps (Non-sensitive Config)

```bash
# Create ConfigMap from literal values
oc create configmap app-config --from-literal=DB_PORT=3306 --from-literal=APP_DEBUG=true

# Inject ConfigMap as environment variables in a deployment
oc set env deployment/webserver --from=configmap/app-config

# Mount ConfigMap as a file path inside a container
oc set volume deployment/webserver --add \
  --name=config-vol \
  --mount-path=/etc/config \
  --configmap-name=app-config
```

### Secrets (Sensitive Data)

```bash
# Create Secret from literal values
oc create secret generic db-credentials --from-literal=password=redhat123

# Inject Secret into deployment as environment variables
oc set env deployment/webserver --from=secret/db-credentials

# Verify
oc get secrets
oc extract secret/db-credentials --to=-  # Decrypt and view output
```

---

## Module 7: Application Reliability & Self-Healing

### Health Probes (Liveness, Readiness, Startup)

- **Startup Probe:** Checks if the application within the container has started. All other probes are disabled until this succeeds.
- **Liveness Probe:** Checks if the container needs to be restarted. If this fails, OpenShift kills the Pod and creates a new one.
- **Readiness Probe:** Checks if the container is ready to accept incoming traffic. If this fails, the Pod is removed from the Service load balancer.

```yaml
# Configuration example inside a Deployment manifest:
spec:
  containers:
  - name: myweb
    image: registry.access.redhat.com/ubi9/httpd-24
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 15
      periodSeconds: 10
    readinessProbe:
      exec:
        command:
        - /usr/bin/mysqladmin
        - ping
      initialDelaySeconds: 5
      periodSeconds: 5
```

### Setting Probes via CLI

```bash
# Set a liveness probe on a deployment
oc set probe deployment/webserver --liveness \
  --get-url=http://:8080/healthz --initial-delay-seconds=10

# Set a readiness probe
oc set probe deployment/webserver --readiness \
  --get-url=http://:8080/ready --period-seconds=5
```

---

## Module 8: Resource Limits & Application Scaling

### CPU & Memory Requests and Limits

- **Request:** The minimum resources guaranteed to a container. The scheduler uses this to find a node.
- **Limit:** The maximum resources a container is allowed to consume. CPU is throttled if exceeded; Memory causes Out-Of-Memory (OOM) termination if exceeded.

```bash
# Set requests and limits on a deployment
oc set resources deployment/webserver --requests=cpu=200m,memory=512Mi --limits=cpu=400m,memory=1Gi
```

### Manual Scaling

```bash
# Scale to 3 replicas
oc scale deployment/webserver --replicas=3

# Scale down
oc scale deployment/webserver --replicas=1
```

---

## Practice Exercise: Deploying a Self-Healing Application

```bash
# 1. Create a project
oc new-project test-probes

# 2. Deploy a webserver
oc create deployment app --image=registry.access.redhat.com/ubi9/httpd-24

# 3. Set a liveness probe that points to a non-existent path
oc set probe deployment/app --liveness --get-url=http://:8080/bad-path

# 4. Monitor the Pod events — notice the restart loop
oc get pods -w
oc describe pod -l app=app

# 5. Correct the probe to a valid path
oc set probe deployment/app --liveness --remove
oc set probe deployment/app --liveness --get-url=http://:8080/

# 6. Verify the Pod stabilizes
oc get pods
```

---

## Related Notes

- [[Deployments-and-DeploymentConfigs]] — Detail on rollout strategies
- [[RBAC]] — Identity management and permissions on OCP
- [[Core-Concepts]] — Underlying Kubernetes architecture
- [[EX180-Containers-Kubernetes]] — Exam study guide
- [[OpenShift-Administrator-Path]] — Learning path MOC
