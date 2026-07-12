---
tags: [openshift, workloads, virtualization]
status: complete
created: 2025-07-08
---
# OpenShift Virtualization

> [!NOTE]
> OpenShift Virtualization (based on the upstream CNCF project **KubeVirt**) allows you to run and manage virtual machine (VM) workloads alongside containerized workloads inside the same Kubernetes platform. This eliminates the need for separate virtualization silos (like VMware or RHV) and unifies network, storage, and cluster-level administration.

---

## Core Architecture Concepts

OpenShift Virtualization runs VM instances inside regular Kubernetes Pods:

* **qemu-kvm**: The virtual machine runs inside a container using QEMU/KVM technology.
* **VirtualMachine (VM)**: A declarative CRD representing the configuration of the virtual machine (disk templates, CPU, memory, power state).
* **VirtualMachineInstance (VMI)**: A runtime CRD representing the active, running VM pod instance.
* **Containerized Data Importer (CDI)**: A helper system that pulls operating system disk images (ISO, QCOW2) from external HTTP/S3 endpoints or registry sources and converts them to Persistent Volumes.
* **DataVolume**: A CDI-defined resource that automates the provisioning of a PersistentVolumeClaim (PVC) and imports a disk image into it.

```
+-------------------------------------------------------------+
| Pod (virt-launcher)                                         |
|                                                             |
|   +-----------------------+      +-----------------------+  |
|   | QEMU/KVM VM Process   | <--> | virt-launcher Agent   |  |
|   +-----------------------+      +-----------------------+  |
|               |                                             |
+---------------+---------------------------------------------+
                |
     PersistentVolume (VM Disk)
```

---

## Declarative VM Manifest Example

The following YAML configures a virtual machine instance running Red Hat Enterprise Linux 9, complete with disk allocation (DataVolume) and cloud-init configuration:

```yaml
apiVersion: kubevirt.io/v1
kind: VirtualMachine
metadata:
  name: rhel9-database-server
  namespace: database-workloads
spec:
  running: true # Ensures the VM boots automatically
  template:
    metadata:
      labels:
        kubevirt.io/domain: rhel9-database-server
    spec:
      domain:
        cpu:
          cores: 2
        memory:
          guest: 8Gi
        devices:
          disks:
            - disk:
                bus: virtio
              name: rootdisk
            - disk:
                bus: virtio
              name: cloudinitdisk
          interfaces:
            - masquerade: {} # Masquerade NAT interface to pod network
              name: default
      networks:
        - name: default
          pod: {}
      volumes:
        - dataVolume:
            name: rhel9-disk-volume
          name: rootdisk
        # Cloud-init for user creation, SSH keys, and post-install scripts
        - cloudInitNoCloud:
            userData: |
              #cloud-config
              user: cloud-user
              password: databasepassword
              chpasswd: { expire: False }
              ssh_authorized_keys:
                - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQD...
          name: cloudinitdisk
  dataVolumeTemplates:
    - metadata:
        name: rhel9-disk-volume
      spec:
        storage:
          resources:
            requests:
              storage: 40Gi
          storageClassName: ocs-storagecluster-ceph-rbd # Requires Ceph/ODF block storage
        source:
          registry:
            url: docker://registry.redhat.io/rhel9/rhel-guest-image:latest # Official RHEL9 QCOW2 image
```

---

## Live Migration

Live Migration allows virtual machines to move from one cluster node to another without downtime or losing network connection.

### Core Requirements:
1. **Shared Storage**: The VM disks must be provisioned on a Persistent Volume that supports `ReadWriteMany` (RWX) access mode (e.g., Ceph block storage via ODF or shared NFS).
2. **Dedicated Network (Optional)**: A secondary network interface configured with Multus can isolate migration traffic.
3. **Migration Policies**: Set limits on bandwidth and concurrent migrations via cluster configuration.

### Triggering Migration via CLI:
You can initiate a live migration manually using the `virtctl` tool:
```bash
virtctl migrate rhel9-database-server -n database-workloads
```

---

## CLI Management: `virtctl`

The `virtctl` utility is an extension of `oc` used to control VM operations.

### Install `virtctl`:
```bash
oc rsync -n openshift-cnv deploy/virtctl /tmp/virtctl
# Or install using RPM/DNF in RHEL:
subscription-manager repos --enable=open-virtualization-4.x-for-rhel-9-x86_64-rpms
dnf install -y kubevirt-virtctl
```

### Common Commands:
* **Start a VM**: `virtctl start rhel9-database-server`
* **Stop a VM**: `virtctl stop rhel9-database-server`
* **Restart a VM**: `virtctl restart rhel9-database-server`
* **Open VM Console (Serial)**: `virtctl console rhel9-database-server`
* **Open Graphical Console (VNC)**: `virtctl vnc rhel9-database-server`
* **Expose SSH port via NodePort**: `virtctl expose vm rhel9-database-server --name=db-ssh --port=22 --type=NodePort`

---

## Related Notes
- [[OpenShift-Architecture-Overview]]
- [[Persistent-Volumes]]
- [[CSI-Drivers]]
