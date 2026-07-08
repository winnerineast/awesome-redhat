---
tags: [ai, ml, gpu, nvidia]
status: active
created: 2025-07-08
---

# 🤖 NVIDIA GPU Operator on OpenShift

> Automates the management of NVIDIA software components on node hosts, enabling GPU-accelerated workloads (AI/ML, transcoding, CUDA).

---

## GPU Operator Architecture

The operator discovers GPU-capable worker nodes and deploys:
1. **NVIDIA Driver Container:** Compiles and loads the GPU kernel driver dynamically.
2. **NVIDIA Container Toolkit:** Integrates the host container runtime with the GPU.
3. **NVIDIA Device Plugin:** Exposes the GPUs as Kubernetes resources.

```
  Pod Request (resources: nvidia.com/gpu: 1) ──▶ Scheduler ──▶ Node (Device Plugin maps GPU)
```

## Scheduling Workloads on GPU Nodes

To execute a pod on a GPU node, define requests in the Pod specification:

```yaml
# Pod requesting 1 NVIDIA GPU:
apiVersion: v1
kind: Pod
metadata:
  name: cuda-vector-add
  namespace: gpu-lab
spec:
  restartPolicy: OnFailure
  containers:
  - name: cuda-vector-add
    image: "nvidia/samples:vectoradd-cuda11.6.0"
    resources:
      limits:
        nvidia.com/gpu: 1 # Requests and locks 1 physical GPU
```

## Multi-Instance GPU (MIG) Configuration

MIG allows partitioning a single physical NVIDIA GPU (e.g., A100) into multiple smaller logical GPUs.
- **Configuring MIG via Operator:** Annotate the node to trigger the NVIDIA GPU Operator to partition the hardware:
  `oc annotate node worker-gpu-1 "nvidia.com/mig.config=all-1g.10gb" --overwrite`

## Related Notes
- [[OpenShift-AI-RHOAI]] — AI Platform
- [[Model-Serving]] — Inference configurations
