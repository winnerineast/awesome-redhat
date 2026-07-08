---
tags: [integration, camel-k, serverless]
status: active
created: 2025-07-08
---

# 📊 Apache Camel K on OpenShift

> A lightweight, serverless integration framework based on Apache Camel, running natively on Kubernetes/OpenShift and integrating with Knative.

---

## Serverless Integrations

Camel K is built for speed:
- **Instant Deployments:** The operator compiles, packages, and runs integrations directly from a single code file without creating local container registries first.
- **Scale to Zero:** Automatically integrates with **Knative Serving** to scale integration tasks to zero when there is no incoming network activity.

## Running Camel K Integrations via CLI

Administrators use the `kamel` CLI to run integration route scripts:

```bash
# 1. Write an integration file (Java/JavaScript/YAML DSL)
cat > hello.java << 'EOF'
import org.apache.camel.builder.RouteBuilder;

public class hello extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        from("timer:java?period=3000")
            .setHeader("myHeader", constant("Camel K on OpenShift"))
            .setBody(simple("Hello World! Current time: ${header.CamelTimerFiredTime}"))
            .to("log:info?showAll=true");
    }
}
EOF

# 2. Run the integration route instantly
kamel run hello.java

# 3. View logs
kamel log hello
```

## Related Notes
- [[AMQ-Streams-Kafka]] — Event-driven streams
- [[Serverless-Knative]] — Knative Serverless integrations
