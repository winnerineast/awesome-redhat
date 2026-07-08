---
tags: [ansible]
status: stub
created: 2025-07-08
---
# Playbooks and Roles
> Structured, reusable automation content.

## Playbook Structure
```yaml
---
- name: Configure web servers
  hosts: webservers
  become: yes
  vars:
    http_port: 80
  tasks:
    - name: Install httpd
      ansible.builtin.yum:
        name: httpd
        state: present
    - name: Start httpd
      ansible.builtin.service:
        name: httpd
        state: started
        enabled: yes
  handlers:
    - name: Restart httpd
      ansible.builtin.service:
        name: httpd
        state: restarted
```

## Roles
- Standardized directory structure for reusable automation
- `defaults/`, `tasks/`, `handlers/`, `templates/`, `files/`, `vars/`, `meta/`

## Related Notes
- [[Ansible-Basics]], [[Ansible-Automation-Platform]]
