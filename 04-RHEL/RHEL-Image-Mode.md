---
tags: [rhel]
status: complete
created: 2025-07-08
---
# RHEL Image Mode

> [!NOTE]
> RHEL Image Mode (introduced in RHEL 9.4 and standard in RHEL 10) is a container-native method of building, deploying, and managing the Red Hat Enterprise Linux operating system. By utilizing the **bootc** utility, administrators treat the entire operating system as an OCI container image, allowing standard CI/CD engines, container registries, and vulnerability scanners to manage OS security and deployments.

---

## Core Architecture & Workflow

Traditionally, OS deployment and package updates were done using PXE, Kickstart, and package management (`dnf`/`yum`). RHEL Image Mode shifts this to an immutable container workflow:

```
[Containerfile] ---> [Podman/Docker Build] ---> [OCI Registry (Quay)] ---> [bootc system]
    (OS Spec)         (Builds bootable OS)       (OS Image Hub)           (Pulls & installs OS)
```

* **Bootable Containers**: An OCI container image containing standard Linux kernel files and systemd components.
* **`bootc` CLI**: The utility running inside the OS that manages updates, rollbacks, and registry synchronization in place.
* **Transient OS State**: The system configuration is immutable at `/usr`, while transient configuration and local state reside at `/etc` and `/var`.

---

## Writing a Containerfile for a Custom OS

To create your own RHEL operating system, start from the official bootable base image. You can install software, write systemd configurations, and configure system credentials using standard Dockerfile syntax.

### Custom RHEL OS Specification (`Containerfile`)
```dockerfile
FROM registry.redhat.io/rhel9/rhel-bootc:latest

# 1. Install system utilities and services
RUN dnf -y install nginx tmux openssh-server && dnf clean all

# 2. Configure systemd service to start on boot
RUN systemctl enable nginx

# 3. Create a default admin user and copy SSH credentials
RUN useradd -m -G wheel admin && \
    echo "admin:secretpassword" | chpasswd && \
    mkdir -p /home/admin/.ssh && \
    chmod 700 /home/admin/.ssh

COPY id_rsa.pub /home/admin/.ssh/authorized_keys
RUN chmod 600 /home/admin/.ssh/authorized_keys && \
    chown -R admin:admin /home/admin/.ssh

# 4. Inject a custom welcome banner
RUN echo "Welcome to Custom RHEL Image Mode OS!" > /etc/motd
```

### Build and Push the OS Image:
```bash
podman build -t quay.io/myorg/custom-rhel-os:v1.0 .
podman push quay.io/myorg/custom-rhel-os:v1.0
```

---

## Compiling to Raw Disk Formats

To deploy the OS on bare-metal or VMs, compile the OCI container image into bootable disk formats (like ISO, QCOW2, or AMI) using the `bootc-image-builder` utility.

### Run Bootc Image Builder (generating a QCOW2 Virtual Disk):
```bash
podman run \
  --rm \
  -it \
  --privileged \
  --pull=newer \
  -v ./output:/output \
  registry.redhat.io/rhel9/bootc-image-builder:latest \
  --type qcow2 \
  quay.io/myorg/custom-rhel-os:v1.0
```
This writes a `disk.qcow2` file to the local `./output` folder, which can be booted immediately in OpenShift Virtualization, KVM, or OpenStack.

---

## Upgrades and System Operations

Once a machine is running the bootable OS, it tracks the container registry for updates.

### Check current boot status and image details:
```bash
bootc status
```

### Upgrade the running OS to the latest container tag:
```bash
# Pulls the new layer digest from Quay and prepares it for the next boot
bootc upgrade
```
*After the upgrade finishes, reboot the machine to enter the new operating system version: `systemctl reboot`.*

### Switch the system to track a different image stream:
```bash
bootc switch quay.io/myorg/custom-rhel-os:v2.0
```

---

## Related Notes
- [[Worker-Nodes]] (RHCOS uses ignition and ostree concepts similarly)
- [[System-Administration]]
- [[Podman-and-Containers]]
