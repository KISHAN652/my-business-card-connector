/**
 * Dynamic Logic for Kishan Sondagar's Digital Connection Card Hub
 * Elite Pro Tier: HTML5 Particle Canvas, Typewriter Terminal, and Counting Metrics.
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initDynamicPing();
  initTypewriterTerminal();
  initMetricCounters();
  initVCardDownload();
  initWebShare();
});

/**
 * 1. Interactive Neural Network Particle Background
 * High-performance HTML5 Canvas simulation that attracts particles to mouse/touch.
 */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  // Track viewport dimensions
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Particle Settings
  const particles = [];
  const particleCount = Math.min(45, Math.floor((width * height) / 18000)); // Adaptive count based on device resolution
  const connectionDistance = 100;
  const mouse = { x: null, y: null, active: false };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 1;
    }

    update() {
      // Float drift velocities
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off borders
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Gentle interactive gravity towards touch/cursor
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 150) {
          this.x += dx * 0.005;
          this.y += dy * 0.005;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(184, 98, 235, 0.4)';
      ctx.fill();
    }
  }

  // Populate particles array
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Draw linking meshes
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      
      // Link to cursor if nearby
      if (mouse.active) {
        const distToMouse = Math.hypot(mouse.x - p1.x, mouse.y - p1.y);
        if (distToMouse < 140) {
          const alpha = (1 - distToMouse / 140) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Link to adjacent particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(184, 98, 235, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  // Animation Core Loop
  function loop() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();
    animationFrameId = requestAnimationFrame(loop);
  }

  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Mouse & Touch events
  const handleMove = (x, y) => {
    mouse.x = x;
    mouse.y = y;
    mouse.active = true;
  };

  window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
  window.addEventListener('mouseleave', () => mouse.active = false);

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
  window.addEventListener('touchend', () => mouse.active = false);

  loop();
}

/**
 * 2. Dynamic Status Diagnostics Ping
 * Continuously fluctuates a simulated server connection speed to enhance tech feel.
 */
function initDynamicPing() {
  const pingStatus = document.getElementById('pingStatus');
  if (!pingStatus) return;

  setInterval(() => {
    const randomPing = Math.floor(Math.random() * 8) + 11; // 11ms to 18ms
    pingStatus.textContent = `SECURE CONNECT // ${randomPing}ms`;
  }, 4000);
}

/**
 * 3. Typewriter Terminal Simulator
 * Elegantly types commands and compiler outputs with staggered dynamic delays.
 */
function initTypewriterTerminal() {
  const outputContainer = document.getElementById('terminalOutput');
  const typingPrompt = document.getElementById('terminalTyping');
  if (!outputContainer || !typingPrompt) return;

  const logs = [
    { text: '> Initializing Kishan Core Engine v4.2.1...', class: 't-success' },
    { text: '> [OK] Modules deployed: Business Web, Portfolio, SEO & Latency Optimization.', class: 't-info' },
    { text: '> System Operational. Ready to engineer your online presence!', class: 't-warning' }
  ];

  let logIndex = 0;
  
  // Staggered output loader
  function loadNextLog() {
    if (logIndex < logs.length) {
      const p = document.createElement('p');
      p.className = logs[logIndex].class;
      p.textContent = logs[logIndex].text;
      outputContainer.appendChild(p);
      logIndex++;
      
      // Delay before typing subsequent lines
      setTimeout(loadNextLog, 1200);
    }
  }

  // Trigger terminal script typing and launch log outputs
  setTimeout(() => {
    typingPrompt.style.animation = 'none';
    typingPrompt.style.borderRight = 'none';
    setTimeout(loadNextLog, 600);
  }, 2200);
}

/**
 * 4. Metrics counting animation
 * Smoothly rolls metrics stats from zero to target values on load.
 */
function initMetricCounters() {
  const counters = document.querySelectorAll('.count-up');
  
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
    const suffix = counter.getAttribute('data-suffix') || '';
    
    let current = 0;
    const duration = 1800; // ms
    const stepTime = 16; // approx 60fps
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      counter.textContent = current.toFixed(decimals) + suffix;
    }, stepTime);
  });
}

