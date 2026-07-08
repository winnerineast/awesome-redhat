---
tags: [openshift, scaling]
status: stub
created: 2025-07-08
---
# HPA and VPA
> Horizontal and Vertical Pod Autoscaling for automatic workload scaling.

## HPA — Horizontal Pod Autoscaler
- Scales number of pod replicas based on CPU, memory, or custom metrics
- `minReplicas` / `maxReplicas` / `targetCPUUtilizationPercentage`

## VPA — Vertical Pod Autoscaler
- Adjusts resource requests/limits for individual pods
- Modes: Off, Initial, Auto
- Cannot be used simultaneously with HPA on the same metric

## Related Notes
- [[Cluster-Autoscaler]], [[Performance-Tuning]]

---
> [!NOTE]
> #todo — Add HPA/VPA YAML examples and scaling best practices.
