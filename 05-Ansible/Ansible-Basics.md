---
tags: [ansible]
status: stub
created: 2025-07-08
---
# Ansible Basics
> Agentless automation using YAML playbooks over SSH.

## Key Concepts
- **Inventory** — Hosts and groups to manage
- **Module** — Unit of work (command, copy, yum, service, etc.)
- **Task** — Single module invocation
- **Play** — Maps hosts to tasks
- **Playbook** — YAML file containing one or more plays
- **Facts** — Auto-discovered system information

## Ad-hoc Commands
```bash
ansible all -m ping
ansible webservers -m yum -a "name=httpd state=present"
ansible dbservers -m service -a "name=mariadb state=started"
```

## Related Notes
- [[Playbooks-and-Roles]], [[Ansible-Automation-Platform]]
