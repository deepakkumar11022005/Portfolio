<%-- $Id$ --%>
<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="com.adventnet.zoho.search.website.WsBotQueryScanner" %>
<%@page pageEncoding="UTF-8" %>
<%@ page isELIgnored="true" %>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>InsightEngine — Query Validation & Analytics</title>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lucide/0.263.1/lucide.min.css">
    
    <!-- Styles -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔍</text></svg>">
</head>

<body>
    <div class="app">
        <!-- Enhanced Header -->
        <header class="topbar">
            <div class="topbar-inner">
                <!-- Brand Section -->
                <div class="brand">
                    <div class="brand-logo">
                        <div class="logo-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </div>
                        <div class="logo-pulse"></div>
                    </div>
                    <div class="brand-content">
                        <h1 class="brand-title">InsightEngine</h1>
                        <p class="brand-subtitle">Advanced Query Analytics Platform</p>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <nav class="navigation-tabs">
                    <button id="queriesPageButton" class="nav-tab" data-tab="queries">
                        <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18"></path>
                            <path d="M3 12h18"></path>
                            <path d="M3 18h18"></path>
                        </svg>
                        <span>Queries</span>
                    </button>
                    <button id="analyticsPageButton" class="nav-tab" data-tab="analytics">
                        <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"></path>
                            <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                        <span>Analytics</span>
                    </button>
                    <button id="validatorPageButton" class="nav-tab active" data-tab="validator">
                        <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9,11 12,14 22,4"></polyline>
                            <path d="m21,12v7a2,2 0,0 1,-2,2H5a2,2 0,0 1,-2,-2V5a2,2 0,0 1,2,-2h11"></path>
                        </svg>
                        <span>Validator</span>
                    </button>
                </nav>

                <!-- Control Panel -->
                <div class="control-panel">
                    <div class="service-controls">
                        <div class="control-group">
                            <label for="domainService" class="control-label">Domain Service</label>
                            <select name="domainService" id="domainService" class="modern-select">
                                <!-- Options populated by JS -->
                            </select>
                        </div>

                        <div class="control-group engine-id-group">
                            <label for="domainServiveEngineIdInput" class="control-label">Engine ID</label>
                            <input type="text" 
                                   placeholder="Enter Engine ID..." 
                                   id="domainServiveEngineIdInput" 
                                   class="modern-input"
                                   style="display:none;">
                        </div>

                        <div class="control-group">
                            <label for="serviceSelectInput" class="control-label">Query Set</label>
                            <select name="serviceSelectInput" id="serviceSelectInput" class="modern-select">
                                <option value="" disabled selected>Select a service...</option>
                            </select>
                        </div>
                    </div>

                    <!-- Status & Actions -->
                    <div class="status-panel">
                        <div class="app-status">
                            <div class="status-indicator" id="app-status"></div>
                            <span class="status-text">Ready</span>
                        </div>
                        
                        <div class="action-buttons">
                            <div id="averageScorePanel" class="score-display" style="display:none;">
                                <div class="score-label">Avg Score</div>
                                <div id="averageScoreValue" class="score-value">--</div>
                            </div>
                            
                            <button id="validateAllButton" class="action-btn primary" style="display:none;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20,6 9,17 4,12"></polyline>
                                </svg>
                                Validate All
                            </button>
                            
                            <button id="saveButton" class="action-btn success" style="display:none;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                    <polyline points="17,21 17,13 7,13 7,21"></polyline>
                                    <polyline points="7,3 7,8 15,8"></polyline>
                                </svg>
                                Save Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content Area -->
        <main class="main-content">
            <!-- Queries Section -->
            <section class="content-section" id="queriesSection" style="display: none;">
                <div class="section-header">
                    <div class="section-title">
                        <h2>Query Management</h2>
                        <p>Browse and manage your query collections</p>
                    </div>
                </div>

                <div class="content-panel">
                    <div class="queries-container">
                        <div id="queriesList" class="queries-list">
                            <div class="empty-state">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M3 6h18"></path>
                                    <path d="M3 12h18"></path>
                                    <path d="M3 18h18"></path>
                                </svg>
                                <h3>Select a service to view queries</h3>
                                <p>Choose a service from the dropdown to see available queries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Analytics Section -->
            <section class="content-section" id="analyticsSection" style="display: none;">
                <div class="section-header">
                    <div class="section-title">
                        <h2>Performance Analytics</h2>
                        <p>Compare and analyze query performance across versions</p>
                    </div>
                </div>

                <div class="analytics-workspace">
                    <!-- Version Selection Panel -->
                    <div class="analytics-panel">
                        <div class="panel-header">
                            <h3>Version Comparison Setup</h3>
                            <div class="service-badge">
                                <span id="servicename" class="service-name">No Service Selected</span>
                            </div>
                        </div>

                        <div class="version-management">
                            <div class="available-versions">
                                <h4>Available Versions</h4>
                                <div class="versions-grid" id="available-versions-list">
                                    <!-- Populated by JS -->
                                </div>
                            </div>

                            <div class="staging-area">
                                <h4>Selected for Analysis</h4>
                                <div id="staged-versions-list" class="staged-versions">
                                    <div class="empty-staging">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="16"></line>
                                            <line x1="8" y1="12" x2="16" y2="12"></line>
                                        </svg>
                                        <p>Add versions to compare</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="analysis-controls">
                            <div class="query-selector">
                                <label for="queryForAnalytics">Query to Analyze</label>
                                <select id="queryForAnalytics" class="modern-select" style="display: none;">
                                    <!-- Populated by JS -->
                                </select>
                            </div>
                            
                            <button id="analyze-button" class="action-btn primary large" disabled>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 3v18h18"></path>
                                    <path d="m19 9-5 5-4-4-3 3"></path>
                                </svg>
                                <span>Analyze (0/2 Versions Selected)</span>
                            </button>
                        </div>
                    </div>

                    <!-- Results Panel -->
                    <div id="analysis-results-stage" class="analysis-results" style="display: none;">
                        <!-- Results populated by JS -->
                    </div>
                </div>
            </section>

            <!-- Validator Section -->
            <section class="content-section" id="validatorSection">
                <div class="section-header">
                    <div class="section-title">
                        <h2>Query Validator</h2>
                        <p>Validate and analyze query performance with AI-powered insights</p>
                    </div>

                    <!-- Validator Mode Selector -->
                    <div class="validator-modes" id="validatorChoice">
                        <button id="independentBtn" class="mode-btn active" data-mode="independent">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14,2 14,8 20,8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10,9 9,9 8,9"></polyline>
                            </svg>
                            <span>Independent</span>
                        </button>
                        
                        <button id="conversationBtn" class="mode-btn" data-mode="conversation">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span>Conversation</span>
                        </button>
                        
                        <button id="dynamicBtn" class="mode-btn" data-mode="dynamic">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                            </svg>
                            <span>Dynamic Query</span>
                        </button>
                    </div>
                </div>

                <!-- Welcome Banner -->
                <div id="banner" class="welcome-banner">
                    <div class="banner-content">
                        <div class="banner-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M9 12l2 2 4-4"></path>
                                <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                        </div>
                        <div class="banner-text">
                            <h3>Welcome to InsightEngine</h3>
                            <p>Your advanced query validation and analytics platform is ready. Select a service to begin analyzing your queries.</p>
                        </div>
                    </div>
                </div>

                <!-- API Configuration Panel -->
                <div class="config-panel" id="apiConfigPanel" style="display:none;">
                    <div class="config-header">
                        <h3>API Configuration</h3>
                        <button id="toggleConfigBtn" class="toggle-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V12a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                            Configure API
                        </button>
                    </div>

                    <div class="config-content" id="configContent" style="display:none;">
                        <div class="config-tabs">
                            <button class="config-tab active" data-service="websitesearch">Website Search</button>
                            <button class="config-tab" data-service="sitesearch">Site Search</button>
                        </div>

                        <div class="config-form" id="configForm">
                            <div class="param-grid">
                                <!-- Parameters will be dynamically populated -->
                            </div>

                            <div class="config-actions">
                                <button id="setDefaultBtn" class="action-btn secondary">Set as Default</button>
                                <button id="updateUrlBtn" class="action-btn primary">Update Base URL</button>
                            </div>

                            <div class="url-preview-section">
                                <label>Current Base URL:</label>
                                <div class="url-preview" id="urlPreview"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dynamic Query Panel -->
                <div class="validator-panel" id="dynamicQueryPanel" style="display:none;">
                    <div class="panel-header">
                        <h3>Dynamic Query Validation</h3>
                        <p>Enter your custom query and get real-time validation results</p>
                    </div>

                    <div class="query-input-area">
                        <div class="input-group">
                            <textarea id="dynamicQueryInput" 
                                     placeholder="Enter your query here..." 
                                     rows="4" 
                                     class="query-textarea"></textarea>
                            <button id="validateDynamicBtn" class="action-btn primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20,6 9,17 4,12"></polyline>
                                </svg>
                                Validate Query
                            </button>
                        </div>
                    </div>

                    <div class="dynamic-results" id="dynamicResults" style="display:none;">
                        <div class="results-card">
                            <div class="results-header">
                                <h4>Validation Results</h4>
                                <div class="result-score" id="dynamicScore">--</div>
                            </div>

                            <div class="results-tabs">
                                <button class="results-tab active" data-tab="summary">Summary</button>
                                <button class="results-tab" data-tab="details">Details</button>
                                <button class="results-tab" data-tab="analysis">Analysis</button>
                            </div>

                            <div class="tab-content">
                                <div class="tab-pane active" id="summaryTab">
                                    <div class="summary-content" id="dynamicSummary"></div>
                                </div>

                                <div class="tab-pane" id="detailsTab">
                                    <div class="details-grid">
                                        <div class="detail-card">
                                            <label>AI Response</label>
                                            <div class="detail-value" id="dynamicAiResponse"></div>
                                        </div>
                                        <div class="detail-card">
                                            <label>Search URLs</label>
                                            <div class="detail-value" id="dynamicSearchUrls"></div>
                                        </div>
                                        <div class="detail-card">
                                            <label>Reason</label>
                                            <div class="detail-value" id="dynamicReason"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane" id="analysisTab">
                                    <div class="analysis-grid">
                                        <div class="analysis-card">
                                            <h5>Sub-scores</h5>
                                            <div id="dynamicSubscores"></div>
                                        </div>
                                        <div class="analysis-card">
                                            <h5>Improvements & Missing Items</h5>
                                            <div id="dynamicImprovements"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Independent Validation Panel -->
                <div class="validator-panel" id="independent-choice-panel">
                    <div class="results-table-container">
                        <div class="table-wrapper">
                            <table id="results-table" class="results-table">
                                <thead id="results-thead">
                                    <!-- Headers populated by JS -->
                                </thead>
                                <tbody id="results-tbody">
                                    <!-- Results populated by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Conversational Panel -->
                <div class="validator-panel" id="conversational-choice-panel" style="display: none;">
                    <div class="conversation-layout">
                        <div class="chat-area">
                            <div class="chat-header">
                                <h3>Query Conversation</h3>
                                <p>Analyze queries in conversational context</p>
                            </div>
                            <div class="chat-messages" id="chat-messages-area">
                                <!-- Chat messages populated by JS -->
                            </div>
                            <div class="chat-input">
                                <textarea id="conversationalQuery" 
                                         placeholder="Enter your conversational query..." 
                                         rows="3"></textarea>
                                <div class="chat-actions">
                                    <button id="file-upload-btn" class="action-btn secondary small">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14,2 14,8 20,8"></polyline>
                                        </svg>
                                    </button>
                                    <button id="validateConversationBtn" class="action-btn primary">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                                            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                                        </svg>
                                        Validate
                                    </button>
                                </div>
                                <input type="file" id="file-input" accept=".txt" style="display: none;">
                            </div>
                        </div>

                        <div class="analysis-panel">
                            <div class="analysis-header">
                                <h3>Analysis Results</h3>
                            </div>
                            <div class="analysis-content" id="analysis-content" style="display: none;">
                                <!-- Analysis content populated by JS -->
                            </div>
                            <div class="analysis-placeholder" id="analysis-placeholder">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M9 11H3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h6l3 3V8l-3 3z"></path>
                                    <path d="M22 4H16a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h6l3 3V4z"></path>
                                </svg>
                                <p>Select a query to view analysis</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <!-- Loading Overlay -->
        <div class="loading-overlay" id="loadingOverlay" style="display: none;">
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p>Processing your request...</p>
            </div>
        </div>

        <!-- Notification System -->
        <div class="notification-container" id="notificationContainer">
            <!-- Notifications will be added here -->
        </div>
    </div>

    <!-- Scripts -->
    <script src="script.js" defer></script>
</body>

</html>