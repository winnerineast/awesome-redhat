---
tags: [openshift, scaling]
status: stub
created: 2025-07-08
---
# Cluster Autoscaler
> Automatically adjusts the number of nodes in a cluster.

## How it works
- Monitors pods that can't be scheduled due to resource constraints
- Adds nodes (via MachineSets) to meet demand
- Removes underutilized nodes when demand decreases

## Related Notes
- [[Machine-Sets-and-Machine-Config]], [[HPA-and-VPA]]

---
> [!NOTE]
> #todo — Add ClusterAutoscaler and MachineAutoscaler configuration.
