---
tags: [certification, tips, study-resources]
status: active
created: 2025-07-08
---

# 🎓 Certification Study Tips and Resources

> General guidelines, strategies, lab setup blueprints, and troubleshooting tips for passing performance-based Red Hat certification exams.

---

## ⚡ Performance-Based Exam Tactics

Red Hat exams are **100% practical**. You do not answer multiple-choice questions; you are given a set of requirements to configure on live, running virtual machines.

### 1. The Golden Verification Protocol
Before ending your exam, you **MUST** reboot all grading machines and verify:
- Do the network interfaces initialize with the correct IPs?
- Do the firewalld ports remain open?
- Do the LVM storage volumes mount automatically without dropping the system into emergency mode?
- Do rootless containers start on system boot via systemd?

### 2. Time Management Strategy
- **Read the whole exam first.** Identify which tasks depend on each other (e.g. setting up a user before creating cron jobs, or setting up a database volume before running a container).
- **If a system fails to boot, fix it first.** You cannot grade tasks on a machine that cannot be accessed.

---

## 🛠️ Building Your Offline Lab Environment

### 1. RHEL Lab VMs (KVM/VirtualBox)
- Deploy clean **RHEL 9** minimal installations.
- Register with a free **Red Hat Developer Subscription** to enable package repositories:
  `sudo subscription-manager register`

### 2. OpenShift Local (formerly CRC)
For developer/admin labs, run OpenShift on your local workstation:
- Downloader portal: [Red Hat Hybrid Cloud Console](https://console.redhat.com/openshift/create/local)
- Requires: 4 vCPUs, 9 GiB RAM, 35 GiB storage space.

```bash
# Start local OpenShift cluster
crc setup
crc start
```

---

## Related Notes
- [[EX200-RHCSA]] — RHCSA Exam Guide
- [[EX294-Ansible]] — RHCE Exam Guide
- [[EX280-OpenShift-Admin]] — OpenShift Admin Guide
- [[RHCA]] — Architect Program Overview
