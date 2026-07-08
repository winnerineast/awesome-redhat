---
tags: [rhel, course, free, beginner]
course_code: RH066
course_title: "Fundamentals of Red Hat Enterprise Linux"
duration: "~10 hours"
format: Self-paced online
cost: Free
prerequisites: None
status: active
created: 2025-07-08
---

# 🆓 RH066 — Fundamentals of Red Hat Enterprise Linux

> A free, self-paced introduction to Linux for IT professionals. Covers essential skills needed before starting RH124 and the RHCSA path.

---

## Course Overview

| | |
|---|---|
| **Code** | RH066 |
| **Duration** | ~10 hours |
| **Format** | Self-paced video + hands-on |
| **Cost** | Free |
| **Prerequisites** | None |
| **Next Step** | [[RH124-System-Administration-I]] |
| **Learning Path** | [[RHEL-SysAdmin-Path]] |

## Learning Objectives

After completing this course, you will be able to:
1. Explain what Linux and open source software are
2. Navigate the Linux file system from the command line
3. Create, move, copy, and remove files and directories
4. Use basic text processing commands
5. Manage users and file permissions
6. Understand processes and services
7. Configure basic networking
8. Install and update software packages

---

## Module 1: What Is Linux?

### Key Concepts

- **Linux** is an open-source operating system kernel, originally created by Linus Torvalds in 1991
- **GNU/Linux** — the full OS combining the Linux kernel with GNU userland tools
- **Distribution** — a packaged version of Linux (RHEL, Fedora, CentOS Stream, Ubuntu, etc.)
- **Red Hat Enterprise Linux (RHEL)** — a commercially supported, enterprise-grade Linux distribution
  - Lifecycle: 10+ years of support per major version
  - Current major version: RHEL 9 (based on Fedora 34, kernel 5.14+)
  - Release model: Major releases every ~3 years; minor updates every ~6 months

### RHEL vs Other Distributions

| Feature | RHEL | Fedora | CentOS Stream |
|---|---|---|---|
| **Purpose** | Enterprise production | Cutting-edge desktop/dev | RHEL development preview |
| **Release cycle** | ~3 years (major) | ~6 months | Rolling |
| **Support** | 10+ years | ~13 months | Until next RHEL release |
| **Cost** | Subscription | Free | Free |
| **Package manager** | DNF (RPM) | DNF (RPM) | DNF (RPM) |

### Open Source Licensing Basics

- **GPL (GNU General Public License)** — copyleft; derivative works must also be open source
- **Apache License** — permissive; allows proprietary derivative works
- **MIT License** — minimal restrictions
- Red Hat's business model: the software is open source; you pay for **support, certification, and updates**

