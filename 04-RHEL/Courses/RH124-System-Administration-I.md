---
tags: [rhel, course, sysadmin, intermediate]
course_code: RH124
course_title: "Red Hat System Administration I"
duration: "5 days"
format: "Classroom, Virtual, Self-paced"
cost: Subscription
prerequisites: "RH066 or basic computing skills"
certification_prep: null
status: active
created: 2025-07-08
---

# 📗 RH124 — Red Hat System Administration I

> The first core course in the RHCSA track. Teaches essential Linux administration skills for managing RHEL systems — from the command line through users, storage, networking, and services.

---

## Course Overview

| | |
|---|---|
| **Code** | RH124 |
| **Duration** | 5 days (40 hours) |
| **Format** | Classroom, Virtual, Self-paced |
| **Prerequisites** | [[RH066-Fundamentals-of-RHEL]] or basic computing skills |
| **Next Step** | [[RH134-System-Administration-II]] |
| **Certification** | Partial prep for [[EX200-RHCSA]] |
| **Learning Path** | [[RHEL-SysAdmin-Path]] |

## Learning Objectives

After completing this course, you will be able to:
1. Access and use the command line on a RHEL system
2. Manage files and directories from the command line
3. Create, view, and edit text files
4. Manage local Linux users and groups
5. Control file access with Linux file system permissions
6. Monitor and manage Linux processes
7. Control and monitor systemd services
8. Configure and secure OpenSSH
9. Analyze and store logs
10. Manage RHEL networking
11. Install and update software packages
12. Access Linux file systems and manage storage
13. Analyze servers and get support

---

## Module 1: Accessing the Command Line

### The Bash Shell

Bash (Bourne-Again Shell) is the default interactive shell in RHEL. When you log in, bash reads configuration files and presents a prompt.

**Prompt anatomy:**
```
[student@servera ~]$
│        │       │ │
│        │       │ └── $ = regular user, # = root
│        │       └──── Current directory (~ = home)
│        └──────────── Hostname
└───────────────────── Username
```

### Virtual Consoles and Terminal Types

| Terminal | Access | Use Case |
|---|---|---|
| Physical console (tty1-tty6) | `Ctrl+Alt+F1` through `F6` | Direct server access, no GUI |
| GUI terminal emulator | GNOME Terminal, Konsole | Desktop Linux |
| SSH remote terminal | `ssh user@host` | Remote administration |
| Web console (Cockpit) | `https://host:9090` | Browser-based management |

```bash
# Switch between virtual consoles
chvt 2                    # Switch to tty2 (as root)
# Or press Ctrl+Alt+F2

# See who is on which terminal
w
who
```

### Command Line Syntax

```bash
# Basic syntax: command [options] [arguments]
ls -la /etc               # command=ls, option=-la, argument=/etc

# Short options vs long options
ls -a                     # Short option
ls --all                  # Long option (same thing)
ls -l -a -h              # Multiple short options
ls -lah                  # Combined short options (same thing)

# Quoting and escaping
echo "Hello World"        # Double quotes — variables expanded
echo 'Hello $USER'        # Single quotes — literal (prints $USER)
echo Hello\ World         # Backslash escapes the space
echo "File is \"here\""   # Escape double quote inside double quotes
```

### Command-Line Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+A` | Move cursor to beginning of line |
| `Ctrl+E` | Move cursor to end of line |
| `Ctrl+U` | Cut from cursor to beginning of line |
| `Ctrl+K` | Cut from cursor to end of line |
| `Ctrl+Y` | Paste (yank) previously cut text |
| `Ctrl+W` | Cut the word before the cursor |
| `Alt+B` | Move back one word |
| `Alt+F` | Move forward one word |
| `Ctrl+L` | Clear screen (same as `clear`) |
| `Ctrl+D` | Exit shell (same as `exit`) |
| `Ctrl+R` | Reverse search command history |
| `Tab` | Auto-complete command or filename |
| `Tab Tab` | Show all completions |

---

## Module 2: Managing Files from the Command Line

### File Types in Linux

| Character | Type | Example |
|---|---|---|
| `-` | Regular file | `/etc/passwd` |
| `d` | Directory | `/home/student` |
| `l` | Symbolic link | `/usr/bin/python3 → python3.9` |
| `b` | Block device | `/dev/sda` |
| `c` | Character device | `/dev/tty0` |
| `p` | Named pipe (FIFO) | Created with `mkfifo` |
| `s` | Socket | `/var/run/docker.sock` |

### Hard Links vs Symbolic Links

```bash
# Hard link — another name for the same inode (same data on disk)
ln original.txt hardlink.txt
# - Cannot cross filesystems
# - Cannot link to directories
# - Survives if original is deleted
# - Same inode number as original

# Symbolic (soft) link — pointer to a path
ln -s /etc/hostname symlink.txt
# - CAN cross filesystems
# - CAN link to directories
# - Breaks if original is deleted (dangling symlink)
# - Different inode number

# Verify
ls -li original.txt hardlink.txt    # Same inode number
ls -li /etc/hostname symlink.txt    # Different inode numbers
stat original.txt                    # Detailed file info
```

### Globbing (Pattern Matching)

