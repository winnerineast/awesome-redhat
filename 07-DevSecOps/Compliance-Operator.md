---
tags: [devsecops, compliance]
status: stub
created: 2025-07-08
---
# Compliance Operator
> Automated compliance scanning for OpenShift clusters.

## Supported Standards
- CIS Benchmarks, NIST 800-53, PCI DSS, HIPAA, FedRAMP

## How it Works
- Uses OpenSCAP for scanning
- ScanSettingBinding → ComplianceScan → ComplianceCheckResult
- Automated remediation with ComplianceRemediation CRDs

## Related Notes
- [[ACS-Advanced-Cluster-Security]], [[StackRox-ACS]]
