---
tags: [security, devsecops, signing]
status: active
created: 2025-07-08
---

# 🔒 Container Image Signing

> Cryptographically signs container images to guarantee authenticity and prevent tampering in public and private registries.

---

## Signing Architectures (Cosign / Sigstore)

Image signing prevents man-in-the-middle attacks where an attacker replaces a trusted registry image with a malicious one.

```
  1. Build Image ──▶ 2. Cosign sign with private key ──▶ 3. Registry (stores signature)
                                                                 ▲
                                                                 │ 4. Verify signature via policy
                                                         Kubenernates Node (Deploy)
```

## CLI Signing Workflow (Cosign)

```bash
# 1. Generate key pair
cosign generate-key-pair
# Generates cosign.key (keep secret!) and cosign.pub

# 2. Sign a container image
cosign sign --key cosign.key quay.io/myorg/myapp:latest

# 3. Verify signature
cosign verify --key cosign.pub quay.io/myorg/myapp:latest
```

## Enforcing Signature Verification on OCP Nodes

OpenShift node systems can block unsigned containers at the platform node level:

```bash
# Edit node signature validation policy configuration
# /etc/containers/policy.json on nodes (usually rolled out via MachineConfig)
# {
#     "default": [{"type": "reject"}],
#     "transports": {
#         "docker": {
#             "quay.io/myorg": [
#                 {
#                     "type": "signedBy",
#                     "keyType": "GPGKeys",
#                     "keyPath": "/etc/pki/cosign.pub"
#                 }
#             ]
#         }
#     }
# }
```

## Related Notes
- [[Quay-Registry]] — Quay registry integrations
- [[Supply-Chain-Security]] — Secure pipelines