```bash
# * — matches zero or more characters
ls *.txt                  # All .txt files
ls /etc/*.conf            # All .conf files in /etc

# ? — matches exactly one character
ls file?.txt              # file1.txt, fileA.txt, not file10.txt

# [] — matches one character from a set
ls file[123].txt          # file1.txt, file2.txt, file3.txt
ls file[a-z].txt          # filea.txt through filez.txt
ls file[!0-9].txt         # NOT a digit

# {} — brace expansion (not globbing, but shell expansion)
echo file{1,2,3}.txt      # file1.txt file2.txt file3.txt
mkdir -p project/{src,bin,doc}  # Create three directories
touch log.{txt,csv,json}  # Create three files
cp config.yml{,.bak}      # Copy config.yml to config.yml.bak
```

### Practice Exercise 1: Files and Links

```bash
# 1. Create a workspace
mkdir -p ~/rh124-lab/module2
cd ~/rh124-lab/module2

# 2. Create files with brace expansion
touch report-{jan,feb,mar,apr}-2025.txt

# 3. List them with a glob
ls report-*-2025.txt

# 4. Create a hard link and soft link
echo "Important data" > original.txt
ln original.txt hardlink.txt
ln -s original.txt softlink.txt

# 5. Compare inodes
ls -li original.txt hardlink.txt softlink.txt

# 6. Delete the original — observe what happens
rm original.txt
cat hardlink.txt        # Still works (hard link preserves data)
cat softlink.txt        # Fails (dangling symlink)

# 7. Clean up
cd ~ && rm -r ~/rh124-lab/module2
```

---

## Module 3: Editing Text Files

### Vim — The Standard RHEL Editor

Vim has **modal editing** — different modes for different tasks:

| Mode | Purpose | Enter Mode | Leave Mode |
|---|---|---|---|
| **Normal** | Navigate, delete, copy/paste | `Esc` | — (default mode) |
| **Insert** | Type text | `i`, `a`, `o`, `I`, `A`, `O` | `Esc` |
| **Command** | Save, quit, search, replace | `:` | `Enter` or `Esc` |
| **Visual** | Select text | `v`, `V`, `Ctrl+V` | `Esc` |

### Essential Vim Commands

**Navigation (Normal mode):**

| Key | Movement |
|---|---|
| `h j k l` | Left, down, up, right |
| `w` / `b` | Forward / back one word |
| `0` / `$` | Beginning / end of line |
| `gg` / `G` | Beginning / end of file |
| `42G` or `:42` | Go to line 42 |
| `Ctrl+F` / `Ctrl+B` | Page down / page up |

**Editing (Normal mode):**

| Command | Action |
|---|---|
| `i` | Insert before cursor |
| `a` | Insert after cursor |
| `o` / `O` | Open new line below / above |
| `x` | Delete character under cursor |
| `dd` | Delete entire line |
| `5dd` | Delete 5 lines |
| `yy` | Yank (copy) line |
| `p` / `P` | Paste below / above current line |
| `u` | Undo |
| `Ctrl+R` | Redo |
| `.` | Repeat last change |
| `dw` | Delete word |
| `cw` | Change word (delete + enter insert mode) |

**Command mode (`:`):**

```vim
:w                    " Save file
:q                    " Quit (fails if unsaved changes)
:wq                   " Save and quit
:q!                   " Quit WITHOUT saving (force)
:x                    " Save and quit (same as :wq)
ZZ                    " Save and quit (Normal mode shortcut)

/pattern              " Search forward for 'pattern'
?pattern              " Search backward
n / N                 " Next / previous match

:%s/old/new/g         " Replace all 'old' with 'new' in entire file
:s/old/new/g          " Replace in current line only
:%s/old/new/gc        " Replace all with confirmation

:set number           " Show line numbers
:set nonumber         " Hide line numbers
:set paste            " Paste mode (disables auto-indent)
```

### Other Text Editors

```bash
# nano — simpler, beginner-friendly editor
nano /etc/hostname            # Ctrl+O to save, Ctrl+X to exit

# Visual editors available in RHEL
# - gedit (GNOME text editor)
# - VS Code (via RPM or flatpak)
```

### Viewing and Processing Text (Review)

```bash
# Comparing files
diff file1.txt file2.txt          # Show differences
diff -u file1.txt file2.txt       # Unified diff format (more readable)
diff -y file1.txt file2.txt       # Side-by-side comparison

# Combining files
cat file1.txt file2.txt > combined.txt    # Concatenate
paste file1.txt file2.txt                  # Merge side by side (tab-delimited)
```

### Practice Exercise 2: Vim Essentials

```bash
# 1. Create a file with vim
vim ~/rh124-lab/vim-practice.txt

# In vim, type:
#   i            (enter insert mode)
#   Type several lines of text
#   Esc          (back to normal mode)
#   :wq          (save and quit)

# 2. Practice common edits
vim ~/rh124-lab/vim-practice.txt
#   gg           (go to top)
#   dd           (delete first line)
#   G            (go to bottom)
#   o            (open new line below, enter insert mode)
#   Type a new line, then Esc
#   :%s/old/new/g  (replace text throughout)
#   u            (undo)
#   :wq          (save and quit)
```

---

## Module 4: Managing Local Users and Groups

### User and Group Concepts

Every process runs as a user. Every file is owned by a user and a group.

| UID Range | Type | Examples |
|---|---|---|
| 0 | Superuser | `root` |
| 1–200 | Static system users | `bin`, `daemon`, `systemd-network` |
| 201–999 | Dynamic system users | `chrony`, `apache`, `cockpit-ws` |
| 1000+ | Regular users | `student`, `admin` |

### User Management Commands

