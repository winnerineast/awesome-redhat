---
tags: [openshift, cicd, builds]
status: complete
created: 2025-07-08
---
# Source-to-Image (S2I)

> [!NOTE]
> Source-to-Image (S2I) is an OpenShift build strategy that runs inside a build pod to package applications. It clones your source code from a Git repository, injects it into a pre-configured builder image, compiles or builds the application, and commits the result as a new bootable container image.

---

## The Core S2I Lifecycle Scripts

A container image is recognized as an S2I builder if it contains specific executables (usually placed in `/usr/libexec/s2i/` or defined via the `io.openshift.s2i.scripts-url` label).

| Script | Required | Description |
|---|---|---|
| `assemble` | **Yes** | Clones and processes the source code. It installs dependencies, compiles assets, and organizes runtime binaries. |
| `run` | **Yes** | Defines the CMD/entrypoint of the generated application image. It executes the application. |
| `save-artifacts` | No | Speeds up incremental builds by archiving dependencies (e.g., node_modules, maven repo) and passing them to the next build. |
| `usage` | No | Prints out help documentation explaining how to run the builder image. |

---

## BuildConfig YAML Example

In OpenShift, S2I builds are managed by a `BuildConfig` resource. The build controller schedules a temporary pod that runs the `assemble` script, commits the container filesystem, and pushes it to an internal registry.

```yaml
apiVersion: build.openshift.io/v1
kind: BuildConfig
metadata:
  name: nodejs-s2i-build
  namespace: my-app-prod
spec:
  source:
    type: Git
    git:
      uri: https://github.com/sclorg/nodejs-ex.git # App source code
  strategy:
    type: Source # S2I strategy
    sourceStrategy:
      from:
        kind: ImageStreamTag
        name: nodejs:20 # S2I Builder Image reference
        namespace: openshift # Default OpenShift library namespace
  output:
    to:
      kind: ImageStreamTag
      name: nodejs-ex:latest # Destination ImageStreamTag
  triggers:
    - type: ImageChange # Triggers rebuilds when the base "nodejs:20" builder image updates
    - type: ConfigChange # Triggers a build on creation or manual configuration changes
```

---

## Walkthrough: Creating a Custom S2I Builder Image

To build a custom S2I builder image (e.g., a custom Python framework tool), prepare a Dockerfile and place the S2I scripts in your repository.

### 1. Dockerfile Structure (`Dockerfile`)
```dockerfile
FROM registry.access.redhat.com/ubi9/ubi-minimal:latest

# Label indicating where the S2I scripts are located
LABEL io.openshift.s2i.scripts-url="image:///usr/libexec/s2i" \
      io.k8s.description="Custom Python S2I Builder" \
      io.k8s.display-name="Custom Python Builder"

# Install build dependencies
RUN microdnf install -y python3-pip && microdnf clean all

# Create app directory and make it writable for non-root users (arbitrary UIDs)
WORKDIR /opt/app-root
RUN chown -R 1001:0 /opt/app-root && chmod -R g+rw /opt/app-root

# Copy S2I scripts into the directory defined in the scripts-url label
COPY .s2i/bin/ /usr/libexec/s2i/

USER 1001
EXPOSE 8080
```

### 2. Prepare the `assemble` Script (`.s2i/bin/assemble`)
```bash
#!/bin/bash
set -e
echo "Building Python application..."
# If incremental build, restore cached dependencies
if [ -d /tmp/artifacts/wheels ]; then
    pip3 install --no-index --find-links=/tmp/artifacts/wheels -r requirements.txt
else
    pip3 install -r requirements.txt
fi
# Copy source files to runtime path
cp -ad . /opt/app-root
```

### 3. Prepare the `run` Script (`.s2i/bin/run`)
```bash
#!/bin/bash
echo "Starting Python web app..."
exec python3 app.py
```

---

## Running S2I Locally

You can test S2I builds on your local workstation without an OpenShift cluster using the standalone `s2i` binary:

```bash
# 1. Download and install 's2i' CLI.
# 2. Run local build to produce a Docker/Podman image:
s2i build https://github.com/sclorg/nodejs-ex.git centos7/nodejs-20-centos7 nodejs-local-app

# 3. Test run the container:
podman run -p 8080:8080 nodejs-local-app
```

---

## Related Notes
- [[Image-Streams]]
- [[OpenShift-Pipelines-Tekton]]
- [[Deployments-and-DeploymentConfigs]]
