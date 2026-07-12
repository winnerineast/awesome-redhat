---
tags: [openshift, cicd, images]
status: complete
created: 2025-07-08
---
# Image Streams

> [!NOTE]
> ImageStreams in OpenShift provide an abstraction layer for container images. Rather than referencing images directly by registry URL and digest (e.g., `quay.io/myorg/myapp@sha256:...`), deployments and builds reference an ImageStreamTag (e.g., `myapp:latest`). OpenShift handles the mapping to the actual container image and can trigger automatic rebuilds or deployments when the underlying image updates.

---

## Core Abstractions

* **ImageStream**: A collection of tags mapping to actual container images.
* **ImageStreamTag (`<stream-name>:<tag>`)**: A pointer to a specific tag in the stream. It can point to an internal OpenShift registry image or an external image registry.
* **ImageStreamImage (`<stream-name>@<sha256-digest>`)**: A pointer to a specific, immutable container image by its SHA256 digest.

---

## Practical Examples

### 1. Tracking and Auto-Importing from an External Registry

The following YAML defines an `ImageStream` that tracks a public Quay image. The `scheduled: true` property instructs the OpenShift cluster to automatically query the external registry every 15 minutes and import new digests.

```yaml
apiVersion: image.openshift.io/v1
kind: ImageStream
metadata:
  name: external-nodejs-stream
  namespace: dev-stage
spec:
  lookupPolicy:
    local: true # Allows pods/deployments in the same namespace to use "external-nodejs-stream:20" directly as the image name without registry prefix
  tags:
    - name: "20"
      annotations:
        openshift.io/display-name: "Node.js 20 Builder"
      from:
        kind: DockerImage
        name: quay.io/centos7/nodejs-20-centos7:latest # External image source
      importPolicy:
        scheduled: true # Enable auto-sync
        insecure: false
      referencePolicy:
        type: Source # Directly pull from Quay rather than routing pulls through OpenShift registry proxy
```

### 2. Using ImageStreams in a Deployment with Auto-Trigger

To utilize the ImageStream and trigger a rolling update whenever the tag is updated, configure the `Deployment` with a `DeploymentTrigger` annotation or configure `imageChangeParams` in a `DeploymentConfig`.

For standard Kubernetes `Deployment` resources under OpenShift:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nodejs-app
  namespace: dev-stage
  annotations:
    # Triggers OpenShift to update the deployment template image reference when the ImageStream tag changes
    image.openshift.io/triggers: '[{"from":{"kind":"ImageStreamTag","name":"external-nodejs-stream:20"},"fieldPath":"spec.template.spec.containers[0].image"}]'
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-nodejs-app
  template:
    metadata:
      labels:
        app: my-nodejs-app
    spec:
      containers:
        - name: application
          image: external-nodejs-stream:20 # Resolved dynamically by the trigger annotation
          ports:
            - containerPort: 8080
```

---

## CLI Command Reference

### Import an image manually from an external registry
```bash
oc import-image external-nodejs-stream:20 --from=quay.io/centos7/nodejs-20-centos7:latest --confirm
```

### Tag an image into an ImageStream
```bash
oc tag quay.io/myorg/myimage:v1.0 my-custom-stream:latest
```

### List all ImageStreams in the current namespace
```bash
oc get is
```

### Describe the tags and digests inside an ImageStream
```bash
oc describe is external-nodejs-stream
```

---

## Related Notes
- [[Source-to-Image-S2I]]
- [[OpenShift-Pipelines-Tekton]]
- [[Deployments-and-DeploymentConfigs]]