```bash
# Create users
sudo useradd alice                   # Create user with defaults
sudo useradd -u 1500 -G wheel,developers -s /bin/bash -c "Alice Admin" alice
#             │       │                      │            │
#             │       │                      │            └── Comment (full name)
#             │       │                      └── Login shell
#             │       └── Supplementary groups
#             └── Specific UID

sudo useradd -r -s /sbin/nologin svc-app   # System user (no login)

# Set / change passwords
sudo passwd alice                    # Set password interactively
sudo passwd -l alice                 # Lock account (disable login)
sudo passwd -u alice                 # Unlock account
sudo chage -l alice                  # View password aging info
sudo chage -M 90 alice               # Max password age = 90 days
sudo chage -E 2026-12-31 alice       # Account expiry date

# Modify users
sudo usermod -aG wheel alice         # Add alice to wheel group (-a = append!)
sudo usermod -s /sbin/nologin alice  # Change shell (disable interactive login)
sudo usermod -L alice                # Lock account (alternative to passwd -l)
sudo usermod -d /home/newhome alice  # Change home directory path

# Delete users
sudo userdel alice                   # Delete user (keep home dir)
sudo userdel -r alice                # Delete user AND home directory
```

> [!WARNING]
> Always use `usermod -aG` (with `-a`) when adding supplementary groups. Without `-a`, it **replaces** all existing supplementary groups!

### Group Management Commands

```bash
# Create groups
sudo groupadd developers             # Create group
sudo groupadd -g 5000 admins         # Create with specific GID

# Modify groups
sudo groupmod -n devops developers   # Rename group
sudo gpasswd -a alice developers     # Add user to group (alternative to usermod)
sudo gpasswd -d alice developers     # Remove user from group

# Delete groups
sudo groupdel developers             # Delete group

# Query groups
groups alice                          # Show alice's groups
id alice                              # Show UID, GID, all groups
getent group wheel                    # Query group database
```

### Key Configuration Files

```bash
# /etc/passwd — one line per user
# username:x:UID:GID:comment:home_dir:shell
student:x:1000:1000:Student User:/home/student:/bin/bash

# /etc/shadow — password hashes (root only)
# username:$hash:last_change:min:max:warn:inactive:expire:
student:$6$rounds=...:19544:0:99999:7:::

# /etc/group — one line per group
# groupname:x:GID:member1,member2
wheel:x:10:student,alice

# /etc/login.defs — default values for user creation
# UID_MIN, UID_MAX, PASS_MAX_DAYS, PASS_MIN_DAYS, CREATE_HOME, etc.

# /etc/default/useradd — useradd defaults
useradd -D                            # View defaults
```

### The /etc/skel Directory

```bash
ls -la /etc/skel/
# .bash_profile  .bashrc  .bash_logout
# Files here are copied to new user home directories at creation time
```

### Switching Users

```bash
su - alice                # Switch to alice (login shell — loads full environment)
su alice                  # Switch to alice (non-login — keeps current env)
sudo -i                   # Root login shell
sudo -u alice command     # Run single command as alice
exit                      # Return to previous user
```

> [!TIP]
> Always use `su -` (with dash) to get a proper login shell. Without `-`, environment variables from the previous user may cause confusion.

### Practice Exercise 3: User and Group Management

```bash
# 1. Create a group
sudo groupadd webteam

# 2. Create two users in the group
sudo useradd -G webteam -c "Dev User 1" dev1
sudo useradd -G webteam -c "Dev User 2" dev2

# 3. Set passwords
sudo passwd dev1
sudo passwd dev2

# 4. Verify
id dev1
id dev2
getent group webteam

# 5. Set password expiry
sudo chage -M 90 -W 7 dev1     # Max 90 days, warn 7 days before

# 6. Verify password aging
sudo chage -l dev1

# 7. Clean up
sudo userdel -r dev1
sudo userdel -r dev2
sudo groupdel webteam
```

---

## Module 5: Controlling Access to Files

### Linux Permission Model (Review and Deep Dive)

```
-rwxrw-r--. 1 alice webteam 4096 Jul  8 10:00 deploy.sh
│└┬┘└┬┘└┬┘│
│ │   │   ││
│ │   │   │└── SELinux context indicator (. or +)
│ │   │   └─── Others: r-- (read only)
│ │   └─────── Group (webteam): rw- (read + write)
│ └─────────── Owner (alice): rwx (read + write + execute)
└───────────── File type: - = regular file
```

### Default Permissions and umask

When you create files, the **umask** subtracts permissions from the maximum:
- Files: max `0666` (never created with execute by default)
- Directories: max `0777`

```bash
umask                     # View current umask (typically 0022)
# With umask 0022:
#   New file:      0666 - 0022 = 0644 (rw-r--r--)
#   New directory:  0777 - 0022 = 0755 (rwxr-xr-x)

umask 0077                # Set restrictive umask (files: 0600, dirs: 0700)
# Only the owner can read/write/access

# Make umask permanent: add to ~/.bashrc or /etc/profile.d/*.sh
```

### Special Permissions

| Permission | Numeric | On Files | On Directories |
|---|---|---|---|
| **setuid** (SUID) | 4000 | Runs as file owner (e.g., `/usr/bin/passwd`) | No effect |
| **setgid** (SGID) | 2000 | Runs as file group | New files inherit directory's group |
| **sticky bit** | 1000 | No effect | Only file owner can delete their files |

