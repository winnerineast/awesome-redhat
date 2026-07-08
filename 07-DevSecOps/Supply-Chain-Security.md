---
tags: [security, devsecops, architecture]
status: active
created: 2025-07-08
---

# 🔒 Software Supply Chain Security

> Establishes a zero-trust software pipeline mapping across build, verification, registry, and admission control boundaries.

---

## Secure Pipeline Blueprint

A secure software supply chain ensures that only trusted code is compiled, scanned, signed, and allowed to execute on the production OpenShift cluster.

```
  Git Commit ──▶ Tekton Pipeline ──▶ Vuln Scan (ACS) ──▶ Image Sign (Cosign) ──▶ Registry (Quay)
                                                                                   │
                                                                                   ▼
  Production Pod ◀── Admission Controller (Blocks if unsigned or CVEs high) ◄──────┘
```

## Key Architectural Controls

### 1. Software Bill of Materials (SBOM)
Generate SBOMs (e.g. CycloneDX, SPDX formats) during compilation tasks to catalog all runtime library dependencies.
- Command example in S2I/Tekton: `syft dir:. -o cyclonedx-json > sbom.json`

### 2. Admission Control Enforcement
Deploy admission controllers (such as **Kyverno** or **ACS Admission Controller**) to block deployments:
- Reject pods if the container image lacks a valid signature matching the public key.
- Reject pods if the vulnerability scan contains CVE violations with severity "Critical".

---

## Related Notes
- [[Container-Image-Signing]] — Image signatures
- [[StackRox-ACS]] — Vuln scanning
- [[Quay-Registry]] — Quay registry integrations
