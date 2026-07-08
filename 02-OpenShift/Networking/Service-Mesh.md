---
tags: [openshift, networking, service-mesh]
status: stub
created: 2025-07-08
---
# Service Mesh
> Red Hat OpenShift Service Mesh is based on Istio and provides traffic management, security, and observability for microservices.

## Key Features
- Mutual TLS (mTLS) between services
- Traffic management (canary, A/B, circuit breaking)
- Distributed tracing (Jaeger)
- Service-level metrics and dashboards (Kiali)

## Components
- **Istio** — Service mesh control plane
- **Envoy** — Sidecar proxy
- **Kiali** — Service mesh observability console
- **Jaeger** — Distributed tracing

## Related Notes
- [[SDN-Overview]], [[Cluster-Monitoring]]

---
> [!NOTE]
> #todo — Add ServiceMeshControlPlane example and traffic management patterns.