```bash
# setuid — execute as file owner
ls -l /usr/bin/passwd
# -rwsr-xr-x. 1 root root ...  (note the 's' in owner execute)
chmod u+s program         # Set SUID
chmod 4755 program        # Set SUID numerically

# setgid on directory — new files inherit group
sudo mkdir /opt/shared
sudo chgrp webteam /opt/shared
sudo chmod g+s /opt/shared        # Set SGID
sudo chmod 2775 /opt/shared       # Numerically
# Now any file created in /opt/shared belongs to group 'webteam'

# sticky bit — prevent deletion of others' files (e.g., /tmp)
ls -ld /tmp
# drwxrwxrwt. ... (note the 't' in others execute)
chmod o+t /shared-dir     # Set sticky bit
chmod 1777 /shared-dir    # Numerically
```

### Access Control Lists (ACLs)

Standard permissions only support one owner and one group. **ACLs** allow fine-grained permissions for multiple users/groups.

```bash
# View ACLs
getfacl file.txt

# Set ACLs
setfacl -m u:bob:rw file.txt          # Grant bob read/write
setfacl -m g:devops:rx file.txt       # Grant devops group read/execute
setfacl -m o::--- file.txt            # Remove all others permissions

# Default ACLs (for new files in a directory)
setfacl -m d:g:webteam:rw /opt/shared/  # New files get webteam rw

# Remove ACLs
setfacl -x u:bob file.txt             # Remove bob's ACL
setfacl -b file.txt                    # Remove all ACLs

# A '+' at the end of permissions indicates ACLs are set
ls -l file.txt
# -rw-rw-r--+ 1 alice webteam ...
```

### Practice Exercise 4: Permissions and ACLs

```bash
# 1. Create a shared project directory
sudo mkdir -p /opt/project
sudo groupadd projteam
sudo chgrp projteam /opt/project
sudo chmod 2770 /opt/project      # SGID + rwx for owner/group only

# 2. Test SGID behavior
sudo usermod -aG projteam $USER
newgrp projteam                    # Refresh group membership
touch /opt/project/test.txt
ls -l /opt/project/test.txt        # Should show group 'projteam'

# 3. Add ACL for a specific user
sudo setfacl -m u:nobody:r /opt/project/test.txt
getfacl /opt/project/test.txt

# 4. Clean up
sudo rm -rf /opt/project
sudo groupdel projteam
```

---

## Module 6: Monitoring and Managing Processes

### Process States

```
                ┌──────────┐
     fork()───▶ │ Created  │
                └────┬─────┘
                     ▼
                ┌──────────┐       ┌──────────────┐
                │  Ready   │◀─────▶│   Running    │
                │ (Runnable)│       │  (on CPU)    │
                └────┬─────┘       └──┬────┬──────┘
                     │                │    │
                     │                │    ▼
                     │                │  ┌──────────┐
                     │                │  │ Stopped  │  ← Ctrl+Z / SIGSTOP
                     │                │  │ (T)      │
                     │                │  └──────────┘
                     │                ▼
                     │          ┌──────────┐
                     │          │ Sleeping │  ← waiting for I/O, timer, etc.
                     │          │ (S or D) │
                     │          └──────────┘
                     ▼
                ┌──────────┐
                │  Zombie  │  ← exited, parent hasn't collected status
                │  (Z)     │
                └──────────┘
```

| State | Code | Description |
|---|---|---|
| Running | R | Currently executing on CPU or in run queue |
| Sleeping (interruptible) | S | Waiting for event (can be interrupted by signals) |
| Sleeping (uninterruptible) | D | Waiting for I/O (cannot be killed — usually brief) |
| Stopped | T | Suspended (Ctrl+Z or SIGSTOP) |
| Zombie | Z | Process exited but parent hasn't read exit status |

### Viewing Processes

```bash
# ps — snapshot of processes
ps aux                     # All processes, all users (BSD style)
#  USER  PID %CPU %MEM    VSZ   RSS TTY  STAT START   TIME COMMAND
#  root    1  0.1  0.3 171260 13280 ?    Ss   10:00   0:01 /usr/lib/systemd/systemd

ps -ef                     # All processes (System V style)
ps aux --sort=-%cpu        # Sort by CPU usage (descending)
ps aux --sort=-%mem        # Sort by memory usage (descending)
ps -eo pid,user,pcpu,pmem,comm --sort=-%cpu | head  # Custom columns

# pstree — process tree
pstree                     # Show process hierarchy
pstree -p                  # Show PIDs
pstree -u student          # Show processes for user 'student'

# top — real-time monitoring
top
#  Press: 1 = show individual CPUs
#         M = sort by memory
#         P = sort by CPU (default)
#         k = kill a process
#         r = renice a process
#         q = quit
```

### Signals

```bash
# List all signals
kill -l

# Common signals
kill PID                   # SIGTERM (15) — polite request to terminate
kill -9 PID                # SIGKILL (9)  — immediate forced kill (cannot be caught)
kill -SIGHUP PID           # SIGHUP (1)   — hang up / reload configuration
kill -SIGSTOP PID          # SIGSTOP (19) — pause process
kill -SIGCONT PID          # SIGCONT (18) — resume paused process

# Kill by name
killall httpd              # Kill all processes named 'httpd'
pkill -u alice             # Kill all processes owned by 'alice'
pkill -t pts/2             # Kill all processes on terminal pts/2
```

### Job Control

```bash
# Run in background
sleep 300 &                # Start in background
[1] 12345                  # Job number and PID

# Manage jobs
jobs                       # List background jobs
fg %1                      # Bring job 1 to foreground
bg %1                      # Resume stopped job in background
Ctrl+Z                     # Suspend foreground process
Ctrl+C                     # Terminate foreground process

# nohup — keep running after logout
nohup long-script.sh &     # Continue after terminal closes
# Output goes to nohup.out by default
```

