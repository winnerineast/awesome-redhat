---
tags: [openshift, scaling, nodes]
status: stub
created: 2025-07-08
---
# Machine Sets and Machine Config
> Declarative management of cluster nodes.

## MachineSets
- Define groups of machines with the same configuration
- Platform-specific (AWS instance type, Azure VM size, etc.)
- Scale up/down by adjusting replicas

## MachineConfig
- Manage OS-level configuration on RHCOS nodes
- Files, systemd units, kernel arguments
- Applied by Machine Config Operator (MCO)
- Triggers rolling node reboots

## Related Notes
- [[Worker-Nodes]], [[Cluster-Autoscaler]]

---
> [!NOTE]
> #todo — Add MachineSet and MachineConfig examples.
