document.addEventListener('DOMContentLoaded', () => {
    // UI Elements - Inputs
    const workloadPreset = document.getElementById('workload-preset');
    const inputReplicas = document.getElementById('input-replicas');
    const inputCpu = document.getElementById('input-cpu');
    const inputRam = document.getElementById('input-ram');
    const inputPvc = document.getElementById('input-pvc');
    const inputVms = document.getElementById('input-vms');
    const valVms = document.getElementById('val-vms');

    // Infra & Security Zones
    const infraModel = document.getElementById('infra-model');
    const inputZoneDmz = document.getElementById('input-zone-dmz');
    const inputZoneIntranet = document.getElementById('input-zone-intranet');
    const inputZoneAirgap = document.getElementById('input-zone-airgap');

    // Platform Services Checklist
    const inputServiceMesh = document.getElementById('input-service-mesh');
    const inputSecPipelines = document.getElementById('input-sec-pipelines');
    const inputSecKafka = document.getElementById('input-sec-kafka');
    const inputSecGateway = document.getElementById('input-sec-gateway');
    const inputSecAcs = document.getElementById('input-sec-acs');
    const inputSecCompliance = document.getElementById('input-sec-compliance');
    const inputSecGitops = document.getElementById('input-sec-gitops');
    const inputSecAap = document.getElementById('input-sec-aap');
    
    // Concurrent builds controls
    const concurrentBuildsContainer = document.getElementById('concurrent-builds-container');
    const inputConcurrentBuilds = document.getElementById('input-concurrent-builds');
    const valConcurrentBuilds = document.getElementById('val-concurrent-builds');

    // Event Messaging controls
    const kafkaThroughputContainer = document.getElementById('kafka-throughput-container');
    const inputKafkaThroughput = document.getElementById('input-kafka-throughput');
    const valKafkaThroughput = document.getElementById('val-kafka-throughput');

    // HA / DR SLAs
    const availabilitySla = document.getElementById('availability-sla');
    const standbyCapacityContainer = document.getElementById('standby-capacity-container');
    const inputStandbyCapacity = document.getElementById('input-standby-capacity');
    const valStandbyCapacity = document.getElementById('val-standby-capacity');
    const recoverySla = document.getElementById('recovery-sla');

    // Storage Growth
    const inputGrowth = document.getElementById('input-growth');
    const inputRetention = document.getElementById('input-retention');
    const inputBackup = document.getElementById('input-backup');
    
    // Node profile
    const nodeProfile = document.getElementById('node-profile');
    const customNodeContainer = document.getElementById('custom-node-size-container');
    const customNodeCpu = document.getElementById('custom-node-cpu');
    const customNodeRam = document.getElementById('custom-node-ram');

    // UI Elements - Slider Value Labels
    const valReplicas = document.getElementById('val-replicas');
    const valCpu = document.getElementById('val-cpu');
    const valRam = document.getElementById('val-ram');
    const valPvc = document.getElementById('val-pvc');
    const valGrowth = document.getElementById('val-growth');
    const valRetention = document.getElementById('val-retention');

    // UI Elements - Ribbon Outputs
    const ribbonNodes = document.getElementById('ribbon-nodes');
    const ribbonCores = document.getElementById('ribbon-cores');
    const ribbonRam = document.getElementById('ribbon-ram');
    const ribbonStorage = document.getElementById('ribbon-storage');

    // UI Elements - Sizing Cards
    const appCpuTotal = document.getElementById('app-cpu-total');
    const appRamTotal = document.getElementById('app-ram-total');
    const appStorageTotal = document.getElementById('app-storage-total');
    
    const platformCpOverhead = document.getElementById('platform-cp-overhead');
    const platformSysOverhead = document.getElementById('platform-sys-overhead');
    const platformWorkerNodes = document.getElementById('platform-worker-nodes');

    const infraInstances = document.getElementById('infra-instances');
    const infraInstancesDr = document.getElementById('infra-instances-dr');
    const infraStorageProjected = document.getElementById('infra-storage-projected');

    // UI Elements - Compiled Specification Cards
    const specTopology = document.getElementById('spec-topology');
    const specTopologyDesc = document.getElementById('spec-topology-desc');
    const specStorage = document.getElementById('spec-storage');
    const specStorageDesc = document.getElementById('spec-storage-desc');
    const specSecurity = document.getElementById('spec-security');
    const specSecurityDesc = document.getElementById('spec-security-desc');
    const specRecovery = document.getElementById('spec-recovery');
    const specRecoveryDesc = document.getElementById('spec-recovery-desc');
    const specAutomation = document.getElementById('spec-automation');
    const specAutomationDesc = document.getElementById('spec-automation-desc');
    const specDevsecops = document.getElementById('spec-devsecops');
    const specDevsecopsDesc = document.getElementById('spec-devsecops-desc');

    // UI Elements - SVG dynamic nodes mapping
    const svgDynamicElements = document.getElementById('svg-dynamic-elements');
    const regionDivider = document.getElementById('region-divider');
    const regionALabel = document.getElementById('region-a-label');
    const regionBLabel = document.getElementById('region-b-label');
    const laneDmz = document.getElementById('lane-dmz');
    const laneIntranet = document.getElementById('lane-intranet');
    const laneAirgap = document.getElementById('lane-airgap');

    // UI Elements - Storage Chart
    const chartScaleMax = document.getElementById('chart-scale-max');
    const chartScaleMid = document.getElementById('chart-scale-mid');
    const labelProjectedTime = document.getElementById('label-projected-time');
    const barActive = document.getElementById('bar-active-height');
    const barReplicated = document.getElementById('bar-replicated-height');
    const barProjected = document.getElementById('bar-projected-height');

    // UI Elements - Chatbot
    const chatTrigger = document.getElementById('chat-trigger');
    const chatPanel = document.getElementById('chat-panel');
    const btnCloseChat = document.getElementById('btn-close-chat');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const ollamaIndicator = document.getElementById('ollama-status-indicator');
    const ollamaError = document.getElementById('ollama-error');
    const chatBadge = document.getElementById('chat-badge');
    const chatModelSelect = document.getElementById('chat-model-select');
    
    // UI Elements - Chat Settings
    const btnSettingsChat = document.getElementById('btn-settings-chat');
    const chatSettingsBody = document.getElementById('chat-settings-body');
    const promptTextArea = document.getElementById('prompt-text-area');
    const btnSavePrompt = document.getElementById('btn-save-prompt');
    const btnResetPrompt = document.getElementById('btn-reset-prompt');

    // Chat Quick Actions
    const actionExplain = document.getElementById('action-explain');
    const actionScc = document.getElementById('action-scc');
    const actionStorage = document.getElementById('action-storage');

    // Default System Prompt Template (Discovery Consultant)
    const DEFAULT_SYSTEM_PROMPT = `You are a Principal Red Hat OpenShift Architect conducting an interactive architecture discovery session.
Your goal is to translate the user's high-level application descriptions into specific OpenShift hosting and deployment designs.

STEPS TO FOLLOW:
1. Translate the user's workload features into cluster config parameters (replicas, platform services, storage classes, security zones).
2. Review what sizing details are missing to fully complete the design.
3. Output 3 to 4 targeted, technical follow-up questions to ask the user to add-on necessary details (e.g. storage persistence, traffic spikes, security constraints, recovery SLAs).
4. Append a JSON block inside a \`\`\`json block at the very end of your response to programmatically update the control panel inputs.

JSON config fields you can change:
{
  "replicas": 1 to 500 (integer),
  "vms": 0 to 100 (integer),
  "kafka": true/false,
  "gateway3scale": true/false,
  "serviceMesh": true/false,
  "pipelines": true/false,
  "acs": true/false,
  "aap": true/false,
  "sla": "sno" | "ha-single" | "ha-dr-ap" | "ha-dr-aa",
  "recovery": "oadp" | "async" | "sync",
  "dmz": true/false,
  "airgap": true/false
}
Example trailing block:
\`\`\`json
{
  "replicas": 30,
  "kafka": true,
  "sla": "ha-dr-ap"
}
\`\`\``;

    // Global App State
    let currentSizing = {};
    let ollamaAvailable = false;
    let activeSystemPrompt = localStorage.getItem('ollama_system_prompt') || DEFAULT_SYSTEM_PROMPT;

    // Presets
    const presets = {
        web: { replicas: 20, cpu: 0.5, ram: 1.0, pvc: 10 },
        db: { replicas: 3, cpu: 2.0, ram: 8.0, pvc: 100 },
        ai: { replicas: 2, cpu: 4.0, ram: 16.0, pvc: 250 }
    };

    // Node Sizing Profiles Capacity
    const nodeProfiles = {
        'aws-xl': { cpu: 4, ram: 16 },
        'aws-2xl': { cpu: 8, ram: 32 },
        'baremetal': { cpu: 32, ram: 128 }
    };

    function initEvents() {
        workloadPreset.addEventListener('change', handlePresetChange);

        const inputs = [
            inputReplicas, inputCpu, inputRam, inputPvc, inputVms,
            infraModel, inputZoneDmz, inputZoneIntranet, inputZoneAirgap,
            inputServiceMesh, inputSecPipelines, inputSecKafka, inputSecGateway, inputSecAcs, inputSecCompliance, inputSecGitops, inputSecAap,
            inputConcurrentBuilds, inputKafkaThroughput,
            availabilitySla, inputStandbyCapacity, recoverySla,
            inputGrowth, inputRetention, inputBackup,
            nodeProfile, customNodeCpu, customNodeRam
        ];
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input === inputReplicas || input === inputCpu || input === inputRam || input === inputPvc || input === inputVms) {
                    if (workloadPreset.value !== 'custom') {
                        workloadPreset.value = 'custom';
                    }
                }
                updateCalculations();
            });
        });

        chatTrigger.addEventListener('click', toggleChatPanel);
        btnCloseChat.addEventListener('click', toggleChatPanel);
        chatSendBtn.addEventListener('click', handleUserSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserSendMessage();
        });

        actionExplain.addEventListener('click', () => triggerQuickAction('explain'));
        actionScc.addEventListener('click', () => triggerQuickAction('scc'));
        actionStorage.addEventListener('click', () => triggerQuickAction('storage'));

        // Bind Settings Views Toggle Controls
        btnSettingsChat.addEventListener('click', () => {
            const isSettingsVisible = !chatSettingsBody.classList.contains('custom-hidden');
            if (isSettingsVisible) {
                chatSettingsBody.classList.add('custom-hidden');
                chatBody.classList.remove('custom-hidden');
                document.querySelector('.chat-quick-actions').classList.remove('custom-hidden');
                document.querySelector('.chat-footer').classList.remove('custom-hidden');
            } else {
                chatSettingsBody.classList.remove('custom-hidden');
                chatBody.classList.add('custom-hidden');
                document.querySelector('.chat-quick-actions').classList.add('custom-hidden');
                document.querySelector('.chat-footer').classList.add('custom-hidden');
                promptTextArea.value = activeSystemPrompt;
            }
        });

        btnSavePrompt.addEventListener('click', () => {
            const newPrompt = promptTextArea.value.trim();
            if (newPrompt) {
                activeSystemPrompt = newPrompt;
                localStorage.setItem('ollama_system_prompt', newPrompt);
                appendChatMessage('system', 'System prompt updated and saved successfully.');
            }
            chatSettingsBody.classList.add('custom-hidden');
            chatBody.classList.remove('custom-hidden');
            document.querySelector('.chat-quick-actions').classList.remove('custom-hidden');
            document.querySelector('.chat-footer').classList.remove('custom-hidden');
        });

        btnResetPrompt.addEventListener('click', () => {
            promptTextArea.value = DEFAULT_SYSTEM_PROMPT;
            activeSystemPrompt = DEFAULT_SYSTEM_PROMPT;
            localStorage.removeItem('ollama_system_prompt');
            appendChatMessage('system', 'System prompt reset to default architect template.');
            chatSettingsBody.classList.add('custom-hidden');
            chatBody.classList.remove('custom-hidden');
            document.querySelector('.chat-quick-actions').classList.remove('custom-hidden');
            document.querySelector('.chat-footer').classList.remove('custom-hidden');
        });
    }

    function handlePresetChange() {
        const val = workloadPreset.value;
        if (val !== 'custom' && presets[val]) {
            const data = presets[val];
            inputReplicas.value = data.replicas;
            inputCpu.value = data.cpu;
            inputRam.value = data.ram;
            inputPvc.value = data.pvc;
            inputVms.value = 0;
        }
        updateCalculations();
    }

    function toggleChatPanel() {
        chatPanel.classList.toggle('chat-collapsed');
        if (!chatPanel.classList.contains('chat-collapsed')) {
            chatBadge.classList.add('custom-hidden');
            checkOllamaAvailability();
        }
    }

    // MAIN SPEC COMPILER ENGINE WITH CASCADING DEPENDENCY MATRIX
    function updateCalculations() {
        // --- 1. RESOLVE CASCADING CONSTRAINTS BEFORE COMPUTATION ---

        let vms = parseInt(inputVms.value);
        let sla = availabilitySla.value;
        let recovery = recoverySla.value;
        const isManaged = (infraModel.value === 'cloud-managed');
        const pipelinesActive = inputSecPipelines.checked;
        const kafkaActive = inputSecKafka.checked;
        const gatewayActive = inputSecGateway.checked;

        // Rule J: 3scale API Gateway requires Public DMZ zone edge routers
        if (gatewayActive) {
            inputZoneDmz.checked = true;
            inputZoneDmz.disabled = true;
            inputZoneDmz.classList.add('input-locked');
        } else {
            inputZoneDmz.disabled = false;
            inputZoneDmz.classList.remove('input-locked');
        }

        // Rule A: OpenShift Virtualization forces HA
        const snoOption = availabilitySla.querySelector('option[value="sno"]');
        if (vms > 0) {
            snoOption.disabled = true;
            snoOption.classList.add('input-disabled');
            if (sla === 'sno') {
                availabilitySla.value = 'ha-single';
                sla = 'ha-single';
            }
        } else {
            snoOption.disabled = false;
            snoOption.classList.remove('input-disabled');
        }

        // Rule B: Managed ROSA/ARO does not support SNO locally
        if (isManaged) {
            snoOption.disabled = true;
            snoOption.classList.add('input-disabled');
            if (sla === 'sno') {
                availabilitySla.value = 'ha-single';
                sla = 'ha-single';
            }
        }

        // Rule C: Metro Sync DR SLA forces Active-Active Regional DR & Metro Stretch Storage
        const snoSLA = availabilitySla.querySelector('option[value="sno"]');
        const singleSLA = availabilitySla.querySelector('option[value="ha-single"]');
        const apSLA = availabilitySla.querySelector('option[value="ha-dr-ap"]');
        
        if (recovery === 'sync') {
            singleSLA.disabled = true;
            apSLA.disabled = true;
            if (sla !== 'ha-dr-aa') {
                availabilitySla.value = 'ha-dr-aa';
                sla = 'ha-dr-aa';
            }
        } else if (recovery === 'async') {
            singleSLA.disabled = true;
            if (sla === 'sno' || sla === 'ha-single') {
                availabilitySla.value = 'ha-dr-ap';
                sla = 'ha-dr-ap';
            }
            apSLA.disabled = false;
        } else {
            singleSLA.disabled = isManaged || (vms > 0);
            apSLA.disabled = false;
        }

        // Adjust standby pilot light capacity visibility
        if (sla === 'ha-dr-ap') {
            standbyCapacityContainer.classList.remove('custom-hidden');
        } else {
            standbyCapacityContainer.classList.add('custom-hidden');
        }

        // Toggle concurrent builds container
        if (pipelinesActive) {
            concurrentBuildsContainer.classList.remove('custom-hidden');
        } else {
            concurrentBuildsContainer.classList.add('custom-hidden');
        }

        // Toggle Event Messaging slider container
        if (kafkaActive) {
            kafkaThroughputContainer.classList.remove('custom-hidden');
        } else {
            kafkaThroughputContainer.classList.add('custom-hidden');
        }

        // Fetch inputs
        const replicas = parseInt(inputReplicas.value);
        const cpuPerPod = parseFloat(inputCpu.value);
        const ramPerPod = parseFloat(inputRam.value);
        const pvcPerPod = parseFloat(inputPvc.value);
        const concurrentBuilds = pipelinesActive ? parseInt(inputConcurrentBuilds.value) : 0;
        const kafkaThroughput = kafkaActive ? parseInt(inputKafkaThroughput.value) : 0;
        
        const dmzActive = inputZoneDmz.checked;
        const intranetActive = inputZoneIntranet.checked;
        const airgapActive = inputZoneAirgap.checked;

        const serviceMeshActive = inputServiceMesh.checked;
        const acsActive = inputSecAcs.checked;
        const complianceActive = inputSecCompliance.checked;
        const gitopsActive = inputSecGitops.checked;
        const aapActive = inputSecAap.checked;

        const standbyCapacity = parseInt(inputStandbyCapacity.value);
        const growth = parseFloat(inputGrowth.value);
        const retentionMonths = parseInt(inputRetention.value);
        const includeBackup = inputBackup.checked;
        const profile = nodeProfile.value;

        // Sync slider labels
        valReplicas.textContent = replicas;
        valCpu.textContent = cpuPerPod.toFixed(1);
        valRam.textContent = ramPerPod.toFixed(2);
        valPvc.textContent = pvcPerPod;
        valVms.textContent = vms;
        valConcurrentBuilds.textContent = concurrentBuilds;
        valKafkaThroughput.textContent = kafkaThroughput;
        valGrowth.textContent = growth;
        valRetention.textContent = retentionMonths;
        valStandbyCapacity.textContent = standbyCapacity;

        // Get node capacity profile
        let nodeCpuCapacity = 8;
        let nodeRamCapacity = 32;
        if (profile === 'custom') {
            customNodeContainer.classList.remove('custom-hidden');
            nodeCpuCapacity = parseInt(customNodeCpu.value) || 8;
            nodeRamCapacity = parseInt(customNodeRam.value) || 32;
        } else {
            customNodeContainer.classList.add('custom-hidden');
            nodeCpuCapacity = nodeProfiles[profile].cpu;
            nodeRamCapacity = nodeProfiles[profile].ram;
        }

        // --- 2. CALCULATE CORES & RAM (WITH SIDE CAR SURCHARGES) ---
        
        let actualCpuPerPod = cpuPerPod;
        let actualRamPerPod = ramPerPod;
        if (serviceMeshActive) {
            actualCpuPerPod += 0.1;
            actualRamPerPod += 0.125;
        }

        const totalAppCpu = replicas * actualCpuPerPod;
        const totalAppRam = replicas * actualRamPerPod;
        
        let totalAppStorage = (replicas * pvcPerPod) + (vms * 40) + (concurrentBuilds * 50);
        if (kafkaActive) {
            totalAppStorage += 300 + ((kafkaThroughput / 10000) * 50);
        }

        appCpuTotal.textContent = `${totalAppCpu.toFixed(1)} Cores`;
        appRamTotal.textContent = `${totalAppRam.toFixed(1)} GiB`;
        appStorageTotal.textContent = formatStorageBytes(totalAppStorage);

        // --- 3. PLATFORM SYSTEM OPERATORS OVERHEAD CALCULATIONS ---
        
        let controlPlaneNodes = 3;
        let controlPlaneCpu = 4;
        let controlPlaneRam = 16;
        let systemOperatorCpu = 2.0;
        let systemOperatorRam = 10; // GiB base
        let replicationFactor = 3;

        if (sla === 'sno') {
            controlPlaneNodes = 0;
            controlPlaneCpu = 0;
            controlPlaneRam = 0;
            systemOperatorCpu = 1.0;
            systemOperatorRam = 4;
            replicationFactor = 1;
        } else if (isManaged) {
            controlPlaneNodes = 0;
            controlPlaneCpu = 0;
            controlPlaneRam = 0;
            systemOperatorCpu = 1.0;
            systemOperatorRam = 6;
        } else {
            if (replicas > 250) {
                controlPlaneCpu = 8;
                controlPlaneRam = 32;
            }
        }

        // Add network zone base overheads
        if (dmzActive) systemOperatorCpu += 0.5;
        if (intranetActive) systemOperatorRam += 1;
        if (airgapActive) {
            systemOperatorCpu += 1.0;
            systemOperatorRam += 4;
        }

        // Add platform services operator overheads
        if (serviceMeshActive) {
            systemOperatorCpu += 1.0;
            systemOperatorRam += 4;
        }
        if (gitopsActive) {
            systemOperatorCpu += 0.5;
            systemOperatorRam += 2;
        }
        if (complianceActive) {
            systemOperatorCpu += 0.5;
            systemOperatorRam += 1;
        }

        // Rule H: Tekton Concurrent CI pipelines sizing
        if (pipelinesActive) {
            systemOperatorCpu += (concurrentBuilds * 2.0);
            systemOperatorRam += (concurrentBuilds * 4);
        }

        // Rule K: 3scale API Gateway edge routers and manager overhead
        let gatewayInstances = 0;
        let gatewayCores = 0;
        let gatewayRam = 0;
        if (gatewayActive) {
            systemOperatorCpu += 4.0;
            systemOperatorRam += 8;
            if (sla !== 'sno') {
                gatewayInstances += 1;
            }
        }

        // --- 4. WORKER NODES CALCULATION (RECURSIVE SIDE CAR BIN-PACKING) ---
        
        let baseWorkers = Math.max(
            Math.ceil(targetCpuLoad() / (nodeCpuCapacity * 0.8)), 
            Math.ceil(targetRamLoad() / (nodeRamCapacity * 0.8))
        );

        if (sla === 'sno') {
            baseWorkers = 1;
        } else {
            baseWorkers = Math.ceil(baseWorkers * 1.15);
        }

        if (dmzActive && sla !== 'sno') {
            baseWorkers += 2;
        }

        if (acsActive && sla !== 'sno') {
            const acsCpuOverhead = baseWorkers * 0.2;
            const acsRamOverhead = baseWorkers * 0.5;
            const targetCpuWithAcs = targetCpuLoad() + acsCpuOverhead;
            const targetRamWithAcs = targetRamLoad() + acsRamOverhead;

            let acsWorkers = Math.max(
                Math.ceil(targetCpuWithAcs / (nodeCpuCapacity * 0.8)), 
                Math.ceil(targetRamWithAcs / (nodeRamCapacity * 0.8))
            );
            acsWorkers = Math.ceil(acsWorkers * 1.15);
            if (dmzActive) acsWorkers += 2;
            baseWorkers = acsWorkers;
        }

        function targetCpuLoad() {
            return totalAppCpu + systemOperatorCpu;
        }
        function targetRamLoad() {
            return totalAppRam + systemOperatorRam;
        }

        // Rule G: Ansible AAP Controller nodes configuration
        let aapCores = 0;
        let aapRam = 0;
        let aapInstances = 0;
        let aapStorage = 0;

        if (aapActive) {
            aapInstances += 3;
            aapCores += 12;
            aapRam += 48;
            aapStorage += 100;
            
            const execNodes = Math.max(Math.ceil(baseWorkers / 5), 1);
            aapInstances += execNodes;
            aapCores += (execNodes * 4);
            aapRam += (execNodes * 16);
        }

        // Rule L: AMQ Streams Kafka broker clusters sizing
        let kafkaInstances = 0;
        let kafkaCores = 0;
        let kafkaRam = 0;
        if (kafkaActive && sla !== 'sno') {
            kafkaInstances += 4;
            kafkaCores += 14;
            kafkaRam += 52;
        }

        platformCpOverhead.textContent = controlPlaneNodes > 0 
            ? `${controlPlaneNodes} Nodes (${controlPlaneNodes * controlPlaneCpu} vCPUs / ${controlPlaneNodes * controlPlaneRam}GB)` 
            : (isManaged ? 'Managed ROSA/ARO Control Plane' : '0 Nodes (SNO Consolidated)');
        
        platformSysOverhead.textContent = `${systemOperatorCpu.toFixed(1)} Cores / ${systemOperatorRam} GiB`;
        platformWorkerNodes.textContent = `${baseWorkers} Node${baseWorkers > 1 ? 's' : ''} (${profile === 'custom' ? 'Custom' : profile})`;

        // --- 5. INFRASTRUCTURE & SITE RECOVERY ---
        
        let primaryInstances = sla === 'sno' ? 1 : (baseWorkers + controlPlaneNodes);
        let standbyInstances = 0;
        let storageMirrorFactor = 1;
        let drRegionOverheadCores = 0;
        let drRegionOverheadRam = 0;

        // Rule M: Kafka MirrorMaker 2 replication VMs active
        let mm2Instances = 0;
        if (kafkaActive && hasDR()) {
            mm2Instances += 1;
            primaryInstances += 1;
            systemOperatorCpu += 4.0;
            systemOperatorRam += 8;
            
            drRegionOverheadCores += 4.0;
            drRegionOverheadRam += 8;
        }

        if (sla === 'ha-dr-ap') {
            const standbyWorkers = Math.ceil(baseWorkers * (standbyCapacity / 100));
            standbyInstances = standbyWorkers + (isManaged ? 0 : 3) + mm2Instances + (kafkaActive ? 4 : 0);
            storageMirrorFactor = 2;
        } else if (sla === 'ha-dr-aa') {
            standbyInstances = baseWorkers + (isManaged ? 0 : 3) + mm2Instances + (kafkaActive ? 4 : 0);
            storageMirrorFactor = 2;
        }

        function hasDR() {
            return (sla === 'ha-dr-ap' || sla === 'ha-dr-aa');
        }

        infraInstances.textContent = `${primaryInstances + aapInstances + kafkaInstances + gatewayInstances} VM Node${(primaryInstances + aapInstances + kafkaInstances + gatewayInstances) > 1 ? 's' : ''}`;
        infraInstancesDr.textContent = standbyInstances > 0 
            ? `${standbyInstances} VM Node${standbyInstances > 1 ? 's' : ''} (Region B)` 
            : '0 Instances (No DR Site)';

        // Storage projections
        const replicatedActiveStorage = totalAppStorage * replicationFactor;
        const growthStorageTotal = growth * retentionMonths * 30.4;
        const baseAndGrowthStorage = totalAppStorage + growthStorageTotal + aapStorage;
        const backupMultiplier = includeBackup ? 1.2 : 1.0;
        
        let totalProjectedRawStorage = baseAndGrowthStorage * replicationFactor * backupMultiplier * storageMirrorFactor;
        
        if (airgapActive) {
            let airgapSurcharge = 500;
            if (pipelinesActive) airgapSurcharge += 100;
            totalProjectedRawStorage += (airgapSurcharge * replicationFactor * storageMirrorFactor);
        }

        infraStorageProjected.textContent = formatStorageBytes(totalProjectedRawStorage);

        // Update Ribbon Values
        ribbonNodes.textContent = primaryInstances + standbyInstances + aapInstances + kafkaInstances + gatewayInstances;
        
        const totalCores = (baseWorkers * nodeCpuCapacity) + (controlPlaneNodes * controlPlaneCpu) + aapCores + kafkaCores + (gatewayInstances * 4) +
                             (hasDR() ? ((standbyInstances - mm2Instances - (kafkaActive ? 4 : 0)) * nodeCpuCapacity + drRegionOverheadCores + (kafkaActive ? kafkaCores : 0)) : 0);
        
        const totalRam = (baseWorkers * nodeRamCapacity) + (controlPlaneNodes * controlPlaneRam) + aapRam + kafkaRam + (gatewayInstances * 8) +
                           (hasDR() ? ((standbyInstances - mm2Instances - (kafkaActive ? 4 : 0)) * nodeRamCapacity + drRegionOverheadRam + (kafkaActive ? kafkaRam : 0)) : 0);
        
        ribbonCores.textContent = totalCores.toFixed(1);
        ribbonRam.textContent = `${totalRam} GiB`;
        ribbonStorage.textContent = formatStorageBytes(replicatedActiveStorage);

        // --- 6. ARCHITECTURE SPECIFICATION COMPILATION ---
        compileHostingSpecification(sla, recovery, dmzActive, intranetActive, airgapActive, isManaged, vms, aapActive, acsActive, complianceActive, gitopsActive, pipelinesActive, gatewayActive, kafkaActive);

        // --- 7. DYNAMIC SVG LANE RENDERING ---
        drawDynamicSvg(sla, baseWorkers, controlPlaneNodes, dmzActive, airgapActive, standbyInstances, isManaged, vms, acsActive, aapActive, pipelinesActive, gatewayActive, kafkaActive, mm2Instances);

        // --- 8. STORAGE retention BAR CHART UPDATE ---
        updateStorageChart(totalAppStorage, replicatedActiveStorage, totalProjectedRawStorage, retentionMonths);

        // --- 9. Update state for AI Chatbot ---
        currentSizing = {
            nature: workloadPreset.options[workloadPreset.selectedIndex].text,
            replicas,
            vms,
            cpuPerPod,
            ramPerPod,
            pvcPerPod,
            concurrentBuilds,
            kafkaThroughput,
            slaProfile: availabilitySla.options[availabilitySla.selectedIndex].text,
            recoverySla: recoverySla.options[recoverySla.selectedIndex].text,
            zones: `${dmzActive ? 'Public DMZ, ' : ''}${intranetActive ? 'Secure Intranet, ' : ''}${airgapActive ? 'Airgapped' : ''}`.replace(/,\s*$/, ""),
            services: `${serviceMeshActive ? 'Istio Service Mesh, ' : ''}${pipelinesActive ? 'Tekton Pipelines, ' : ''}${kafkaActive ? 'AMQ Streams Kafka, ' : ''}${gatewayActive ? '3scale API Gateway, ' : ''}${acsActive ? 'StackRox ACS, ' : ''}${complianceActive ? 'Compliance Operator, ' : ''}${gitopsActive ? 'ArgoCD GitOps, ' : ''}${aapActive ? 'Ansible AAP' : ''}`.replace(/,\s*$/, ""),
            infra: infraModel.options[infraModel.selectedIndex].text,
            rawStorage: totalProjectedRawStorage,
            retentionMonths,
            totalNodes: primaryInstances + standbyInstances + aapInstances + kafkaInstances + gatewayInstances
        };
    }

    // COMPILE SPECS PANEL
    function compileHostingSpecification(sla, recovery, dmz, intranet, airgap, isManaged, vms, aap, acs, compliance, gitops, pipelines, gateway, kafka) {
        // Topology
        if (isManaged) {
            specTopology.textContent = 'Managed ROSA/ARO Cloud';
            specTopology.className = 'spec-badge badge-topology';
            specTopologyDesc.textContent = 'Fully managed Red Hat OpenShift Service. SRE management handles master nodes and platform SLAs.';
        } else if (sla === 'sno') {
            specTopology.textContent = 'Single Node OpenShift (SNO)';
            specTopology.className = 'spec-badge badge-topology';
            specTopologyDesc.textContent = 'Consolidated developer cluster. Masters and workers reside on one single physical machine.';
        } else if (sla === 'ha-single') {
            specTopology.textContent = 'Zonal Stretch HA Cluster';
            specTopology.className = 'spec-badge badge-topology';
            specTopologyDesc.textContent = '3-AZ single-region stretch cluster. Control planes and workers spread across zones for local failovers.';
        } else {
            specTopology.textContent = 'Federated ACM Multi-Cluster';
            specTopology.className = 'spec-badge badge-topology';
            specTopologyDesc.textContent = 'Cross-region deployments federated via ACM. Connected using Submariner network tunneling.';
        }

        // Storage
        if (sla === 'sno') {
            specStorage.textContent = 'Local Host Storage';
            specStorage.className = 'spec-badge badge-storage';
            specStorageDesc.textContent = 'Storage is pinned locally. Volume movement or VM live migration is disabled.';
        } else if (vms > 0) {
            specStorage.textContent = 'Ceph ODF Shared CephFS (RWX)';
            specStorage.className = 'spec-badge badge-storage';
            specStorageDesc.textContent = 'Shared file system storage required by OpenShift Virtualization to execute VM live migrations.';
        } else if (recovery === 'sync') {
            specStorage.textContent = 'ODF Metro-DR Sync Storage';
            specStorage.className = 'spec-badge badge-storage';
            specStorageDesc.textContent = 'Ceph synchronous stretch volume replication (<10ms latency network) securing zero data loss.';
        } else if (recovery === 'async') {
            specStorage.textContent = 'ODF Regional-DR Async Mirroring';
            specStorage.className = 'spec-badge badge-storage';
            specStorageDesc.textContent = 'Asynchronous block volume mirroring between Region A and Region B (15m RPO).';
        } else {
            specStorage.textContent = 'Ceph Block ODF (RBD)';
            specStorage.className = 'spec-badge badge-storage';
            specStorageDesc.textContent = 'Standard internal ODF Ceph block storage cluster with 3-way availability zone replication.';
        }

        // Security Zones / Interface Gateways
        if (gateway) {
            specSecurity.textContent = '3scale Edge API Gateway + DMZ';
            specSecurity.className = 'spec-badge badge-security';
            specSecurityDesc.textContent = 'External REST routes governed by 3scale API Manager, proxying incoming requests through isolated APIcast gateways.';
        } else if (airgap) {
            specSecurity.textContent = 'Airgapped Quay Registry Mirror';
            specSecurity.className = 'spec-badge badge-security';
            specSecurityDesc.textContent = 'Fully disconnected cluster network. Security updates sync via offline media Quay mirror bastions.';
        } else if (dmz && intranet) {
            specSecurity.textContent = 'Sharded DMZ + Intranet VPC';
            specSecurity.className = 'spec-badge badge-security';
            specSecurityDesc.textContent = 'External routes sharded to ingress routers on dedicated DMZ nodes. App workloads in private VPC subnets.';
        } else {
            specSecurity.textContent = 'VPC Private Intranet (Multus)';
            specSecurity.className = 'spec-badge badge-security';
            specSecurityDesc.textContent = 'Isolated corporate network. Pods secure isolated network attachments using Multus CNI.';
        }

        // Recovery / Queue Replication
        if (kafka && (sla === 'ha-dr-ap' || sla === 'ha-dr-aa')) {
            specRecovery.textContent = 'MirrorMaker 2 Kafka Sync';
            specRecovery.className = 'spec-badge badge-recovery';
            specRecoveryDesc.textContent = 'Active MirrorMaker 2 event replication syncs message brokers topics across regions (RPO < 10s).';
        } else if (recovery === 'sync') {
            specRecovery.textContent = 'Sync DR Stretch Failover';
            specRecovery.className = 'spec-badge badge-recovery';
            specRecoveryDesc.textContent = 'Near-zero RPO/RTO. Global load balancers execute immediate DNS failover upon node/zone outages.';
        } else if (recovery === 'async') {
            specRecovery.textContent = 'ACM Regional-DR Failover';
            specRecovery.className = 'spec-badge badge-recovery';
            specRecoveryDesc.textContent = 'RTO < 30m / RPO < 15m. Volume promotions and pod updates orchestrated via ACM DR policies.';
        } else {
            specRecovery.textContent = 'OADP backups to object store';
            specRecovery.className = 'spec-badge badge-recovery';
            specRecoveryDesc.textContent = 'RTO/RPO < 24h. Cluster metadata and volume snapshots backed up using OADP to external S3 buckets.';
        }

        // Automation (Ansible AAP & GitOps/Pipelines)
        if (gitops && pipelines) {
            specAutomation.textContent = 'GitOps CD + Tekton CI Pipeline';
            specAutomation.className = 'spec-badge badge-automation';
            specAutomationDesc.textContent = 'Kubernetes-native CI/CD. Builds compiled using Tekton pipelines and syncs configurations via ArgoCD GitOps.';
        } else if (gitops) {
            specAutomation.textContent = 'ArgoCD GitOps CD';
            specAutomation.className = 'spec-badge badge-automation';
            specAutomationDesc.textContent = 'Declarative GitOps engine. Deployment state synchronizes automatically from target configuration Git repository.';
        } else if (pipelines) {
            specAutomation.textContent = 'Tekton Pipelines CI';
            specAutomation.className = 'spec-badge badge-automation';
            specAutomationDesc.textContent = 'Kubernetes-native CI engine. Runs short-lived container build tasks inside private nodes.';
        } else if (aap) {
            specAutomation.textContent = 'Ansible AAP day-2 Orchestrator';
            specAutomation.className = 'spec-badge badge-automation';
            specAutomationDesc.textContent = 'Active Day-2 operations. Auto-provisions controller nodes and scales execution nodes based on worker count.';
        } else {
            specAutomation.textContent = 'Manual OS Admin';
            specAutomation.className = 'spec-badge badge-automation';
            specAutomation.style.borderColor = 'rgba(255,255,255,0.1)';
            specAutomationDesc.textContent = 'No cluster automation configured. Day-2 configuration steps must be performed manually.';
        }

        // DevSecOps
        if (acs && compliance) {
            specDevsecops.textContent = 'StackRox ACS + CIS Compliance';
            specDevsecops.className = 'spec-badge badge-devsecops';
            specDevsecopsDesc.textContent = 'Full compliance scanning and runtime container threat protection via active StackRox collectors on workers.';
        } else if (acs) {
            specDevsecops.textContent = 'StackRox ACS Runtime Guard';
            specDevsecops.className = 'spec-badge badge-devsecops';
            specDevsecopsDesc.textContent = 'Vulnerability scans and network policies security using StackRox collectors on all compute nodes.';
        } else {
            specDevsecops.textContent = 'Standard security limits';
            specDevsecops.className = 'spec-badge badge-devsecops';
            specDevsecops.style.borderColor = 'rgba(255,255,255,0.1)';
            specDevsecopsDesc.textContent = 'Standard OCP security. Pod privileges governed solely by built-in SCC guidelines.';
        }
    }

    // DRAW DYNAMIC SVG NODES
    function drawDynamicSvg(sla, workers, masters, dmz, airgap, standbyNodes, isManaged, vms, acs, aap, pipelines, gateway, kafka, mm2) {
        svgDynamicElements.innerHTML = '';
        const hasDR = (sla === 'ha-dr-ap' || sla === 'ha-dr-aa');
        
        if (hasDR) {
            regionDivider.classList.remove('custom-hidden');
            regionALabel.classList.remove('custom-hidden');
            regionBLabel.classList.remove('custom-hidden');
        } else {
            regionDivider.classList.add('custom-hidden');
            regionALabel.classList.add('custom-hidden');
            regionBLabel.classList.add('custom-hidden');
        }

        laneDmz.style.opacity = dmz ? '1' : '0.2';
        laneIntranet.style.opacity = '1';
        laneAirgap.style.opacity = airgap ? '1' : '0.2';

        const regAX = hasDR ? 200 : 400;

        // 1. DMZ Nodes
        if (dmz) {
            if (gateway) {
                drawNode(regAX - 60, 55, '3scale Gateway 1', 'svg-node-primary');
                drawNode(regAX + 60, 55, '3scale Gateway 2', 'svg-node-primary');
            } else {
                if (sla === 'sno') {
                    drawNode(regAX, 55, 'Router', 'svg-node-primary');
                } else {
                    drawNode(regAX - 60, 55, 'Ingress VM 1', 'svg-node-primary');
                    drawNode(regAX + 60, 55, 'Ingress VM 2', 'svg-node-primary');
                }
            }
        }

        // 2. Intranet Nodes
        if (sla === 'sno') {
            drawNode(regAX, 160, 'SNO All-in-One Node', 'svg-node-primary', 240, 30);
        } else {
            if (!isManaged) {
                drawNode(regAX - 90, 130, 'Master 1', 'svg-node-primary', 70, 18);
                drawNode(regAX, 130, 'Master 2', 'svg-node-primary', 70, 18);
                drawNode(regAX + 90, 130, 'Master 3', 'svg-node-primary', 70, 18);
            } else {
                drawText(regAX, 130, 'ROSA/ARO Managed Control Plane', 'var(--text-secondary)');
            }

            // Draw Workers
            const workerY = 175;
            const drawCount = Math.min(workers, 4);
            const spacing = 75;
            const startX = regAX - ((drawCount - 1) * spacing) / 2;
            
            for (let i = 0; i < drawCount; i++) {
                const classType = acs ? 'svg-node-primary svg-node-overlay' : 'svg-node-primary';
                drawNode(startX + i * spacing, workerY, `Worker ${i + 1}`, classType, 70, 22);
            }
            if (workers > 4) {
                drawText(regAX, workerY + 18, `+ ${workers - 4} more Workers`, '#f5f6f8');
            }
            
            // Draw Virtualization VMs
            if (vms > 0) {
                const drawVms = Math.min(vms, 4);
                for (let i = 0; i < drawVms; i++) {
                    drawVmCircle(startX + i * (spacing * 0.6), workerY - 18);
                }
            }

            // Draw Tekton Pipelines builds executor pod overlay
            if (pipelines) {
                drawTektonExecutor(regAX + 130, workerY);
            }

            // Draw AMQ Streams Kafka Broker cylinder boxes
            if (kafka) {
                drawKafkaBroker(regAX - 145, workerY);
            }
        }

        // 3. Airgap Nodes
        if (airgap) {
            drawNode(regAX, 270, 'Quay Registry Bastion', 'svg-node-primary');
        }

        // 4. Ansible AAP automation pool
        if (aap && sla !== 'sno') {
            const aapX = hasDR ? 60 : 120;
            drawNode(aapX, 150, 'AAP Controller', 'svg-node-dr', 80, 20);
        }

        // 5. MirrorMaker 2
        if (kafka && mm2 > 0 && hasDR) {
            drawMirrorMakerNode(400, 175);
        }

        // Draw Region B Standby Nodes (if DR active)
        if (hasDR && standbyNodes > 0) {
            const regBX = 600;

            if (dmz) {
                if (gateway) {
                    drawNode(regBX - 60, 55, 'DR 3scale Gateway 1', 'svg-node-dr');
                    drawNode(regBX + 60, 55, 'DR 3scale Gateway 2', 'svg-node-dr');
                } else {
                    drawNode(regBX - 60, 55, 'DR Ingress 1', 'svg-node-dr');
                    drawNode(regBX + 60, 55, 'DR Ingress 2', 'svg-node-dr');
                }
            }

            if (!isManaged) {
                drawNode(regBX - 90, 130, 'DR Master 1', 'svg-node-dr', 70, 18);
                drawNode(regBX, 130, 'DR Master 2', 'svg-node-dr', 70, 18);
                drawNode(regBX + 90, 130, 'DR Master 3', 'svg-node-dr', 70, 18);
            } else {
                drawText(regBX, 130, 'Managed DR Control Plane', 'var(--text-secondary)');
            }

            const drWorkersCount = isManaged ? (standbyNodes - mm2 - (kafka ? 4 : 0)) : (standbyNodes - 3 - mm2 - (kafka ? 4 : 0));
            const drawDrCount = Math.min(drWorkersCount, 3);
            if (drawDrCount > 0) {
                const spacing = 75;
                const startX = regBX - ((drawDrCount - 1) * spacing) / 2;
                for (let i = 0; i < drawDrCount; i++) {
                    const classType = acs ? 'svg-node-dr svg-node-overlay' : 'svg-node-dr';
                    drawNode(startX + i * spacing, 175, `DR Worker ${i + 1}`, classType, 70, 22);
                }
                if (drWorkersCount > 3) {
                    drawText(regBX, 193, `+ ${drWorkersCount - 3} more DR Workers`, '#f5f6f8');
                }
            }

            if (kafka) {
                drawKafkaBroker(regBX + 145, 175);
            }

            if (airgap) {
                drawNode(regBX, 270, 'Quay Mirror', 'svg-node-dr');
            }
        }
    }

    function drawNode(x, y, label, typeClass, width = 90, height = 24) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x - width / 2);
        rect.setAttribute('y', y - height / 2);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('rx', '4');
        rect.setAttribute('class', `svg-node ${typeClass}`);
        rect.setAttribute('stroke-width', '1.5');
        svgDynamicElements.appendChild(rect);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 4);
        text.setAttribute('fill', '#ffffff');
        text.setAttribute('font-family', "var(--font-stack)");
        text.setAttribute('font-size', '9.5');
        text.setAttribute('font-weight', '600');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = label;
        svgDynamicElements.appendChild(text);
    }

    function drawVmCircle(x, y) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', '#A300D6');
        circle.setAttribute('stroke', '#e19eff');
        circle.setAttribute('stroke-width', '1');
        svgDynamicElements.appendChild(circle);
    }

    function drawTektonExecutor(x, y) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x - 35);
        rect.setAttribute('y', y - 11);
        rect.setAttribute('width', '70');
        rect.setAttribute('height', '22');
        rect.setAttribute('rx', '3');
        rect.setAttribute('fill', 'rgba(255, 156, 26, 0.15)');
        rect.setAttribute('stroke', '#ff9c1a');
        rect.setAttribute('stroke-width', '1.2');
        svgDynamicElements.appendChild(rect);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 3);
        text.setAttribute('fill', '#ff9c1a');
        text.setAttribute('font-family', "var(--font-stack)");
        text.setAttribute('font-size', '8.5');
        text.setAttribute('font-weight', '600');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = 'Tekton CI';
        svgDynamicElements.appendChild(text);
    }

    function drawKafkaBroker(x, y) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x - 35);
        rect.setAttribute('y', y - 11);
        rect.setAttribute('width', '70');
        rect.setAttribute('height', '22');
        rect.setAttribute('rx', '3');
        rect.setAttribute('fill', 'rgba(0, 189, 174, 0.15)');
        rect.setAttribute('stroke', '#00bdae');
        rect.setAttribute('stroke-width', '1.2');
        svgDynamicElements.appendChild(rect);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 3);
        text.setAttribute('fill', '#00bdae');
        text.setAttribute('font-family', "var(--font-stack)");
        text.setAttribute('font-size', '8.5');
        text.setAttribute('font-weight', '600');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = 'AMQ Streams';
        svgDynamicElements.appendChild(text);
    }

    function drawMirrorMakerNode(x, y) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x - 25);
        rect.setAttribute('y', y - 11);
        rect.setAttribute('width', '50');
        rect.setAttribute('height', '22');
        rect.setAttribute('rx', '3');
        rect.setAttribute('fill', 'rgba(163, 0, 214, 0.15)');
        rect.setAttribute('stroke', '#A300D6');
        rect.setAttribute('stroke-width', '1.2');
        svgDynamicElements.appendChild(rect);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 3);
        text.setAttribute('fill', '#e19eff');
        text.setAttribute('font-family', "var(--font-stack)");
        text.setAttribute('font-size', '8');
        text.setAttribute('font-weight', '600');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = 'MM2 Sync';
        svgDynamicElements.appendChild(text);
    }

    function drawText(x, y, str, color) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('fill', color);
        text.setAttribute('font-family', "var(--font-stack)");
        text.setAttribute('font-size', '9.5');
        text.setAttribute('font-weight', '600');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = str;
        svgDynamicElements.appendChild(text);
    }

    function formatStorageBytes(gigabytes) {
        if (gigabytes >= 1024) {
            return `${(gigabytes / 1024).toFixed(2)} TiB`;
        }
        return `${gigabytes.toFixed(0)} GiB`;
    }

    function updateStorageChart(active, replicated, projected, months) {
        const maxVal = Math.max(active, replicated, projected, 100);
        
        chartScaleMax.textContent = formatStorageBytes(maxVal);
        chartScaleMid.textContent = formatStorageBytes(maxVal / 2);
        labelProjectedTime.textContent = `Projected (${months} mos)`;

        const pctActive = Math.max((active / maxVal) * 100, 5);
        const pctReplicated = Math.max((replicated / maxVal) * 100, 5);
        const pctProjected = Math.max((projected / maxVal) * 100, 5);

        barActive.style.height = `${pctActive}%`;
        barReplicated.style.height = `${pctReplicated}%`;
        barProjected.style.height = `${pctProjected}%`;
    }

    async function checkOllamaAvailability() {
        try {
            const res = await fetch('http://localhost:11434/api/tags', {
                method: 'GET',
                mode: 'cors',
                credentials: 'omit'
            });
            if (res.ok) {
                ollamaAvailable = true;
                ollamaIndicator.className = 'ollama-indicator ollama-active';
                ollamaError.classList.add('custom-hidden');

                const data = await res.json();
                chatModelSelect.innerHTML = '';
                if (data.models && data.models.length > 0) {
                    data.models.forEach(m => {
                        const opt = document.createElement('option');
                        opt.value = m.name;
                        opt.textContent = m.name;
                        chatModelSelect.appendChild(opt);
                    });
                    const hasQwen = Array.from(chatModelSelect.options).some(o => o.value.includes('qwen'));
                    if (hasQwen) {
                        chatModelSelect.value = Array.from(chatModelSelect.options).find(o => o.value.includes('qwen')).value;
                    }
                } else {
                    const opt = document.createElement('option');
                    opt.value = 'qwen';
                    opt.textContent = 'qwen (default)';
                    chatModelSelect.appendChild(opt);
                }
            } else {
                throw new Error('Not OK');
            }
        } catch (e) {
            ollamaAvailable = false;
            ollamaIndicator.className = 'ollama-indicator ollama-inactive';
            ollamaError.classList.remove('custom-hidden');

            chatModelSelect.innerHTML = '';
            const opt = document.createElement('option');
            opt.value = 'qwen';
            opt.textContent = 'qwen (offline)';
            chatModelSelect.appendChild(opt);
        }
    }

    function appendChatMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}-msg`;
        
        if (text.includes('```')) {
            msgDiv.innerHTML = formatMarkdown(text);
        } else {
            msgDiv.textContent = text;
        }

        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function formatMarkdown(text) {
        const parts = text.split(/```/);
        let output = "";
        for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 1) {
                const block = parts[i];
                const lines = block.split('\n');
                const lang = lines[0].trim();
                const code = lines.slice(1).join('\n');
                output += `<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`;
            } else {
                output += escapeHtml(parts[i]).replace(/\n/g, '<br/>');
            }
        }
        return output;
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&amp;gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    async function handleUserSendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        appendChatMessage('user', text);
        chatInput.value = '';

        await getOllamaResponse(text);
    }

    // Programmatically apply AI sizing recommendations parsed from Ollama
    function applyAiAdjustments(config) {
        const adjustedFields = [];

        if (config.replicas !== undefined) {
            inputReplicas.value = config.replicas;
            pulseElement(inputReplicas);
            adjustedFields.push('Replicas');
        }
        if (config.vms !== undefined) {
            inputVms.value = config.vms;
            pulseElement(inputVms);
            adjustedFields.push('Virtualization VMs');
        }
        if (config.kafka !== undefined) {
            inputSecKafka.checked = !!config.kafka;
            pulseElement(inputSecKafka.parentElement);
            adjustedFields.push('AMQ Streams Kafka');
        }
        if (config.gateway3scale !== undefined) {
            inputSecGateway.checked = !!config.gateway3scale;
            pulseElement(inputSecGateway.parentElement);
            adjustedFields.push('3scale API Gateway');
        }
        if (config.serviceMesh !== undefined) {
            inputServiceMesh.checked = !!config.serviceMesh;
            pulseElement(inputServiceMesh.parentElement);
            adjustedFields.push('Service Mesh mTLS');
        }
        if (config.pipelines !== undefined) {
            inputSecPipelines.checked = !!config.pipelines;
            pulseElement(inputSecPipelines.parentElement);
            adjustedFields.push('Tekton Pipelines');
        }
        if (config.acs !== undefined) {
            inputSecAcs.checked = !!config.acs;
            pulseElement(inputSecAcs.parentElement);
            adjustedFields.push('StackRox ACS');
        }
        if (config.aap !== undefined) {
            inputSecAap.checked = !!config.aap;
            pulseElement(inputSecAap.parentElement);
            adjustedFields.push('Ansible AAP');
        }
        if (config.sla !== undefined) {
            availabilitySla.value = config.sla;
            pulseElement(availabilitySla);
            adjustedFields.push('HA Level');
        }
        if (config.recovery !== undefined) {
            recoverySla.value = config.recovery;
            pulseElement(recoverySla);
            adjustedFields.push('Recovery SLA');
        }
        if (config.dmz !== undefined) {
            inputZoneDmz.checked = !!config.dmz;
            pulseElement(inputZoneDmz.parentElement);
            adjustedFields.push('Public DMZ Zone');
        }
        if (config.airgap !== undefined) {
            inputZoneAirgap.checked = !!config.airgap;
            pulseElement(inputZoneAirgap.parentElement);
            adjustedFields.push('Airgapped Local Zone');
        }

        if (adjustedFields.length > 0) {
            if (workloadPreset.value !== 'custom') {
                workloadPreset.value = 'custom';
            }
            updateCalculations();
            
            setTimeout(() => {
                appendChatMessage('system', `AI adjusted sizing parameters: ${adjustedFields.join(', ')}.`);
            }, 500);
        }
    }

    function pulseElement(el) {
        el.classList.add('pulse-highlight');
        setTimeout(() => el.classList.remove('pulse-highlight'), 3000);
    }

    async function triggerQuickAction(type) {
        if (!ollamaAvailable) {
            await checkOllamaAvailability();
            if (!ollamaAvailable) {
                appendChatMessage('assistant', 'Ollama is not running locally. Please run "ollama run qwen" in your terminal first.');
                return;
            }
        }

        let query = '';
        if (type === 'explain') {
            query = `Explain and review my compiled hosting specification:
- Hosting Infrastructure: ${currentSizing.infra}
- Topology Pattern: ${specTopology.textContent} (${specTopologyDesc.textContent})
- Storage Class: ${specStorage.textContent}
- Security Network Zone Model: ${specSecurity.textContent} (Active Zones: ${currentSizing.zones})
- Platform Services Enabled: ${currentSizing.services}
- DR SLA Policy: ${specRecovery.textContent}
- Automation (CI/CD & AAP): ${specAutomation.textContent}
- Compute Nodes: Total ${currentSizing.totalNodes} Instances (${currentSizing.replicas} workload replicas + ${currentSizing.vms} VMs + ${currentSizing.concurrentBuilds} concurrent builds + ${currentSizing.kafkaThroughput ? 'Kafka event broker' : 'No Messaging Broker'})

Provide a detailed summary of the architectural integrity, network boundary sync steps, and zone-failover guidelines.`;
            appendChatMessage('user', 'Explain compiled hosting spec.');
        } else if (type === 'scc') {
            query = `Recommend appropriate Security Context Constraint (SCC) policies for an application running in these zones: ${currentSizing.zones} and using platform services: ${currentSizing.services}. Give a detailed justification from a Red Hat OpenShift Security Architect's perspective and provide a custom SCC YAML example.`;
            appendChatMessage('user', 'Recommend security context constraints.');
        } else if (type === 'storage') {
            query = `Analyze the storage replication profile:
- Sizing Profile: ${currentSizing.nature} (${currentSizing.replicas} Pods + ${currentSizing.vms} VMs + ${currentSizing.concurrentBuilds} Tekton build cache volumes + ${currentSizing.kafkaThroughput ? 'Kafka broker PVCs' : ''})
- Storage Topology: ${specStorage.textContent} (${specStorageDesc.textContent})
- Recovery Objectives: ${specRecovery.textContent}
- Projected Storage Limit: ${formatStorageBytes(currentSizing.rawStorage)} (over ${inputRetention.value} months retention)

Offer recommendations on Ceph pool placement, Metro-DR sync limits, and disconnected backup pruning rules.`;
            appendChatMessage('user', 'Analyze storage failover topology.');
        }

        await getOllamaResponse(query);
    }

    async function getOllamaResponse(userPrompt) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'chat-message assistant-msg';
        loadingDiv.id = 'chat-typing-indicator';
        loadingDiv.innerHTML = '<span class="chat-loading"></span> <span class="chat-loading"></span> <span class="chat-loading"></span>';
        chatBody.appendChild(loadingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        try {
            const payload = {
                model: chatModelSelect.value || 'qwen',
                messages: [
                    { role: 'system', content: activeSystemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                stream: false
            };

            const response = await fetch('http://localhost:11434/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                credentials: 'omit',
                body: JSON.stringify(payload)
            });

            const indicator = document.getElementById('chat-typing-indicator');
            if (indicator) indicator.remove();

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            const reply = data.message.content;
            appendChatMessage('assistant', reply);

            // Execute chatbot commands parsing
            const jsonRegex = /```json\s*(\{[\s\S]*?\})\s*```/;
            const match = reply.match(jsonRegex);
            if (match) {
                try {
                    const config = JSON.parse(match[1]);
                    applyAiAdjustments(config);
                } catch(e) {
                    console.error("AI JSON command parse error", e);
                }
            }

        } catch (err) {
            const indicator = document.getElementById('chat-typing-indicator');
            if (indicator) indicator.remove();

            appendChatMessage('assistant', 'Failed to connect to local Ollama. Start Ollama and run "ollama run qwen" in your terminal.');
            console.error(err);
            ollamaError.classList.remove('custom-hidden');
        }
    }

    initEvents();
    updateCalculations();
    checkOllamaAvailability();
});
