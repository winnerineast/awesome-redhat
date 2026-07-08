---
tags: [openshift, networking, security]
status: stub
created: 2025-07-08
---
# Network Policies
> Network Policies control traffic flow between pods, providing microsegmentation within the cluster.

## Default Behavior
- Without policies: all pods can communicate with all other pods
- With policies: only explicitly allowed traffic is permitted (deny-by-default when a policy selects a pod)

## Policy Types
- **Ingress** — Control incoming traffic to pods
- **Egress** — Control outgoing traffic from pods

## Example
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend
spec:
  podSelector:
    matchLabels:
      app: backend
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - port: 8080
```

## Related Notes
- [[SDN-Overview]], [[OVN-Kubernetes]], [[Network-Policies-Security]]

---
> [!NOTE]
> #todo — Add common network policy patterns (deny-all, allow-namespace, egress control).
