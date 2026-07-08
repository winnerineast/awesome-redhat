---
tags: [certification, rhel, rhcsa, ex200]
status: active
created: 2025-07-08
---

# 🎯 EX200 — Red Hat Certified System Administrator (RHCSA)

> The foundation certification for Red Hat technologies. This guide contains exam information, a comprehensive command cheat sheet, golden rules for passing, and a full mock practice lab.

---

## Exam Overview

| | |
|---|---|
| **Code** | EX200 |
| **Duration** | 3 hours (180 minutes) |
| **Format** | 100% Performance-based (hands-on) on live RHEL systems |
| **Passing Score** | 210 / 300 (70%) |
| **Prerequisites** | None |
| **Prep Courses** | [[RH124-System-Administration-I]] + [[RH134-System-Administration-II]] or [[RH199-RHCSA-Rapid-Track]] |
| **Learning Path** | [[RHEL-SysAdmin-Path]] |

---

## ⚡ RHCSA Exam Quick-Reference Cheat Sheet

These commands represent the absolute essentials that you must memorize and be able to type flawlessly.

### 1. Basic Operations & Scripting
```bash
# Locate files by user and size
find / -user alice -size +10M 2>/dev/null

# Archive a folder
tar -czf /backup/archive.tar.gz /etc/httpd

# Simple scripting template
cat > /usr/local/bin/myscript.sh << 'EOF'
#!/bin/bash
if [[ -f /etc/hosts ]]; then
    grep -i "localhost" /etc/hosts
fi
EOF
chmod +x /usr/local/bin/myscript.sh
```

### 2. Users, Groups & Permissions
```bash
# Create user with specific UID, shell, and supplementary groups
useradd -u 2000 -s /bin/bash -G wheel,devs bob

# Lock/Unlock user
usermod -L bob
usermod -U bob

# Configure SGID on a directory (group inheritance)
chgrp devs /shared/docs
chmod g+s /shared/docs

# Configure Collaborative Directory (SGID + Sticky Bit + Full permissions)
chmod 2777 /shared/collab

# Set specific user ACL
setfacl -m u:bob:rw /shared/file.txt
getfacl /shared/file.txt
```

### 3. Networking & Firewall
```bash
# Configure static IPv4
nmcli connection modify "System eth0" ipv4.addresses 192.168.4.100/24 ipv4.gateway 192.168.4.1 ipv4.dns "8.8.8.8" ipv4.method manual
nmcli connection up "System eth0"

# Open services in firewalld
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-port=82/tcp
firewall-cmd --reload
```

### 4. Storage & LVM
```bash
# Partitioning disk
parted /dev/sdb mklabel gpt
parted /dev/sdb mkpart primary xfs 1MiB 2GiB

# LVM Setup
pvcreate /dev/sdb1
vgcreate vg_data /dev/sdb1
lvcreate -n lv_app -L 1.5G vg_data
mkfs.xfs /dev/vg_data/lv_app

# Online LV Expansion (XFS)
lvextend -L +500M -r /dev/vg_data/lv_app

# Persistent fstab entry
# Run blkid to get UUID
UUID=xxxx-xxxx  /mnt/app  xfs  defaults  0 0
```

### 5. SELinux
```bash
# Temporary modes
setenforce 1  # Enforcing
setenforce 0  # Permissive

# Set file context persistently
semanage fcontext -a -t httpd_sys_content_t "/custom/web(/.*)?"
restorecon -Rv /custom/web/

# Manage booleans
setsebool -P httpd_enable_homedirs on
```

### 6. Rootless Podman Containers
```bash
# Run container with ports and volumes
podman run -d --name myweb -p 8080:8080 -v /opt/data:/var/www/html:Z registry.access.redhat.com/ubi9/httpd-24

# Create systemd user files (Run as the normal user)
mkdir -p ~/.config/systemd/user
cd ~/.config/systemd/user
podman generate systemd --name myweb --new --files

# Enable auto-start for user container
systemctl --user daemon-reload
systemctl --user enable --now container-myweb.service
loginctl enable-linger $USER
```

---

## 🏆 The 5 Golden Rules of the RHCSA Exam

1. **Verify Boot Persistency!**
   Red Hat exams grade you *after* a cold reboot of the grading environment. If your system fails to boot or a configuration (networking, storage, containers) does not persist after reboot, you will receive **0 points** for that task.
   > [!CRITICAL]
   > Run `mount -a` to verify `/etc/fstab` entries before rebooting. If there is a typo, the system will drop to emergency mode, and you may fail the entire exam.
   
2. **Double-Check SELinux Contexts.**
   If you configure a service (such as Apache) or copy files to a custom path, always verify SELinux. Use `restorecon -Rv` to ensure correct types.

3. **Enable Lingering for Rootless Containers.**
   For user-run containers, systemd user services will terminate when the user logs out unless lingering is enabled: `loginctl enable-linger <username>`.

