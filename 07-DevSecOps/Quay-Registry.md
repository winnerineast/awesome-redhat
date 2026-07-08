---
tags: [security, registry, devsecops, quay]
status: active
created: 2025-07-08
---

# 🔒 Project Quay Registry

> Red Hat Quay is an enterprise-grade container registry providing secure storage, scanning, build triggers, and geo-replication.

---

## Core Capabilities

- **Vulnerability Scanning (Clair):** Clair continuously scans container layers for CVE security vulnerabilities and indexes package definitions.
- **Geo-Replication:** Replicates registry images across multiple geographically separated data storage systems.
- **Repository Builds:** Automatically compiles images from GitHub or GitLab webhook triggers.

## Clair CLI Scanning Integration

Using `clairctl` or checking security metadata via API endpoints:

```bash
# Query the Quay registry security report for an image
curl -s -H "Authorization: Bearer <token>" \
  https://quay.example.com/api/v1/repository/myorg/myapp/image/<image-id>/security | jq
```

## Configuring Podman to trust a local Quay Registry

If your private Quay registry uses a self-signed TLS certificate:

```bash
# 1. Download CA certificate from Quay
# 2. Save certificate on control node:
sudo cp quay-ca.crt /etc/pki/ca-trust/source/anchors/
sudo update-ca-trust

# 3. Add to Podman registries.conf if needed (for unsecure setups)
# /etc/containers/registries.conf
# [[registry]]
# location = "quay.example.com"
# insecure = true
```

## Related Notes
- [[Container-Image-Signing]] — Signing techniques
- [[Supply-Chain-Security]] — Secure pipelines
