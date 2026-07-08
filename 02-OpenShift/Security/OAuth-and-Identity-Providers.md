---
tags: [openshift, security, authentication]
status: stub
created: 2025-07-08
---
# OAuth and Identity Providers
> OpenShift includes a built-in OAuth server for authentication. Multiple identity providers can be configured.

## Supported Identity Providers
| Provider | Use Case |
|---|---|
| HTPasswd | Development, small teams |
| LDAP | Enterprise directory integration |
| Active Directory | Windows environments |
| OpenID Connect | SSO (Keycloak, Azure AD, Google) |
| GitHub/GitLab | Developer-focused environments |
| Keystone | OpenStack integration |

## Related Notes
- [[RBAC]], [[SCC-Security-Context-Constraints]]

---
> [!NOTE]
> #todo — Add OAuth configuration examples for LDAP and OIDC.
