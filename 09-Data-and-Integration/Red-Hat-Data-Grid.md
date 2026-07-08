---
tags: [integration, datagrid, infinispan, caching]
status: active
created: 2025-07-08
---

# 📊 Red Hat Data Grid (Infinispan)

> Red Hat Data Grid is an in-memory, distributed key-value data store used for fast caching, session replication, and high-performance querying.

---

## Infinispan Clustering Configurations

Red Hat Data Grid runs as a clustered deployment inside OpenShift:
- **Distributed Mode:** Partitions keys across nodes. If a node fails, keys are recovered from replicas on other nodes.
- **Replicated Mode:** Copies all keys to all nodes in the cluster (ideal for read-heavy operations).
- **Cross-Site Replication:** Syncs cache state between separate OpenShift clusters in different datacenters.

## Data Grid Cache Custom Resource Example

```yaml
apiVersion: infinispan.org/v1
kind: Infinispan
metadata:
  name: cache-cluster
  namespace: datagrid-ns
spec:
  replicas: 3
  security:
    endpointAuthentication: true
    endpointEncryption:
      type: Secret
      certSecretName: tls-secret
  container:
    cpu: "500m"
    memory: "1Gi"
```

## Related Notes
- [[JBoss-EAP]] — Middleware session replications
- [[3scale-API-Management]] — API gateways cache
