---
tags: [integration, kafka, messaging]
status: active
created: 2025-07-08
---

# 📊 AMQ Streams on OpenShift (Apache Kafka)

> Red Hat AMQ Streams runs Apache Kafka brokers on OpenShift using the Strimzi operator framework, providing high-performance messaging capabilities.

---

## Strimzi Operator Architecture

The operator manages the entire Kafka lifecycle:
- **Kafka Cluster:** Deploys Kafka brokers and ZooKeeper nodes as StatefulSets.
- **KafkaTopic CRD:** Automates topic creation, deletion, and configuration directly from Kubernetes YAML manifests.

## Strimzi CRD Manifest Configurations

### 1. Deploying a Kafka Broker Cluster

```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: my-cluster
  namespace: messaging-ns
spec:
  kafka:
    version: 3.4.0
    replicas: 3
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
      - name: tls
        port: 9093
        type: internal
        tls: true
    config:
      offsets.topic.replication.factor: 3
      transaction.state.log.replication.factor: 3
      transaction.state.log.min.isr: 2
    storage:
      type: persistent-claim
      size: 100Gi
      class: odf-ceph-rbd
  zookeeper:
    replicas: 3
    storage:
      type: persistent-claim
      size: 10Gi
      class: odf-ceph-rbd
```

### 2. Creating a Topic

```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: orders-topic
  namespace: messaging-ns
  labels:
    strimzi.io/cluster: my-cluster
spec:
  partitions: 3
  replicas: 3
  config:
    retention.ms: 7200000
    segment.bytes: 1073741824
```

## Related Notes
- [[DO378-Cloud-Native-Microservices]] — Kafka-Quarkus microservices
- [[Camel-K]] — Event-driven integrations
