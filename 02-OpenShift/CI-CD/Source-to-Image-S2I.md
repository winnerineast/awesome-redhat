---
tags: [openshift, cicd, builds]
status: stub
created: 2025-07-08
---
# Source-to-Image (S2I)
> S2I is an OpenShift build strategy that produces runnable container images directly from source code.

## How S2I Works
1. Provide source code (Git URL) + S2I builder image
2. OpenShift clones the source, injects it into the builder
3. Builder compiles/packages the application
4. Produces a ready-to-run container image

## Available Builders
- Python, Node.js, Ruby, PHP, Java, Go, .NET

## Related Notes
- [[Image-Streams]], [[OpenShift-Pipelines-Tekton]]

---
> [!NOTE]
> #todo — Add S2I build examples and custom builder creation.
