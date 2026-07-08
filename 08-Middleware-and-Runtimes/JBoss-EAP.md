---
tags: [middleware, java, jboss, application-server]
status: active
created: 2025-07-08
---

# ⚙️ JBoss EAP on OpenShift

> Red Hat JBoss Enterprise Application Platform (EAP) configuration and deployment guidelines inside containerized architectures.

---

## Deploying JBoss EAP on OpenShift

Traditional JBoss configurations rely on standalone or domain mode files (`standalone.xml`). On OpenShift, JBoss EAP is deployed using:
1. **JBoss EAP Operator:** Automates deployments, clustering, session replication, and upgrades.
2. **WildFly Maven Plugin:** Provisions JBoss EAP servers directly during the maven build phase.

## EAP WildFly Custom Resource Example

```yaml
apiVersion: wildfly.org/v1alpha1
kind: WildFlyServer
metadata:
  name: eap-app
  namespace: my-app-prod
spec:
  applicationImage: quay.io/myorg/eap-app:latest
  replicas: 3
  sessionReplication: true # Automatically configures Infinispan clustering for session caching
```

## Related Notes
- [[Spring-Boot-on-OpenShift]] — Alternative Java runtime
- [[Quarkus]] — Cloud-native Java framework
