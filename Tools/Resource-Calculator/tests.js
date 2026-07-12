document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('target-frame');
    const testLog = document.getElementById('test-log');
    const summaryTotal = document.getElementById('summary-total');
    const summaryPassed = document.getElementById('summary-passed');
    const summaryFailed = document.getElementById('summary-failed');
    const summaryTime = document.getElementById('summary-time');
    const sandboxStatus = document.getElementById('sandbox-status');
    const testStatus = document.getElementById('test-status');
    const btnRestart = document.getElementById('btn-restart-tests');

    let totalTests = 0;
    let passedTests = 0;
    let failedTests = 0;
    let startTime = 0;
    let activeSection = null;

    // Helper: Delay function
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // Setup: wait for iframe to load, then setup mocking and run suite
    iframe.addEventListener('load', () => {
        sandboxStatus.textContent = "Sandbox Ready";
        sandboxStatus.style.color = "var(--success-green)";
        setupChatbotMock();
        runTestSuite();
    });

    btnRestart.addEventListener('click', () => {
        testLog.innerHTML = '';
        totalTests = 0;
        passedTests = 0;
        failedTests = 0;
        summaryTotal.textContent = 0;
        summaryPassed.textContent = 0;
        summaryFailed.textContent = 0;
        summaryTime.textContent = '0ms';
        testStatus.textContent = 'Reloading sandbox...';
        testStatus.style.color = 'var(--text-secondary)';
        iframe.src = iframe.src; // Reload iframe
    });

    // Mocking the Ollama HTTP API endpoint inside the iframe context
    function setupChatbotMock() {
        const iframeWin = iframe.contentWindow;
        if (!iframeWin) return;

        // Hijack the global fetch function inside the iframe
        iframeWin.fetch = async (url, options) => {
            if (url.includes('/api/tags')) {
                return {
                    ok: true,
                    json: async () => ({
                        models: [{ name: 'qwen' }]
                    })
                };
            }
            if (url.includes('/api/chat')) {
                const body = JSON.parse(options.body);
                const userPrompt = body.messages.find(m => m.role === 'user').content;

                let responseContent = "I am a Red Hat OpenShift Architect. I received your request.";

                if (userPrompt.toLowerCase().includes('kafka') && userPrompt.toLowerCase().includes('50 replicas')) {
                    responseContent = `Based on your request for a large-scale Event Broker deployment:
1. We will allocate 50 application replicas for high scale.
2. We will check the AMQ Streams (Kafka) operator for message broker capabilities.
3. We will enforce High Availability Single Region (ha-single) to ensure zonal distribution of brokers.

Here is the configuration recommendations block to apply:
\`\`\`json
{
  "replicas": 50,
  "kafka": true,
  "sla": "ha-single"
}
\`\`\``;
                }

                return {
                    ok: true,
                    json: async () => ({
                        message: {
                            role: 'assistant',
                            content: responseContent
                        }
                    })
                };
            }

            // Fallback to original fetch if any
            return { ok: false };
        };
    }

    // Assertion Helpers
    function startTestSection(name) {
        activeSection = document.createElement('div');
        activeSection.className = 'log-section';
        activeSection.innerHTML = `
            <div class="log-section-header">
                <span class="section-title">${name}</span>
                <span class="section-status status-pass">RUNNING</span>
            </div>
        `;
        testLog.appendChild(activeSection);
        testLog.scrollTop = testLog.scrollHeight;
    }

    function endTestSection(passed) {
        if (!activeSection) return;
        const statusEl = activeSection.querySelector('.section-status');
        if (passed) {
            statusEl.textContent = "PASSED";
            statusEl.className = "section-status status-pass";
        } else {
            statusEl.textContent = "FAILED";
            statusEl.className = "section-status status-fail";
        }
    }

    function assert(actual, expected, message) {
        totalTests++;
        summaryTotal.textContent = totalTests;

        const entry = document.createElement('div');
        let isPass = false;

        // Handle numeric approximate matches or exact matches
        if (typeof expected === 'number' && typeof actual === 'number') {
            isPass = Math.abs(actual - expected) < 0.1;
        } else {
            isPass = (String(actual).trim() === String(expected).trim());
        }

        if (isPass) {
            passedTests++;
            summaryPassed.textContent = passedTests;
            entry.className = "log-entry pass";
            entry.innerHTML = `
                <span class="log-entry-msg">${message}</span>
                <span class="log-entry-val">${actual} (expected: ${expected})</span>
            `;
        } else {
            failedTests++;
            summaryFailed.textContent = failedTests;
            entry.className = "log-entry fail";
            entry.innerHTML = `
                <span class="log-entry-msg">${message}</span>
                <span class="log-entry-val">FAIL: ${actual} (expected: ${expected})</span>
            `;
            if (activeSection) {
                const statusEl = activeSection.querySelector('.section-status');
                statusEl.textContent = "FAILED";
                statusEl.className = "section-status status-fail";
            }
        }

        if (activeSection) {
            activeSection.appendChild(entry);
        } else {
            testLog.appendChild(entry);
        }
        testLog.scrollTop = testLog.scrollHeight;
        return isPass;
    }

    // Input Setter Wrappers
    function getIframeDoc() {
        return iframe.contentDocument || iframe.contentWindow.document;
    }

    function setSliderValue(id, val) {
        const doc = getIframeDoc();
        const slider = doc.getElementById(id);
        if (!slider) return;
        slider.value = val;
        slider.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function setSelectValue(id, val) {
        const doc = getIframeDoc();
        const select = doc.getElementById(id);
        if (!select) return;
        select.value = val;
        select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function setCheckboxState(id, checked) {
        const doc = getIframeDoc();
        const checkbox = doc.getElementById(id);
        if (!checkbox) return;
        checkbox.checked = checked;
        checkbox.dispatchEvent(new Event('input', { bubbles: true }));
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function getElementText(id) {
        const doc = getIframeDoc();
        const el = doc.getElementById(id);
        return el ? el.textContent.trim() : '';
    }

    function clickElement(id) {
        const doc = getIframeDoc();
        const el = doc.getElementById(id);
        if (el) el.click();
    }

    // Baseline Clean Setup
    function resetCalculatorInputs() {
        setSelectValue('workload-preset', 'custom');
        setSliderValue('input-replicas', 10);
        setSliderValue('input-cpu', 0.5);
        setSliderValue('input-ram', 1.0);
        setSliderValue('input-pvc', 10);
        setSliderValue('input-vms', 0);
        
        setSelectValue('infra-model', 'cloud-managed');
        setCheckboxState('input-zone-intranet', true);
        setCheckboxState('input-zone-dmz', false);
        setCheckboxState('input-zone-airgap', false);

        setCheckboxState('input-service-mesh', false);
        setCheckboxState('input-sec-gitops', false);
        setCheckboxState('input-sec-acs', false);
        setCheckboxState('input-sec-pipelines', false);
        setCheckboxState('input-sec-kafka', false);
        setCheckboxState('input-sec-gateway', false);
        setCheckboxState('input-sec-compliance', false);
        setCheckboxState('input-sec-aap', false);

        setSelectValue('availability-sla', 'ha-single');
        setSelectValue('recovery-sla', 'oadp');
        setSelectValue('node-profile', 'aws-2xl');
        
        setSliderValue('input-growth', 5);
        setSliderValue('input-retention', 12);
        setCheckboxState('input-backup', false);
    }

    // Core Test Runner Suite
    async function runTestSuite() {
        startTime = performance.now();
        testStatus.textContent = 'Running tests...';
        testStatus.style.color = 'var(--platform-blue)';

        let allPassed = true;

        try {
            // -----------------------------------------------------
            // Scenario A: Standard Web App in Intranet Zone (ROSA)
            // -----------------------------------------------------
            resetCalculatorInputs();
            startTestSection("Scenario A: Standard Web Intranet (Managed ROSA)");
            
            // Apply inputs
            setSelectValue('workload-preset', 'custom');
            setSliderValue('input-replicas', 20);
            setSliderValue('input-cpu', 0.5);
            setSliderValue('input-ram', 1.0);
            setSliderValue('input-pvc', 10);
            setSliderValue('input-vms', 0);
            
            setSelectValue('infra-model', 'cloud-managed');
            setCheckboxState('input-zone-intranet', true);
            setCheckboxState('input-zone-dmz', false);
            setCheckboxState('input-zone-airgap', false);

            setCheckboxState('input-service-mesh', true);
            setCheckboxState('input-sec-gitops', true);
            setCheckboxState('input-sec-acs', true);
            setCheckboxState('input-sec-pipelines', false);
            setCheckboxState('input-sec-kafka', false);
            setCheckboxState('input-sec-gateway', false);
            setCheckboxState('input-sec-compliance', false);
            setCheckboxState('input-sec-aap', false);

            setSelectValue('availability-sla', 'ha-single');
            setSelectValue('recovery-sla', 'oadp');
            setSelectValue('node-profile', 'aws-2xl');
            
            setSliderValue('input-growth', 5);
            setSliderValue('input-retention', 12);
            setCheckboxState('input-backup', false);

            await delay(150); // Wait for calculations rendering

            // Assertions
            let secAPassed = true;
            secAPassed &= assert(getElementText('app-cpu-total'), '12.0 Cores', "App Total CPU cores calculation (+0.1 mesh sidecar)");
            secAPassed &= assert(getElementText('app-ram-total'), '22.5 GiB', "App Total RAM calculation (+0.125 GiB mesh sidecar)");
            secAPassed &= assert(getElementText('app-storage-total'), '200 GiB', "App Total storage (20 pods * 10GiB)");
            secAPassed &= assert(getElementText('platform-cp-overhead'), 'Managed ROSA/ARO Control Plane', "Control Plane overhead detection");
            secAPassed &= assert(getElementText('platform-worker-nodes').split(' ')[0], '4', "Bin-packing Worker Nodes required");
            secAPassed &= assert(getElementText('infra-instances'), '4 VM Nodes', "Total Primary VM Node instances");
            secAPassed &= assert(getElementText('infra-storage-projected'), '5.93 TiB', "Projected storage over 12 months retention (including 3x replication)");
            secAPassed &= assert(getElementText('spec-topology'), 'Managed ROSA/ARO Cloud', "Compiled specification topology badge");
            secAPassed &= assert(getElementText('spec-storage'), 'Ceph Block ODF (RBD)', "Compiled specification storage class badge");

            endTestSection(secAPassed);
            allPassed &= secAPassed;

            // -----------------------------------------------------
            // Scenario B: Secure Database Cluster with Active-Passive DR
            // -----------------------------------------------------
            resetCalculatorInputs();
            startTestSection("Scenario B: Disconnected Secure DB (On-Prem / Active-Passive DR)");

            setSelectValue('workload-preset', 'custom');
            setSliderValue('input-replicas', 3);
            setSliderValue('input-cpu', 2.0);
            setSliderValue('input-ram', 8.0);
            setSliderValue('input-pvc', 100);
            setSliderValue('input-vms', 0);

            setSelectValue('infra-model', 'baremetal');
            setCheckboxState('input-zone-intranet', true);
            setCheckboxState('input-zone-airgap', true);
            setCheckboxState('input-zone-dmz', false);

            setCheckboxState('input-service-mesh', false);
            setCheckboxState('input-sec-gitops', true);
            setCheckboxState('input-sec-acs', true);
            setCheckboxState('input-sec-compliance', true);
            setCheckboxState('input-sec-pipelines', false);
            setCheckboxState('input-sec-kafka', false);
            setCheckboxState('input-sec-aap', false);

            setSelectValue('availability-sla', 'ha-dr-ap');
            setSliderValue('input-standby-capacity', 50);
            setSelectValue('recovery-sla', 'async');
            setSelectValue('node-profile', 'baremetal');

            setSliderValue('input-growth', 10);
            setSliderValue('input-retention', 6);
            setCheckboxState('input-backup', true); // +20% backup multiplier

            await delay(150);

            let secBPassed = true;
            secBPassed &= assert(getElementText('app-cpu-total'), '6.0 Cores', "App DB Core CPU allocation");
            secBPassed &= assert(getElementText('app-ram-total'), '24.0 GiB', "App DB Core Memory allocation");
            secBPassed &= assert(getElementText('platform-cp-overhead').split(' ')[0], '3', "On-prem Master nodes overhead");
            secBPassed &= assert(getElementText('platform-worker-nodes').split(' ')[0], '2', "Bin-packing Baremetal Worker Nodes (Min 2 Workers)");
            // Primary VMs: master (3) + workers (2) = 5 VM nodes
            secBPassed &= assert(getElementText('infra-instances'), '5 VM Nodes', "Primary site VMs count (masters + workers)");
            // Standby VMs: standby workers (50% of 2 workers = 1 standby worker) + standby masters (3) = 4 nodes
            secBPassed &= assert(getElementText('infra-instances-dr'), '4 VM Nodes (Region B)', "Standby site VMs count (masters + workers)");
            secBPassed &= assert(getElementText('spec-storage'), 'ODF Regional-DR Async Mirroring', "Disaster Recovery storage class classification");
            secBPassed &= assert(getElementText('spec-security'), 'Airgapped Quay Registry Mirror', "Disconnected security zone Quay mirror badge");

            endTestSection(secBPassed);
            allPassed &= secBPassed;

            // -----------------------------------------------------
            // Scenario C: AI Workloads & OpenShift Virtualization
            // -----------------------------------------------------
            resetCalculatorInputs();
            startTestSection("Scenario C: Virtualized AI Workloads (Active-Active Sync DR)");

            setSelectValue('workload-preset', 'custom');
            setSliderValue('input-replicas', 2);
            setSliderValue('input-cpu', 4.0);
            setSliderValue('input-ram', 16.0);
            setSliderValue('input-pvc', 250);
            setSliderValue('input-vms', 5); // Forces HA, CephFS ODF storage

            setSelectValue('infra-model', 'baremetal');
            setCheckboxState('input-zone-dmz', true);
            setCheckboxState('input-zone-intranet', true);
            setCheckboxState('input-zone-airgap', true);

            setCheckboxState('input-service-mesh', true);
            setCheckboxState('input-sec-pipelines', true);
            setSliderValue('input-concurrent-builds', 4);
            setCheckboxState('input-sec-kafka', true);
            setSliderValue('input-kafka-throughput', 50000);
            setCheckboxState('input-sec-gateway', true); // Locks DMZ zone
            setCheckboxState('input-sec-acs', true);
            setCheckboxState('input-sec-compliance', true);
            setCheckboxState('input-sec-gitops', true);
            setCheckboxState('input-sec-aap', true); // Ansible AAP enabled

            setSelectValue('recovery-sla', 'sync'); // Locks HA to ha-dr-aa
            setSelectValue('node-profile', 'custom');
            
            // Configure custom node CPU & RAM sizes
            const doc = getIframeDoc();
            doc.getElementById('custom-node-cpu').value = 16;
            doc.getElementById('custom-node-ram').value = 64;
            doc.getElementById('custom-node-cpu').dispatchEvent(new Event('input'));
            doc.getElementById('custom-node-ram').dispatchEvent(new Event('input'));
            
            setSliderValue('input-growth', 15);
            setSliderValue('input-retention', 12);
            setCheckboxState('input-backup', true);

            await delay(150);

            let secCPassed = true;
            // Replicas (2) * (4 + 0.1 mesh) = 8.2 Cores
            secCPassed &= assert(getElementText('app-cpu-total'), '8.2 Cores', "App Pods CPU cores count (+mesh sidecar)");
            secCPassed &= assert(getElementText('spec-storage'), 'Ceph ODF Shared CephFS (RWX)', "Sizing storage class classification for virtualization live migrations");
            secCPassed &= assert(getElementText('spec-topology'), 'Federated ACM Multi-Cluster', "Compiled Active-Active Stretch Multi-Cluster topology");
            secCPassed &= assert(getElementText('spec-recovery'), 'MirrorMaker 2 Kafka Sync', "Disaster Recovery Queue Sync Strategy");

            endTestSection(secCPassed);
            allPassed &= secCPassed;

            // -----------------------------------------------------
            // Scenario D: Chatbot Sizing Command Loop
            // -----------------------------------------------------
            resetCalculatorInputs();
            startTestSection("Scenario D: Chatbot AI Sizing Recs Integration");

            // Open Chat panel
            const docFrame = getIframeDoc();
            const chatPanel = docFrame.getElementById('chat-panel');
            if (chatPanel.classList.contains('chat-collapsed')) {
                clickElement('chat-trigger');
                await delay(200);
            }

            // Input user query and click send to trigger mock fetch
            docFrame.getElementById('chat-input').value = "Deploy a Kafka cluster with 50 replicas";
            clickElement('chat-send-btn');
            
            // Wait for Chatbot message to post and execute adjustments
            await delay(600);

            let secDPassed = true;
            // Verify chatbot json parameters mapped back to sizing sliders
            secDPassed &= assert(docFrame.getElementById('input-replicas').value, '50', "Chatbot command mapped to Replicas slider");
            secDPassed &= assert(docFrame.getElementById('input-sec-kafka').checked, true, "Chatbot command mapped to Kafka checkbox");
            secDPassed &= assert(docFrame.getElementById('availability-sla').value, 'ha-single', "Chatbot command mapped to SLA selector");
            // Verify sizing output recalculated (Replicas: 50 * 0.5 CPU = 25.0 Cores)
            secDPassed &= assert(getElementText('app-cpu-total'), '25.0 Cores', "Recalculated Pod CPU cores sizing");

            // Verify IaaS Drawer is synchronized (compute_nodes_count = 8: 5 workers + 3 dedicated Kafka brokers)
            clickElement('btn-trigger-iaas');
            await delay(150);
            const previewText = docFrame.getElementById('code-preview-block').textContent;
            secDPassed &= assert(previewText.includes('compute_nodes_count        = 8'), true, "IaaS Terraform script node counts synchronized with sizing adjustments");

            endTestSection(secDPassed);
            allPassed &= secDPassed;

        } catch (e) {
            console.error("Testing runner failed", e);
            allPassed = false;
            const errDiv = document.createElement('div');
            errDiv.className = 'log-entry fail';
            errDiv.textContent = `Test suite runtime exception: ${e.message}`;
            testLog.appendChild(errDiv);
        }

        // Complete Suite Run
        const duration = Math.round(performance.now() - startTime);
        summaryTime.textContent = `${duration}ms`;

        if (allPassed && failedTests === 0) {
            testStatus.textContent = 'ALL TESTS PASSED';
            testStatus.style.color = 'var(--success-green)';
        } else {
            testStatus.textContent = 'REGRESSION DETECTED';
            testStatus.style.color = 'var(--error-red)';
        }
    }
});
