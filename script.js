// ========================================
// MODERN INSIGHTENGINE - ENHANCED JAVASCRIPT
// Professional IT Services Application
// ========================================

/* ========================================
   GLOBAL STATE MANAGEMENT
   ======================================== */

// Application State
const AppState = {
    current: 'idle', // idle, running, error
    section: 'validator', // validator, queries, analytics
    mode: 'independent', // independent, conversation, dynamic
    
    // Data Storage
    queryResponses: [],
    validationResults: [],
    queries: [],
    analyticsData: [],
    stagedVersions: [],
    
    // Configuration
    baseUrl: "",
    selectedService: null,
    selectedDomainService: null,
    domainEngineId: null,
    
    // UI State
    validateAllCompleted: false,
    queryCounter: 0,
    
    // Constants
    DOMAIN_SERVICES: ["websitesearch", "sitesearch"],
    API_ENDPOINTS: {
        GET_FILENAMES: "https://deepak-nts0040.csez.zohocorpin.com:8443/wsbotvalidator/getfilenamesfromorg",
        GET_QUERIES: "https://deepak-nts0040.csez.zohocorpin.com:8443/wsbotvalidator/getqueries",
        VALIDATE: "https://deepak-nts0040.csez.zohocorpin.com:8443/wsbotvalidator",
        SAVE_RESULTS: "https://deepak-nts0040.csez.zohocorpin.com:8443/wsbotvalidator/saveresults",
        GET_VALIDATION_DATA: "https://deepak-nts0040.csez.zohocorpin.com:8443/wsbotvalidator/getvalidationdata",
        GET_BEST_SUMMARY: "https://deepak-nts0040.csez.zohocorpin.com:8443/wsbotvalidator/getbestsummary",
        GET_PROMPT: "https://deepak-nts0040.csez.zohocorpin.com:8443/wsbotvalidator/getprompt",
        UPDATE_BASE_URL: "https://deepak-nts0040.csez.zohocorpin.com:8443/wsbotvalidator/updatebaseurl"
    }
};

// API Configuration
const ApiConfig = {
    websitesearch: {
        baseUrl: "https://search.zoho.com/websearch",
        params: {
            lang: { value: "en", enabled: true, description: "Language parameter" },
            site_region: { value: "global", enabled: true, description: "Site region" },
            type: { value: "4", enabled: true, description: "Search type" },
            stream: { value: "false", enabled: true, description: "Stream results" },
            no_of_results: { value: "5", enabled: true, description: "Number of results" },
            is_chat: { value: "false", enabled: true, description: "Chat mode" },
            summarize_count: { value: "1", enabled: true, description: "Summary count" },
            is_debug: { value: "false", enabled: true, description: "Debug mode" },
            service_name: { value: "", enabled: true, description: "Service name" }
        }
    },
    sitesearch: {
        baseUrl: "https://search.zoho.com/restapi/sitesearch/beta",
        params: {
            no_of_results: { value: "10", enabled: true, description: "Number of results" },
            summary: { value: "true", enabled: true, description: "Include summary" },
            contains: { value: "true", enabled: true, description: "Contains search" },
            synonym: { value: "false", enabled: true, description: "Synonym search" },
            is_debug: { value: "true", enabled: true, description: "Debug mode" },
            summarize_count: { value: "5", enabled: true, description: "Summary count" },
            is_chat: { value: "false", enabled: true, description: "Chat mode" }
        }
    }
};

/* ========================================
   DOM ELEMENT REFERENCES
   ======================================== */

const Elements = {
    // Navigation
    navTabs: document.querySelectorAll('.nav-tab'),
    sections: {
        queries: document.getElementById('queriesSection'),
        analytics: document.getElementById('analyticsSection'),
        validator: document.getElementById('validatorSection')
    },
    
    // Controls
    domainService: document.getElementById('domainService'),
    engineIdInput: document.getElementById('domainServiveEngineIdInput'),
    serviceSelect: document.getElementById('serviceSelectInput'),
    
    // Status
    appStatus: document.getElementById('app-status'),
    statusText: document.querySelector('.status-text'),
    
    // Action Buttons
    validateAllBtn: document.getElementById('validateAllButton'),
    saveBtn: document.getElementById('saveButton'),
    averageScorePanel: document.getElementById('averageScorePanel'),
    averageScoreValue: document.getElementById('averageScoreValue'),
    
    // Validator Modes
    validatorModes: document.querySelectorAll('.mode-btn'),
    independentBtn: document.getElementById('independentBtn'),
    conversationBtn: document.getElementById('conversationBtn'),
    dynamicBtn: document.getElementById('dynamicBtn'),
    
    // Panels
    independentPanel: document.getElementById('independent-choice-panel'),
    conversationPanel: document.getElementById('conversational-choice-panel'),
    dynamicPanel: document.getElementById('dynamicQueryPanel'),
    apiConfigPanel: document.getElementById('apiConfigPanel'),
    banner: document.getElementById('banner'),
    
    // Results Table
    resultsTable: document.getElementById('results-table'),
    resultsHead: document.getElementById('results-thead'),
    resultsBody: document.getElementById('results-tbody'),
    
    // Analytics
    serviceName: document.getElementById('servicename'),
    availableVersionsList: document.getElementById('available-versions-list'),
    stagedVersionsList: document.getElementById('staged-versions-list'),
    analyzeBtn: document.getElementById('analyze-button'),
    queryForAnalytics: document.getElementById('queryForAnalytics'),
    analysisResults: document.getElementById('analysis-results-stage'),
    
    // Dynamic Validation
    dynamicQueryInput: document.getElementById('dynamicQueryInput'),
    validateDynamicBtn: document.getElementById('validateDynamicBtn'),
    dynamicResults: document.getElementById('dynamicResults'),
    dynamicScore: document.getElementById('dynamicScore'),
    
    // API Config
    toggleConfigBtn: document.getElementById('toggleConfigBtn'),
    configContent: document.getElementById('configContent'),
    configTabs: document.querySelectorAll('.config-tab'),
    setDefaultBtn: document.getElementById('setDefaultBtn'),
    updateUrlBtn: document.getElementById('updateUrlBtn'),
    urlPreview: document.getElementById('urlPreview'),
    
    // Queries
    queriesList: document.getElementById('queriesList'),
    
    // Loading & Notifications
    loadingOverlay: document.getElementById('loadingOverlay'),
    notificationContainer: document.getElementById('notificationContainer')
};

/* ========================================
   INITIALIZATION
   ======================================== */

class InsightEngine {
    constructor() {
        this.init();
    }
    
    async init() {
        try {
            this.showLoading('Initializing InsightEngine...');
            
            // Initialize components
            this.initializeNavigation();
            this.initializeDomainServices();
            this.initializeEventListeners();
            this.initializeApiConfig();
            this.initializeValidatorModes();
            this.initializeDynamicValidation();
            
            // Load initial data
            await this.loadAvailableServices();
            
            // Set initial state
            this.setApplicationState('idle');
            this.showSection('validator');
            
            this.hideLoading();
            this.showNotification('InsightEngine initialized successfully', 'success');
            
        } catch (error) {
            this.hideLoading();
            this.showNotification('Failed to initialize application: ' + error.message, 'error');
            console.error('Initialization error:', error);
        }
    }
    
    /* ========================================
       NAVIGATION MANAGEMENT
       ======================================== */
    
