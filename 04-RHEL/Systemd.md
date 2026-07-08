---
tags: [rhel]
status: stub
created: 2025-07-08
---
# Systemd
> Init system and service manager for RHEL 7+.

## Key Commands
```bash
systemctl start/stop/restart/status <service>
systemctl enable/disable <service>
systemctl list-units --type=service
systemctl list-unit-files
journalctl -u <service>   # Service logs
```

## Targets (Runlevels)
| Target | Purpose |
|---|---|
| multi-user.target | Non-graphical multi-user |
| graphical.target | Graphical desktop |
| rescue.target | Single-user rescue |
| emergency.target | Emergency shell |

## Related Notes
- [[System-Administration]], [[Package-Management-DNF-RPM]]
