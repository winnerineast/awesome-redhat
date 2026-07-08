---
tags: [ansible, course, automation, advanced]
course_code: DO447
course_title: "Advanced Automation: Ansible Best Practices"
duration: "5 days"
format: "Classroom, Virtual, Self-paced"
cost: Subscription
prerequisites: "RH294 or EX294"
certification_prep: EX447
status: active
created: 2025-07-08
---

# 📘 DO447 — Advanced Automation: Ansible Best Practices

> The advanced course on structuring and optimizing automation at scale. Covers workflow patterns, error handling, performance tuning, execution environments, and using the Ansible Automation Platform (AAP) Controller.

---

## Course Overview

| | |
|---|---|
| **Code** | DO447 |
| **Duration** | 5 days (40 hours) |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | [[RH294-Ansible-Automation]] or [[EX294-Ansible]] |
| **Next Step** | Specialist tracks or [[Ansible-Automation-Path]] |
| **Certification** | Maps directly to [[EX447-Advanced-Ansible]] |
| **Learning Path** | [[Ansible-Automation-Path]] |

## Learning Objectives

After completing this course, you will be able to:
1. Implement recommended style and optimization best practices for Ansible playbooks.
2. Structure robust error recovery scenarios using `block`, `rescue`, and `always` statements.
3. Manage rolling updates, serialize task executions, and delegate tasks to remote hosts.
4. Utilize Ansible Content Collections and execute runs inside containerized Execution Environments (EE).
5. Build and manage automated pipelines using Ansible Automation Platform (AAP) Controller.

---

## Module 1: Advanced Playbook Flows & Error Handling

### Blocks, Rescue, and Always (Try/Catch equivalent)

Blocks group related tasks and allow catching failures. If any task inside a `block` fails, execution transitions to the `rescue` section. The `always` section runs regardless of success or failure.

```yaml
- name: Database Maintenance
  hosts: dbservers
  tasks:
  - name: Attempt updates
    block:
    - name: Stop database service
      service:
        name: mysql
        state: stopped

    - name: Run dangerous patch command
      command: /opt/scripts/patch.sh

    rescue:
    - name: Handle failures (Rollback)
      debug:
        msg: "Patch failed! Restoring from backup..."

    - name: Execute recovery script
      command: /opt/scripts/rollback.sh

    always:
    - name: Start database service (Always runs)
      service:
        name: mysql
        state: started
```

---

## Module 2: Scale Operations & Task Control

### Task Delegation (`delegate_to`)

By default, tasks run on the target host defined by `hosts:`. Task delegation runs the task on a different host (e.g. updating a load balancer config or querying an external monitor API) while retaining the target host's facts.

```yaml
- name: Deploy application
  hosts: webservers
  tasks:
  - name: Remove host from load balancer during deploy
    command: /usr/bin/lb-cli remove {{ inventory_hostname }}
    delegate_to: lb.example.com
```

### Rolling Updates (`serial`)

By default, Ansible runs a task on all target hosts in parallel (or up to its fork limit). `serial` limits execution to a subset of hosts at a time. If the play fails on the first subset, the playbook terminates before impacting other servers.

```yaml
- name: Perform Rolling Web Upgrade
  hosts: webservers
  serial: 2 # Process 2 servers at a time
  # Or use percentages: serial: "25%"
  tasks:
  - name: Install software
    yum:
      name: httpd
      state: latest
```

---

## Module 3: Execution Environments & Collections

### Ansible Content Collections

Collections package plugins, modules, roles, and playbooks together. They are namespaced (e.g. `namespace.collection`).

```yaml
# Using collections inside a playbook
- name: Manage Kubernetes resource
  hosts: localhost
  collections:
    - kubernetes.core
  tasks:
    - name: Create namespace
      k8s:
        name: my-namespace
        state: present
```

### Execution Environments (EE)

An Execution Environment is a container image containing:
- Ansible Core
- Python dependencies
- System dependencies
- Ansible Content Collections

This ensures that regardless of what packages are installed on the controller host, playbooks run with the exact same dependencies.

---

## Module 4: Ansible Automation Platform (AAP) Controller

AAP Controller (formerly Ansible Tower) provides a web UI and REST API for enterprise automation:
- **Inventories:** Centralized host definitions, dynamic sync from AWS/VMware.
- **Credentials:** Secure SSH keys, cloud API keys, and vault passwords (injected at runtime, hidden from developers).
- **Projects:** Logical packages of playbooks sourced from Git repositories.
- **Job Templates:** Mappings of Projects + Inventories + Credentials + Playbooks to execute runs.
- **Workflows:** Visual flowcharts linking multiple Job Templates together (e.g., Run provisioning → If success, run configuration → If fail, send slack alert).

---

## Related Notes
- [[Ansible-Automation-Platform]] — Platform guide
- [[Execution-Environments]] — EE container details
- [[EX447-Advanced-Ansible]] — Exam study guide
- [[Ansible-Automation-Path]] — MOC
