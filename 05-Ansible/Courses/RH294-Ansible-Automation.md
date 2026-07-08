---
tags: [ansible, course, automation, intermediate]
course_code: RH294
course_title: "Red Hat System Administration III: Linux Automation with Ansible"
duration: "5 days"
format: "Classroom, Virtual, Self-paced"
cost: Subscription
prerequisites: "RHCSA (EX200) or equivalent experience"
certification_prep: EX294
status: active
created: 2025-07-08
---

# 📗 RH294 — Red Hat System Administration III: Linux Automation with Ansible

> The core certification preparation course for the Red Hat Certified Engineer (RHCE) exam. Teaches how to install, configure, write, and execute Ansible playbooks to automate sysadmin tasks across multiple RHEL systems.

---

## Course Overview

| | |
|---|---|
| **Code** | RH294 |
| **Duration** | 5 days (40 hours) |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | [[EX200-RHCSA]] or equivalent Linux administration skills |
| **Next Step** | [[DO447-Advanced-Ansible]] |
| **Certification** | Maps directly to [[EX294-Ansible]] (RHCE) |
| **Learning Path** | [[Ansible-Automation-Path]] |

## Learning Objectives

After completing this course, you will be able to:
1. Install and configure Ansible on a control node.
2. Build static host inventories and verify connectivity using ad-hoc modules.
3. Write clean, structured Ansible Playbooks in YAML.
4. Manage playbook execution using variables, facts, registers, conditionals, and loops.
5. Create and implement handlers to trigger tasks based on change events.
6. Create reusable automation using Ansible Roles and templates (Jinja2).
7. Encrypt sensitive variables and data files using Ansible Vault.

---

## Module 1: Configuration & Ad-Hoc Basics

### Ansible Architecture
Ansible is **agentless**. It only needs to be installed on a single **Control Node**. It uses standard SSH connections to push and execute temporary Python modules on target **Managed Nodes**.

```
  Control Node (Ansible CLI)
       │
       ├───── SSH (Ping / Yum / Copy) ────▶ Managed Node A (RHEL)
       └───── SSH (Ping / Yum / Copy) ────▶ Managed Node B (RHEL)
```

### Configuration Files

Ansible checks config files in the following priority order:
1. `ANSIBLE_CONFIG` (Environment Variable, highest priority)
2. `ansible.cfg` (Current working directory)
3. `~/.ansible.cfg` (User home directory)
4. `/etc/ansible/ansible.cfg` (System-wide default, lowest priority)

**Typical local `ansible.cfg` configuration:**
```ini
[defaults]
inventory = ./inventory
remote_user = devops
ask_pass = false

[privilege_escalation]
become = true
become_method = sudo
become_user = root
become_ask_pass = false
```

### Static Inventory Structure

Inventories list the targets to be managed.

```ini
# ./inventory
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com

# Nested Groups (Children)
[production:children]
webservers
dbservers

# Group Variables
[webservers:vars]
http_port = 8080
```

### Ad-Hoc Commands

Ad-hoc commands are quick, single-task executions without a playbook.

```bash
# Verify connectivity to all hosts
ansible all -m ping

# Install a package on webservers
ansible webservers -m yum -a "name=httpd state=present"

# Copy a local file to managed hosts
ansible dbservers -m copy -a "src=/tmp/db.conf dest=/etc/db.conf"

# Query system facts from managed hosts
ansible webservers -m setup -a "filter=ansible_mounts"
```

---

## Module 2: Playbook Design & Language Basics

Playbooks are written in YAML and contain one or more **Plays**.

### Playbook Syntax Blueprint

```yaml
---
- name: Configure Webservers and Databases
  hosts: webservers,dbservers
  vars:
    web_pkg: httpd
  tasks:
  - name: Install packages on target hosts
    yum:
      name: "{{ web_pkg }}"
      state: present

  - name: Enable webserver service
    service:
      name: "{{ web_pkg }}"
      state: started
      enabled: yes
```

### Core Logic elements: Variables, Conditionals, and Loops

```yaml
# 1. Variables and Registers
  vars:
    log_path: /var/log/audit.log
  tasks:
  - name: Run command and capture output
    command: hostname -s
    register: hostname_out # Save output structure to variable

  - name: Display output
    debug:
      msg: "System shortname is {{ hostname_out.stdout }}"

# 2. Loops (loop / with_items)
  - name: Create multiple local users
    user:
      name: "{{ item }}"
      state: present
    loop:
      - alice
      - bob
      - charlie

# 3. Conditionals (when)
  - name: Run only on RHEL machines
    command: echo "Running on Red Hat!"
    when: ansible_facts['os_family'] == "RedHat"
```

### Handlers

Handlers are tasks that run at the end of a play, only when triggered by another task reporting a change.

```yaml
  tasks:
  - name: Copy Apache configuration file
    copy:
      src: httpd.conf
      dest: /etc/httpd/conf/httpd.conf
    notify: Restart Apache # Calls the handler by name

  handlers:
  - name: Restart Apache
    service:
      name: httpd
      state: restarted
```

---

## Module 3: Reusable Content: Jinja2 & Roles

### Jinja2 Templates

Templates allow dynamic file generation using Jinja2 syntax:
- `{{ var_name }}` — Evaluate variable
- `{% if condition %}` ... `{% endif %}` — Conditional block
- `{% for item in list %}` ... `{% endfor %}` — Loop block

```html
<!-- index.html.j2 template -->
Welcome to {{ ansible_facts['fqdn'] }}!
This node has {{ ansible_facts['processor_vcpus'] }} CPU cores.
```

```yaml
# Task to render template:
- name: Render web template
  template:
    src: index.html.j2
    dest: /var/www/html/index.html
```

### Ansible Roles

Roles organize tasks, variables, files, templates, and handlers into a structured folder hierarchy.

```
my-role/
├── defaults/       # Default variables (lowest precedence)
│   └── main.yml
├── vars/           # Role variables (high precedence)
│   └── main.yml
├── tasks/          # List of tasks
│   └── main.yml
├── handlers/       # List of handlers
│   └── main.yml
├── templates/      # Jinja2 templates (.j2)
├── files/          # Files to be copied (via copy module)
└── meta/           # Metadata (dependencies, author)
    └── main.yml
```

```yaml
# Importing a Role into a Playbook:
- name: Deploy application stack
  hosts: webservers
  roles:
    - my-role
```

---

## Module 4: Secrets Management (Ansible Vault)

Ansible Vault encrypts sensitive parameters, files, or entire playbooks.

```bash
# Create encrypted file
ansible-vault create secret.yml

# Edit existing encrypted file
ansible-vault edit secret.yml

# Encrypt an existing file
ansible-vault encrypt plain.yml

# Decrypt an encrypted file
ansible-vault decrypt secret.yml

# View file without decrypting it
ansible-vault view secret.yml

# Run a playbook with a vault password prompt
ansible-playbook -i inventory playbook.yml --ask-vault-pass

# Run a playbook with a vault password file
ansible-playbook -i inventory playbook.yml --vault-password-file ~/.vault_pass.txt
```

---

## Related Notes
- [[Ansible-Basics]] — Basic reference
- [[Playbooks-and-Roles]] — Design guidelines
- [[EX294-Ansible]] — Exam study guide
- [[Ansible-Automation-Path]] — MOC
