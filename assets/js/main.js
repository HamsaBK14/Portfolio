// main.js - Interactive engine for Hamsa B K's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initRecruiterMode();
  initTerminal();
  initGraphSimulation();
  initSkillsFilter();
  initAnimatedCounters();
  initCopyButtons();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* ==========================================================================
   1. NEURAL GRAPH BACKGROUND CANVAS
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: -1000, y: -1000, radius: 150 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  const nodeCount = Math.min(Math.floor((width * height) / 18000), 75);
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(6, 182, 212, ' : 'rgba(16, 185, 129, '
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Mouse influence
      const dx = mouse.x - n.x;
      const dy = mouse.y - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        n.x -= (dx / dist) * force * 1.5;
        n.y -= (dy / dist) * force * 1.5;
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '0.7)';
      ctx.fill();

      // Connect lines
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dist2 = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (dist2 < 120) {
          const alpha = (1 - dist2 / 120) * 0.18;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   2. RECRUITER FAST-TRACK MODE
   ========================================================================== */
function initRecruiterMode() {
  const toggleBtn = document.getElementById('recruiter-mode-toggle');
  const banner = document.getElementById('recruiter-drawer');
  const badge = document.getElementById('recruiter-badge');
  if (!toggleBtn || !banner) return;

  let active = false;

  function setMode(state) {
    active = state;
    if (active) {
      banner.classList.remove('hidden');
      toggleBtn.classList.add('bg-cyan-500/20', 'border-cyan-400', 'text-cyan-300');
      toggleBtn.classList.remove('border-slate-700', 'text-slate-400');
      if (badge) badge.textContent = 'MODE: ACTIVE';
      showToast('⚡ Recruiter Fast-Track Enabled! Key highlights spotlighted.');
    } else {
      banner.classList.add('hidden');
      toggleBtn.classList.remove('bg-cyan-500/20', 'border-cyan-400', 'text-cyan-300');
      toggleBtn.classList.add('border-slate-700', 'text-slate-400');
      if (badge) badge.textContent = 'QUICK SCAN';
    }
  }

  toggleBtn.addEventListener('click', () => setMode(!active));

  const closeBtn = document.getElementById('close-recruiter-drawer');
  if (closeBtn) closeBtn.addEventListener('click', () => setMode(false));
}

/* ==========================================================================
   3. INTERACTIVE TERMINAL SIMULATOR
   ========================================================================== */
function initTerminal() {
  const input = document.getElementById('term-input');
  const output = document.getElementById('term-output');
  if (!input || !output) return;

  const commands = {
    help: () => `
<div class="text-slate-300 space-y-1">
  <p><span class="text-cyan-400 font-bold">Available Commands:</span></p>
  <p>  <span class="text-emerald-400">quick-scan</span>    : 30-second executive summary for hiring managers</p>
  <p>  <span class="text-emerald-400">skills</span>        : Stack breakdown across AI, Systems, Security & Vision</p>
  <p>  <span class="text-emerald-400">projects</span>      : Deep-dive metrics on GNN Supply-Chain & CrewAI systems</p>
  <p>  <span class="text-emerald-400">research</span>      : ISFCR Center tamper-evident zero-watermarking paper</p>
  <p>  <span class="text-emerald-400">benchmarks</span>    : Exact quantitative results & dataset verification</p>
  <p>  <span class="text-emerald-400">contact</span>       : Direct channels (Email, GitHub, LinkedIn, Phone)</p>
  <p>  <span class="text-emerald-400">hire</span>          : Candidate evaluation snapshot & direct interview invite</p>
  <p>  <span class="text-emerald-400">clear</span>         : Clear terminal screen</p>
</div>`,

    'quick-scan': () => `
<div class="text-slate-300 space-y-1.5 border-l-2 border-cyan-400 pl-3">
  <p class="font-bold text-white">HAMSA B K | Candidate Profile (Class of 2027)</p>
  <p>• <span class="text-cyan-300 font-semibold">Education:</span> B.Tech in Computer Science @ PES University, Bengaluru</p>
  <p>• <span class="text-purple-300 font-semibold">Experience:</span> Research Intern at ISFCR Center, PES University</p>
  <p>• <span class="text-emerald-300 font-semibold">Focus Areas:</span> Applied AI, Computer Vision, Cybersecurity & Systems Engineering</p>
  <p>• <span class="text-amber-300 font-semibold">Target Roles:</span> Software Engineer, Applied AI / ML Engineer, Security Engineer (Internships & Full-Time)</p>
  <p>• <span class="text-slate-300 font-semibold">Location:</span> Bengaluru, India · Open to Remote & Relocation</p>
</div>`,

    skills: () => `
<div class="text-slate-300 space-y-2">
  <p><span class="text-cyan-400 font-bold">🧠 AI & Machine Learning:</span> PyTorch, Graph Neural Networks (HGAT), LSTM, Multi-Agent Systems (CrewAI), Groq LLM API, Scikit-learn, Pandas</p>
  <p><span class="text-emerald-400 font-bold">👁️ Computer Vision:</span> OpenCV, YOLOv8 Instance Segmentation, Discrete Wavelet Transform (DWT), DCT</p>
  <p><span class="text-purple-400 font-bold">🛡️ Security & Crypto:</span> Supply-Chain Security, OSV.dev CVE Triage, AES-256-GCM, SHA-256, HMAC, Tamper Detection</p>
  <p><span class="text-blue-400 font-bold">⚙️ Languages & Systems:</span> Python, C, C++, Java, JavaScript, Node.js, Express, NetworkX, MongoDB Atlas, IPFS, Streamlit, Git</p>
</div>`,

    projects: () => `
<div class="text-slate-300 space-y-3">
  <div class="border-l-2 border-emerald-400 pl-3">
    <p class="font-bold text-emerald-300">1. Temporal Multimodal Supply-Chain Threat Detection Engine</p>
    <p class="text-xs text-slate-400">Stack: PyTorch, NetworkX, 4-Head HGAT GNN, Temporal LSTM</p>
    <p class="text-sm">Pre-installation security gatekeeper intercepting typosquatting and transitive CVE cascades across 79,741 graph edges. Reached <span class="text-cyan-400 font-semibold">84.46% accuracy</span> and <span class="text-emerald-400 font-semibold">97.08% recall</span> on 24,666 real packages.</p>
  </div>
  <div class="border-l-2 border-cyan-400 pl-3">
    <p class="font-bold text-cyan-300">2. AI Crew for Automated Code Review & Security Triage</p>
    <p class="text-xs text-slate-400">Stack: CrewAI (5 Autonomous Agents), Groq LLM API, OSV.dev, GitHub API, Streamlit</p>
    <p class="text-sm">Autonomously audits GitHub pull requests, correlates diffs with live CVE vulnerabilities, and synthesizes automated patch suggestions.</p>
  </div>
</div>`,

    research: () => `
<div class="text-slate-300 space-y-2 border-l-2 border-purple-400 pl-3">
  <p class="font-bold text-purple-300">ISFCR Center, PES University — Research Intern (June 2026 – July 2026)</p>
  <p class="text-sm font-semibold text-white">ROI-Isolated Zero-Watermarking Scheme for Traffic Surveillance Images</p>
  <p class="text-xs text-slate-400">Stack: Python, YOLOv8 Instance Segmentation, OpenCV, 3-level DWT/DCT, AES-256-GCM, SHA-256, HMAC, IPFS</p>
  <p class="text-sm">Preserves critical ROI evidence while generating a 256-bit tamper-evident fingerprint without modifying a single pixel of the original image. Triply verified across IPFS, MongoDB Atlas & Google Drive.</p>
</div>`,

    benchmarks: () => `
<div class="text-slate-300 font-mono text-xs space-y-1 bg-slate-900/80 p-3 rounded border border-slate-700">
  <p class="text-cyan-300 font-bold">MODEL & SYSTEM PERFORMANCE BENCHMARKS:</p>
  <p>-----------------------------------------------------------</p>
  <p>Metric                       | Hamsa HGAT GNN | Baseline Flat</p>
  <p>-----------------------------------------------------------</p>
  <p>Threat Recall Rate           |   97.08%       |    ~51.2%    </p>
  <p>Model Accuracy               |   84.46%       |    ~51.0%    </p>
  <p>Benchmark Attack Validation  |   10/10 (100%) |     4/10     </p>
  <p>Transitive Edges Analyzed    |   79,741 edges |      N/A     </p>
  <p>Packages Evaluated           |   24,666 pkgs  |      N/A     </p>
  <p>Watermark Bit Length         |   256-bit      |      N/A     </p>
  <p>Original Image Alteration    |   0 pixels     |      N/A     </p>
  <p>-----------------------------------------------------------</p>
</div>`,

    contact: () => `
<div class="text-slate-300 space-y-1">
  <p>📧 <span class="text-cyan-300">Email:</span> <a href="mailto:hamsaradhakrishna14@gmail.com" class="underline hover:text-white">hamsaradhakrishna14@gmail.com</a></p>
  <p>🐙 <span class="text-cyan-300">GitHub:</span> <a href="https://github.com/HamsaBK14" target="_blank" class="underline hover:text-white">github.com/HamsaBK14</a></p>
  <p>💼 <span class="text-cyan-300">LinkedIn:</span> <a href="https://linkedin.com/in/hamsa-b-k" target="_blank" class="underline hover:text-white">linkedin.com/in/hamsa-b-k</a></p>
  <p>📱 <span class="text-cyan-300">Phone:</span> +91 63636 60063</p>
  <p>📍 <span class="text-cyan-300">Location:</span> Bengaluru, Karnataka, India</p>
</div>`,

    hire: () => `
<div class="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 space-y-2">
  <p class="font-bold text-white text-base">🚀 Ready to bring Hamsa on board?</p>
  <p class="text-sm">Hamsa brings a rare fusion of applied deep learning (GNNs, LLMs, Vision) + low-level cryptographic engineering + systems thinking.</p>
  <div class="pt-2 flex flex-wrap gap-2">
    <a href="mailto:hamsaradhakrishna14@gmail.com?subject=Interview%20Invitation%20-%20Hamsa%20B%20K&body=Hi%20Hamsa,%20we%20reviewed%20your%20portfolio%20and%20would%20love%20to%20connect%20for%20an%20interview." class="px-3 py-1.5 bg-emerald-500 text-black font-semibold text-xs rounded hover:bg-emerald-400 transition inline-block">Schedule an Interview ✉️</a>
    <a href="Hamsa_B_K_Resume.pdf" download class="px-3 py-1.5 bg-slate-800 text-white font-medium text-xs rounded border border-slate-600 hover:bg-slate-700 transition inline-block">Download PDF Resume 📄</a>
  </div>
</div>`,

    'sudo hire-hamsa': () => commands.hire(),
    clear: () => {
      output.innerHTML = '';
      return '';
    }
  };

  function execute(cmdStr) {
    const raw = cmdStr.trim().toLowerCase();
    if (!raw) return;

    // Add user command line
    const userLine = document.createElement('div');
    userLine.className = 'flex items-center space-x-2 text-slate-400 font-mono text-sm pt-2';
    userLine.innerHTML = `<span class="text-cyan-400">recruiter@portfolio</span>:<span class="text-purple-400">~</span>$ <span class="text-white">${escapeHtml(cmdStr)}</span>`;
    output.appendChild(userLine);

    if (raw === 'clear') {
      commands.clear();
      return;
    }

    const res = commands[raw] ? commands[raw]() : `<p class="text-rose-400 text-sm">Command not recognized: "${escapeHtml(cmdStr)}". Type <span class="text-cyan-400 font-bold">help</span> or click one of the quick pills above.</p>`;

    const resBox = document.createElement('div');
    resBox.className = 'font-mono text-sm py-1';
    resBox.innerHTML = res;
    output.appendChild(resBox);

    // Auto-scroll terminal
    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      execute(val);
    }
  });

  // Wire up quick pills
  document.querySelectorAll('.term-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) execute(cmd);
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ==========================================================================
   4. INTERACTIVE THREAT GRAPH & BLAST RADIUS SIMULATOR
   ========================================================================== */
function initGraphSimulation() {
  const container = document.getElementById('graph-canvas-container');
  if (!container) return;

  const nodes = [
    { id: 'pkg-root', label: 'target-auth-lib', level: 0, x: 220, y: 140, risk: 'CRITICAL', status: 'MALICIOUS_INTERCEPTED', blast: 48, pagerank: '0.084' },
    { id: 'pkg-cve', label: 'transitive-crypt-sub', level: 1, x: 380, y: 80, risk: 'HIGH', status: 'CVE_CASCADE', blast: 22, pagerank: '0.041' },
    { id: 'pkg-typo', label: 'typosquat-net-core', level: 1, x: 380, y: 200, risk: 'HIGH', status: 'TYPOSQUAT_DETECTED', blast: 19, pagerank: '0.039' },
    { id: 'pkg-dep1', label: 'logger-utils-v2', level: 2, x: 540, y: 50, risk: 'LOW', status: 'CLEAN', blast: 2, pagerank: '0.005' },
    { id: 'pkg-dep2', label: 'parser-stream-x', level: 2, x: 540, y: 130, risk: 'MED', status: 'RISK_PROPAGATION', blast: 9, pagerank: '0.018' },
    { id: 'pkg-dep3', label: 'auth-tokens-helper', level: 2, x: 540, y: 230, risk: 'CRITICAL', status: 'PAYLOAD_CONTAINED', blast: 31, pagerank: '0.067' }
  ];

  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5]
  ];

  const svg = document.getElementById('threat-graph-svg');
  if (!svg) return;

  function renderGraph() {
    svg.innerHTML = '';

    // Draw edges
    edges.forEach(([fromIdx, toIdx]) => {
      const u = nodes[fromIdx];
      const v = nodes[toIdx];
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', u.x);
      line.setAttribute('y1', u.y);
      line.setAttribute('x2', v.x);
      line.setAttribute('y2', v.y);
      line.setAttribute('stroke', '#334155');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('stroke-dasharray', '4');
      line.classList.add('transition-all');
      line.id = `edge-${u.id}-${v.id}`;
      svg.appendChild(line);
    });

    // Draw nodes
    nodes.forEach((n, idx) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('transform', `translate(${n.x}, ${n.y})`);
      g.classList.add('cursor-pointer', 'group');

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', n.level === 0 ? '22' : '17');
      const fill = n.risk === 'CRITICAL' ? '#ef4444' : n.risk === 'HIGH' ? '#f59e0b' : n.risk === 'MED' ? '#38bdf8' : '#10b981';
      circle.setAttribute('fill', fill);
      circle.setAttribute('fill-opacity', '0.25');
      circle.setAttribute('stroke', fill);
      circle.setAttribute('stroke-width', '2.5');
      circle.classList.add('transition-all', 'duration-300');
      circle.id = `circle-${n.id}`;

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('y', '32');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#94a3b8');
      text.setAttribute('font-size', '10.5');
      text.setAttribute('font-family', 'JetBrains Mono');
      text.textContent = n.label;

      g.appendChild(circle);
      g.appendChild(text);

      g.addEventListener('click', () => selectNode(idx));
      svg.appendChild(g);
    });
  }

  function selectNode(index) {
    const n = nodes[index];
    const details = document.getElementById('node-telemetry-display');
    if (!details) return;

    details.innerHTML = `
      <div class="space-y-2 border-l-2 ${n.risk === 'CRITICAL' ? 'border-rose-500' : 'border-cyan-400'} pl-3 animate-fadeIn">
        <div class="flex items-center justify-between">
          <span class="font-mono font-bold text-white text-sm">${n.label}</span>
          <span class="text-xs px-2 py-0.5 rounded font-mono ${n.risk === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'}">${n.status}</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
          <div class="bg-slate-900/60 p-2 rounded border border-slate-800">
            <span class="text-slate-400 block">Blast Radius:</span>
            <span class="text-emerald-400 font-bold text-sm">${n.blast} transitive packages</span>
          </div>
          <div class="bg-slate-900/60 p-2 rounded border border-slate-800">
            <span class="text-slate-400 block">HGAT PageRank:</span>
            <span class="text-cyan-400 font-bold text-sm">${n.pagerank}</span>
          </div>
        </div>
        <p class="text-xs text-slate-300 pt-1">
          ${n.risk === 'CRITICAL' 
            ? '🚨 <span class="text-rose-300">Action:</span> Intercepted by Pre-installation GNN Gatekeeper before reaching developer machines. Prevented dependency confusion payload injection.' 
            : '✅ <span class="text-emerald-300">Analysis:</span> Transitive graph attention weights within safety threshold; release cadence verified clean.'}
        </p>
      </div>
    `;

    // Highlight node
    nodes.forEach((node) => {
      const c = document.getElementById(`circle-${node.id}`);
      if (c) {
        if (node.id === n.id) {
          c.setAttribute('stroke-width', '4');
          c.setAttribute('filter', 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.9))');
        } else {
          c.setAttribute('stroke-width', '2');
          c.removeAttribute('filter');
        }
      }
    });
  }

  renderGraph();
  selectNode(0);
}