### Process Priority (nice / renice)

```bash
# Nice values: -20 (highest priority) to +19 (lowest priority)
# Default nice value: 0

nice -n 10 long-job.sh     # Start with lower priority
sudo nice -n -5 important  # Start with higher priority (needs root)

renice 15 -p 12345         # Change priority of running process
sudo renice -10 -p 12345   # Increase priority (needs root)

# View nice values
ps -eo pid,ni,comm         # NI column shows nice value
top                         # NI column visible
```

---

## Module 7: Controlling Services and Daemons

### Systemd Architecture

```
                    ┌───────────────────────────────┐
                    │         systemd (PID 1)        │
                    │    System and Service Manager   │
                    └───────┬───────────┬───────────┘
                            │           │
              ┌─────────────┤           ├─────────────┐
              ▼             ▼           ▼             ▼
        ┌──────────┐  ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Services │  │ Sockets  │ │ Timers   │ │ Targets  │
        │ (.service)│ │ (.socket)│ │ (.timer) │ │ (.target)│
        └──────────┘  └──────────┘ └──────────┘ └──────────┘
```

### Unit Types

| Type | Extension | Purpose |
|---|---|---|
| Service | `.service` | Manage daemons (httpd, sshd, chronyd) |
| Socket | `.socket` | IPC/network socket activation |
| Timer | `.timer` | Schedule tasks (replaces cron for systemd) |
| Target | `.target` | Group units (like runlevels) |
| Mount | `.mount` | Filesystem mount points |
| Path | `.path` | Monitor filesystem paths |
| Device | `.device` | Kernel device recognition |

### Managing Services with systemctl

```bash
# Service lifecycle
sudo systemctl start httpd.service       # Start now
sudo systemctl stop httpd.service        # Stop now
sudo systemctl restart httpd.service     # Stop + start
sudo systemctl reload httpd.service      # Reload config (no downtime)
sudo systemctl reload-or-restart httpd   # Reload if supported, else restart

# Boot behavior
sudo systemctl enable httpd              # Start on boot
sudo systemctl disable httpd             # Don't start on boot
sudo systemctl enable --now httpd        # Enable AND start immediately
sudo systemctl disable --now httpd       # Disable AND stop immediately

# Status
systemctl status httpd                   # Detailed status + recent logs
systemctl is-active httpd                # "active" or "inactive"
systemctl is-enabled httpd               # "enabled" or "disabled"
systemctl is-failed httpd                # "failed" or other

# Listing
systemctl list-units --type=service                # Active services
systemctl list-units --type=service --all          # All (inc. inactive)
systemctl list-unit-files --type=service           # All unit files and states

# Masking — completely prevent starting (even manually)
sudo systemctl mask httpd                # Prevent starting
sudo systemctl unmask httpd              # Allow starting again
```

### Systemd Targets (Runlevels)

| Target | Old Runlevel | Description |
|---|---|---|
| `poweroff.target` | 0 | Shut down system |
| `rescue.target` | 1 | Single-user, no network |
| `multi-user.target` | 3 | Multi-user, text mode, network |
| `graphical.target` | 5 | Multi-user, graphical desktop |
| `reboot.target` | 6 | Reboot |
| `emergency.target` | — | Minimal emergency shell |

```bash
# Check and change default target
systemctl get-default                         # e.g., graphical.target
sudo systemctl set-default multi-user.target  # Boot to text mode

# Switch target now (without reboot)
sudo systemctl isolate multi-user.target      # Switch to text mode
sudo systemctl isolate graphical.target       # Switch to GUI

# Power management
sudo systemctl poweroff                # Shut down
sudo systemctl reboot                  # Reboot
sudo systemctl suspend                 # Suspend to RAM
sudo systemctl hibernate               # Hibernate to disk
```

### Viewing Unit Files

```bash
# Unit file locations (in priority order)
# /etc/systemd/system/        ← Admin overrides (highest priority)
# /run/systemd/system/        ← Runtime generated
# /usr/lib/systemd/system/    ← Vendor-provided (don't edit directly)

systemctl cat httpd.service          # View unit file contents
systemctl show httpd.service         # Show all properties
systemctl edit httpd.service         # Create override (drop-in file)
# Creates /etc/systemd/system/httpd.service.d/override.conf

sudo systemctl daemon-reload         # Reload after editing unit files
```

**See also:** [[Systemd]] for unit file syntax, creating custom services, and timer units.

---

## Module 8: Configuring and Securing SSH

### OpenSSH Basics

```bash
# Connect to remote host
ssh student@servera                  # Password or key authentication
ssh student@servera -p 2222          # Custom port
ssh -X student@servera               # Enable X11 forwarding (GUI apps)

# Execute remote command
ssh student@servera "hostname; uptime"
```

### SSH Key Authentication

```bash
# 1. Generate key pair (on client)
ssh-keygen -t ed25519 -C "student@workstation"
#   Private key: ~/.ssh/id_ed25519  (NEVER share this)
#   Public key:  ~/.ssh/id_ed25519.pub

# 2. Copy public key to server
ssh-copy-id student@servera
#   This adds your public key to ~student/.ssh/authorized_keys on servera

# 3. Test — should connect without password
ssh student@servera

# Other key types
ssh-keygen -t rsa -b 4096           # RSA 4096-bit
ssh-keygen -t ecdsa -b 521          # ECDSA 521-bit
```

