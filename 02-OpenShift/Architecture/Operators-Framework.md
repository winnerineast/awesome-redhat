---
tags: [openshift, architecture, operators]
status: stub
created: 2025-07-08
---

# Operators Framework

> Operators are the fundamental management pattern in OpenShift. Every cluster component is managed by an Operator.

## What is an Operator?

An Operator is a Kubernetes controller that uses Custom Resources (CRDs) to manage applications and their components. It encodes operational knowledge (install, upgrade, backup, scale) into software.

## Operator Lifecycle Manager (OLM)

- Manages the installation, update, and lifecycle of Operators
- Handles dependency resolution between Operators
- Manages operator subscriptions and update channels

## OperatorHub

- Marketplace of certified and community Operators
- Categories: Red Hat, Certified Partners, Community, Custom
- Accessed via the OpenShift web console

## ClusterOperators

Built-in operators that manage core OpenShift components:
- `openshift-apiserver`
- `kube-controller-manager`
- `machine-config`
- `ingress`
- `monitoring`
- `dns`
- `console`

Check status: `oc get clusteroperators`

## Building Custom Operators

- **Operator SDK** — Framework for building operators
- Languages: Go, Ansible, Helm
- Maturity model: Basic Install → Full Lifecycle → Deep Insights → Auto Pilot → Seamless Upgrades

## Related Notes

- [[OpenShift-Architecture-Overview]]
- [[CRDs-and-Operators]]
- [[Ansible-for-OpenShift]]

---

> [!NOTE]
> #todo — Add examples of custom operator development and operator maturity model details.
