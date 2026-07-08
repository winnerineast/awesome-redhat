---
tags: [certification, ansible, rhce, ex294]
status: active
created: 2025-07-08
---

# 🎯 EX294 — Red Hat Certified Engineer (RHCE) - Ansible

> Tests your ability to automate system administration tasks on multiple RHEL nodes using Ansible playbooks, roles, vaults, and configuration files.

---

## Exam Overview

| | |
|---|---|
| **Code** | EX294 |
| **Duration** | 4 hours (240 minutes) |
| **Format** | Performance-based on live multi-node RHEL environments |
| **Prep Course** | [[RH294-Ansible-Automation]] |
| **Learning Path** | [[Ansible-Automation-Path]] |

---

## ⚡ EX294 Exam Quick-Reference Cheat Sheet

### 1. Control Node Setup (`ansible.cfg`)
```ini
# Create local ansible.cfg in project root
[defaults]
inventory = ./inventory
remote_user = ansible
host_key_checking = false

[privilege_escalation]
become = true
become_method = sudo
become_user = root
become_ask_pass = false
```

### 2. Custom Ad-Hoc executions
```bash
# Verify ping across all hosts
ansible all -m ping

# Copy local file to target webservers
ansible webservers -m copy -a "src=/tmp/check.sh dest=/usr/local/bin/check.sh mode=0755"
```

### 3. Playbook Syntax Primitives
```yaml
# Loops & Conditionals
- name: Configure local users
  user:
    name: "{{ item.name }}"
    groups: "{{ item.groups }}"
    state: present
  loop:
    - { name: 'alice', groups: 'wheel' }
    - { name: 'bob', groups: 'developers' }
  when: ansible_facts['fqdn'] == "servera.example.com"
```

### 4. Template & Roles Usage
```yaml
# Renders Jinja2 template and triggers handler
- name: Template web config
  template:
    src: templates/httpd.conf.j2
    dest: /etc/httpd/conf/httpd.conf
  notify: restart-webservice

# Roles usage mapping
- name: Deploy DB
  hosts: dbservers
  roles:
    - name: mysql-role
```

---

## 🏆 Golden Rules for Passing EX294 (RHCE)

1. **Verify Your SSH Keys First:**
   Ansible relies on passwordless SSH. Make sure your user on the control node can SSH into all managed nodes and execute `sudo` commands without being prompted for a password.

2. **Never Hardcode Vault Passwords:**
   If the exam requests encrypting a variables file, use `ansible-vault`. Do not include the plaintext password anywhere in the playbooks. Run with `--ask-vault-pass` or target a password file.

3. **Verify YAML Syntax Frequently:**
   Use YAML linting commands or syntax checks before executing:
   `ansible-playbook --syntax-check playbook.yml`

4. **Ensure Handlers carry correct Notify names:**
   Notify triggers map to handlers using string matching. If you have a typo in the trigger name or handler name, the handler will not run and you will lose points.

---

## 📝 EX294 Mock Practice Exam

Complete the following tasks in under **4 hours**.

### Task 1: Control Node Setup
1. Create a directory `/home/ansible/playbooks/` as your project root.
2. Create an `ansible.cfg` that targets an inventory file named `hosts` in the same directory.
3. Configure the config file to use user `devops` for SSH, and enable passwordless privilege escalation to `root`.

### Task 2: Inventory Mapping
1. Configure `/home/ansible/playbooks/hosts` to contain:
   - Group `webservers` with hosts `node1.lab.example.com` and `node2.lab.example.com`.
   - Group `dbservers` with host `node3.lab.example.com`.
   - Group `production` nesting both `webservers` and `dbservers` as children.

### Task 3: Package & Service Playbook
1. Write a playbook `/home/ansible/playbooks/packages.yml` that installs `httpd` on `webservers` and `mariadb-server` on `dbservers`.
2. Ensure both services are started and enabled on boot.

### Task 4: Template Host Configuration
1. Create a Jinja2 template named `/home/ansible/playbooks/templates/motd.j2` that displays:
   - Host's FQDN: `{{ ansible_facts['fqdn'] }}`
   - Total Memory: `{{ ansible_facts['memtotal_mb'] }} MB`
2. Write a playbook `motd.yml` that renders this template into `/etc/motd` on all hosts.

### Task 5: Security Vault Configuration
1. Create an encrypted variables file named `/home/ansible/playbooks/vault.yml` using the password `vaultpass`.
2. Inside, define the variable `db_password: redhat_db_secret`.
3. Write a playbook `database.yml` that reads `vault.yml` and prints the database password using the `debug` module.

### Task 6: Reusable Role Integration
1. Create a role named `web-config` inside `/home/ansible/playbooks/roles/`.
2. The role must:
   - Copy a local file `index.html` to `/var/www/html/index.html`.
   - Trigger a handler to restart the `httpd` service when the file is copied.
3. Write a playbook `deploy-web.yml` that executes the `web-config` role on all `webservers`.

---

## Related Notes
- [[RH294-Ansible-Automation]] — Course companion
- [[Playbooks-and-Roles]] — Playbook structural guides
- [[Ansible-Automation-Path]] — Learning path MOC
