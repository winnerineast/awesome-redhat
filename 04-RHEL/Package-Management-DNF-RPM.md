---
tags: [rhel]
status: stub
created: 2025-07-08
---
# Package Management — DNF & RPM
> Managing software packages on RHEL.

## DNF (Dandified YUM)
```bash
dnf install <package>
dnf remove <package>
dnf update
dnf search <keyword>
dnf info <package>
dnf module list          # AppStream modules
dnf module enable <mod>
```

## RPM
```bash
rpm -ivh <package.rpm>   # Install
rpm -qa                  # Query all installed
rpm -qf <file>           # Which package owns this file
```

## Repositories
- BaseOS — Core OS packages
- AppStream — Applications, languages, tools (modules/streams)

## Related Notes
- [[System-Administration]], [[Systemd]]