### SSH Configuration

**Client-side** (`~/.ssh/config`):
```bash
# Simplify connections with host aliases
cat >> ~/.ssh/config << 'EOF'
Host servera
    HostName servera.lab.example.com
    User student
    Port 22
    IdentityFile ~/.ssh/id_ed25519

Host serverb
    HostName 192.168.1.20
    User admin
    Port 2222
EOF

# Now just: ssh servera
chmod 600 ~/.ssh/config
```

**Server-side** (`/etc/ssh/sshd_config`):
```bash
# Key security settings
PermitRootLogin no                   # Disable root SSH login
PasswordAuthentication no            # Only allow key-based auth
PubkeyAuthentication yes             # Enable key auth (default)
Port 22                              # Default port

# After editing:
sudo systemctl reload sshd
```

### SCP and SFTP

```bash
# scp — secure copy
scp file.txt student@servera:/tmp/               # Local → remote
scp student@servera:/etc/hosts ./                 # Remote → local
scp -r directory/ student@servera:/opt/           # Copy directory recursively

# sftp — interactive secure file transfer
sftp student@servera
sftp> ls                   # List remote files
sftp> get remote-file.txt  # Download
sftp> put local-file.txt   # Upload
sftp> exit
```

### Practice Exercise 5: SSH Configuration

```bash
# 1. Generate an SSH key pair
ssh-keygen -t ed25519 -f ~/.ssh/lab_key -N ""

# 2. View the public key
cat ~/.ssh/lab_key.pub

# 3. Create an SSH config entry
cat >> ~/.ssh/config << 'EOF'
Host myserver
    HostName localhost
    User $USER
    IdentityFile ~/.ssh/lab_key
EOF

# 4. Set proper permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/lab_key
chmod 644 ~/.ssh/lab_key.pub
```

---

## Module 9: Analyzing and Storing Logs

### Log Architecture in RHEL

```
  Applications / Services
         │
         ▼
  ┌──────────────┐         ┌──────────────────┐
  │   systemd    │────────▶│  systemd-journald │
  │   (PID 1)    │         │  (binary journal)  │
  └──────┬───────┘         └──────┬─────────────┘
         │                        │
         ▼                        ▼
  ┌──────────────┐         ┌──────────────────┐
  │   rsyslog    │         │ /run/log/journal/ │ (volatile)
  │              │         │ /var/log/journal/ │ (persistent)
  └──────┬───────┘         └──────────────────┘
         │
         ▼
  /var/log/messages          ← general system log
  /var/log/secure            ← authentication events
  /var/log/maillog           ← mail
  /var/log/cron              ← cron jobs
  /var/log/boot.log          ← boot messages
```

### journalctl — Querying the System Journal

```bash
# Basic queries
journalctl                            # All journal entries (paged)
journalctl -n 20                      # Last 20 entries
journalctl -f                         # Follow (live) — like tail -f
journalctl --no-pager                 # Don't page output

# Filter by unit
journalctl -u sshd                    # Logs for sshd service
journalctl -u httpd -u php-fpm        # Multiple units

# Filter by priority
journalctl -p err                     # Errors and above
journalctl -p warning                 # Warnings and above
#   Priorities: emerg, alert, crit, err, warning, notice, info, debug

# Filter by time
journalctl --since "2025-07-08 10:00:00"
journalctl --since "1 hour ago"
journalctl --since yesterday --until today
journalctl -b                         # Current boot only
journalctl -b -1                      # Previous boot

# Filter by PID or user
journalctl _PID=1234
journalctl _UID=1000
journalctl _COMM=sudo                 # By command name

# Output formats
journalctl -o verbose                  # All metadata fields
journalctl -o json-pretty             # JSON format
journalctl --disk-usage                # How much disk the journal uses
```

### Making the Journal Persistent

By default on RHEL, the journal is stored in `/run/log/journal/` (volatile — lost on reboot).

```bash
# Make persistent
sudo mkdir -p /var/log/journal
sudo systemd-tmpfiles --create --prefix /var/log/journal
sudo systemctl restart systemd-journald

# Verify
ls /var/log/journal/

# Configure journal size limits in /etc/systemd/journald.conf
# [Journal]
# SystemMaxUse=500M        # Max disk usage
# SystemKeepFree=1G        # Keep this much free
# MaxRetentionSec=1month   # Max retention time
```

### Traditional Log Files

```bash
# Key log files (managed by rsyslog)
tail -f /var/log/messages         # General system + service messages
tail -f /var/log/secure           # Authentication, sudo, sshd
cat /var/log/boot.log             # Boot messages
cat /var/log/cron                 # Cron job execution

# Log rotation — managed by logrotate
cat /etc/logrotate.conf           # Global config
ls /etc/logrotate.d/              # Per-package config
```

---

## Module 10: Managing Networking

### Network Configuration with nmcli

```bash
# View connections and devices
nmcli device status                                # Device summary
nmcli connection show                              # All connections
nmcli connection show "Wired connection 1"         # Connection details
nmcli -f IP4 connection show "Wired connection 1"  # Just IPv4 info

# Create a new connection (static IP)
sudo nmcli connection add \
  con-name "office-static" \
  type ethernet \
  ifname ens192 \
  ipv4.addresses 192.168.1.100/24 \
  ipv4.gateway 192.168.1.1 \
  ipv4.dns "8.8.8.8 8.8.4.4" \
  ipv4.method manual \
  autoconnect yes

# Create a new connection (DHCP)
sudo nmcli connection add \
  con-name "office-dhcp" \
  type ethernet \
  ifname ens192 \
  ipv4.method auto

# Modify existing connection
sudo nmcli connection modify "office-static" \
  ipv4.dns-search "example.com" \
  +ipv4.dns "1.1.1.1"                    # Add DNS (+ prefix)

# Activate / deactivate
sudo nmcli connection up "office-static"
sudo nmcli connection down "office-static"

# Delete connection
sudo nmcli connection delete "office-static"
```

