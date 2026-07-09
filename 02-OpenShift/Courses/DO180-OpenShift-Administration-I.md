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
| **Prerequisites** | [RH124-System-Administration-I](../../04-RHEL/Courses/RH124-System-Administration-I.md) or equivalent Linux experience |
| **Next Step** | [DO280-OpenShift-Administration-II](DO280-OpenShift-Administration-II.md) |
| **Certification** | Maps directly to [EX180-Containers-Kubernetes](../../11-Certifications/EX180-Containers-Kubernetes.md) |
| **Learning Path** | [OpenShift-Administrator-Path](../../01-Learning-Paths/OpenShift-Administrator-Path.md) |

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

- **Monolith:** All functionality built into a single deployable unit. Scaling requires duplicating the entire application. Single point of failure: a bug in one component can crash the entire system.
- **Microservices:** Applications decomposed into small, independent services communicating over lightweight APIs (HTTP/REST or gRPC). Easy scaling (only scale bottleneck services), technology flexibility, and independent deployment cycles.

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

- **Hypervisors** virtualize the hardware layer. Each VM requires its own full Guest OS kernel, memory allocation, and CPU overhead.
- **Containers** share the host Linux kernel. They leverage host kernel isolation features, are lightweight, start in milliseconds, and utilize only the necessary library binaries.

### Under the Hood: Linux Kernel Isolation
Containers are not actual physical objects; they are standard Linux processes isolated using:
1. **Namespaces:** Restrict what a process can *see*:
   - `pid`: Process IDs (isolates process tree)
   - `net`: Network devices, routing tables, ports
   - `mnt`: Mount points (isolates filesystem root)
   - `ipc`: Inter-process communication resources
   - `uts`: Hostname and NIS domain name
   - `user`: User and group IDs (map container root to unprivileged host UID)
2. **Control Groups (cgroups):** Restrict what a process can *use* (CPU, Memory, Disk I/O, Network bandwidth).
3. **SELinux:** Restricts what a process can *do* (enforces mandatory access controls on host resources).

### Open Container Initiative (OCI) & CRI-O
The OCI defines industry standards:
- **OCI Image Specification:** Defines how an image is packaged (layers, configuration JSON).
- **OCI Runtime Specification:** Defines how to unpack and execute a container (e.g., `runc`, `crun`).
- **CRI-O:** A lightweight Container Runtime Interface (CRI) implementation designed specifically for Kubernetes. It bypasses Docker daemon overhead, launching OCI-compliant containers directly via low-level runtimes (like `crun`).

---

## Module 2: Creating Containerized Services

