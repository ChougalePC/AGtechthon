const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const dropdownCss = `
  <style>
    .app-dropdown-wrapper {
      position: relative;
      display: inline-block;
      pointer-events: auto;
    }
    .app-menu-btn {
      background: none;
      border: 1px solid rgba(180, 210, 140, 0.25);
      border-radius: 6px;
      padding: 6px;
      cursor: pointer;
      color: rgba(215, 230, 190, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    .app-menu-btn:hover {
      background: rgba(40, 65, 40, 0.5);
      color: var(--accent);
    }
    .app-dropdown-content {
      position: absolute;
      top: 40px;
      right: 0;
      background: rgba(10, 18, 10, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(140, 180, 120, 0.15);
      border-radius: 8px;
      min-width: 200px;
      display: flex;
      flex-direction: column;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1000;
      padding: 8px 0;
    }
    .app-dropdown-wrapper.open .app-dropdown-content {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .app-dropdown-content a {
      color: rgba(215, 230, 190, 0.7) !important;
      padding: 10px 20px !important;
      margin: 0 !important;
      text-transform: none !important;
      font-size: 13px !important;
      letter-spacing: 1px !important;
      display: block;
      border-bottom: 1px solid rgba(140, 180, 120, 0.05);
    }
    .app-dropdown-content a:last-child {
      border-bottom: none;
    }
    .app-dropdown-content a:hover {
      background: rgba(40, 65, 40, 0.4);
      color: var(--accent) !important;
    }
  </style>
</head>
`;
content = content.replace('</head>', dropdownCss);

const dropdownHtml = `
      <div class="app-dropdown-wrapper" id="appDropdownWrapperDesktop" style="margin-left: 20px; vertical-align: middle;">
        <button class="app-menu-btn" id="appMenuBtnDesktop">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div class="app-dropdown-content">
          <a href="/app/dashboard">Dashboard</a>
          <a href="/app/assistant">AI Assistant</a>
          <a href="/app/disease">Disease Detection</a>
          <a href="/app/crop">Crop Recommendation</a>
          <a href="/app/weather">Weather Intelligence</a>
          <a href="/app/irrigation">Irrigation Advisor</a>
          <a href="/app/market">Market Intelligence</a>
          <a href="/app/schemes">Government Schemes</a>
          <a href="/app/profile">Farmer Profile</a>
          <a href="/app/alerts">Alerts Center</a>
          <a href="/app/analytics">Analytics</a>
        </div>
      </div>
`;

content = content.replace('<a href="login.html">Log In</a>\n\t\t</div>', '<a href="login.html">Log In</a>\n' + dropdownHtml + '\t\t</div>');

const dropdownHtmlMobile = `
      <div class="app-dropdown-wrapper" id="appDropdownWrapperMobile" style="margin-top: 20px;">
        <button class="app-menu-btn" id="appMenuBtnMobile" style="margin: 0 auto;">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          <span style="margin-left: 10px; font-size: 14px; letter-spacing: 2px;">APPS</span>
        </button>
        <div class="app-dropdown-content" style="position: relative; top: 10px; right: auto; transform: none;">
          <a href="/app/dashboard">Dashboard</a>
          <a href="/app/assistant">AI Assistant</a>
          <a href="/app/disease">Disease Detection</a>
          <a href="/app/crop">Crop Recommendation</a>
          <a href="/app/weather">Weather Intelligence</a>
          <a href="/app/irrigation">Irrigation Advisor</a>
          <a href="/app/market">Market Intelligence</a>
          <a href="/app/schemes">Government Schemes</a>
          <a href="/app/profile">Farmer Profile</a>
          <a href="/app/alerts">Alerts Center</a>
          <a href="/app/analytics">Analytics</a>
        </div>
      </div>
`;
content = content.replace('<a href="login.html">Log In</a>\n\t</div>', '<a href="login.html">Log In</a>\n' + dropdownHtmlMobile + '\t</div>');

const dropdownJs = `
    // ─── App Dropdown Toggles ─────────────────────────────────────────
    const appWrapperDesktop = document.getElementById('appDropdownWrapperDesktop');
    const appBtnDesktop = document.getElementById('appMenuBtnDesktop');
    if(appBtnDesktop) {
      appBtnDesktop.addEventListener('click', (e) => {
        e.stopPropagation();
        appWrapperDesktop.classList.toggle('open');
      });
    }

    const appWrapperMobile = document.getElementById('appDropdownWrapperMobile');
    const appBtnMobile = document.getElementById('appMenuBtnMobile');
    if(appBtnMobile) {
      appBtnMobile.addEventListener('click', (e) => {
        e.stopPropagation();
        appWrapperMobile.classList.toggle('open');
      });
    }

    document.addEventListener('click', (e) => {
      if(appWrapperDesktop && !appWrapperDesktop.contains(e.target)) {
        appWrapperDesktop.classList.remove('open');
      }
      if(appWrapperMobile && !appWrapperMobile.contains(e.target)) {
        appWrapperMobile.classList.remove('open');
      }
    });

		// ─── Mobile Hamburger Menu ─────────────────────────────────────────
`;

content = content.replace('// ─── Mobile Hamburger Menu ─────────────────────────────────────────', dropdownJs);

fs.writeFileSync('index.html', content);
console.log('Dropdown injected successfully');
