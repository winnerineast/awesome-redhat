---
tags: [middleware, java, quarkus, developer]
status: active
created: 2025-07-08
---

# ⚙️ Quarkus on OpenShift

> A Kubernetes-native Java stack tailored for GraalVM and OpenJDK. Highly optimized for fast startup times and small memory footprints.

---

## Developer Workflows

Quarkus provides a development console and live reload capabilities out of the box:

```bash
# Start live development mode (automatically reloads on changes)
mvn quarkus:dev
```

## Native Binary Compilation

Native compilation builds a standalone runner binary, completely removing the JVM execution wrapper.

```bash
# Compile to native binary (requires GraalVM or Docker/Podman container engine)
./mvnw package -Pnative -Dquarkus.native.container-build=true
```

## UBI-Micro Containerfile Optimization

Since native executables don't require a Java Runtime (JRE), they can run inside extremely small container images like Red Hat's **Universal Base Image (UBI) Micro**.

```dockerfile
# Multi-stage build for Quarkus Native application:
FROM registry.access.redhat.com/ubi9/ubi-minimal:latest AS build
WORKDIR /code
COPY . .
RUN ./mvnw package -Pnative -Dquarkus.native.container-build=true

FROM registry.access.redhat.com/ubi9/ubi-micro:latest
WORKDIR /work/
COPY --from=build /code/target/*-runner /work/application
RUN chmod 775 /work
EXPOSE 8080
CMD ["./application", "-Dquarkus.http.host=0.0.0.0"]
```

## Related Notes
- [[DO378-Cloud-Native-Microservices]] — Microservices course
- [[Serverless-Knative]] — Knative Serverless integrations