This module builds on the foundational Podman commands covered in [RH134 Module 11](../../04-RHEL/Courses/RH134-System-Administration-II.md#module-11-running-containers-with-podman).

### Step-by-Step Image Building
To package an application, write a `Containerfile` (or `Dockerfile`):

```dockerfile
# 1. Base Image
FROM registry.access.redhat.com/ubi9/ubi-minimal:9.4

# 2. Environment variables
ENV PORT=8080
ENV APP_ROOT=/opt/app

# 3. Setup work directory
WORKDIR ${APP_ROOT}

# 4. Install dependencies and clean cache to minimize image size
RUN microdnf install -y python3-pip && microdnf clean all

# 5. Copy dependencies list and install
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# 6. Copy application code
COPY app.py ./

# 7. Document the port the container listens on
EXPOSE ${PORT}

# 8. Specify default executable command
CMD ["python3", "app.py"]
```

Build and run commands:
```bash
# Build the image locally
podman build -t my-python-app:1.0 .

# List local images
podman images

# Run the container in the background, mapping port 8080
podman run -d --name test-app -p 8080:8080 my-python-app:1.0

# Inspect logs
podman logs test-app

# Clean up container
podman stop test-app
podman rm test-app
```

### Multi-Container Network Management

```bash
# Create a local user-defined bridge network (enables DNS name resolution)
podman network create app-net

# Run database container inside the network
podman run -d --name db --network app-net \
  -e MYSQL_ROOT_PASSWORD=redhat \
  -e MYSQL_DATABASE=items \
  docker.io/library/mariadb:10.11

# Run web app connecting to the database using its container name as hostname
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
An open-source orchestration system for containerized applications. Its core control loop matches the **Actual State** of the cluster with the **Desired State** defined in YAML manifests. It manages scheduling, self-healing, replication, and service discovery.

### What is Red Hat OpenShift Container Platform (OCP)?
An enterprise-ready Kubernetes platform built on Red Hat Enterprise Linux CoreOS (RHCOS) with built-in operational and developer features:

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

- **Enterprise Security by Default:** Enforces strict Security Context Constraints (SCC) preventing containers from running as root unless explicitly configured.
- **Out-of-the-Box Ingress:** Integrated Router (HAProxy) handles ingress URLs (Routes) automatically without manually configuring external load balancers.
- **S2I (Source-to-Image):** Automatically converts application source code repositories into container images inside the cluster.

---

## Module 4: Deploying Applications to OpenShift

### Authentication & Project Context

```bash
# Log in using the API server URL
oc login -u developer -p developer https://api.sandbox-m2.ll9k.p1.openshiftapps.com:6443

# Check current active context
oc whoami
oc project

# Create a new isolated workspace (Project)
oc new-project dev-sandbox
```

### Complete YAML Manifest Examples

#### 1. Pod Manifest (`pod.yaml`)
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello-pod
  labels:
    app: hello
spec:
  containers:
  - name: hello-container
    image: registry.access.redhat.com/ubi9/nginx-120
    ports:
    - containerPort: 8080
```

#### 2. Service Manifest (`service.yaml`)
```yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-svc
spec:
  selector:
    app: hello
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: ClusterIP
```

#### 3. Route Manifest (`route.yaml`)
```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: hello-route
spec:
  to:
    kind: Service
    name: hello-svc
  port:
    targetPort: 8080
```

Deploying these manifests:
```bash
oc apply -f pod.yaml
oc apply -f service.yaml
oc apply -f route.yaml

# Check generated public route URL
oc get route hello-route
```

---

## Module 5: Managing Workloads and Troubleshooting

### CLI Diagnostics Cheat Sheet

```bash
# Get summary of all running pods
oc get pods

# Stream logs of a deployment
oc logs deployment/webserver --tail=100 -f

# Describe resource detailed status and historical events
oc describe pod/hello-pod

# Run interactive terminal shell inside a pod
oc rsh pod/hello-pod

# Copy files to/from a pod
oc cp ./config.conf hello-pod:/tmp/config.conf
```

### Troubleshooting Workload Errors

#### 1. `CrashLoopBackOff`
- **What it means:** The container started, but repeatedly exited or crashed.
- **Common causes:** Incorrect startup command (`CMD` or `ENTRYPOINT`), missing required environment variables, or application throwing an unhandled exception.
- **How to debug:**
  ```bash
  # Step 1: Check standard logs (even if terminated)
  oc logs pod-name --previous
  
  # Step 2: Describe the pod events to see exit codes
  oc describe pod pod-name
  ```

#### 2. `ImagePullBackOff` / `ErrImagePull`
- **What it means:** The node running the pod cannot fetch the container image from the registry.
- **Common causes:** Typo in image name or tag, image is private and no registry pull secret is configured.
- **How to debug:**
  ```bash
  # Step 1: Check pod events to see the exact registry error
  oc describe pod pod-name
  
  # Step 2: Create a secret with registry credentials if required
  oc create secret docker-registry registry-pull-secret \
    --docker-server=registry.redhat.io \
    --docker-username=my-user \
    --docker-password=my-password
  
  # Step 3: Link secret to default service account for automatic pull
  oc secrets link default registry-pull-secret --for=pull
  ```

---

## Module 6: Application Configuration

### ConfigMaps

```bash
# Create ConfigMap from command line literal values
oc create configmap db-config --from-literal=DB_PORT=3306 --from-literal=DB_NAME=prod

# Inject ConfigMap keys as Environment Variables inside a Deployment template:
# (Inside deployment.spec.template.spec.containers[0])
envFrom:
- configMapRef:
    name: db-config
```

### Secrets

```bash
# Create Generic Secret
oc create secret generic db-credentials --from-literal=password=supersecretpassword

# Mount Secret as file path inside a container:
# (Inside deployment.spec.template.spec.containers[0].volumeMounts)
volumeMounts:
- name: credentials-volume
  mountPath: "/etc/secrets"
  readOnly: true

# (Inside deployment.spec.template.spec.volumes)
volumes:
- name: credentials-volume
  secret:
    secretName: db-credentials
```

---

## Module 7: Application Reliability & Self-Healing

```
            Client Request
                 │
                 ▼
         ┌───────────────┐
         │  Service IP   │
         └───────┬───────┘
                 │
      Readiness check OK?
        ┌────────┴────────┐
        ▼ Yes             ▼ No (Removed from Service)
 ┌───────────────┐  ┌───────────────┐
 │   Pod (Live)  │  │ Pod (Booting) │
 └───────────────┘  └───────────────┘
```

- **Startup Probe:** Disables other probes until the container finishes booting up.
- **Liveness Probe:** Monitored continuously. If it fails, OpenShift restarts the container.
- **Readiness Probe:** Monitored continuously. If it fails, traffic is diverted away from this container's endpoint.

```yaml
# Spec config block inside a Deployment:
spec:
  containers:
  - name: web
    image: registry.access.redhat.com/ubi9/nginx-120
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 10
      periodSeconds: 15
    readinessProbe:
      tcpSocket:
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 10
```

---

## Module 8: Resource Limits & Application Scaling

### Resource Requests vs. Limits
- **Requests:** CPU/Memory guaranteed to the container. Used by scheduler for resource allocation.
- **Limits:** Hard ceiling on resources. If a container exceeds memory limit, it is terminated (`OOMKilled`). If it exceeds CPU limit, it is throttled.

```bash
# Apply compute resource constraints to deployment
oc set resources deployment/webserver --requests=cpu=100m,memory=256Mi --limits=cpu=200m,memory=512Mi
```

### Scaling Workloads
```bash
# Manual Scale
oc scale deployment/webserver --replicas=4

# Define Horizontal Pod Autoscaler (HPA) to scale between 2 and 10 pods based on 80% CPU usage
oc autoscale deployment/webserver --min=2 --max=10 --cpu-percent=80
```

---

## Practice Exercise: Deploying a Self-Healing Application

Follow these steps to deploy and debug a self-healing application:

1. **Create project:**
   ```bash
   oc new-project test-healing
   ```
2. **Deploy NGINX deployment:**
   ```bash
   oc create deployment app-test --image=registry.access.redhat.com/ubi9/nginx-120
   ```
3. **Configure Liveness Probe to a non-existent port (simulating failure):**
   ```bash
   oc set probe deployment/app-test --liveness --get-url=http://:9999/healthz --initial-delay-seconds=5
   ```
4. **Watch container restarts in real time:**
   ```bash
   oc get pods -w
   ```
   *Observe the container restarts increase as the liveness probe repeatedly fails.*
5. **Inspect the logs and events:**
   ```bash
   oc describe pod -l app=app-test
   ```
   *Look at the bottom Events log to see: "Liveness probe failed: Get "http://:9999/healthz": dial tcp: connection refused".*
6. **Correct the probe setting to target NGINX default HTTP port (8080):**
   ```bash
   oc set probe deployment/app-test --liveness --remove
   oc set probe deployment/app-test --liveness --get-url=http://:8080/ --initial-delay-seconds=5
   ```
7. **Verify the container stabilizes and restarts stop incrementing:**
   ```bash
   oc get pods
   ```

---

## Related Notes

- [Deployments-and-DeploymentConfigs](../Workloads/Deployments-and-DeploymentConfigs.md) — Detail on rollout strategies
- [RBAC](../Security/RBAC.md) — Identity management and permissions on OCP
- [Core-Concepts](../../03-Kubernetes-Fundamentals/Core-Concepts.md) — Underlying Kubernetes architecture
- [EX180-Containers-Kubernetes](../../11-Certifications/EX180-Containers-Kubernetes.md) — Exam study guide
- [OpenShift-Administrator-Path](../../01-Learning-Paths/OpenShift-Administrator-Path.md) — Learning path MOC
