---
tags: [cloud, azure, aro, hybrid]
status: active
created: 2025-07-08
---

# ☁️ ARO — Azure Red Hat OpenShift

> Fully managed OpenShift Container Platform running natively on Microsoft Azure, jointly operated and supported by Microsoft and Red Hat.

---

## Azure Integrations

ARO offers deep integrations into the Azure ecosystem:
- **Microsoft Entra ID (Azure AD):** Native OAuth integration for enterprise user authentication.
- **Azure Virtual Networks (VNet):** Deploy private clusters using custom VNets and express route configs.
- **Azure Disk & Files:** CSI drivers for dynamic persistent volume provisioning.
- **Azure Monitor:** Log forwarding integrations for cluster telemetry.

## Deployment CLI Blueprint

```bash
# 1. Register resource providers
az provider register -n Microsoft.RedHatOpenShift --wait
az provider register -n Microsoft.Compute --wait

# 2. Create resource group and virtual network
az group create --name aro-rg --location eastus
az network vnet create --resource-group aro-rg --name aro-vnet --address-prefixes 10.0.0.0/22

# 3. Create master and worker subnets
az network vnet subnet create --resource-group aro-rg --vnet-name aro-vnet --name master-subnet --address-prefixes 10.0.0.0/23
az network vnet subnet create --resource-group aro-rg --vnet-name aro-vnet --name worker-subnet --address-prefixes 10.0.2.0/23

# 4. Create the ARO Cluster
az aro create --resource-group aro-rg --name aro-cluster \
  --vnet aro-vnet --master-subnet master-subnet --worker-subnet worker-subnet

# 5. Retrieve credentials
az aro list-credentials --name aro-cluster --resource-group aro-rg
```

## Related Notes
- [[ROSA-Red-Hat-OpenShift-on-AWS]] — Managed OpenShift on AWS
- [[Hybrid-Cloud-Strategy]] — Cloud deployment MOC
