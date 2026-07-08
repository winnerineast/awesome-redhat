---
tags: [rhel, containers, podman]
status: stub
created: 2025-07-08
---
# Podman and Containers
> Daemonless container engine for RHEL — the foundation before learning OpenShift.

## Key Features
- Rootless containers (no daemon, no root)
- Pod support (like K8s pods)
- `podman generate kube` — Generate K8s YAML from containers
- Systemd integration (`podman generate systemd`)
- Buildah for building images, Skopeo for image operations

## Key Commands
```bash
podman run -d --name web -p 8080:80 nginx
podman ps / podman images
podman build -t myimage .
podman pod create --name mypod
podman generate kube mypod > pod.yaml
```

## Related Notes
- [[Core-Concepts]], [[Pods-and-Containers]]
