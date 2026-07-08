---
tags: [kubernetes, operators, crds]
status: stub
created: 2025-07-08
---
# CRDs and Operators
> Extending Kubernetes with custom resource types and automated controllers.

## Custom Resource Definitions (CRDs)
- Extend the Kubernetes API with custom resource types
- Defined via YAML, validated by OpenAPI schema
- Example: `VirtualMachine`, `KafkaCluster`, `Certificate`

## Operators
- Controllers that watch CRDs and reconcile state
- Encode domain-specific operational knowledge
- Built with Operator SDK (Go, Ansible, Helm)

## Related Notes
- [[Operators-Framework]], [[Core-Concepts]]
