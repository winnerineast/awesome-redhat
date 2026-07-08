---
tags: [middleware, nodejs, developer]
status: active
created: 2025-07-08
---

# ⚙️ Node.js on OpenShift

> Guidelines and optimized container builds for deploying Node.js applications on Red Hat OpenShift.

---

## Deploying Node.js via S2I

The simplest deployment uses the official Node.js builder image. It automatically runs `npm install` and executes the script defined in `package.json`'s `scripts.start`.

```bash
# Create Node.js application from source
oc new-app nodejs:18~https://github.com/sclorg/nodejs-ex.git --name=node-app
```

## Optimized Multi-Stage Containerfile

For production workloads, use a multi-stage build to isolate dependency compiling from the final runtime image, minimizing image sizes.

```dockerfile
# Multi-stage Node.js build:
FROM registry.access.redhat.com/ubi9/ubi-minimal:latest AS build
WORKDIR /opt/app
COPY package*.json ./
RUN microdnf install -y python3 make g++ && npm ci

FROM registry.access.redhat.com/ubi9/ubi-minimal:latest
WORKDIR /opt/app
COPY --from=build /opt/app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## Related Notes
- [[DO288-OpenShift-Development-II]] — S2I builds and pipeline configs
- [[EX288-OpenShift-Developer]] — Certification guide
