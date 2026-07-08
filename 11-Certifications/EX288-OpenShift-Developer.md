---
tags: [certification, openshift, dev, ex288]
status: active
created: 2025-07-08
---

# 🎯 EX288 — Red Hat Certified OpenShift Application Developer

> Tests a developer's ability to compile, containerize, customize, and deploy applications on a Red Hat OpenShift cluster using S2I, templates, Helm, and Tekton CI/CD pipelines.

---

## Exam Overview

| | |
|---|---|
| **Code** | EX288 |
| **Duration** | 3 hours |
| **Format** | Performance-based on live OpenShift environment |
| **Prep Course** | [[DO288-OpenShift-Development-II]] |
| **Learning Path** | [[OpenShift-Developer-Path]] |

---

## ⚡ EX288 Exam Quick-Reference Cheat Sheet

### 1. S2I Builder Deployments
```bash
# Create application from Git using specific S2I builder
oc new-app python:3.9~https://github.com/mygit/app.git --name=myapp

# Customize builder image variables
oc set env bc/myapp APP_FILE=server.py

# Trigger a rebuild of S2I build config
oc start-build myapp --follow
```

### 2. Parameterizing Templates
```bash
# Export existing object as a template
oc get deploy/myapp -o yaml --export > template.yaml
# (Manually edit template.yaml to inject parameters)

# Process and apply a template file
oc process -f my-template.yaml -p DB_NAME=testdb | oc apply -f -
```

### 3. Exposing and Configuring Apps
```bash
# Inject ConfigMap to Deployment as environment variables
oc set env deployment/myapp --from=configmap/db-config

# Mount Secret volume
oc set volume deployment/myapp --add --name=secret-vol --mount-path=/etc/secrets --secret-name=db-secret

# Export metadata using the Downward API (Pod name & Namespace)
# (Inject metadata.name fieldRef inside the deployment containers env block)
```

### 4. Tekton Pipeline Runs (tkn CLI)
```bash
# List tasks and pipelines
tkn task list
tkn pipeline list

# Start a pipeline with parameter overrides
tkn pipeline start build-deploy-pipeline \
  -p repo-url=https://github.com/mygit/app.git \
  -w name=shared-workspace,claimName=pipeline-pvc \
  --showlog
```

---

## 🏆 Golden Rules for Passing EX288

1. **Verify Your Registry Authentications:**
   If your deployment specifies an external image (e.g. from `registry.redhat.io`), make sure your project has a valid pull secret mapped to the service account, or use `oc create secret docker-registry` and link it:
   `oc secrets link default my-pull-secret --for=pull`

2. **Clean up Failed Builds:**
   If an S2I build fails, investigate the build log `oc logs -f build/myapp-1`. Don't try to debug the running deployment pod if the build phase itself didn't generate the target ImageStream.

3. **Configure Downward API variables with correct YAML syntax:**
   Downward API variables use `valueFrom.fieldRef.fieldPath`. If you make a typo in the field name (e.g. `metadata.names` instead of `metadata.name`), the deployment will fail validation and refuse to start.

4. **Verify your Tekton Workspaces match volume claims:**
   Pipelines that share directories between tasks (e.g. cloning code in Task A, compiling it in Task B) require a `PersistentVolumeClaim` workspace. Verify you create the PVC before triggering the `PipelineRun`.

---

## 📝 EX288 Mock Practice Exam

Complete the following tasks in under **3 hours**.

### Task 1: Source-to-Image (S2I) Node.js Build
1. Create a namespace called `dev-nodejs`.
2. Deploy a web app named `node-web` using the S2I NodeJS builder stream.
3. Use the source code repository `https://github.com/sclorg/nodejs-ex.git`.
4. Expose the deployment. Ensure the container runs on port `8080`.
5. Create a Route pointing to it, using the hostname `node-web.apps.cluster.example.com`.

### Task 2: Helm Deployment Override
1. Create a namespace called `helm-prod`.
2. Add the Bitnami helm repository.
3. Install the NGINX chart, naming the release `my-nginx`.
4. Overwrite values during installation to:
   - Run with exactly `3 replicas`.
   - Set the CPU request limit to `200m`.

### Task 3: Secrets and Downward API Integration
1. In `dev-nodejs`, create a Secret named `api-tokens` containing the key-value `token=xyz-123-abc`.
2. Update the `node-web` deployment to inject the token as an environment variable named `API_TOKEN`.
3. Configure the container's environment block to also inject a variable named `MY_POD_NAME` containing the active Pod's name dynamically using the Downward API.

### Task 4: CI/CD Tekton Pipeline
1. Create a pipeline task named `compile-code` that prints "Compiling application...".
2. Create a pipeline named `build-app-pipeline` that:
   - Takes a parameter `repo-url`.
   - Runs `git-clone` to checkout code.
   - Runs your `compile-code` task after the clone completes.
3. Trigger a `PipelineRun` verifying the logs report success.

---

## Related Notes
- [[DO288-OpenShift-Development-II]] — Course companion
- [[OpenShift-Pipelines-Tekton]] — Pipelines overview
- [[Source-to-Image-S2I]] — S2I detail
- [[OpenShift-Developer-Path]] — MOC
