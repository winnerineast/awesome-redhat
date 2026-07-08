---
tags: [openshift, architecture]
status: stub
created: 2025-07-08
---

# etcd

> etcd is the distributed key-value store that serves as the backing store for all Kubernetes/OpenShift cluster data.

## Key Facts

- Stores all cluster state (resources, configs, secrets)
- Runs on control plane nodes (3 nodes for HA / quorum)
- Uses Raft consensus algorithm
- Performance-sensitive — requires low-latency storage (SSD recommended)

## Operations

- **Backup:** `etcdctl snapshot save` — critical for disaster recovery
- **Restore:** `etcdctl snapshot restore` — from backup
- **Health check:** `etcdctl endpoint health`
- **Defrag:** `etcdctl defrag` — reclaim disk space

## Best Practices

- Dedicated SSDs for etcd storage
- Monitor etcd latency and disk I/O
- Regular backups (automated with CronJob or OADP)
- Never exceed the default 8 GB size limit without tuning

## Related Notes

- [[Control-Plane]]
- [[OpenShift-Architecture-Overview]]

---

> [!NOTE]
> #todo — Add etcd performance tuning and backup automation examples.
