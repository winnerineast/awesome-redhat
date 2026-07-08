---
tags: [middleware, java, springboot, developer]
status: active
created: 2025-07-08
---

# ⚙️ Spring Boot on OpenShift

> Implementing, packaging, and optimizing Java Spring Boot applications for enterprise execution on Red Hat OpenShift.

---

## Deployment & Build Options

Spring Boot applications can be deployed on OpenShift using:
- **Binary S2I builds:** Compile the fat JAR locally, and push the JAR directly to OpenShift using binary build streams.
- **Source S2I builds:** Deploy directly from a Git repository using Java builder streams.

```bash
# S2I Source build for Spring Boot
oc new-app java:17~https://github.com/spring-projects/spring-petclinic.git --name=petclinic
```

## JVM Memory Configurations & Health Probes

Spring Boot fat JARs require JVM configuration adjustments to respect Kubernetes memory boundaries and prevent OOM kills.

```yaml
# Deployment spec with JVM allocations and Spring Actuator health probes:
spec:
  containers:
  - name: spring-app
    image: my-spring-image:latest
    env:
    - name: JAVA_OPTS_APPEND
      value: "-XX:MaxRAMPercentage=75.0 -XX:+UseG1GC"
    resources:
      requests:
        memory: "512Mi"
      limits:
        memory: "1Gi"
    livenessProbe:
      httpGet:
        path: /actuator/health/liveness
        port: 8080
    readinessProbe:
      httpGet:
        path: /actuator/health/readiness
        port: 8080
```

## Related Notes
- [[DO288-OpenShift-Development-II]] — Workload configuration
- [[JBoss-EAP]] — Enterprise Java runtimes
