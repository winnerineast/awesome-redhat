---
tags: [openshift, course, development, advanced]
course_code: DO378
course_title: "Red Hat Cloud-Native Microservices Development with Quarkus"
duration: "5 days"
format: "Classroom, Virtual, Self-paced"
cost: Subscription
prerequisites: "DO288 or Java development experience"
status: active
created: 2025-07-08
---

# 📙 DO378 — Red Hat Cloud-Native Microservices Development with Quarkus

> The advanced cloud-native developer course on Red Hat OpenShift. Teaches how to build, deploy, and scale microservices using Quarkus, Knative Serverless, and event-driven architectures with Kafka.

---

## Course Overview

| | |
|---|---|
| **Code** | DO378 |
| **Duration** | 5 days (40 hours) |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | [[DO288-OpenShift-Development-II]] or Java development experience |
| **Next Step** | Specialist tracks or [[OpenShift-Architect-Path]] |
| **Learning Path** | [[OpenShift-Developer-Path]] |

## Learning Objectives

After completing this course, you will be able to:
1. Develop high-performance Java microservices using the Quarkus framework.
2. Implement reactive, asynchronous programming models using Mutiny.
3. Deploy autoscaling, scale-to-zero serverless microservices with Knative.
4. Establish event-driven pipelines using AMQ Streams (Apache Kafka).
5. Build and compile native binaries with GraalVM to minimize startup overhead.

---

## Module 1: Quarkus Framework Foundations

### What is Quarkus?
A Kubernetes-native Java stack tailored for GraalVM and OpenJDK. Key features:
- **Container First:** Extremely low memory footprints and fast startup times.
- **Developer Joy:** Live coding mode (`quarkus dev`), automatic database setups, and quick test extensions.
- **Unification:** Combines both imperative and reactive paradigms in a single code-base.

### Native Compilation

Standard JVM applications compile Java to bytecode. At runtime, the JVM translates bytecode to machine code.
**Quarkus Native Compilation** uses GraalVM to compile Java directly into a standalone platform-native executable binary during build time (Ahead-Of-Time compilation).

```
  Traditional: Source ──▶ Bytecode (.class) ──▶ JVM (Runtime compilation)
  Quarkus:     Source ──▶ GraalVM Build ──────▶ Native OS Binary (No JVM needed)
```

| Metric | JVM Runtime | Native Runtime |
|---|---|---|
| **Startup Time** | ~2.5 seconds | ~0.015 seconds |
| **Memory usage (idle)** | ~140 MB | ~15 MB |

---

## Module 2: Reactive Programming with Mutiny

Mutiny is a reactive programming library designed to build asynchronous pipelines using two core types:
- **`Uni`:** Emits a single item or a failure (representing a deferred calculation or HTTP response).
- **`Multi`:** Emits zero, one, or many items (streams, database query results, or Kafka events).

### Example REST API Endpoint (Reactive)

```java
package com.example;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/hello")
public class ReactiveResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Uni<String> helloReactive() {
        return Uni.createFrom().item("Hello from Quarkus Reactive API!");
    }
}
```

---

## Module 3: OpenShift Serverless (Knative)

OpenShift Serverless is based on **Knative**, allowing workloads to autoscale up and down to zero instances depending on request traffic.

```
   Scale-to-zero: Traffic stops ──▶ Knative stops pod ──▶ 0 active replicas
   Cold-start:    New request ──▶ Knative spins pod up ──▶ Traffic route
```

### Knative Serving Components

```
     Route (External ingress router URL)
       │
       ▼
  Ingress Controller
       │
       ▼
   Service (Knative wrapper configuration)
   ┌───┴───┐
   ▼       ▼
Configuration  Route (Traffic splits)
   │
   ▼
Revision (Immutable snapshot of the deployment)
```

### Deploying a Knative Service

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: serverless-app
  namespace: my-app-dev
spec:
  template:
    spec:
      containers:
      - image: quay.io/myorg/serverless-app:latest
        ports:
        - containerPort: 8080
```

---

## Module 4: Event-Driven Kafka (AMQ Streams)

AMQ Streams runs Kafka brokers inside the OpenShift cluster using operators.

```
 Producer App ──▶ Kafka Topic ──▶ AMQ Streams Operator (Broker) ──▶ Consumer App
```

### Configurator Properties for Quarkus Kafka integrations

```properties
# src/main/resources/application.properties
# Configure database mapping or incoming/outgoing Kafka channels
mp.messaging.incoming.orders.connector=smallrye-kafka
mp.messaging.incoming.orders.topic=orders-topic
mp.messaging.incoming.orders.value.deserializer=org.apache.kafka.common.serialization.StringDeserializer
```

---

## Related Notes
- [[Quarkus]] — Framework deep-dive
- [[Serverless-Knative]] — Knative serving & eventing
- [[AMQ-Streams-Kafka]] — Event pipelines
- [[OpenShift-Developer-Path]] — Learning path MOC
