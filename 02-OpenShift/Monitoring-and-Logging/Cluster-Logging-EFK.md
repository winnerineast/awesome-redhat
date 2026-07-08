---
tags: [openshift, monitoring, logging]
status: stub
created: 2025-07-08
---
# Cluster Logging (EFK → LokiStack)
> Centralized log aggregation for OpenShift clusters.

## Evolution
- **Legacy:** Elasticsearch + Fluentd + Kibana (EFK)
- **Current:** LokiStack (Loki + Vector) — lighter, more efficient

## Log Types
- **Infrastructure logs** — Node and OpenShift components
- **Application logs** — User workload stdout/stderr
- **Audit logs** — API server audit events

## Related Notes
- [[Cluster-Monitoring]]

---
> [!NOTE]
> #todo — Add ClusterLogging and ClusterLogForwarder examples.