### Hostname Configuration

```bash
hostnamectl                                        # View hostname info
sudo hostnamectl set-hostname servera.lab.example.com  # Set FQDN

# Edit /etc/hosts for local resolution
sudo vim /etc/hosts
# 192.168.1.10  servera.lab.example.com  servera
# 192.168.1.20  serverb.lab.example.com  serverb
```

### Network Diagnostics

```bash
# Connectivity
ping -c 3 192.168.1.1               # Test gateway
ping -c 3 8.8.8.8                   # Test internet
ping -c 3 redhat.com                # Test DNS + internet

# DNS troubleshooting
host redhat.com                      # Simple DNS lookup
dig redhat.com                       # Detailed DNS lookup
dig @8.8.8.8 redhat.com             # Query specific DNS server
nslookup redhat.com                  # Interactive DNS lookup

# Port and connection status
ss -tulnp                            # Listening ports
ss -tan                              # All TCP connections
ss -tan state established            # Only established connections

# Routing
ip route show                        # Routing table
traceroute redhat.com                # Trace network hops
tracepath redhat.com                 # Similar, no root needed
```

### Network Configuration Files

```bash
# RHEL 9 connection files (NetworkManager key-file format)
ls /etc/NetworkManager/system-connections/
# Files end in .nmconnection

# Example content:
# [connection]
# id=office-static
# type=ethernet
# interface-name=ens192
#
# [ipv4]
# method=manual
# address1=192.168.1.100/24,192.168.1.1
# dns=8.8.8.8;8.8.4.4;
```

**See also:** [[Networking-Linux]] for advanced topics.

---

## Module 11: Installing and Updating Software

### DNF Package Management (Deep Dive)

```bash
# Transaction history
dnf history                          # View transaction history
dnf history info 5                   # Details of transaction #5
sudo dnf history undo 5              # Undo transaction #5

# Module streams (AppStream)
dnf module list                      # List all modules
dnf module list nodejs               # List nodejs streams
dnf module info nodejs:18            # Info for nodejs stream 18
sudo dnf module enable nodejs:18     # Enable stream 18
sudo dnf module install nodejs:18/common  # Install with profile

# Clean up
sudo dnf clean all                   # Clear all cached data
sudo dnf autoremove                  # Remove unneeded dependencies
```

### Managing RPM Packages Directly

```bash
# Query installed packages
rpm -qa                              # List all installed packages
rpm -qi httpd                        # Package info
rpm -ql httpd                        # List all files in package
rpm -qc httpd                        # List config files only
rpm -qd httpd                        # List documentation files
rpm -qf /etc/httpd/conf/httpd.conf   # Which package owns this file?

# Verify package integrity
rpm -V httpd                         # Check for modified files
#  S.5....T.  c /etc/httpd/conf/httpd.conf
#  S = size, 5 = MD5, T = timestamp, c = config file

# Import GPG keys (required for verifying packages)
sudo rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release
rpm -qa gpg-pubkey*                  # List imported keys
```

### Repository Management

```bash
# Add a third-party repository
sudo dnf config-manager --add-repo https://example.com/repo.repo

# EPEL (Extra Packages for Enterprise Linux)
sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm
sudo dnf config-manager --enable epel

# View repo configuration
cat /etc/yum.repos.d/redhat.repo     # Red Hat repos
dnf repolist -v                      # Verbose repo list
```

**See also:** [[Package-Management-DNF-RPM]] for complete DNF reference.

---

## Module 12: Accessing Linux File Systems

### Storage Concepts

```
┌────────────────────────────────────────────────┐
│                Physical Disk (/dev/sda)         │
├──────────┬──────────┬──────────┬───────────────┤
│  sda1    │  sda2    │  sda3    │  sda4         │
│  /boot   │  swap    │  / (root)│  /home        │
│  ext4    │  swap    │  xfs     │  xfs          │
│  1 GB    │  2 GB    │  20 GB   │  remaining    │
└──────────┴──────────┴──────────┴───────────────┘
```

### Viewing Storage

```bash
# Block devices
lsblk                              # List block devices (tree view)
lsblk -f                           # Show filesystem types
lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINT  # Custom columns

# Disk usage
df -h                               # Filesystem disk usage (human-readable)
df -hT                              # Include filesystem type
du -sh /var/log                     # Directory size
du -sh /var/log/*                   # Size of each item in directory

# Detailed disk info
sudo fdisk -l /dev/sda              # Partition table
sudo blkid                          # UUIDs and filesystem types
```

### Mounting and Unmounting

```bash
# Manual mount
sudo mount /dev/sdb1 /mnt           # Mount partition to /mnt
sudo mount -o ro /dev/sdb1 /mnt     # Mount read-only
sudo umount /mnt                    # Unmount

# Mount by UUID (preferred — UUIDs don't change)
sudo mount UUID="abc-123-def" /mnt

# View current mounts
mount | grep "^/dev"                 # Physical device mounts
findmnt                              # Tree view of all mounts
findmnt -t xfs                      # Only XFS mounts
```