4. **Never Disable the Firewall or SELinux.**
   You will lose points if you disable security modules instead of configuring them correctly. Keep SELinux in `enforcing` mode and open required ports in `firewalld`.

5. **Read the Whole Exam First.**
   Some questions depend on previous steps (e.g., configuring networks, resetting root passwords). Read everything to identify dependencies and plan your time.

---

## 📝 RHCSA Mock Practice Exam

Use a virtual machine (or two virtual machines) running a clean installation of RHEL 9 to practice this exam. Set a timer for **3 hours**.

### System Info for Lab
- Workstation IP: `192.168.4.250`
- Target VM name: `servera`
- Secondary VM name: `serverb`
- Unallocated disk on `servera`: `/dev/sdb` (20 GB)

---

### Task 1: System Recovery
1. The root password for `servera` is lost. Reset the root password of `servera` to `redhat123`.

### Task 2: Network & Hostname Configuration
1. Set the hostname of `servera` to `servera.lab.example.com`.
2. Configure `servera` with the static IP address `192.168.4.10/24`, default gateway `192.168.4.1`, and primary DNS server `192.168.4.250`.
3. Ensure these settings are persistent after boot.

### Task 3: Local User and Group Administration
1. Create a group named `sysops`.
2. Create a user named `natasha` belonging to `sysops` as a secondary group.
3. Create a user named `harry` who does not have access to an interactive shell (set shell to `/sbin/nologin`).
4. Set the password for both users to `redhat123`.

### Task 4: Collaborative Directory & ACLs
1. Create a directory `/common/sysops_data`.
2. Change the group ownership of `/common/sysops_data` to `sysops`.
3. Set permissions so that members of the `sysops` group can read, write, and execute files within it, but no other users (except root) have any access.
4. Ensure any new files created in `/common/sysops_data` automatically inherit the group ownership of `sysops`.
5. Set an Access Control List (ACL) on the file `/common/sysops_data/audit.txt` allowing user `harry` read and write permissions, even though he is not a member of the group.

### Task 5: Automation Scripting
1. Create a script named `/usr/local/bin/user_check.sh`.
2. The script must accept a single argument (a username).
3. If the user exists in `/etc/passwd`, the script should output "User <username> exists" and return exit code `0`.
4. If the user does not exist, the script should output "User <username> not found" and return exit code `1`.
5. Make sure the script is executable.

### Task 6: Cron Task Scheduling
1. Configure a cron job for the user `natasha` that runs the script `/usr/local/bin/user_check.sh root` every day at `14:23`.

### Task 7: Firewall and Port Services
1. Configure the firewall on `servera` to allow incoming traffic for the `http` service permanently.
2. Allow incoming traffic on port `8080/tcp` permanently.
3. Deny all other unneeded ports.

### Task 8: Storage and Logical Volume Management (LVM)
1. Create a new partition on `/dev/sdb` with a size of `5 GB`.
2. Create a Volume Group named `vg_exam` using this partition.
3. Create a Logical Volume named `lv_reports` in `vg_exam` with a size of `2 GB`.
4. Format the logical volume with the `ext4` filesystem.
5. Configure the logical volume to mount persistently at `/reports` during boot.

### Task 9: Resize Logical Volume
1. Extend the logical volume `/dev/vg_exam/lv_reports` and its filesystem online so that its total capacity becomes `3.5 GB`. Do not lose any existing data.

### Task 10: Auto-mount Network Share (Autofs)
1. Configure autofs to mount the NFS export `192.168.4.250:/shares/public` dynamically.
2. The mount point should be `/shares/public`.
3. Accessing the directory should trigger the mounting process automatically.

### Task 11: SELinux Web Directory Context
1. Create a directory `/custom_web`.
2. Create an `index.html` file inside with the text "Welcome to RHEL".
3. Configure the local webserver (Apache `httpd`) to serve content from `/custom_web` instead of the default `/var/www/html`.
4. Ensure the SELinux contexts are configured correctly so that Apache is allowed to read files within `/custom_web` persistently.

### Task 12: Rootless Container Setup
1. Configure a rootless container for the user `natasha`.
2. Pull the image `registry.access.redhat.com/ubi9/httpd-24`.
3. Run the container with the name `webserver`, mapping host port `8085` to container port `8080`.
4. Mount a host directory `/home/natasha/web_data` (with correct SELinux context tags) to `/var/www/html` inside the container.
5. Configure systemd for `natasha` so that this container starts automatically when the system boots, even if `natasha` is not logged in.

---

## Related Notes

- [[RH124-System-Administration-I]] — Basic utilities, service management, networks, logs, and software
- [[RH134-System-Administration-II]] — Scripting, scheduling, SELinux, storage layout, network mounts, firewalls, and containers
- [[RHEL-SysAdmin-Path]] — Study tracks overview
