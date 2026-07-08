---
tags: [openshift, monitoring]
status: stub
created: 2025-07-08
---
# Cluster Monitoring
> OpenShift includes a pre-configured monitoring stack based on Prometheus.

## Built-in Stack
- **Prometheus** — Metrics collection and storage
- **AlertManager** — Alert routing and notification
- **Grafana** — Dashboards (read-only in OCP 4.x)
- **Thanos Querier** — Federated queries
- **node-exporter** — Node-level metrics

## User Workload Monitoring
- Enable monitoring for user-defined projects
- Create custom ServiceMonitors and PodMonitors
- Custom alerting rules with PrometheusRule

## Related Notes
- [[Prometheus-and-AlertManager]], [[Grafana-Dashboards]], [[Cluster-Logging-EFK]]

---
> [!NOTE]
> #todo — Add monitoring configuration and custom metrics examples.