### Persistent Mounts with /etc/fstab

```bash
# /etc/fstab format:
# device                    mountpoint  fstype  options        dump  fsck
UUID=abc-123-def-456        /data       xfs     defaults       0     0
/dev/mapper/vg01-lv_home    /home       xfs     defaults       0     0
/dev/sdb1                   /backup     ext4    defaults,noauto 0    0

# After editing /etc/fstab:
sudo systemctl daemon-reload
sudo mount -a                        # Mount all entries in fstab

# Verify — this is CRITICAL before rebooting!
findmnt --verify                     # Check fstab for errors
```

> [!WARNING]
> Always run `findmnt --verify` after editing `/etc/fstab`. An incorrect entry can prevent the system from booting!

### Creating Filesystems

```bash
# Create XFS filesystem (RHEL default)
sudo mkfs.xfs /dev/sdb1

# Create ext4 filesystem
sudo mkfs.ext4 /dev/sdb1

# Create swap space
sudo mkswap /dev/sdb2
sudo swapon /dev/sdb2               # Activate swap
sudo swapoff /dev/sdb2              # Deactivate swap
```

---

## Module 13: Analyzing Servers and Getting Support

### System Information

```bash
# Hardware and system info
hostnamectl                          # Hostname, OS, kernel
uname -a                            # Kernel version and architecture
cat /etc/redhat-release              # RHEL version
uptime                               # System uptime and load

# Hardware details
lscpu                                # CPU information
free -h                              # Memory usage
lsblk                                # Block devices
lspci                                # PCI devices
lsusb                                # USB devices
dmidecode | head -50                 # BIOS/hardware info (root)
```

### Red Hat Insights and Support

```bash
# Register with Insights (included with subscription)
sudo insights-client --register
sudo insights-client                  # Run analysis and upload

# SOS reports — for Red Hat support cases
sudo dnf install sos
sudo sosreport                        # Collect system diagnostics
# Creates /var/tmp/sosreport-*.tar.xz — attach to support case
```

### Cockpit — Web Console

```bash
# Enable the web console
sudo systemctl enable --now cockpit.socket

# Access via browser:
# https://servera:9090

# Features:
# - System overview (CPU, memory, disk, network)
# - Log viewer
# - Storage management
# - User management
# - Service management
# - Terminal (in browser!)
# - Software updates
```

---

## Course Summary

| Module | Key Skills | Related Notes |
|---|---|---|
| 1. Command Line | Bash, shortcuts, quoting | — |
| 2. File Management | Links, globbing, brace expansion | [[System-Administration]] |
| 3. Text Editing | Vim modes and commands | — |
| 4. Users & Groups | useradd, groupadd, passwd, chage | [[System-Administration]] |
| 5. Permissions | chmod, chown, SUID/SGID, ACLs | — |
| 6. Processes | ps, top, kill, signals, nice | [[System-Administration]] |
| 7. Services | systemctl, targets, unit files | [[Systemd]] |
| 8. SSH | Keys, scp, config, security | [[Firewall-and-Security]] |
| 9. Logging | journalctl, rsyslog, persistence | [[System-Administration]] |
| 10. Networking | nmcli, ip, ss, hostname | [[Networking-Linux]] |
| 11. Software | dnf, rpm, modules, repos | [[Package-Management-DNF-RPM]] |
| 12. File Systems | mount, fstab, mkfs, lsblk | [[Storage-LVM-Stratis]] |
| 13. System Analysis | Insights, sosreport, Cockpit | [[System-Administration]] |

---

## Exam Mapping

This course covers approximately **50-60%** of [[EX200-RHCSA]] exam objectives:
- ✅ Understand and use essential tools (grep, find, vim, etc.)
- ✅ Create and manage users and groups
- ✅ Configure file permissions
- ✅ Manage systemd services
- ✅ Configure networking
- ✅ Manage software with DNF
- ✅ Access and mount file systems
- ⬜ SELinux → covered in [[RH134-System-Administration-II]]
- ⬜ LVM/Stratis → covered in [[RH134-System-Administration-II]]
- ⬜ Containers → covered in [[RH134-System-Administration-II]]
- ⬜ Shell scripting → covered in [[RH134-System-Administration-II]]

---

## What's Next?

```mermaid
graph LR
    RH066["✅ RH066\nFundamentals"] --> RH124["✅ RH124\nSystem Admin I\n(You are here)"]
    RH124 --> RH134["📘 RH134\nSystem Admin II"]
    RH134 --> EX200["🎯 EX200\nRHCSA"]
    
    style RH124 fill:#2d5986,color:#fff
    style EX200 fill:#cc0000,color:#fff
```

→ Continue to [[RH134-System-Administration-II]]
→ Back to [[RHEL-SysAdmin-Path]]

---

## Related Notes

- [[System-Administration]] — General sysadmin reference
- [[Package-Management-DNF-RPM]] — DNF/RPM deep-dive
- [[Systemd]] — Systemd units, targets, timers
- [[Networking-Linux]] — Linux networking reference
- [[Firewall-and-Security]] — Firewalld and security
- [[Storage-LVM-Stratis]] — Storage management
- [[SELinux]] — SELinux basics (covered in RH134)
- [[RHEL-SysAdmin-Path]] — Full learning path

## References

- [RH124 Official Course Page](https://www.redhat.com/en/services/training/rh124-red-hat-system-administration-i)
- [RHEL 9 Documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9)
- [Red Hat Interactive Labs](https://lab.redhat.com/)
