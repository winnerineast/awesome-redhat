---
tags: [rhel, security]
status: stub
created: 2025-07-08
---
# Firewall and Security
> Host-level security on RHEL.

## firewalld
```bash
firewall-cmd --list-all
firewall-cmd --add-service=http --permanent
firewall-cmd --add-port=8080/tcp --permanent
firewall-cmd --reload
```

## Crypto Policies
- System-wide TLS/SSL/SSH policies
- `update-crypto-policies --set FUTURE`

## Related Notes
- [[SELinux]], [[System-Administration]]
