---
tags: [ai, ml, rhoai, openshift-ai]
status: active
created: 2025-07-08
---

# 🤖 Red Hat OpenShift AI (RHOAI)

> Formerly RHODS (Red Hat OpenShift Data Science), RHOAI is an enterprise platform for training, serving, and monitoring artificial intelligence and machine learning models.

---

## RHOAI Platform Architecture

RHOAI aggregates data science toolkits into a single controlled workspace:

```
  Data Scientist ──▶ RHOAI Dashboard (Jupyter / VS Code Server)
                           │
                           ├──▶ Pipelines (Elyra / Tekton execution)
                           └──▶ Model Registry & Serving (KServe / vLLM)
```

- **Jupyter Notebook Spawners:** Launches containerized notebook servers with customized image dependencies and specific CPU/Memory/GPU quotas.
- **Data Science Pipelines:** Automates workflow tasks (data preprocessing, training steps) using Elyra and Kubeflow Pipelines.
- **Model Registry:** Catalogs and version-controls trained ML models.

---

## Model Pipeline CLI Configuration

Data scientists can interact with model serving endpoints:

```bash
# Query a served model using KServe v2 API:
curl -s -X POST https://my-model-route.apps.cluster.example.com/v2/models/mnist/infer \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": [
      {
        "name": "images",
        "shape": [1, 28, 28],
        "datatype": "FP32",
        "data": [0.0, ...]
      }
    ]
  }' | jq
```

## Related Notes
- [[GPU-and-NVIDIA-Integration]] — Hardware scheduling
- [[Model-Serving]] — vLLM & KServe deployment
- [[OpenShift-Lightspeed]] — AI Assistant
