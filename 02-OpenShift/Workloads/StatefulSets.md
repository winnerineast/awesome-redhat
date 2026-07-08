---
tags: [openshift, workloads]
status: stub
created: 2025-07-08
---
# StatefulSets
> For applications that require stable network identity, persistent storage, and ordered deployment.

## Use Cases
- Databases (PostgreSQL, MySQL, MongoDB)
- Message brokers (Kafka, RabbitMQ)
- Distributed systems (Elasticsearch, ZooKeeper)

## Key Features
- Stable pod hostnames (`pod-0`, `pod-1`, ...)
- Ordered deployment and scaling
- Persistent Volume per pod
- Headless Service for DNS-based discovery

## Related Notes
- [[Deployments-and-DeploymentConfigs]], [[Persistent-Volumes]]

---
> [!NOTE]
> #todo — Add StatefulSet example with PVC template.
