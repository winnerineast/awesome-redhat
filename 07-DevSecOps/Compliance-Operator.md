---
tags: [security, compliance, devsecops]
status: active
created: 2025-07-08
---

# 🔒 OpenShift Compliance Operator

> Automates compliance auditing and remediates deviations against standard industry profiles (CIS benchmarks, PCI-DSS, HIPAA, NIST-800-53).

---

## Operations Architecture

The operator deploys **scansettingbinding** configurations that map targeted nodes to security profiles, run OpenSCAP scans inside container privileges, and output findings.

```
  Admin applies ScanSettingBinding ──▶ Compliance Operator ──▶ Nodes (SCAP scans) ──▶ ComplianceSuite Report
```

## CLI Configuration Steps

```bash
# 1. List available compliance profiles
oc get profiles.compliance -n openshift-compliance

# 2. Check details of a profile (e.g. RHEL 9 CIS Benchmark)
oc describe profile ocp4-cis -n openshift-compliance

# 3. Apply a ScanSettingBinding (runs scans daily)
cat <<EOF | oc apply -f -
apiVersion: compliance.openshift.io/v1alpha1
kind: ScanSettingBinding
metadata:
  name: cis-compliance-check
  namespace: openshift-compliance
profiles:
  - name: ocp4-cis
    kind: Profile
    apiGroup: compliance.openshift.io/v1alpha1
  - name: ocp4-pci-dss
    kind: Profile
    apiGroup: compliance.openshift.io/v1alpha1
settingsRef:
  name: default
  kind: ScanSetting
  apiGroup: compliance.openshift.io/v1alpha1
EOF

# 4. Monitor scan progress
oc get compliancesuite -w -n openshift-compliance
oc get compliancecheckresult -n openshift-compliance | grep FAIL
```

## Remediation Examples

If a scan fails, the Compliance Operator creates `ComplianceRemediation` resources to fix the node OS files automatically:

```bash
# View automatically generated remediations
oc get complianceremediation -n openshift-compliance

# Approve and apply a remediation
oc patch complianceremediation/ocp4-cis-sysctl-net-ipv4-conf-all-accept-redirects \
  --patch '{"spec":{"apply":true}}' --type=merge -n openshift-compliance
```

## Related Notes
- [[StackRox-ACS]] — Vulnerability management
- [[Supply-Chain-Security]] — Secure pipelines