/**
 * 5. vCard (.vcf) Generator & Downloader
 * Instantly compiles a high-compatibility virtual contact card file.
 */
function initVCardDownload() {
  const btnSaveContact = document.getElementById('btnSaveContact');
  if (!btnSaveContact) return;

  btnSaveContact.addEventListener('click', () => {
    // Standard vCard 3.0 template
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Sondagar;Kishan;;;',
      'FN:Kishan Sondagar',
      'ORG:Kishan Sondagar Web Development',
      'TITLE:Web Developer',
      'TEL;TYPE=CELL,VOICE:6353373957',
      'EMAIL;TYPE=PREF,INTERNET:gajjarsk111@gmail.com',
      'URL:https://kishan-sondagar-portfolio.vercel.app/',
      'NOTE:Web Developer specializing in responsive portfolios, business websites, and landing pages.',
      'END:VCARD'
    ].join('\r\n'); // Carriage return line feeds for maximum compatibility across OS

    // Create a Blob containing the vCard content
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const filename = 'Kishan_Sondagar.vcf';

    // Support iOS/Safari and dynamic link downloads
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // IE/Edge support
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Modern standard browsers
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute('download', filename);
      
      // Append to DOM, click to download, and clean up
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      
      // Revoke the object URL to free memory after transition time
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    }

    // Interactive button tap animation feedback
    const originalText = btnSaveContact.querySelector('.btn-subtitle').textContent;
    btnSaveContact.querySelector('.btn-subtitle').textContent = 'Contact Saved Successfully! 🚀';
    btnSaveContact.style.borderColor = 'var(--neon-cyan)';
    
    setTimeout(() => {
      btnSaveContact.querySelector('.btn-subtitle').textContent = originalText;
      btnSaveContact.style.borderColor = '';
    }, 3000);
  });
}

/**
 * 6. Web Share API & Copy Link System
 * Uses mobile native sharing capabilities when available, fallbacks to clipboard copying.
 */
function initWebShare() {
  const btnShareCard = document.getElementById('btnShareCard');
  const shareStatusMsg = document.getElementById('shareStatusMsg');
  if (!btnShareCard || !shareStatusMsg) return;

  const shareData = {
    title: 'Kishan Sondagar | Web Developer',
    text: 'Check out Kishan Sondagar\'s digital business card, save his contact details, and view his portfolio.',
    url: window.location.href
  };

  btnShareCard.addEventListener('click', async () => {
    // If Web Share API is available on mobile/supported browser
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        displayStatusMessage('Shared successfully! ✨');
      } catch (err) {
        // If they cancelled, do nothing, otherwise fallback
        if (err.name !== 'AbortError') {
          copyLinkFallback();
        }
      }
    } else {
      // Browser fallback (clipboard copy)
      copyLinkFallback();
    }
  });

  function copyLinkFallback() {
    const cardUrl = window.location.href;
    
    navigator.clipboard.writeText(cardUrl).then(() => {
      displayStatusMessage('Link Copied to Clipboard! Send it to anyone! 🚀');
    }).catch(() => {
      // Fail-proof manual selection copy fallback
      const textArea = document.createElement('textarea');
      textArea.value = cardUrl;
      textArea.style.position = 'fixed'; // prevent scroll to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        displayStatusMessage('Link Copied to Clipboard! Send it to anyone! 🚀');
      } catch (err) {
        displayStatusMessage('Could not copy link automatically. Please copy the URL.');
      }
      
      document.body.removeChild(textArea);
    });
  }

  function displayStatusMessage(message) {
    shareStatusMsg.textContent = message;
    shareStatusMsg.style.opacity = '1';
    
    setTimeout(() => {
      shareStatusMsg.style.transition = 'opacity 1s ease-out';
      shareStatusMsg.style.opacity = '0';
      // Wait for fade out animation before resetting content and styles
      setTimeout(() => {
        shareStatusMsg.textContent = '';
        shareStatusMsg.style.transition = '';
      }, 1000);
    }, 4000);
  }
}
