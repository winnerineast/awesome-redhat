---
tags: [certification, ansible, advanced, ex447]
status: active
created: 2025-07-08
---

# 🎯 EX447 — Red Hat Certified Specialist in Advanced Automation: Ansible Best Practices

> Evaluates expertise in structuring playbooks, handling errors with blocks, task delegation, rolling updates, using Collections, and administering Ansible Automation Platform (AAP) Controller.

---

## Exam Overview

| | |
|---|---|
| **Code** | EX447 |
| **Duration** | 4 hours |
| **Format** | Performance-based on live multi-node systems + AAP Controller console |
| **Prep Course** | [[DO447-Advanced-Ansible]] |
| **Learning Path** | [[Ansible-Automation-Path]] |

---

## ⚡ EX447 Exam Quick-Reference Cheat Sheet

### 1. Error Handling Blocks
```yaml
# Error capturing structure
- name: Task Block
  block:
    - name: Run main task
      command: /bin/critical-task
  rescue:
    - name: Recovery fallback
      command: /bin/rollback-task
  always:
    - name: Final logging
      debug:
        msg: "Completed attempt."
```

### 2. Task Delegation & Serialization
```yaml
- name: Distributed Deploy
  hosts: webservers
  serial: 1  # Do one host at a time
  tasks:
    - name: Query balancer
      command: curl http://lb.example.com/status
      delegate_to: localhost  # Runs on control node
```

### 3. Collection configurations
```yaml
# collections/requirements.yml
---
collections:
  - name: kubernetes.core
    version: 2.2.0
  - name: community.general
```

---

## 🏆 Golden Rules for Passing EX447

1. **Verify Block Failures:**
   In your `block` statements, a task is only considered failed if it returns `failed` status. If you are using custom scripts, make sure they exit with a non-zero exit code to trigger the `rescue` section.
   
2. **Handle AAP Credentials Permissions:**
   When setting up Job Templates in the AAP Controller, ensure you attach the correct Machine and Vault credentials. If playbooks require vault decryption, failing to bind the Vault Credential to the template will cause the job run to crash.

3. **Check Ansible forks in configuration:**
   If running parallel operations across hundreds of hosts, adjust the default `forks` count in `ansible.cfg` to prevent CPU throttling on the control node.

---

## 📝 EX447 Mock Practice Exam

Complete the following tasks in under **4 hours**.

### Task 1: Fault-Tolerant File Download
1. Write a playbook `download.yml` that attempts to download a configuration file from `http://files.example.com/configs/sys.conf` to `/etc/sys.conf` on all managed servers.
2. Structure the playbook using blocks:
   - If the download fails, download from a backup server `http://backup.example.com/configs/sys.conf` instead.
   - Always print the message "Download transaction complete" at the end of the run.

### Task 2: Rolling Update Deployment
1. Write a playbook `upgrade.yml` for `webservers`.
2. Configure it to update the package `httpd` to the latest version.
3. Configure the playbook to execute on **exactly one host at a time** (serial execution).
4. During the upgrade task, delegate a command `/usr/local/bin/disable-monitoring` to `localhost` before starting the package upgrade.

### Task 3: AAP Controller Configuration
1. Log in to the Ansible Automation Platform Controller.
2. Create an Inventory named `staging-nodes`.
3. Add a group `web-hosts` containing `node1.stage.example.com`.
4. Create a Project named `git-playbooks` referencing the Git repo `https://github.com/ansible/ansible-examples.git`.
5. Create a Job Template mapping `git-playbooks`, `staging-nodes`, and your SSH credentials to run the main installation playbook.

---

## Related Notes
- [[DO447-Advanced-Ansible]] — Course companion
- [[Ansible-Automation-Platform]] — Architecture reference
- [[Ansible-Automation-Path]] — MOC
