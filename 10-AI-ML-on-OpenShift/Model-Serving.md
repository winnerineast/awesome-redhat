---
tags: [ai, ml, inference, model-serving]
status: active
created: 2025-07-08
---

# 🤖 Model Serving on OpenShift

> Implementing scale-out inference pipelines for Large Language Models (LLMs) and deep learning models using KServe, Caikit, and vLLM.

---

## Inference Stack Layers

OpenShift Model Serving uses a modular architecture:

```
  HTTP/gRPC API Request (v2 Protocol)
       │
       ▼
  Caikit API / vLLM (Orchestrator / Tokenizer / KV Cache)
       │
       ▼
  KServe / Knative (Autoscaling / scale-to-zero container runtime)
       │
       ▼
  NVIDIA GPU (Hardware Acceleration)
```

- **KServe:** Manages the serverless model lifecycle (canary deployments, scale-to-zero).
- **vLLM:** A high-throughput, memory-efficient LLM serving engine featuring PagedAttention.
- **Caikit:** A developer-friendly framework that simplifies model serialization and query interfaces.

---

## Deploying an LLM Serverless Predictor (KServe)

```yaml
apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: granite-llm
  namespace: model-serving
spec:
  predictor:
    model:
      modelFormat:
        name: huggingface
      storageUri: s3://models-bucket/granite-7b/
      resources:
        limits:
          cpu: "4"
          memory: 16Gi
          nvidia.com/gpu: 1
```

## Related Notes
- [[OpenShift-AI-RHOAI]] — AI Platform
- [[GPU-and-NVIDIA-Integration]] — GPU hardware integrations