> [!TIP]
> RHEL is free for individual developers via the [Red Hat Developer Subscription](https://developers.redhat.com/register). Up to 16 systems at no cost.

---

## Module 2: The Linux File System

### The Filesystem Hierarchy Standard (FHS)

```
/                   Root of the entire filesystem
├── /bin            Essential user binaries (ls, cp, cat) — symlink to /usr/bin on RHEL 9
├── /boot           Kernel and bootloader files (vmlinuz, initramfs, grub2)
├── /dev            Device files (block devices, character devices)
├── /etc            System-wide configuration files
├── /home           User home directories (/home/username)
├── /lib            Essential shared libraries — symlink to /usr/lib
├── /media          Mount point for removable media (USB, DVD)
├── /mnt            Temporary mount point for manual mounts
├── /opt            Third-party / optional software
├── /proc           Virtual filesystem — kernel and process info (procfs)
├── /root           Root user's home directory
├── /run            Runtime variable data (PID files, sockets)
├── /sbin           System binaries (fdisk, iptables) — symlink to /usr/sbin
├── /srv            Data for services (web, FTP)
├── /sys            Virtual filesystem — kernel objects (sysfs)
├── /tmp            Temporary files (cleared on reboot)
├── /usr            Secondary hierarchy — most user-space programs
│   ├── /usr/bin    User commands
│   ├── /usr/lib    Libraries
│   ├── /usr/local  Locally installed software
│   └── /usr/share  Architecture-independent data (man pages, docs)
└── /var            Variable data
    ├── /var/log    Log files
    ├── /var/tmp    Temporary files (persist across reboots)
    └── /var/spool  Queues (print, mail)
```

### Path Types

- **Absolute path** — starts from `/` root: `/home/student/Documents/report.txt`
- **Relative path** — starts from current directory: `Documents/report.txt`
- `.` — current directory
- `..` — parent directory
- `~` — home directory of current user (`/home/username`)
- `~root` — home directory of root user (`/root`)

### Navigation Commands

```bash
pwd                       # Print Working Directory — where am I?
cd /etc                   # Change to /etc (absolute)
cd Documents              # Change to Documents (relative)
cd ..                     # Go up one level
cd ~                      # Go to home directory
cd -                      # Go to previous directory

ls                        # List files in current directory
ls -l                     # Long format (permissions, owner, size, date)
ls -la                    # Include hidden files (dotfiles)
ls -lh                    # Human-readable file sizes
ls -lR /etc               # Recursive listing of /etc
ls -lt                    # Sort by modification time (newest first)

tree                      # Visual directory tree (install: dnf install tree)
tree -L 2 /var            # Tree with max depth of 2
```

### Practice Exercise 1: Filesystem Navigation

```bash
# 1. Find out where you are
pwd

# 2. Go to the root directory and explore
cd /
ls -l

# 3. Explore the /etc directory
cd /etc
ls | head -20

# 4. Return home using three different methods
cd ~          # Method 1: tilde
cd            # Method 2: bare cd (defaults to home)
cd $HOME      # Method 3: environment variable

# 5. Navigate using relative paths
cd /var/log
cd ../../etc    # Goes to /etc (up two levels, then into etc)
pwd             # Should show /etc
```

---

## Module 3: Working with Files and Directories

### Creating Files and Directories

```bash
# Create files
touch newfile.txt              # Create empty file (or update timestamp)
touch file1.txt file2.txt      # Create multiple files

# Create directories
mkdir projects                 # Create single directory
mkdir -p a/b/c/d               # Create nested directories (-p = parents)
mkdir -v backups               # Verbose — show what was created

# Create a file with content
echo "Hello RHEL" > greeting.txt         # Write (overwrites)
echo "Another line" >> greeting.txt      # Append
cat > notes.txt << EOF                   # Here-document (multi-line)
Line 1
Line 2
EOF
```

### Copying, Moving, and Removing

```bash
# Copy
cp source.txt dest.txt            # Copy file
cp -r dir1/ dir2/                 # Copy directory recursively
cp -a dir1/ dir2/                 # Archive mode (preserves permissions, timestamps)
cp -i file1 file2                 # Interactive — prompt before overwrite
cp -v file1 /tmp/                 # Verbose — show what's happening

# Move / Rename
mv oldname.txt newname.txt        # Rename file
mv file.txt /tmp/                 # Move file to /tmp
mv -i file1 file2                 # Interactive

# Remove
rm file.txt                       # Remove file
rm -r directory/                  # Remove directory recursively
rm -ri directory/                 # Interactive recursive — safest
rm -f file.txt                    # Force (no prompt, no error if missing)

# WARNING: rm -rf / would destroy your entire system. Always double-check!
```

### Viewing File Contents

```bash
cat file.txt                  # Print entire file
cat -n file.txt               # With line numbers
tac file.txt                  # Print in reverse (last line first)

less file.txt                 # Page through file (q to quit)
                              # / to search forward, ? to search backward
                              # n/N for next/previous match

head file.txt                 # First 10 lines
head -20 file.txt             # First 20 lines
tail file.txt                 # Last 10 lines
tail -f /var/log/messages     # Follow — live updates (Ctrl+C to stop)

wc file.txt                   # Word count: lines, words, bytes
wc -l file.txt                # Line count only
```

### Finding Files

```bash
# find — search by attributes
find /home -name "*.txt"                 # Find by name pattern
find /var -type f -size +10M             # Files larger than 10 MB
find /etc -type f -mtime -7             # Files modified in last 7 days
find /tmp -type f -name "*.log" -delete  # Find and delete

# locate — fast search using database (needs mlocate package)
dnf install mlocate
updatedb                                 # Update the database
locate httpd.conf                        # Instant search

# which / whereis — find executables
which python3                            # Full path to executable
whereis ls                               # Binary, source, and man page locations
```

### Practice Exercise 2: File Operations

```bash
# 1. Create a project structure
mkdir -p ~/rhel-lab/{scripts,configs,logs}

# 2. Create some files
touch ~/rhel-lab/scripts/deploy.sh
echo "server=192.168.1.1" > ~/rhel-lab/configs/app.conf
echo "Started at $(date)" > ~/rhel-lab/logs/app.log

# 3. Copy the project as a backup
cp -a ~/rhel-lab ~/rhel-lab-backup

# 4. Move a file between directories
mv ~/rhel-lab/scripts/deploy.sh ~/rhel-lab/configs/

# 5. Find all .conf files in your project
find ~/rhel-lab -name "*.conf"

# 6. Verify the backup
diff -r ~/rhel-lab ~/rhel-lab-backup

# 7. Clean up
rm -r ~/rhel-lab-backup
```

---

## Module 4: Getting Help

### The man Pages

```bash
man ls                    # Manual page for ls
man 5 passwd              # Section 5 (file formats) for passwd
man -k "disk usage"       # Search man pages by keyword (same as apropos)
```

**Man page sections:**

| Section | Content |
|---|---|
| 1 | User commands |
| 2 | System calls |
| 3 | Library functions |
| 4 | Special files (/dev) |
| 5 | File formats (/etc/passwd) |
| 7 | Miscellaneous (conventions, protocols) |
| 8 | System administration commands |

### Other Help Resources

```bash
info coreutils            # GNU info pages (more detailed than man)
<command> --help           # Quick usage summary
pinfo ls                  # Prettier info viewer (if installed)

# Red Hat-specific documentation
/usr/share/doc/           # Installed package documentation
```

> [!TIP]
> When you're stuck, the order to try is: `--help` → `man` → `/usr/share/doc/` → Red Hat documentation portal.

---

## Module 5: Text Processing

### Essential Text Tools

```bash
# grep — search text with patterns
grep "error" /var/log/messages              # Find lines containing "error"
grep -i "error" /var/log/messages           # Case-insensitive
grep -r "TODO" ~/projects/                  # Recursive search
grep -c "error" logfile.txt                 # Count matching lines
grep -v "comment" config.txt               # Invert match (exclude lines)
grep -n "pattern" file.txt                 # Show line numbers

# cut — extract columns
cut -d: -f1 /etc/passwd                     # Get usernames (field 1, delimiter :)
cut -d: -f1,3 /etc/passwd                   # Get username and UID

# sort and uniq
sort file.txt                               # Sort alphabetically
sort -n numbers.txt                         # Sort numerically
sort -r file.txt                            # Reverse sort
sort file.txt | uniq                        # Remove duplicates
sort file.txt | uniq -c                     # Count occurrences

# tr — translate/delete characters
echo "hello" | tr 'a-z' 'A-Z'              # Convert to uppercase → HELLO
echo "hello   world" | tr -s ' '           # Squeeze repeated spaces

# sed — stream editor (basic usage)
sed 's/old/new/' file.txt                   # Replace first occurrence per line
sed 's/old/new/g' file.txt                  # Replace all occurrences
sed -i 's/old/new/g' file.txt              # Edit file in-place

# awk — pattern scanning (basic usage)
awk '{print $1}' file.txt                   # Print first column
awk -F: '{print $1, $3}' /etc/passwd        # Print username and UID
```

### I/O Redirection and Pipes

```bash
# Redirection
command > file.txt          # Redirect stdout (overwrite)
command >> file.txt         # Redirect stdout (append)
command 2> errors.txt       # Redirect stderr
command > output.txt 2>&1   # Redirect both stdout and stderr
command &> all.txt          # Shorthand for above (bash)

# Pipes — connect output of one command to input of another
ls -l | grep ".conf"                  # List only .conf files
cat /etc/passwd | cut -d: -f1 | sort  # List usernames sorted
df -h | grep "/$"                     # Show root filesystem usage

# tee — write to file AND stdout simultaneously
ls -l | tee listing.txt               # Display and save to file
ls -l | tee -a listing.txt            # Append instead of overwrite
```

### Practice Exercise 3: Text Processing

```bash
# 1. Count how many users exist on the system
wc -l /etc/passwd

# 2. List all usernames, sorted
cut -d: -f1 /etc/passwd | sort

# 3. Find users with bash as their shell
grep "/bin/bash" /etc/passwd

# 4. Extract and sort unique shells in use
cut -d: -f7 /etc/passwd | sort | uniq -c | sort -rn

# 5. Search for failed login attempts
grep -i "failed" /var/log/secure 2>/dev/null || echo "Check /var/log/secure with sudo"

# 6. Build a pipeline: find the 5 largest files in /etc
find /etc -type f -exec ls -s {} + 2>/dev/null | sort -rn | head -5
```

---

## Module 6: Users and Permissions

### User Concepts

- **root** (UID 0) — the superuser; can do anything
- **System users** (UID 1-999) — service accounts (apache, nobody)
- **Regular users** (UID 1000+) — human users

### Key Files

| File | Purpose |
|---|---|
| `/etc/passwd` | User account info (username:x:UID:GID:comment:home:shell) |
| `/etc/shadow` | Encrypted passwords and aging info (root-readable only) |
| `/etc/group` | Group definitions (groupname:x:GID:members) |
| `/etc/gshadow` | Group passwords (rarely used) |

```bash
# Inspect user info
id                        # Current user's UID, GID, groups
id student                # Info for user "student"
whoami                    # Current username
who                       # Who is logged in
w                         # Who is logged in + what they're doing
last                      # Login history
```

### File Permissions

```
-rwxr-xr-- 1 root admin 4096 Jul  8 10:00 script.sh
│└┬┘└┬┘└┬┘   │    │
│ │   │   │   │    └── Group owner
│ │   │   │   └─────── File owner
│ │   │   └─────────── Others (everyone else): r-- = read only
│ │   └─────────────── Group: r-x = read + execute
│ └─────────────────── Owner: rwx = read + write + execute
└───────────────────── File type: - = regular file, d = directory, l = symlink
```

**Permission values:**

| Permission | Letter | Numeric | On files | On directories |
|---|---|---|---|---|
| Read | r | 4 | View contents | List contents (ls) |
| Write | w | 2 | Modify contents | Create/delete files |
| Execute | x | 1 | Run as program | Enter directory (cd) |

### Changing Permissions

```bash
# chmod — change permissions
chmod 755 script.sh           # rwxr-xr-x (common for scripts)
chmod 644 config.txt          # rw-r--r-- (common for config files)
chmod u+x script.sh           # Add execute for owner
chmod g-w file.txt            # Remove write for group
chmod o= file.txt             # Remove all permissions for others
chmod -R 750 project/         # Recursive

# chown — change ownership
chown student file.txt        # Change owner
chown student:devops file.txt # Change owner and group
chown -R student:student ~/   # Recursive ownership change

# chgrp — change group
chgrp devops project/         # Change group only
```

### Using sudo

```bash
sudo command                  # Run single command as root
sudo -i                       # Start a root shell (login shell)
sudo -u apache command        # Run command as another user
sudo visudo                   # Safely edit /etc/sudoers
```

> [!NOTE]
> On RHEL, the first user created during installation is typically added to the `wheel` group, which grants `sudo` access.

### Practice Exercise 4: Users and Permissions

```bash
# 1. Check your user info
id
groups

# 2. View the passwd file structure
head -5 /etc/passwd

# 3. Create a directory and test permissions
mkdir ~/permissions-lab
touch ~/permissions-lab/secret.txt
echo "classified" > ~/permissions-lab/secret.txt

# 4. Make the file readable only by the owner
chmod 600 ~/permissions-lab/secret.txt
ls -l ~/permissions-lab/secret.txt

# 5. Create a script and make it executable
echo '#!/bin/bash' > ~/permissions-lab/hello.sh
echo 'echo "Hello from $(whoami)"' >> ~/permissions-lab/hello.sh
chmod 755 ~/permissions-lab/hello.sh
~/permissions-lab/hello.sh

# 6. Clean up
rm -r ~/permissions-lab
```

---

## Module 7: Managing Software

### DNF Package Manager

```bash
# Search and info
dnf search httpd                  # Search for packages
dnf info httpd                    # Package details
dnf provides /etc/httpd           # Which package provides this file?
dnf list installed                # All installed packages
dnf list available                # All available packages

# Install and remove
sudo dnf install httpd            # Install a package
sudo dnf install httpd vim tree   # Install multiple packages
sudo dnf remove httpd             # Remove a package
sudo dnf reinstall httpd          # Reinstall

# Update
sudo dnf check-update             # Check for updates
sudo dnf update                   # Update all packages
sudo dnf update httpd             # Update specific package

# Groups
dnf group list                    # List package groups
sudo dnf group install "Server"   # Install a group
```

### Repositories

```bash
# List configured repositories
dnf repolist                      # Enabled repos
dnf repolist all                  # All repos (enabled + disabled)

# Repository configuration files
ls /etc/yum.repos.d/              # Repo config files

# Enable/disable repos
sudo dnf config-manager --enable <repo-id>
sudo dnf config-manager --disable <repo-id>
```

### RHEL Subscription

```bash
sudo subscription-manager register          # Register with Red Hat
sudo subscription-manager list --available  # List available subscriptions
sudo subscription-manager attach --auto     # Auto-attach subscription
sudo subscription-manager status            # Check subscription status
```

**See also:** [[Package-Management-DNF-RPM]] for a deeper reference on DNF, RPM, and AppStream modules.

---

## Module 8: Processes and Services

### Process Management

```bash
# Viewing processes
ps                           # Processes in current shell
ps aux                       # All processes, all users, full format
ps -ef                       # All processes (alternative format)
ps aux | grep httpd          # Find specific process

# Real-time monitoring
top                          # Dynamic process viewer
                             # Press: M = sort by memory, P = sort by CPU
                             # k = kill process, q = quit

# Controlling processes
command &                    # Run in background
jobs                         # List background jobs
fg %1                       # Bring job 1 to foreground
bg %1                       # Resume stopped job in background
Ctrl+Z                      # Suspend current foreground process
Ctrl+C                      # Terminate current foreground process

# Signals
kill PID                     # Send SIGTERM (graceful shutdown)
kill -9 PID                  # Send SIGKILL (force kill — use as last resort)
killall httpd                # Kill all processes by name
pkill -u student             # Kill all processes by user
```

### Systemd Services

```bash
# Managing services
sudo systemctl start httpd       # Start service
sudo systemctl stop httpd        # Stop service
sudo systemctl restart httpd     # Restart service
sudo systemctl reload httpd      # Reload config without restart
sudo systemctl enable httpd      # Start on boot
sudo systemctl disable httpd     # Don't start on boot
sudo systemctl enable --now httpd  # Enable AND start immediately

# Status and info
systemctl status httpd           # Service status (active/inactive, logs)
systemctl is-active httpd        # Just "active" or "inactive"
systemctl is-enabled httpd       # "enabled" or "disabled"
systemctl list-units --type=service  # List all services

# Targets (runlevels)
systemctl get-default            # Current default target
sudo systemctl set-default multi-user.target   # Text mode
sudo systemctl set-default graphical.target    # GUI mode
```

**See also:** [[Systemd]] for more on systemd unit files, timers, and targets.

---

## Module 9: Basic Networking

### Viewing Network Configuration

```bash
# IP addresses
ip addr show                     # Show all interfaces and IPs
ip -4 addr show                  # IPv4 only
ip addr show ens192              # Specific interface

# Routing
ip route show                    # Show routing table
ip route get 8.8.8.8             # Which route to reach an IP

# DNS
cat /etc/resolv.conf             # DNS servers
host redhat.com                  # DNS lookup
dig redhat.com                   # Detailed DNS lookup

# Connectivity testing
ping -c 3 8.8.8.8               # Ping 3 times
ping -c 3 redhat.com            # Test DNS + connectivity
traceroute redhat.com            # Trace network path
ss -tulnp                        # Show listening ports (replaces netstat)
```

### NetworkManager (nmcli)

```bash
# Connection management
nmcli device status                          # Show device states
nmcli connection show                        # Show all connections
nmcli connection show "Wired connection 1"   # Show connection details

# Modify connection
sudo nmcli connection modify "Wired connection 1" \
  ipv4.addresses 192.168.1.100/24 \
  ipv4.gateway 192.168.1.1 \
  ipv4.dns "8.8.8.8 8.8.4.4" \
  ipv4.method manual

# Activate changes
sudo nmcli connection up "Wired connection 1"

# Quick connection test
nmcli general status                         # Overall network status
```

### Key Configuration Files

| File | Purpose |
|---|---|
| `/etc/hostname` | System hostname |
| `/etc/hosts` | Local hostname resolution |
| `/etc/resolv.conf` | DNS resolver config (usually managed by NM) |
| `/etc/sysconfig/network-scripts/` | Legacy connection config (RHEL 8) |
| `/etc/NetworkManager/` | NetworkManager configuration |

### Practice Exercise 5: Networking

```bash
# 1. Check your IP address
ip addr show

# 2. Identify your default gateway
ip route show default

# 3. Test connectivity
ping -c 3 8.8.8.8          # Test internet
ping -c 3 redhat.com       # Test DNS

# 4. Check which ports are listening
ss -tulnp

# 5. Look up your hostname
hostname
hostnamectl
```

---

## Module 10: Using the Shell Effectively

### Shell Features

```bash
# Tab completion
sys<TAB>                        # Complete command
systemctl st<TAB><TAB>          # Show options (start, status, stop)

# Command history
history                         # Show command history
!100                            # Re-run command #100
!!                              # Re-run last command
!grep                           # Re-run last command starting with "grep"
Ctrl+R                          # Reverse search history (type to search)

# Aliases
alias ll='ls -la'               # Create shortcut (session only)
alias rm='rm -i'                # Make rm interactive by default
unalias rm                      # Remove alias

# Environment variables
echo $HOME                      # Print home directory
echo $PATH                      # Print executable search path
echo $USER                      # Current username
export MY_VAR="hello"           # Set variable for current session + children
env                             # Show all environment variables
```

### Shell Configuration Files

| File | When Loaded | Use For |
|---|---|---|
| `/etc/profile` | Login shell (all users) | System-wide PATH, env vars |
| `~/.bash_profile` | Login shell (per user) | User PATH, start `.bashrc` |
| `~/.bashrc` | Every interactive shell | Aliases, functions, prompt |
| `~/.bash_logout` | On logout | Cleanup tasks |

> [!TIP]
> Put aliases and custom prompt settings in `~/.bashrc`. Put PATH modifications in `~/.bash_profile`.

---

## Course Summary

| Module | Key Skills |
|---|---|
| 1. What Is Linux? | Linux concepts, RHEL positioning, open source |
| 2. File System | FHS, absolute/relative paths, navigation |
| 3. Files & Directories | Create, copy, move, remove, find |
| 4. Getting Help | man, info, --help |
| 5. Text Processing | grep, cut, sort, pipes, redirection |
| 6. Users & Permissions | chmod, chown, sudo, /etc/passwd |
| 7. Software Management | dnf, repos, subscriptions |
| 8. Processes & Services | ps, top, systemctl, systemd |
| 9. Networking | ip, nmcli, ss, DNS |
| 10. Shell | Tab completion, history, aliases, env vars |

---

## Exam Mapping

This course is **not directly tied to a certification exam**, but it covers foundational skills required by:
- [[EX200-RHCSA]] — ~40% of exam objectives rely on skills taught here
- Every Red Hat exam assumes this level of Linux proficiency

---

## What's Next?

```mermaid
graph LR
    RH066["✅ RH066\nFundamentals\n(You are here)"] --> RH124["📗 RH124\nSystem Admin I"]
    RH124 --> RH134["📘 RH134\nSystem Admin II"]
    RH134 --> EX200["🎯 EX200\nRHCSA"]
    
    style RH066 fill:#3a7d44,color:#fff
    style EX200 fill:#cc0000,color:#fff
```

→ Continue to [[RH124-System-Administration-I]]
→ Back to [[RHEL-SysAdmin-Path]]

---

## Related Notes

- [[System-Administration]] — Deeper reference on sysadmin tasks
- [[Package-Management-DNF-RPM]] — DNF and RPM deep-dive
- [[Systemd]] — Systemd units, targets, and timers
- [[SELinux]] — SELinux basics and troubleshooting
- [[Firewall-and-Security]] — Firewalld configuration
- [[RHEL-SysAdmin-Path]] — Full learning path

## References

- [RH066 Official Course Page](https://www.redhat.com/en/services/training/rh066-fundamentals-red-hat-enterprise-linux)
- [RHEL 9 Documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9)
- [Red Hat Developer Program](https://developers.redhat.com/) — Free RHEL subscription for developers
