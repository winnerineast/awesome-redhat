---
tags: [rhel, security]
status: stub
created: 2025-07-08
---
# SELinux
> Security-Enhanced Linux — Mandatory Access Control for RHEL.

## Modes
- **Enforcing** — Policies enforced, violations denied and logged
- **Permissive** — Policies not enforced, violations logged only
- **Disabled** — SELinux completely disabled

## Key Commands
```bash
getenforce / setenforce 0|1
sestatus
ls -Z             # View file contexts
ps -Z             # View process contexts
chcon              # Change context (temporary)
restorecon -Rv     # Restore default contexts
semanage           # Manage policies
setsebool -P       # Set booleans persistently
audit2allow        # Generate policy from denials
```

## Common Issues
- File context mismatch after `cp` (use `restorecon`)
- Port context issues (use `semanage port`)
- Boolean flags for specific services

## Related Notes
- [[System-Administration]], [[Firewall-and-Security]]
