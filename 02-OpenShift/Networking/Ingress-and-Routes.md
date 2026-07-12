---
tags: [openshift, networking]
status: complete
created: 2025-07-08
---
# Ingress and Routes

> [!NOTE]
> OpenShift exposes applications using two mechanisms: standard Kubernetes **Ingress** resources and OpenShift-native **Routes**. Both are managed by the OpenShift Ingress Operator, which runs HAProxy routers under the hood to manage external traffic routing.

---

## OpenShift Routes vs. Kubernetes Ingress

| Feature | OpenShift Routes (`Route`) | Kubernetes Ingress (`Ingress`) |
|---|---|---|
| **API Group** | `route.openshift.io/v1` | `networking.k8s.io/v1` |
| **Default Router** | HAProxy (fully integrated and managed) | Depends on controller (Nginx, Traefik, HAProxy, etc.) |
| **TLS Configuration** | Built-in support for Edge, Passthrough, and Re-encrypt. | Secret-based TLS configuration (no native re-encryption concept). |
| **Split Traffic / Canaries** | Native multi-service backends with weight parameters. | Requires controller-specific annotations or Service Mesh. |
| **Wildcards** | Supported natively via the `wildcardPolicy` field. | Controller-dependent. |

---

## Route Encryption Types & YAML Configurations

### 1. Edge Route (TLS terminated at Router)
The HAProxy router terminates the SSL/TLS connection using its own certificate or a custom certificate specified in the Route. Traffic travels from the router to the backend pods unencrypted (over HTTP).

```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: edge-route
  namespace: my-app
  annotations:
    haproxy.router.openshift.io/timeout: "60s"
spec:
  host: app-edge.apps.mycluster.example.com
  to:
    kind: Service
    name: frontend-service
    weight: 100
  port:
    targetPort: 8080
  tls:
    termination: edge
    insecureEdgeTerminationPolicy: Redirect # Redirects HTTP to HTTPS
    certificate: |
      -----BEGIN CERTIFICATE-----
      MIIEDzCCAvegAwIBAgIU... (Optional: Custom certificate public key)
      -----END CERTIFICATE-----
    key: |
      -----BEGIN PRIVATE KEY-----
      MIIEvgIBADANBgkqhkiG9w... (Optional: Custom certificate private key)
      -----END PRIVATE KEY-----
```

### 2. Passthrough Route (End-to-End TLS)
The HAProxy router does not terminate TLS. It inspects the SNI (Server Name Indication) header to determine where to route the packet and passes the encrypted traffic directly to the backend pod. The pod must run its own SSL/TLS server certificate.

```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: passthrough-route
  namespace: my-app
spec:
  host: app-secure.apps.mycluster.example.com
  to:
    kind: Service
    name: secure-backend-service
    weight: 100
  port:
    targetPort: 8443
  tls:
    termination: passthrough
```

### 3. Re-encrypt Route (Double TLS)
The HAProxy router terminates the TLS connection using a public certificate, evaluates routing rules, and then initiates a *new* TLS connection to the backend pod. This is the most secure method as traffic is encrypted at all stages.

```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: reencrypt-route
  namespace: my-app
spec:
  host: app-reencrypt.apps.mycluster.example.com
  to:
    kind: Service
    name: secure-internal-service
    weight: 100
  port:
    targetPort: 8443
  tls:
    termination: reencrypt
    # Destination CA certificate to validate the certificate offered by the pod
    destinationCACertificate: |
      -----BEGIN CERTIFICATE-----
      MIIBojCCAUqgAwIBAgIJ... (CA certificate of the backend pod)
      -----END CERTIFICATE-----
```

---

## Route Tuning via Annotations

OpenShift routes can be customized using HAProxy-specific annotations on the Route resource:

* **Connection Timeout**: Adjust the maximum duration for a request:
  ```yaml
  haproxy.router.openshift.io/timeout: 3m
  ```
* **IP Rate Limiting**: Limit the number of concurrent connections per IP address:
  ```yaml
  haproxy.router.openshift.io/rate-limit-connections: "true"
  haproxy.router.openshift.io/rate-limit-connections.rate: "10"
  ```
* **Cookie-Based Session Affinity (Sticky Sessions)**:
  ```yaml
  haproxy.router.openshift.io/disable_cookie: "false"
  ```
* **URL Rewrite**: Direct sub-paths to backend roots:
  ```yaml
  haproxy.router.openshift.io/rewrite-target: /
  ```

---

## Wildcard Routing

Wildcard routing allows a single route to match any sub-domain under a host. For example, a route configured with host `*.apps.example.com` will match `api.apps.example.com` and `web.apps.example.com`.

### 1. Enable Wildcard Support in the Ingress Controller
By default, the Ingress Controller might block wildcard routes. It must be configured to allow them:

```bash
oc patch ingresscontroller/default -n openshift-ingress-operator --type=merge -p '{"spec":{"routeWildcardPolicy":"All"}}'
```

### 2. Configure a Wildcard Route
Set `wildcardPolicy` to `Subdomain` in the Route specification:

```yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: wildcard-subdomain-route
  namespace: my-app
spec:
  host: wildcard.apps.mycluster.example.com # Base domain name
  wildcardPolicy: Subdomain # Activates wildcard evaluation (*.apps.mycluster.example.com)
  to:
    kind: Service
    name: router-portal-service
  port:
    targetPort: 8080
```

---

## Troubleshooting Routes

1. **Verify Route Admission**:
   Check if the Route has been admitted by the router:
   ```bash
   oc describe route <route-name>
   ```
   Look at the `Status` section under `Requested Handler`.
2. **Check DNS Resolution**:
   Ensure your local machine can resolve the Route's host:
   ```bash
   dig app-edge.apps.mycluster.example.com
   ```
3. **Inspect HAProxy Logs**:
   To view raw router traffic details:
   ```bash
   oc logs -n openshift-ingress deployment/router-default
   ```

---

## Related Notes
- [[SDN-Overview]]
- [[Network-Policies]]
- [[Service-Mesh]]
