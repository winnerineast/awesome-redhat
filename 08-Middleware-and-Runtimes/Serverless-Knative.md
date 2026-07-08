---
tags: [middleware, serverless, knative]
status: active
created: 2025-07-08
---

# ⚙️ OpenShift Serverless (Knative)

> Scale-to-zero serverless framework based on Knative Serving and Eventing, managed via OpenShift operators.

---

## Mitigating Cold Starts

When a Knative service has no traffic, it scales down to **zero replicas**. The first request that arrives after scaling to zero will experience a delay (**Cold Start**) while the container starts.

```
  Knative Activator ──▶ Spin up Pod (Cold Start Delay) ──▶ Route request
```

### Mitigation Tactics
1. **Quarkus Native:** Package applications as native binaries to reduce startup latency to milliseconds.
2. **Configure Scale Boundaries:** Force a minimum number of running pods to bypass scale-to-zero.

```yaml
# Knative Service with a minimum scale boundary:
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: serverless-always-on
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/minScale: "1" # Never scale to zero!
        autoscaling.knative.dev/maxScale: "10"
```

## Related Notes
- [[DO378-Cloud-Native-Microservices]] — Cloud-Native developer course
- [[Quarkus]] — Quarkus configurations