/* ==========================================================================
   5. SKILLS MATRIX FILTER
   ========================================================================== */
function initSkillsFilter() {
  const buttons = document.querySelectorAll('.skill-filter-btn');
  const cards = document.querySelectorAll('.skill-card');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        b.classList.remove('bg-cyan-500/20', 'border-cyan-400', 'text-cyan-300');
        b.classList.add('bg-slate-900/60', 'border-slate-800', 'text-slate-400');
      });
      btn.classList.add('bg-cyan-500/20', 'border-cyan-400', 'text-cyan-300');
      btn.classList.remove('bg-slate-900/60', 'border-slate-800', 'text-slate-400');

      const filter = btn.getAttribute('data-filter');

      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.classList.add('animate-fadeIn');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. ANIMATED COUNTERS
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach((c) => {
            const target = parseFloat(c.getAttribute('data-target'));
            const suffix = c.getAttribute('data-suffix') || '';
            const decimals = parseInt(c.getAttribute('data-decimals') || '0', 10);
            let start = 0;
            const duration = 1600;
            const startTime = performance.now();

            function update(time) {
              const elapsed = time - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutCubic
              const ease = 1 - Math.pow(1 - progress, 3);
              const current = start + (target - start) * ease;
              c.textContent = (decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString()) + suffix;

              if (progress < 1) {
                requestAnimationFrame(update);
              }
            }
            requestAnimationFrame(update);
          });
        }
      });
    },
    { threshold: 0.25 }
  );

  const statsSection = document.getElementById('impact-metrics');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   7. COPY TO CLIPBOARD & TOAST SYSTEM
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied "${text}" to clipboard!`);
        });
      }
    });
  });
}

function showToast(msg) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-slate-900/95 border border-cyan-500/40 text-cyan-300 font-mono text-xs shadow-2xl flex items-center space-x-2 backdrop-blur-md';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="text-emerald-400">⚡</span> <span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
