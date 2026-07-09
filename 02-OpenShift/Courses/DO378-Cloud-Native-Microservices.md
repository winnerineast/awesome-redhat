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
| **Prerequisites** | [DO288-OpenShift-Development-II](DO288-OpenShift-Development-II.md) or Java development experience |
| **Next Step** | Specialist tracks or [OpenShift-Architect-Path](../../01-Learning-Paths/OpenShift-Architect-Path.md) |
| **Learning Path** | [OpenShift-Developer-Path](../../01-Learning-Paths/OpenShift-Developer-Path.md) |

## Learning Objectives

After completing this course, you will be able to:
1. Develop high-performance Java microservices using the Quarkus framework.
2. Implement reactive, asynchronous programming models using Mutiny.
3. Deploy autoscaling, scale-to-zero serverless microservices with Knative.
4. Establish event-driven pipelines using AMQ Streams (Apache Kafka).
5. Build and compile native binaries with GraalVM to minimize startup overhead.

---

## Module 1: Quarkus Framework Foundations

Quarkus is a Kubernetes-native Java stack tailored for OpenJDK and GraalVM, optimized for containers.

### JVM vs. Ahead-of-Time (AOT) Native Compilation
Traditional Java compiles source to bytecode (`.class`), which is compiled at runtime by the JVM's JIT (Just-In-Time) compiler. 
Quarkus uses **GraalVM** to compile Java directly into host-native executable binaries during build time (Ahead-Of-Time compilation). This strips out unused JVM classes and builds static images.

| Metric | JVM Runtime | Native Runtime |
|---|---|---|
| **Startup Time** | ~2.5 seconds | ~0.015 seconds |
| **Memory usage (idle)** | ~140 MB | ~15 MB |

### Extensions and Live Coding
- **Live Coding (`quarkus dev`):** Modifying Java code automatically recompiles and redeploys the runtime instantly upon receiving the next HTTP request.
- **Extensions:** Pre-configured libraries (e.g. `quarkus-resteasy-reactive`, `quarkus-hibernate-reactive-panache`) configured for native builds out-of-the-box.

---

## Module 2: Reactive Programming with Mutiny

Mutiny is an asynchronous programming library driven by two types:
- **`Uni<T>`:** Emits a single item or a failure (ideal for single database queries or REST responses).
- **`Multi<T>`:** Emits zero, one, or many items (ideal for streams, loops, or Kafka event processing).

### Example Reactive Endpoint
```java
package com.example;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/greeting")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Uni<String> getGreeting() {
        return Uni.createFrom().item("Welcome to Quarkus Reactive Mutiny APIs!")
                  .onItem().transform(String::toUpperCase);
    }
}
```

---

## Module 3: OpenShift Serverless (Knative)

OpenShift Serverless is built on Knative. Workloads automatically scale up on demand and scale down to zero during idle periods.

```
  HTTP Request ──▶ Knative Ingress ──▶ Activator (Wakes up Pod) ──▶ Pod Executed
```

### Knative Serving Components
- **Service:** High-level wrapper resource managing lifecycle configurations.
- **Configuration:** Maintains target settings for the workload deployment.
- **Revision:** An immutable snapshot of code and configuration history. Traffic routing rules splits weights among revisions.
- **Route:** Maps a network endpoint URL to specific revisions.

### Knative Service Manifest
```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: serverless-greeting
  namespace: my-sandbox
spec:
  template:
    metadata:
      annotations:
        # Configure scaling limits
        autoscaling.knative.dev/min-scale: "0"
        autoscaling.knative.dev/max-scale: "5"
    spec:
      containers:
      - image: quay.io/myorg/quarkus-greeting:latest
        ports:
        - containerPort: 8080
```

---

## Module 4: Event-Driven Kafka (AMQ Streams)

Quarkus uses SmallRye Reactive Messaging to bind Kafka topics directly to Java method parameters.

### `application.properties` configuration
```properties
# Configure incoming channel
mp.messaging.incoming.orders.connector=smallrye-kafka
mp.messaging.incoming.orders.topic=orders-topic
mp.messaging.incoming.orders.value.deserializer=org.apache.kafka.common.serialization.StringDeserializer

# Configure outgoing channel
mp.messaging.outgoing.processed-orders.connector=smallrye-kafka
mp.messaging.outgoing.processed-orders.topic=processed-orders-topic
mp.messaging.outgoing.processed-orders.value.serializer=org.apache.kafka.common.serialization.StringSerializer
```

### Java Processing Code
```java
package com.example;

import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Outgoing;

@ApplicationScoped
public class OrderProcessor {

    @Incoming("orders")
    @Outgoing("processed-orders")
    public String processOrder(String orderId) {
        return "Processed Order ID: " + orderId;
    }
}
```

---

## Practice Lab: Building a Knative Serverless API

### Objective
Create and deploy a Knative Serverless Java endpoint configured to scale down to zero when idle.

### Step 1: Initialize Project
```bash
# Create local directory and bootstrap Quarkus app
mvn io.quarkus.platform:quarkus-maven-plugin:3.2.0.Final:create \
    -DprojectGroupId=com.example \
    -DprojectArtifactId=serverless-api \
    -Dextensions="resteasy-reactive"
```

### Step 2: Build the Container Image
Write a Containerfile referencing UBI:
```dockerfile
# Containerfile
FROM registry.access.redhat.com/ubi9/openjdk-17-runtime:latest
COPY target/quarkus-app/ /deployments/
EXPOSE 8080
CMD ["java", "-jar", "/deployments/quarkus-run.jar"]
```
```bash
mvn package
podman build -t quay.io/myorg/serverless-api:1.0 .
podman push quay.io/myorg/serverless-api:1.0
```

### Step 3: Deploy to OpenShift as Knative Service
Ensure serverless operator is available in the target namespace.
```yaml
# knative-service.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: serverless-api
  namespace: serverless-lab
spec:
  template:
    spec:
      containers:
      - image: quay.io/myorg/serverless-api:1.0
        ports:
        - containerPort: 8080
```
```bash
oc new-project serverless-lab
oc apply -f knative-service.yaml
```

### Step 4: Verify Scale-to-Zero behavior
1. Query active pods:
   ```bash
   oc get pods -n serverless-lab
   ```
   *No pods should be running after 60 seconds of idle time.*
2. Trigger execution by curling the Route URL:
   ```bash
   URL=$(oc get ksvc serverless-api -o jsonpath='{.status.url}')
   curl $URL/hello
   ```
3. Instantly run `oc get pods`: you should see a new Pod spinning up (`Cold-start`), handling the HTTP response, and returning to idle after a minute.

---

## Related Notes
- [Quarkus](../../08-Middleware-and-Runtimes/Quarkus.md) — Framework deep-dive
- [Serverless-Knative](../../08-Middleware-and-Runtimes/Serverless-Knative.md) — Knative serving & eventing
- [AMQ-Streams-Kafka](../../09-Data-and-Integration/AMQ-Streams-Kafka.md) — Event pipelines
- [OpenShift-Developer-Path](../../01-Learning-Paths/OpenShift-Developer-Path.md) — Learning path MOC
