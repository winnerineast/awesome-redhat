---
tags: [integration, apimanagement, 3scale]
status: active
created: 2025-07-08
---

# 📊 Red Hat 3scale API Management

> Enforces traffic governance, rate limiting, analytics, security, and developer portal access for APIs running on Red Hat OpenShift.

---

## 3scale Architecture & Ingress Flow

```
  Developer App ──▶ API Gateway (APcast - nginx) ──▶ Service App (OpenShift Pods)
                          │
                          │ 3scale Service Management API (Rules & Quotas Check)
                          ▼
                  3scale Admin Portal
```

- **APcast Gateway:** A lightweight, high-performance API gateway based on NGINX. It intercepts incoming client requests, validates access keys, and routes traffic.
- **Admin Portal:** Control plane dashboard where administrators define plans, monitor analytics, and construct the Developer Portal.

## APcast API Gateway Config Example

```yaml
# APcast gateway deployment via CRD (Custom Resource):
apiVersion: apps.3scale.net/v1alpha1
kind: APcast
metadata:
  name: apcast-production
  namespace: 3scale-gateway
spec:
  replicas: 2
  configurationLoadMode: boot # Loads configuration at startup
  adminPortalCredentialsRef:
    name: 3scale-portal-secret
```

## Related Notes
- [[Camel-K]] — Serverless integrations
- [[AMQ-Streams-Kafka]] — Message queues
