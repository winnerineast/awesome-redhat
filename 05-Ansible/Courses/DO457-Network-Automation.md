---
tags: [ansible, course, automation, network]
course_code: DO457
course_title: "Ansible for Network Automation"
duration: "5 days"
format: "Classroom, Virtual, Self-paced"
cost: Subscription
prerequisites: "RH294 or equivalent Ansible skills"
status: active
created: 2025-07-08
---

# 📙 DO457 — Ansible for Network Automation

> Focuses on automating network switches, routers, firewalls, and configurations across multi-vendor network devices (Cisco iOS, Juniper Junos, Arista EOS).

---

## Course Overview

| | |
|---|---|
| **Code** | DO457 |
| **Duration** | 5 days (40 hours) |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | [[RH294-Ansible-Automation]] or equivalent experience |
| **Next Step** | Specialist tracks or [[Ansible-Automation-Path]] |
| **Learning Path** | [[Ansible-Automation-Path]] |

## Learning Objectives

After completing this course, you will be able to:
1. Explain network automation architecture differences compared to servers (no Python engine on devices).
2. Configure connection settings for network devices using `network_cli` and `netconf`.
3. Automate network configurations on Cisco iOS, Juniper Junos, and Arista EOS.
4. Retrieve network status facts and verify configuration compliance.
5. Create playbooks to automate network backups and firmware upgrades.

---

## Module 1: Network Automation Architecture

Unlike RHEL servers, network switches and routers do not run a generic Python interpreter. Therefore:
1. **Local Execution:** Ansible executes modules on the **Control Node** (localhost), translating tasks to network-specific CLI commands (SSH) or API payloads (NETCONF/RESTCONF).
2. **Persistent Connections:** Specialized plugins keep SSH channels open across tasks to avoid connection overhead.

**Connection configurations in inventory:**
```ini
[switches]
switch-1.example.com

[switches:vars]
ansible_connection = ansible.netcommon.network_cli
ansible_network_os = cisco.ios.ios
ansible_user = admin
ansible_ssh_pass = cisco123
```

---

## Module 2: Device Configuration (Multi-Vendor)

### Cisco IOS Configuration

Cisco IOS modules use CLI scraping over SSH.

```yaml
- name: Configure Cisco Switch Interface
  hosts: switches
  tasks:
  - name: Configure interface description and IP
    cisco.ios.ios_interfaces:
      config:
      - name: GigabitEthernet0/1
        description: Uplink to Router
        enabled: true
      - name: GigabitEthernet0/2
        description: Server Host
        enabled: true
```

### Juniper Junos Configuration

Juniper Junos supports CLI over SSH as well as XML payloads over NETCONF.

```yaml
- name: Configure Juniper Device
  hosts: switches
  tasks:
  - name: Apply Junos system parameters
    junipernetworks.junos.junos_system:
      config:
        hostname: switch-juniper
        domain_name: example.com
```

---

## Module 3: Network Backups & Auditing

### Network Configuration Backups

```yaml
- name: Backup Network Configurations
  hosts: switches
  tasks:
  - name: Get running configuration
    cisco.ios.ios_facts:
      gather_subset: all

  - name: Save configuration to local control node
    copy:
      content: "{{ ansible_facts['net_config'] }}"
      dest: "/backup/network/{{ inventory_hostname }}.cfg"
```

---

## Related Notes
- [[Ansible-Basics]] — Basic reference
- [[Networking-Linux]] — Linux-side network configurations
- [[Ansible-Automation-Path]] — MOC
