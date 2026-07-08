---
tags: [openshift, monitoring]
status: stub
created: 2025-07-08
---
# Prometheus and AlertManager
> Core metrics and alerting for OpenShift.

## Prometheus
- Time-series database for metrics
- PromQL query language
- ServiceMonitor/PodMonitor for scrape targets
- 15-day default retention

## AlertManager
- Routes alerts to receivers (email, Slack, PagerDuty, webhook)
- Grouping, inhibition, and silencing
- Custom alerting rules via PrometheusRule CRD

## Related Notes
- [[Cluster-Monitoring]], [[Grafana-Dashboards]]

---
> [!NOTE]
> #todo — Add PromQL examples and AlertManager configuration.