    initializeNavigation() {
        Elements.navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetSection = tab.dataset.tab;
                this.showSection(targetSection);
                this.updateNavigationState(tab);
            });
        });
    }
    
    showSection(sectionName) {
        // Hide all sections
        Object.values(Elements.sections).forEach(section => {
            if (section) {
                section.style.display = 'none';
                section.classList.remove('active');
            }
        });
        
        // Show target section
        const targetSection = Elements.sections[sectionName];
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            AppState.section = sectionName;
            
            // Handle section-specific logic
            this.handleSectionChange(sectionName);
        }
    }
    
    updateNavigationState(activeTab) {
        Elements.navTabs.forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }
    
    handleSectionChange(section) {
        // Reset staged versions when switching sections
        AppState.stagedVersions = [];
        
        // Clear controls based on section
        this.clearControls();
        
        // Section-specific initialization
        switch (section) {
            case 'queries':
                this.initializeQueriesSection();
                break;
            case 'analytics':
                this.initializeAnalyticsSection();
                break;
            case 'validator':
                this.initializeValidatorSection();
                break;
        }
        
        this.setApplicationState('idle');
    }
    
    /* ========================================
       DOMAIN SERVICE MANAGEMENT
       ======================================== */
    
    initializeDomainServices() {
        // Populate domain service dropdown
        AppState.DOMAIN_SERVICES.forEach(service => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = this.formatServiceName(service);
            Elements.domainService.appendChild(option);
        });
        
        // Set default selection
        Elements.domainService.selectedIndex = 0;
        AppState.selectedDomainService = Elements.domainService.value;
    }
    
    formatServiceName(service) {
        return service.replace(/([A-Z])/g, ' $1')
                     .replace(/^./, str => str.toUpperCase())
                     .trim();
    }
    
    /* ========================================
       EVENT LISTENERS
       ======================================== */
    
    initializeEventListeners() {
        // Domain service change
        Elements.domainService?.addEventListener('change', (e) => {
            this.handleDomainServiceChange(e.target.value);
        });
        
        // Engine ID input
        Elements.engineIdInput?.addEventListener('input', () => {
            this.handleEngineIdChange();
        });
        
        // Service selection
        Elements.serviceSelect?.addEventListener('change', (e) => {
            this.handleServiceChange(e.target.value);
        });
        
        // Action buttons
        Elements.validateAllBtn?.addEventListener('click', () => {
            this.handleValidateAll();
        });
        
        Elements.saveBtn?.addEventListener('click', () => {
            this.handleSaveResults();
        });
        
        // Analytics events
        Elements.availableVersionsList?.addEventListener('click', (e) => {
            this.handleVersionSelection(e);
        });
        
        Elements.stagedVersionsList?.addEventListener('click', (e) => {
            this.handleStagedVersionAction(e);
        });
        
        Elements.analyzeBtn?.addEventListener('click', () => {
            this.handleAnalyze();
        });
        
        // Validator mode switching
        Elements.validatorModes.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchValidatorMode(btn.dataset.mode);
            });
        });
        
        // Dynamic validation
        Elements.validateDynamicBtn?.addEventListener('click', () => {
            this.handleDynamicValidation();
        });
        
        // Auto-resize textarea
        Elements.dynamicQueryInput?.addEventListener('input', () => {
            this.autoResizeTextarea(Elements.dynamicQueryInput);
        });
    }
    
    /* ========================================
       APPLICATION STATE MANAGEMENT
       ======================================== */
    
    setApplicationState(state) {
        AppState.current = state;
        
        // Update status indicator
        if (Elements.appStatus) {
            Elements.appStatus.className = `status-indicator ${state}`;
        }
        
        // Update status text
        if (Elements.statusText) {
            const statusMessages = {
                idle: 'Ready',
                running: 'Processing...',
                error: 'Error'
            };
            Elements.statusText.textContent = statusMessages[state] || 'Unknown';
        }
        
        // Disable/enable controls
        const isRunning = state === 'running';
        if (Elements.domainService) Elements.domainService.disabled = isRunning;
        if (Elements.engineIdInput) Elements.engineIdInput.disabled = isRunning;
        if (Elements.serviceSelect) Elements.serviceSelect.disabled = isRunning;
    }
    
    clearControls() {
        // Hide action buttons
        if (Elements.validateAllBtn) Elements.validateAllBtn.style.display = 'none';
        if (Elements.saveBtn) Elements.saveBtn.style.display = 'none';
        if (Elements.averageScorePanel) Elements.averageScorePanel.style.display = 'none';
        
        // Clear data
        AppState.queryResponses = [];
        AppState.validationResults = [];
        AppState.validateAllCompleted = false;
        
        // Clear results table
        if (Elements.resultsBody) {
            Elements.resultsBody.innerHTML = '';
        }
        
        // Reset average score
        if (Elements.averageScoreValue) {
            Elements.averageScoreValue.textContent = '--';
        }
    }
    
    updateControlsVisibility() {
        if (AppState.section === 'validator' && AppState.queryResponses.length > 0) {
            if (Elements.validateAllBtn) Elements.validateAllBtn.style.display = 'inline-flex';
            if (Elements.saveBtn) Elements.saveBtn.style.display = 'inline-flex';
            if (Elements.averageScorePanel) Elements.averageScorePanel.style.display = 'flex';
        }
    }
    
    /* ========================================
       SERVICE MANAGEMENT
       ======================================== */
    
    async loadAvailableServices() {
        try {
            const url = `${AppState.API_ENDPOINTS.GET_FILENAMES}?org=${AppState.selectedDomainService}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to load services: ${response.statusText}`);
            }
            
            const data = await response.json();
            const services = data.filenames || [];
            
            this.updateServiceSelect(services);
            return services;
            
        } catch (error) {
            console.error('Error loading services:', error);
            this.showNotification('Failed to load available services', 'error');
            return [];
        }
    }
    
    updateServiceSelect(services) {
        if (!Elements.serviceSelect) return;
        
        // Clear existing options except placeholder
        Elements.serviceSelect.innerHTML = '<option value="" disabled selected>Select a service...</option>';
        
        // Add service options
        services.forEach((service, index) => {
            const option = document.createElement('option');
            option.value = service;
            option.textContent = service;
            option.id = `serviceOption-${index}`;
            Elements.serviceSelect.appendChild(option);
        });
    }
    
    async loadQueriesForService(serviceName, orgName) {
        try {
            const url = `${AppState.API_ENDPOINTS.GET_QUERIES}?filename=${serviceName}&org=${orgName}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to load queries: ${response.statusText}`);
            }
            
            const data = await response.json();
            if (!data.queryset) {
                throw new Error("No queries found for this service");
            }
            
            AppState.queries = data.queryset;
            AppState.baseUrl = data.baseUrl;
            
            return data.queryset;
            
        } catch (error) {
            console.error('Error loading queries:', error);
            this.showNotification('Failed to load queries for service', 'error');
            return null;
        }
    }
    
    /* ========================================
       EVENT HANDLERS
       ======================================== */
    
    handleDomainServiceChange(selectedService) {
        AppState.selectedDomainService = selectedService;
        this.clearControls();
        
        // Show/hide engine ID input for sitesearch
        if (Elements.engineIdInput) {
            if (selectedService === 'sitesearch') {
                Elements.engineIdInput.style.display = 'block';
                Elements.engineIdInput.focus();
            } else {
                Elements.engineIdInput.style.display = 'none';
            }
        }
        
        // Reset service selection
        if (Elements.serviceSelect) {
            Elements.serviceSelect.selectedIndex = 0;
        }
        
        // Reload available services
        this.loadAvailableServices();
    }
    
    handleEngineIdChange() {
        // Reset service selection when engine ID changes
        if (Elements.serviceSelect) {
            Elements.serviceSelect.selectedIndex = 0;
        }
        this.clearControls();
    }
    
    async handleServiceChange(selectedService) {
        if (!selectedService) return;
        
        AppState.selectedService = selectedService;
        
        // Validate engine ID for sitesearch
        if (AppState.selectedDomainService === 'sitesearch') {
            AppState.domainEngineId = Elements.engineIdInput?.value?.trim();
            if (!AppState.domainEngineId || !this.validateEngineId(AppState.domainEngineId)) {
                this.showNotification('Please enter a valid Engine ID for SiteSearch', 'warning');
                return;
            }
        }
        
        this.clearControls();
        this.hideBanner();
        
        try {
            const queries = await this.loadQueriesForService(selectedService, AppState.selectedDomainService);
            
            if (queries) {
                switch (AppState.section) {
                    case 'validator':
                        await this.startQueryValidation(queries);
                        break;
                    case 'queries':
                        this.displayQueries(queries);
                        break;
                    case 'analytics':
                        await this.setupAnalytics(selectedService);
                        break;
                }
            }
            
        } catch (error) {
            this.showNotification('Failed to process selected service', 'error');
            console.error('Service change error:', error);
        }
    }
    
    validateEngineId(engineId) {
        return /^[0-9]{1,19}$/.test(engineId);
    }
    
    /* ========================================
       QUERIES SECTION
       ======================================== */
    
    initializeQueriesSection() {
        // Section-specific initialization
        if (Elements.serviceSelect && Elements.serviceSelect.selectedIndex > 0) {
            const selectedService = Elements.serviceSelect.value;
            this.handleServiceChange(selectedService);
        }
    }
    
    displayQueries(queries) {
        if (!Elements.queriesList || !queries) return;
        
        if (queries.length === 0) {
            Elements.queriesList.innerHTML = this.createEmptyState('No queries found', 'Select a different service to view queries');
            return;
        }
        
        const queriesHtml = queries.map((query, index) => `
            <div class="query-item">
                <div class="query-number">${index + 1}</div>
                <div class="query-text">${this.escapeHtml(query)}</div>
            </div>
        `).join('');
        
        Elements.queriesList.innerHTML = `
            <div class="queries-header">
                <h3>Queries for ${this.escapeHtml(AppState.selectedService)}</h3>
                <div class="queries-count">${queries.length} queries</div>
            </div>
            <div class="queries-grid">
                ${queriesHtml}
            </div>
        `;
    }
    
    /* ========================================
       ANALYTICS SECTION
       ======================================== */
    
    initializeAnalyticsSection() {
        // Reset analytics state
        AppState.stagedVersions = [];
        AppState.analyticsData = [];
        
        if (Elements.stagedVersionsList) {
            Elements.stagedVersionsList.innerHTML = this.createEmptyStaging();
        }
        
        if (Elements.analysisResults) {
            Elements.analysisResults.innerHTML = '';
            Elements.analysisResults.style.display = 'none';
        }
        
        if (Elements.queryForAnalytics) {
            Elements.queryForAnalytics.style.display = 'none';
        }
        
        // Initialize if service is already selected
        if (Elements.serviceSelect && Elements.serviceSelect.selectedIndex > 0) {
            const selectedService = Elements.serviceSelect.value;
            this.setupAnalytics(selectedService);
        }
    }
    
    async setupAnalytics(serviceName) {
        try {
            AppState.selectedService = serviceName;
            
            if (Elements.serviceName) {
                Elements.serviceName.textContent = serviceName;
            }
            
            // Load available versions
            const versions = await this.loadVersionsForService(serviceName);
            this.renderAvailableVersions(versions);
            
            // Load queries for analysis
            const queries = await this.loadQueriesForService(serviceName, AppState.selectedDomainService);
            if (queries && Elements.queryForAnalytics) {
                this.populateQuerySelector(queries);
                Elements.queryForAnalytics.style.display = 'block';
            }
            
        } catch (error) {
            this.showNotification('Failed to setup analytics', 'error');
            console.error('Analytics setup error:', error);
        }
    }
    
    async loadVersionsForService(serviceName) {
        try {
            const url = `${AppState.API_ENDPOINTS.GET_FILENAMES.replace('getfilenamesfromorg', 'getfilenames')}?org=${AppState.selectedDomainService}&filename=${serviceName}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to load versions: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data.filenames || [];
            
        } catch (error) {
            console.error('Error loading versions:', error);
            return [];
        }
    }
    
    renderAvailableVersions(versions) {
        if (!Elements.availableVersionsList || !versions) return;
        
        if (versions.length === 0) {
            Elements.availableVersionsList.innerHTML = this.createEmptyState('No versions found', 'No version data available for this service');
            return;
        }
        
        const versionsHtml = versions.map(version => {
            const versionId = version.filename.split('$$')[1];
            const isStaged = AppState.stagedVersions.some(staged => staged.id === versionId);
            
            return `
                <div class="version-card" data-version-id="${versionId}" data-filename="${version.filename}">
                    <div class="version-name">
                        <a href="#" onclick="app.openVersionPrompt('${version.filename}', '${versionId}', '${AppState.selectedService}')" class="version-link">
                            Version ${versionId}
                        </a>
                    </div>
                    <div class="version-actions">
                        <button class="action-btn small ${isStaged ? 'secondary' : 'primary'}" 
                                onclick="app.toggleVersionStaging('${versionId}', '${version.filename}')"
                                ${isStaged ? 'disabled' : ''}>
                            ${isStaged ? 'Added ✓' : 'Add +'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        Elements.availableVersionsList.innerHTML = versionsHtml;
    }
    
    populateQuerySelector(queries) {
        if (!Elements.queryForAnalytics || !queries) return;
        
        Elements.queryForAnalytics.innerHTML = '';
        queries.forEach(query => {
            const option = document.createElement('option');
            option.value = query;
            option.textContent = query;
            Elements.queryForAnalytics.appendChild(option);
        });
        
        if (queries.length > 0) {
            Elements.queryForAnalytics.selectedIndex = 0;
        }
    }
    
    toggleVersionStaging(versionId, filename) {
        const existingIndex = AppState.stagedVersions.findIndex(v => v.id === versionId);
        
        if (existingIndex >= 0) {
            // Remove from staging
            AppState.stagedVersions.splice(existingIndex, 1);
            AppState.analyticsData = AppState.analyticsData.filter(data => data.versionId !== versionId);
        } else {
            // Add to staging
            AppState.stagedVersions.push({ id: versionId, filename });
            this.loadAnalyticsData(versionId, filename);
        }
        
        this.renderStagedVersions();
        this.renderAvailableVersions(this.getCurrentVersions());
        this.updateAnalyzeButton();
    }
    
    renderStagedVersions() {
        if (!Elements.stagedVersionsList) return;
        
        if (AppState.stagedVersions.length === 0) {
            Elements.stagedVersionsList.innerHTML = this.createEmptyStaging();
            return;
        }
        
        const stagedHtml = AppState.stagedVersions.map(version => `
            <div class="staged-item">
                <span>Version ${version.id}</span>
                <button class="remove-btn" onclick="app.toggleVersionStaging('${version.id}', '${version.filename}')">×</button>
            </div>
        `).join('');
        
        Elements.stagedVersionsList.innerHTML = stagedHtml;
    }
    
    updateAnalyzeButton() {
        if (!Elements.analyzeBtn) return;
        
        const count = AppState.stagedVersions.length;
        const canAnalyze = count >= 2;
        
        Elements.analyzeBtn.disabled = !canAnalyze;
        Elements.analyzeBtn.querySelector('span').textContent = 
            canAnalyze ? `Analyze (${count} Versions)` : `Analyze (${count}/2 Versions Selected)`;
    }
    
    async loadAnalyticsData(versionId, filename) {
        try {
            const url = `${AppState.API_ENDPOINTS.GET_VALIDATION_DATA}?org=${AppState.selectedDomainService}&filename=${AppState.selectedService}&version=${filename}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to load analytics data: ${response.statusText}`);
            }
            
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            
            const analyticsEntry = {
                versionId,
                filename,
                timestamp: data.timestamp,
                data: data.validationresults.map(result => ({
                    query: result.query,
                    summary: result.summary.snippet || result.summary.summary,
                    urls: result.summary.results.map(doc => doc.url),
                    score: result.validation.score
                }))
            };
            
            AppState.analyticsData.push(analyticsEntry);
            
        } catch (error) {
            console.error('Error loading analytics data:', error);
            this.showNotification('Failed to load analytics data for version ' + versionId, 'error');
        }
    }
    
    async handleAnalyze() {
        if (AppState.stagedVersions.length < 2) return;
        
        try {
            this.setAnalyzeButtonLoading(true);
            
            const selectedQuery = Elements.queryForAnalytics?.value;
            if (!selectedQuery) {
                throw new Error('No query selected for analysis');
            }
            
            // Get best summary analysis
            const bestSummaryResult = await this.getBestSummaryAnalysis(selectedQuery);
            
            // Perform comparison analysis
            const analysisResults = this.performQueryAnalysis(selectedQuery, bestSummaryResult);
            
            // Render results
            this.renderAnalysisResults(analysisResults);
            
            if (Elements.analysisResults) {
                Elements.analysisResults.style.display = 'grid';
            }
            
        } catch (error) {
            this.showNotification('Analysis failed: ' + error.message, 'error');
            console.error('Analysis error:', error);
        } finally {
            this.setAnalyzeButtonLoading(false);
        }
    }
    
    async getBestSummaryAnalysis(query) {
        try {
            const summariesData = {
                service: AppState.selectedService,
                query: query,
                summaries: AppState.analyticsData
                    .filter(data => AppState.stagedVersions.some(staged => staged.id === data.versionId))
                    .map(data => ({
                        versionId: data.filename,
                        summary: data.data.find(item => item.query === query)?.summary || ''
                    }))
            };
            
            const response = await fetch(AppState.API_ENDPOINTS.GET_BEST_SUMMARY, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ querySummaries: summariesData })
            });
            
            if (!response.ok) {
                throw new Error(`Best summary analysis failed: ${response.statusText}`);
            }
            
            const result = await response.json();
            return result.ranked_summaries || [];
            
        } catch (error) {
            console.error('Best summary analysis error:', error);
            return [];
        }
    }
    
    performQueryAnalysis(query, bestSummaryResult) {
        const relevantData = AppState.analyticsData.filter(data => 
            AppState.stagedVersions.some(staged => staged.id === data.versionId)
        );
        
        return relevantData.map(data => {
            const queryData = data.data.find(item => item.query === query);
            if (!queryData) return null;
            
            const bestSummaryInfo = bestSummaryResult.find(bs => bs.versionId === data.filename);
            
            return {
                versionId: data.versionId,
                filename: data.filename,
                timestamp: data.timestamp,
                summary: queryData.summary,
                urls: queryData.urls,
                score: queryData.score,
                isBestSummary: bestSummaryInfo?.relevance_score === 1,
                summaryScore: bestSummaryInfo?.relevance_score || 0,
                summaryReason: bestSummaryInfo?.reason || 'No analysis available'
            };
        }).filter(Boolean);
    }
    
    renderAnalysisResults(results) {
        if (!Elements.analysisResults || !results) return;
        
        Elements.analysisResults.style.gridTemplateColumns = `repeat(${results.length}, 1fr)`;
        
        const resultsHtml = results.map(result => `
            <div class="result-column">
                <div class="result-header">
                    <div class="result-title">Version ${result.versionId}</div>
                    <div class="timestamp-badge">${result.timestamp}</div>
                </div>
                
                <div class="result-content">
                    <div class="analysis-section">
                        <h5>Summary Analysis</h5>
                        <div class="summary-panel ${result.isBestSummary ? 'best-summary' : ''}">
                            ${result.isBestSummary ? '<div class="best-badge">⭐ Best Summary</div>' : ''}
                            <p>${this.escapeHtml(result.summary)}</p>
                            <div class="summary-metrics">
                                <div><strong>Score:</strong> ${result.summaryScore}</div>
                                <div><strong>Reason:</strong> ${this.escapeHtml(result.summaryReason)}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analysis-section">
                        <h5>URL Analysis</h5>
                        <div class="urls-list">
                            ${result.urls.map((url, index) => `
                                <div class="url-item">
                                    <span class="url-rank">${index + 1}</span>
                                    <a href="${url}" target="_blank" class="url-link">${url}</a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        Elements.analysisResults.innerHTML = resultsHtml;
    }
    
    setAnalyzeButtonLoading(loading) {
        if (!Elements.analyzeBtn) return;
        
        Elements.analyzeBtn.disabled = loading;
        const span = Elements.analyzeBtn.querySelector('span');
        
        if (loading) {
            Elements.analyzeBtn.classList.add('loading');
            span.textContent = 'Analyzing...';
        } else {
            Elements.analyzeBtn.classList.remove('loading');
            this.updateAnalyzeButton();
        }
    }
    
    /* ========================================
       VALIDATOR SECTION
       ======================================== */
    
    initializeValidatorSection() {
        // Initialize validator modes
        this.switchValidatorMode('independent');
        
        // Initialize if service is already selected
        if (Elements.serviceSelect && Elements.serviceSelect.selectedIndex > 0) {
            const selectedService = Elements.serviceSelect.value;
            this.handleServiceChange(selectedService);
        }
    }
    
    initializeValidatorModes() {
        Elements.validatorModes.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchValidatorMode(btn.dataset.mode);
            });
        });
    }
    
    switchValidatorMode(mode) {
        AppState.mode = mode;
        
        // Update button states
        Elements.validatorModes.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        // Show/hide panels
        const panels = {
            independent: Elements.independentPanel,
            conversation: Elements.conversationPanel,
            dynamic: Elements.dynamicPanel
        };
        
        Object.entries(panels).forEach(([panelMode, panel]) => {
            if (panel) {
                panel.style.display = panelMode === mode ? 'block' : 'none';
            }
        });
        
        // Show/hide API config for dynamic mode
        if (Elements.apiConfigPanel) {
            Elements.apiConfigPanel.style.display = mode === 'dynamic' ? 'block' : 'none';
        }
        
        // Update controls visibility
        this.updateModeControls(mode);
        this.hideBanner();
    }
    
    updateModeControls(mode) {
        const showControls = mode === 'independent' && AppState.queryResponses.length > 0;
        
        if (Elements.validateAllBtn) Elements.validateAllBtn.style.display = showControls ? 'inline-flex' : 'none';
        if (Elements.saveBtn) Elements.saveBtn.style.display = showControls ? 'inline-flex' : 'none';
        if (Elements.averageScorePanel) Elements.averageScorePanel.style.display = showControls ? 'flex' : 'none';
    }
    
    async startQueryValidation(queries) {
        if (!queries || queries.length === 0) {
            this.showNotification('No queries available for validation', 'warning');
            return;
        }
        
        try {
            this.setApplicationState('running');
            this.initializeResultsTable();
            
            // Process queries in batches
            await this.processQueriesBatch(queries);
            
            this.updateControlsVisibility();
            this.setApplicationState('idle');
            
        } catch (error) {
            this.setApplicationState('error');
            this.showNotification('Query validation failed: ' + error.message, 'error');
            console.error('Validation error:', error);
        }
    }
    
    initializeResultsTable() {
        if (!Elements.resultsHead || !Elements.resultsBody) return;
        
        Elements.resultsHead.innerHTML = `
            <tr class="table-header">
                <th class="col-no">No.</th>
                <th class="col-query">Query</th>
                <th class="col-summary">Summary</th>
                <th class="col-validation">Validation</th>
                <th class="col-score">Score</th>
                <th class="col-airesponse">AI Response</th>
                <th class="col-aisearchurl">Search URLs</th>
                <th class="col-reason">Reason</th>
                <th class="col-subscores">Sub-scores</th>
                <th class="col-missing">Missing/Improvements</th>
            </tr>
        `;
        
        Elements.resultsBody.innerHTML = '';
        
        // Initialize response arrays
        AppState.queryResponses = new Array(AppState.queries.length).fill(null);
        AppState.validationResults = new Array(AppState.queries.length).fill(null);
    }
    
    async processQueriesBatch(queries) {
        // Create table rows for all queries
        queries.forEach((query, index) => {
            this.createTableRow(query, index);
        });
        
        // Process queries in parallel
        const promises = queries.map((query, index) => 
            this.processQuery(query, index)
        );
        
        await Promise.allSettled(promises);
    }
    
    createTableRow(query, index) {
        if (!Elements.resultsBody) return;
        
        const row = Elements.resultsBody.insertRow();
        row.id = `result-row-${index}`;
        row.classList.add('results-row');
        
        row.innerHTML = `
            <td class="col-no">${index + 1}</td>
            <td class="col-query">${this.escapeHtml(query)}</td>
            <td id="summary-cell-${index}" class="col-summary">
                <div class="loading-dots"><span></span><span></span><span></span></div>
            </td>
            <td id="validation-cell-${index}" class="col-validation">-</td>
            <td id="score-cell-${index}" class="col-score">-</td>
            <td id="airesponse-cell-${index}" class="col-airesponse">-</td>
            <td id="aisearchurl-cell-${index}" class="col-aisearchurl">-</td>
            <td id="reason-cell-${index}" class="col-reason">-</td>
            <td id="subscores-cell-${index}" class="col-subscores">-</td>
            <td id="missing-items-cell-${index}" class="col-missing">-</td>
        `;
    }
    
    async processQuery(query, index) {
        try {
            const response = await this.fetchSummaryFromAPI(query);
            AppState.queryResponses[index] = response;
            this.updateTableRow(index, response.summary, false);
        } catch (error) {
            AppState.queryResponses[index] = { error: error.message };
            this.updateTableRow(index, error.message, true);
        }
    }
    
    updateTableRow(index, content, isError) {
        const summaryCell = document.getElementById(`summary-cell-${index}`);
        const validationCell = document.getElementById(`validation-cell-${index}`);
        
        if (!summaryCell || !validationCell) return;
        
        if (isError) {
            summaryCell.innerHTML = `<div class="error-message">${this.escapeHtml(content)}</div>`;
            validationCell.innerHTML = 'N/A';
        } else {
            this.renderContentWithTruncation(summaryCell, content, 300, true);
            validationCell.innerHTML = `
                <button class="action-btn primary small" onclick="app.validateQuery(${index})">
                    Validate
                </button>
            `;
        }
    }
    
    async fetchSummaryFromAPI(query) {
        const encodedQuery = encodeURIComponent(query);
        let apiUrl;
        
        if (AppState.selectedDomainService === 'websitesearch') {
            apiUrl = `https://search.zoho.com/websearch?lang=en&site_region=global&type=4&stream=false&no_of_results=5&query=${encodedQuery}&is_chat=false&summarize_count=1&is_debug=false&service_name=${AppState.selectedService}`;
        } else if (AppState.selectedDomainService === 'sitesearch' && AppState.domainEngineId) {
            apiUrl = `https://search.zoho.com/restapi/sitesearch/beta/${AppState.domainEngineId}/hybridsearch?no_of_results=10&q=${encodedQuery}&summary=true&contains=true&synonym=false&is_debug=true&summarize_count=5&is_chat=false`;
        } else {
            throw new Error('Invalid API configuration');
        }
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.response?.error_message || response.statusText);
        }
        
        const data = await response.json();
        
        // Process response based on service type
        let summary, results;
        if (AppState.selectedDomainService === 'websitesearch' && data.snippet) {
            summary = data.snippet;
            results = data.results || [];
        } else if (AppState.selectedDomainService === 'sitesearch' && data.response) {
            summary = data.response.summary;
            results = data.response.results || [];
        } else {
            throw new Error('Invalid API response format');
        }
        
        // Enhance summary with links
        if (results.length > 0) {
            summary += '\n\n### Related Links:';
            results.forEach(result => {
                if (result.title && result.url) {
                    summary += `\n* [${result.title}](${result.url})`;
                }
            });
        }
        
        return { summary, rawData: data };
    }
    
    async validateQuery(index) {
        const response = AppState.queryResponses[index];
        if (!response || response.error) {
            this.showNotification('Cannot validate: No valid response available', 'warning');
            return;
        }
        
        const validationCell = document.getElementById(`validation-cell-${index}`);
        const scoreCell = document.getElementById(`score-cell-${index}`);
        
        if (!validationCell || !scoreCell) return;
        
        try {
            // Show loading state
            validationCell.innerHTML = '<div class="loading-spinner"></div>';
            scoreCell.innerHTML = '-';
            
            const validationData = {
                query: AppState.queries[index],
                summary: response.summary,
                searchinfo: response.rawData.results || response.rawData.response?.results || [],
                servicename: AppState.selectedService
            };
            
            const validationResponse = await fetch(AppState.API_ENDPOINTS.VALIDATE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ wsbotresponse: validationData })
            });
            
            if (!validationResponse.ok) {
                throw new Error(`Validation failed: ${validationResponse.statusText}`);
            }
            
            const result = await validationResponse.json();
            const validationResult = result.data?.results?.[0];
            
            if (!validationResult) {
                throw new Error('No validation results returned');
            }
            
            const parsedResult = typeof validationResult === 'string' 
                ? JSON.parse(validationResult) 
                : validationResult;
            
            AppState.validationResults[index] = parsedResult;
            this.displayValidationResult(index, parsedResult);
            this.updateAverageScore();
            
        } catch (error) {
            console.error('Validation error:', error);
            validationCell.innerHTML = `
                <div class="error-message">Failed: ${this.escapeHtml(error.message)}</div>
                <button class="action-btn primary small" onclick="app.validateQuery(${index})">
                    Retry
                </button>
            `;
            AppState.validationResults[index] = { error: error.message };
        }
    }
    
    displayValidationResult(index, result) {
        // Update validation cell
        const validationCell = document.getElementById(`validation-cell-${index}`);
        if (validationCell) {
            validationCell.innerHTML = `
                <button class="action-btn secondary small" onclick="app.validateQuery(${index})">
                    Re-validate
                </button>
            `;
        }
        
        // Update score
        const scoreCell = document.getElementById(`score-cell-${index}`);
        if (scoreCell) {
            const score = result.score || 0;
            const scoreClass = score >= 75 ? 'good' : score >= 50 ? 'ok' : 'bad';
            scoreCell.innerHTML = `<div class="score-bubble ${scoreClass}">${score}</div>`;
        }
        
        // Update other fields
        this.updateResultField(`airesponse-cell-${index}`, result.aiResponse, true, 300);
        this.updateResultField(`reason-cell-${index}`, result.reason, false, 300);
        
        // Update search URLs
        const searchUrlsCell = document.getElementById(`aisearchurl-cell-${index}`);
        if (searchUrlsCell && result.aisearchURL) {
            const urlsHtml = result.aisearchURL.length 
                ? `<div class="url-list">${result.aisearchURL.map(url => 
                    `<div class="url-item"><a href="${url}" target="_blank">${url}</a></div>`
                  ).join('')}</div>`
                : 'No URLs available';
            searchUrlsCell.innerHTML = urlsHtml;
        }
        
        // Update subscores
        const subscoresCell = document.getElementById(`subscores-cell-${index}`);
        if (subscoresCell && result.subscores) {
            const subscoresHtml = Object.entries(result.subscores)
                .map(([key, value]) => `
                    <div class="subscore-item">
                        <span class="subscore-label">${this.escapeHtml(key)}:</span>
                        <span class="subscore-value">${this.escapeHtml(String(value))}</span>
                    </div>
                `).join('');
            subscoresCell.innerHTML = `<div class="subscores-grid">${subscoresHtml}</div>`;
        }
        
        // Update missing items and improvements
        const missingCell = document.getElementById(`missing-items-cell-${index}`);
        if (missingCell) {
            let content = '';
            if (result.missing_items?.length) {
                content += `<strong>Missing Items:</strong><div class="tag-list">`;
                content += result.missing_items.map(item => `<div class="tag-item">${this.escapeHtml(item)}</div>`).join('');
                content += `</div>`;
            }
            if (result.improvements?.length) {
                content += `<strong>Improvements:</strong><div class="tag-list">`;
                content += result.improvements.map(item => `<div class="tag-item">${this.escapeHtml(item)}</div>`).join('');
                content += `</div>`;
            }
            missingCell.innerHTML = content || 'No specific recommendations';
        }
    }
    
    updateResultField(cellId, content, isMarkdown = false, maxLength = null) {
        const cell = document.getElementById(cellId);
        if (!cell) return;
        
        if (!content) {
            cell.innerHTML = 'N/A';
            return;
        }
        
        if (maxLength) {
            this.renderContentWithTruncation(cell, content, maxLength, isMarkdown);
        } else {
            cell.innerHTML = isMarkdown ? this.parseMarkdown(content) : this.escapeHtml(content);
        }
    }
    
    async handleValidateAll() {
        if (AppState.queryResponses.length === 0) {
            this.showNotification('No queries to validate', 'warning');
            return;
        }
        
        try {
            this.setApplicationState('running');
            Elements.validateAllBtn.disabled = true;
            Elements.validateAllBtn.textContent = 'Validating...';
            
            // Validate all queries with valid responses
            const validationPromises = AppState.queryResponses.map((response, index) => 
                response && !response.error ? this.validateQuery(index) : Promise.resolve()
            );
            
            await Promise.allSettled(validationPromises);
            
            Elements.validateAllBtn.disabled = false;
            Elements.validateAllBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                Re-validate All
            `;
            
            this.setApplicationState('idle');
            this.showNotification('Validation completed', 'success');
            
        } catch (error) {
            this.setApplicationState('error');
            this.showNotification('Batch validation failed', 'error');
            console.error('Batch validation error:', error);
        }
    }
    
    async handleSaveResults() {
        if (AppState.validationResults.length === 0) {
            this.showNotification('No validation results to save', 'warning');
            return;
        }
        
        try {
            let serviceName = AppState.selectedService;
            if (AppState.selectedDomainService === 'sitesearch') {
                serviceName = AppState.domainEngineId;
            }
            
            const resultsToSave = AppState.queries.map((query, index) => ({
                query: query,
                summary: AppState.queryResponses[index]?.rawData || "N/A",
                validation: {
                    score: AppState.validationResults[index]?.score || "Not Validated",
                    reason: AppState.validationResults[index]?.reason || "N/A",
                    aiResponse: AppState.validationResults[index]?.aiResponse || "N/A",
                    aisearchURL: AppState.validationResults[index]?.aisearchURL || [],
                    subscores: AppState.validationResults[index]?.subscores || {},
                    improvements: AppState.validationResults[index]?.improvements || [],
                    missing_items: AppState.validationResults[index]?.missing_items || []
                }
            }));
            
            const saveData = {
                servicename: serviceName,
                domain: AppState.selectedDomainService,
                validationresults: resultsToSave
            };
            
            const response = await fetch(AppState.API_ENDPOINTS.SAVE_RESULTS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saveData)
            });
            
            if (!response.ok) {
                throw new Error(`Save failed: ${response.statusText}`);
            }
            
            const result = await response.json();
            if (result.status === 'success') {
                this.showNotification('Results saved successfully', 'success');
            } else {
                throw new Error(result.error || 'Save operation failed');
            }
            
        } catch (error) {
            this.showNotification('Failed to save results: ' + error.message, 'error');
            console.error('Save error:', error);
        }
    }
    
    updateAverageScore() {
        const validScores = AppState.validationResults
            .filter(result => result && typeof result.score === 'number')
            .map(result => result.score);
        
        if (validScores.length === 0) {
            if (Elements.averageScoreValue) {
                Elements.averageScoreValue.textContent = '--';
            }
            return;
        }
        
        const average = validScores.reduce((sum, score) => sum + score, 0) / validScores.length;
        const roundedAverage = Math.round(average);
        
        if (Elements.averageScoreValue) {
            this.animateValue(Elements.averageScoreValue, 0, roundedAverage, 500);
        }
    }
    
    /* ========================================
       DYNAMIC VALIDATION
       ======================================== */
    
    initializeDynamicValidation() {
        if (Elements.dynamicQueryInput) {
            Elements.dynamicQueryInput.addEventListener('input', () => {
                this.autoResizeTextarea(Elements.dynamicQueryInput);
            });
        }
        
        if (Elements.validateDynamicBtn) {
            Elements.validateDynamicBtn.addEventListener('click', () => {
                this.handleDynamicValidation();
            });
        }
        
        // Initialize result tabs
        const resultTabs = document.querySelectorAll('.results-tab');
        resultTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchResultTab(tab.dataset.tab);
            });
        });
    }
    
    async handleDynamicValidation() {
        const query = Elements.dynamicQueryInput?.value?.trim();
        if (!query) {
            this.showNotification('Please enter a query to validate', 'warning');
            return;
        }
        
        try {
            this.setDynamicValidationLoading(true);
            
            // Get summary from API
            const summaryResponse = await this.fetchSummaryFromAPI(query);
            
            // Validate the query
            const validationResult = await this.validateDynamicQuery(query, summaryResponse);
            
            // Display results
            this.displayDynamicResults(validationResult, summaryResponse);
            
            if (Elements.dynamicResults) {
                Elements.dynamicResults.style.display = 'block';
            }
            
        } catch (error) {
            this.showNotification('Dynamic validation failed: ' + error.message, 'error');
            console.error('Dynamic validation error:', error);
        } finally {
            this.setDynamicValidationLoading(false);
        }
    }
    
    async validateDynamicQuery(query, summaryResponse) {
        const validationData = {
            query: query,
            summary: summaryResponse.summary,
            searchinfo: summaryResponse.rawData?.results || summaryResponse.rawData?.response?.results || [],
            servicename: 'dynamic_query'
        };
        
        const response = await fetch(AppState.API_ENDPOINTS.VALIDATE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wsbotresponse: validationData })
        });
        
        if (!response.ok) {
            throw new Error(`Validation failed: ${response.statusText}`);
        }
        
        const result = await response.json();
        const validationResult = result.data?.results?.[0];
        
        if (!validationResult) {
            throw new Error('No validation results returned');
        }
        
        return typeof validationResult === 'string' 
            ? JSON.parse(validationResult) 
            : validationResult;
    }
    
    displayDynamicResults(validationResult, summaryResponse) {
        // Update score
        if (Elements.dynamicScore) {
            const score = validationResult.score || 0;
            const scoreClass = score >= 75 ? 'good' : score >= 50 ? 'ok' : 'bad';
            Elements.dynamicScore.className = `result-score ${scoreClass}`;
            Elements.dynamicScore.textContent = score;
        }
        
        // Update summary tab
        const summaryTab = document.getElementById('dynamicSummary');
        if (summaryTab) {
            summaryTab.innerHTML = this.parseMarkdown(summaryResponse.summary);
        }
        
        // Update details tab
        this.updateDynamicDetail('dynamicAiResponse', validationResult.aiResponse, true);
        this.updateDynamicDetail('dynamicReason', validationResult.reason, false);
        
        // Update search URLs
        const searchUrlsElement = document.getElementById('dynamicSearchUrls');
        if (searchUrlsElement) {
            const urls = validationResult.aisearchURL || [];
            if (urls.length > 0) {
                const urlsHtml = urls.map(url => 
                    `<div class="url-item"><a href="${url}" target="_blank">${url}</a></div>`
                ).join('');
                searchUrlsElement.innerHTML = `<div class="url-list">${urlsHtml}</div>`;
            } else {
                searchUrlsElement.innerHTML = 'No search URLs available';
            }
        }
        
        // Update analysis tab
        this.updateDynamicSubscores(validationResult.subscores);
        this.updateDynamicImprovements(validationResult);
    }
    
    updateDynamicDetail(elementId, content, isMarkdown = false) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = content 
                ? (isMarkdown ? this.parseMarkdown(content) : this.escapeHtml(content))
                : 'N/A';
        }
    }
    
    updateDynamicSubscores(subscores) {
        const subscoresElement = document.getElementById('dynamicSubscores');
        if (!subscoresElement) return;
        
        if (!subscores || Object.keys(subscores).length === 0) {
            subscoresElement.innerHTML = 'No sub-scores available';
            return;
        }
        
        const subscoresHtml = Object.entries(subscores)
            .map(([key, value]) => `
                <div class="subscore-item">
                    <span class="subscore-label">${this.escapeHtml(key)}:</span>
                    <span class="subscore-value">${this.escapeHtml(String(value))}</span>
                </div>
            `).join('');
        
        subscoresElement.innerHTML = `<div class="subscores-grid">${subscoresHtml}</div>`;
    }
    
    updateDynamicImprovements(validationResult) {
        const improvementsElement = document.getElementById('dynamicImprovements');
        if (!improvementsElement) return;
        
        let content = '';
        
        if (validationResult.missing_items?.length) {
            content += '<strong>Missing Items:</strong><div class="tag-list">';
            content += validationResult.missing_items.map(item => 
                `<div class="tag-item">${this.escapeHtml(item)}</div>`
            ).join('');
            content += '</div>';
        }
        
        if (validationResult.improvements?.length) {
            content += '<strong>Improvements:</strong><div class="tag-list">';
            content += validationResult.improvements.map(item => 
                `<div class="tag-item">${this.escapeHtml(item)}</div>`
            ).join('');
            content += '</div>';
        }
        
        improvementsElement.innerHTML = content || 'No specific improvements suggested';
    }
    
    switchResultTab(tabName) {
        // Update tab buttons
        const tabs = document.querySelectorAll('.results-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Update tab content
        const panes = document.querySelectorAll('.tab-pane');
        panes.forEach(pane => {
            pane.classList.toggle('active', pane.id === tabName + 'Tab');
        });
    }
    
    setDynamicValidationLoading(loading) {
        if (!Elements.validateDynamicBtn) return;
        
        Elements.validateDynamicBtn.disabled = loading;
        
        if (loading) {
            Elements.validateDynamicBtn.innerHTML = `
                <div class="loading-spinner"></div>
                Validating...
            `;
        } else {
            Elements.validateDynamicBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                Validate Query
            `;
        }
    }
    
    /* ========================================
       API CONFIGURATION
       ======================================== */
    
    initializeApiConfig() {
        // Toggle config visibility
        if (Elements.toggleConfigBtn) {
            Elements.toggleConfigBtn.addEventListener('click', () => {
                this.toggleApiConfig();
            });
        }
        
        // Config tabs
        Elements.configTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchConfigTab(tab.dataset.service);
            });
        });
        
        // Action buttons
        if (Elements.setDefaultBtn) {
            Elements.setDefaultBtn.addEventListener('click', () => {
                this.setDefaultConfig();
            });
        }
        
        if (Elements.updateUrlBtn) {
            Elements.updateUrlBtn.addEventListener('click', () => {
                this.updateBaseUrl();
            });
        }
        
        // Initialize with default service
        this.switchConfigTab('websitesearch');
        this.updateUrlPreview();
    }
    
    toggleApiConfig() {
        if (!Elements.configContent) return;
        
        const isVisible = Elements.configContent.style.display !== 'none';
        Elements.configContent.style.display = isVisible ? 'none' : 'block';
        
        if (Elements.toggleConfigBtn) {
            Elements.toggleConfigBtn.textContent = isVisible ? 'Configure API' : 'Hide Config';
        }
    }
    
    switchConfigTab(serviceName) {
        // Update tab states
        Elements.configTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.service === serviceName);
        });
        
        // Render config for selected service
        this.renderApiConfig(serviceName);
        this.updateUrlPreview();
    }
    
    renderApiConfig(serviceName) {
        const config = ApiConfig[serviceName];
        if (!config) return;
        
        const paramGrid = document.querySelector('.param-grid');
        if (!paramGrid) return;
        
        paramGrid.innerHTML = '';
        
        Object.entries(config.params).forEach(([key, param]) => {
            const paramCard = document.createElement('div');
            paramCard.className = 'param-card';
            
            paramCard.innerHTML = `
                <div class="param-header">
                    <input type="checkbox" 
                           id="param-${key}" 
                           class="param-checkbox"
                           ${param.enabled ? 'checked' : ''}>
                    <div class="param-name">${key}</div>
                </div>
                <div class="param-description">${param.description}</div>
                <input type="text" 
                       class="param-input" 
                       value="${param.value}"
                       data-param="${key}"
                       ${!param.enabled ? 'disabled' : ''}>
            `;
            
            // Add event listeners
            const checkbox = paramCard.querySelector(`#param-${key}`);
            const input = paramCard.querySelector('.param-input');
            
            checkbox.addEventListener('change', () => {
                param.enabled = checkbox.checked;
                input.disabled = !checkbox.checked;
                this.updateUrlPreview();
            });
            
            input.addEventListener('input', () => {
                param.value = input.value;
                this.updateUrlPreview();
            });
            
            paramGrid.appendChild(paramCard);
        });
    }
    
    updateUrlPreview() {
        const activeTab = document.querySelector('.config-tab.active');
        if (!activeTab || !Elements.urlPreview) return;
        
        const serviceName = activeTab.dataset.service;
        const config = ApiConfig[serviceName];
        if (!config) return;
        
        let url = config.baseUrl;
        const enabledParams = Object.entries(config.params)
            .filter(([key, param]) => param.enabled && param.value)
            .map(([key, param]) => `${key}=${encodeURIComponent(param.value)}`);
        
        if (enabledParams.length > 0) {
            url += '?' + enabledParams.join('&');
        }
        
        Elements.urlPreview.textContent = url;
    }
    
    setDefaultConfig() {
        const activeTab = document.querySelector('.config-tab.active');
        if (!activeTab) return;
        
        const serviceName = activeTab.dataset.service;
        const config = ApiConfig[serviceName];
        if (!config) return;
        
        // Reset to default values
        if (serviceName === 'websitesearch') {
            Object.assign(config.params, {
                lang: { ...config.params.lang, value: "en" },
                site_region: { ...config.params.site_region, value: "global" },
                type: { ...config.params.type, value: "4" },
                stream: { ...config.params.stream, value: "false" },
                no_of_results: { ...config.params.no_of_results, value: "5" },
                is_chat: { ...config.params.is_chat, value: "false" },
                summarize_count: { ...config.params.summarize_count, value: "1" },
                is_debug: { ...config.params.is_debug, value: "false" }
            });
        } else if (serviceName === 'sitesearch') {
            Object.assign(config.params, {
                no_of_results: { ...config.params.no_of_results, value: "10" },
                summary: { ...config.params.summary, value: "true" },
                contains: { ...config.params.contains, value: "true" },
                synonym: { ...config.params.synonym, value: "false" },
                is_debug: { ...config.params.is_debug, value: "true" },
                summarize_count: { ...config.params.summarize_count, value: "5" },
                is_chat: { ...config.params.is_chat, value: "false" }
            });
        }
        
        this.renderApiConfig(serviceName);
        this.updateUrlPreview();
        this.showNotification('Configuration reset to defaults', 'success');
    }
    
    async updateBaseUrl() {
        const activeTab = document.querySelector('.config-tab.active');
        if (!activeTab) return;
        
        const serviceName = activeTab.dataset.service;
        const config = ApiConfig[serviceName];
        if (!config) return;
        
        try {
            Elements.updateUrlBtn.disabled = true;
            Elements.updateUrlBtn.textContent = 'Updating...';
            
            const enabledParams = Object.entries(config.params)
                .filter(([key, param]) => param.enabled && param.value)
                .reduce((acc, [key, param]) => {
                    acc[key] = param.value;
                    return acc;
                }, {});
            
            const updateData = {
                service: serviceName,
                baseUrl: config.baseUrl,
                params: enabledParams
            };
            
            const response = await fetch(AppState.API_ENDPOINTS.UPDATE_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });
            
            if (!response.ok) {
                throw new Error(`Update failed: ${response.statusText}`);
            }
            
            const result = await response.json();
            if (result.status === 'success') {
                this.showNotification('Base URL updated successfully', 'success');
            } else {
                throw new Error(result.message || 'Update failed');
            }
            
        } catch (error) {
            this.showNotification('Failed to update base URL: ' + error.message, 'error');
            console.error('URL update error:', error);
        } finally {
            Elements.updateUrlBtn.disabled = false;
            Elements.updateUrlBtn.textContent = 'Update Base URL';
        }
    }
    
    /* ========================================
       UTILITY METHODS
       ======================================== */
    
    // Global methods for onclick handlers
    openVersionPrompt(filename, versionId, serviceName) {
        const url = `${AppState.API_ENDPOINTS.GET_PROMPT}?key=${encodeURIComponent(filename)}`;
        
        const newWindow = window.open('', '_blank');
        newWindow.document.title = `Version ${versionId} - ${serviceName}`;
        newWindow.document.body.innerHTML = '<div style="padding: 20px; font-family: monospace;">Loading prompt...</div>';
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.SnippetPrompt) {
                    newWindow.document.body.innerHTML = `
                        <div style="padding: 20px; font-family: 'Inter', sans-serif;">
                            <h2 style="color: #1a2332; margin-bottom: 20px;">Version ${versionId} - ${serviceName} Prompt</h2>
                            <pre style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; font-family: 'JetBrains Mono', monospace; line-height: 1.5;">${data.SnippetPrompt}</pre>
                        </div>
                    `;
                } else {
                    newWindow.document.body.innerHTML = `
                        <div style="padding: 20px; color: #ef4444;">
                            Error: ${data.error || 'No prompt found'}
                        </div>
                    `;
                }
            })
            .catch(error => {
                newWindow.document.body.innerHTML = `
                    <div style="padding: 20px; color: #ef4444;">
                        Error loading prompt: ${error.message}
                    </div>
                `;
            });
    }
    
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    parseMarkdown(text) {
        if (!text) return '';
        
        return text
            .replace(/\r\n/g, '\n')
            .replace(/### (.*?)\n/g, '<h4>$1</h4>')
            .replace(/## (.*?)\n/g, '<h3>$1</h3>')
            .replace(/^\* (.*?)$/gm, '<li>$1</li>')
            .replace(/<\/li>\n<li>/g, '</li><li>')
            .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .split(/\n\s*\n/)
            .map(p => p.trim() ? `<p>${p.trim().replace(/\n/g, '<br>')}</p>` : '')
            .join('');
    }
    
    renderContentWithTruncation(element, content, maxLength, isMarkdown = false) {
        if (!content || content.length <= maxLength) {
            element.innerHTML = isMarkdown ? this.parseMarkdown(content) : this.escapeHtml(content);
            return;
        }
        
        const truncated = content.substring(0, maxLength) + '...';
        const fullHtml = isMarkdown ? this.parseMarkdown(content) : `<p>${this.escapeHtml(content)}</p>`;
        const truncatedHtml = isMarkdown ? this.parseMarkdown(truncated) : `<p>${this.escapeHtml(truncated)}</p>`;
        
        element.innerHTML = `
            <div class="content-wrapper">
                <div class="content-short">${truncatedHtml}</div>
                <div class="content-full">${fullHtml}</div>
                <button class="view-more-btn" onclick="this.parentElement.classList.toggle('expanded'); this.textContent = this.parentElement.classList.contains('expanded') ? 'View Less' : 'View More';">
                    View More
                </button>
            </div>
        `;
    }
    
    autoResizeTextarea(textarea) {
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
    
    animateValue(element, start, end, duration) {
        if (!element) return;
        
        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
    
    createEmptyState(title, message) {
        return `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h3>${title}</h3>
                <p>${message}</p>
            </div>
        `;
    }
    
    createEmptyStaging() {
        return `
            <div class="empty-staging">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <p>Add versions to compare</p>
            </div>
        `;
    }
    
    hideBanner() {
        if (Elements.banner) {
            Elements.banner.style.display = 'none';
        }
    }
    
    showLoading(message = 'Loading...') {
        if (Elements.loadingOverlay) {
            const loadingContent = Elements.loadingOverlay.querySelector('.loading-content p');
            if (loadingContent) loadingContent.textContent = message;
            Elements.loadingOverlay.style.display = 'flex';
        }
    }
    
    hideLoading() {
        if (Elements.loadingOverlay) {
            Elements.loadingOverlay.style.display = 'none';
        }
    }
    
    showNotification(message, type = 'info') {
        if (!Elements.notificationContainer) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">${this.getNotificationTitle(type)}</div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="notification-message">${this.escapeHtml(message)}</div>
        `;
        
        Elements.notificationContainer.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    getNotificationTitle(type) {
        const titles = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Information'
        };
        return titles[type] || 'Notification';
    }
    
    getCurrentVersions() {
        // This would need to be implemented based on your current versions data
        // For now, returning empty array as placeholder
        return [];
    }
}

/* ========================================
   INITIALIZATION
   ======================================== */

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.app = new InsightEngine();
});

// Export for global access (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InsightEngine;
}