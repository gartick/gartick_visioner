/* ==========================================================
   JULIAN PLAZA — Animated Background Engine
   ========================================================== */

(function () {
  'use strict';

  var LOADER_DELAY    = 1500;
  var TYPEWRITER_DELAY = 500;
  var TYPEWRITER_SPEED = 40;

  // Generate stars
  function generateStars() {
    const container = document.querySelector('.stars');
    if (!container) return;
    const count = Math.floor(window.innerWidth / 6);
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star' + (Math.random() > 0.7 ? ' big' : '');
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 70 + '%';
      star.style.setProperty('--twinkle-speed', (2 + Math.random() * 3) + 's');
      star.style.setProperty('--twinkle-delay', Math.random() * 3 + 's');
      container.appendChild(star);
    }
  }

  // Generate meteors
  function generateMeteors() {
    const container = document.querySelector('.stars');
    if (!container) return;
    for (let i = 0; i < 4; i++) {
      const meteor = document.createElement('div');
      meteor.className = 'meteor';
      meteor.style.left = (50 + Math.random() * 50) + '%';
      meteor.style.top = Math.random() * 40 + '%';
      meteor.style.setProperty('--meteor-speed', (3 + Math.random() * 4) + 's');
      meteor.style.setProperty('--meteor-delay', (i * 3 + Math.random() * 5) + 's');
      container.appendChild(meteor);
    }
  }

  // Generate clouds
  function generateClouds() {
    const container = document.querySelector('.bg-container');
    if (!container) return;
    for (let i = 0; i < 4; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      cloud.style.top = (5 + Math.random() * 25) + '%';
      cloud.style.setProperty('--cloud-speed', (50 + Math.random() * 40) + 's');
      cloud.style.animationDelay = -(Math.random() * 60) + 's';
      cloud.style.transform = 'scale(' + (0.6 + Math.random() * 0.8) + ')';
      cloud.style.opacity = 0.4 + Math.random() * 0.4;
      container.appendChild(cloud);
    }
  }

  // Generate rain
  function generateRain() {
    const container = document.querySelector('.rain');
    if (!container) return;
    const drops = Math.floor(window.innerWidth / 12);
    for (let i = 0; i < drops; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.setProperty('--rain-speed', (0.6 + Math.random() * 0.6) + 's');
      drop.style.setProperty('--rain-delay', Math.random() * 2 + 's');
      container.appendChild(drop);
    }
  }

  // Generate fireflies
  function generateFireflies() {
    const container = document.querySelector('.bg-container');
    if (!container) return;
    for (let i = 0; i < 12; i++) {
      const ff = document.createElement('div');
      ff.className = 'firefly';
      ff.style.left = Math.random() * 100 + '%';
      ff.style.top = (50 + Math.random() * 45) + '%';
      ff.style.setProperty('--ff-speed', (6 + Math.random() * 6) + 's');
      ff.style.setProperty('--ff-blink', (1.5 + Math.random() * 2) + 's');
      ff.style.setProperty('--ff-delay', Math.random() * 5 + 's');
      container.appendChild(ff);
    }
  }

  // Generate pixel-art mountain sprites
  function generateMountains() {
    var container = document.querySelector('.mountains');
    if (!container) return;

    // Layer 1: Shadow mountains — hitam pekat, paling belakang
    var shadows = [
      { src: 'mountain.png',  left: -8,  vw: 44 },
      { src: 'mountain2.png', left: 16,  vw: 36 },
      { src: 'mountain.png',  left: 38,  vw: 48 },
      { src: 'mountain2.png', left: 60,  vw: 38 },
      { src: 'mountain.png',  left: 78,  vw: 42 },
    ];

    shadows.forEach(function(m) {
      var img = document.createElement('img');
      img.src = m.src;
      img.className = 'mountain-sprite';
      img.alt = '';
      img.style.left = m.left + '%';
      img.style.width = m.vw + 'vw';
      img.style.height = 'auto';
      img.style.filter = 'brightness(0.07)';
      container.appendChild(img);
    });

    // Layer 2: Gunung utama — gelap bernuansa malam, di depan shadow
    var layout = [
      { src: 'mountain2.png', left: -6,  vw: 34, opacity: 0.95 },
      { src: 'mountain.png',  left: 8,   vw: 42, opacity: 1.00 },
      { src: 'mountain2.png', left: 22,  vw: 30, opacity: 0.90 },
      { src: 'mountain.png',  left: 34,  vw: 46, opacity: 1.00 },
      { src: 'mountain2.png', left: 52,  vw: 32, opacity: 0.92 },
      { src: 'mountain.png',  left: 62,  vw: 38, opacity: 0.98 },
      { src: 'mountain2.png', left: 78,  vw: 30, opacity: 0.90 },
      { src: 'mountain.png',  left: 88,  vw: 36, opacity: 0.95 },
    ];

    // Gunung terbesar di-render duluan = paling belakang (tapi tetap di depan shadow)
    layout.sort(function(a, b) { return b.vw - a.vw; });

    layout.forEach(function(m) {
      var img = document.createElement('img');
      img.src = m.src;
      img.className = 'mountain-sprite';
      img.alt = '';
      img.style.left = m.left + '%';
      img.style.width = m.vw + 'vw';
      img.style.height = 'auto';
      img.style.opacity = String(m.opacity);
      container.appendChild(img);
    });
  }

  // Generate pixel-art tree sprites with wind-sway animation
  function generateTrees() {
    var backContainer = document.querySelector('.trees-back');
    var frontContainer = document.querySelector('.trees-front');

    var srcs = ['tree1.png', 'tree2.png'];

    // Back trees — tersebar merata di seluruh lebar, jitter simetrik
    if (backContainer) {
      for (var i = 0; i < 11; i++) {
        var tb = document.createElement('img');
        tb.src = srcs[i % 2];
        tb.className = 'tree-sprite';
        tb.alt = '';
        tb.style.left = (i * 9.5 + (Math.random() * 4 - 2)) + '%';
        tb.style.height = (11 + Math.random() * 5) + 'vh';
        tb.style.opacity = String(0.35 + Math.random() * 0.25);
        tb.style.setProperty('--sway-speed', (3.5 + Math.random() * 3) + 's');
        tb.style.setProperty('--sway-delay', '-' + (Math.random() * 4) + 's');
        backContainer.appendChild(tb);
      }
    }

    // Front trees — kiri 0..70% (skip area rumah), + 2 medium di kanan jauh
    if (frontContainer) {
      for (var j = 0; j < 7; j++) {
        var tf = document.createElement('img');
        tf.src = srcs[j % 2];
        tf.className = 'tree-sprite';
        tf.alt = '';
        tf.style.left = (j * 10 + (Math.random() * 4 - 2)) + '%';
        tf.style.height = (20 + Math.random() * 8) + 'vh';
        tf.style.opacity = String(0.75 + Math.random() * 0.25);
        tf.style.setProperty('--sway-speed', (4 + Math.random() * 2.5) + 's');
        tf.style.setProperty('--sway-delay', '-' + (Math.random() * 5) + 's');
        frontContainer.appendChild(tf);
      }

      // Pohon medium di kanan jauh, tidak menabrak rumah
      var rightLefts = [88, 96];
      for (var k = 0; k < rightLefts.length; k++) {
        var tr = document.createElement('img');
        tr.src = srcs[k % 2];
        tr.className = 'tree-sprite';
        tr.alt = '';
        tr.style.left = (rightLefts[k] + (Math.random() * 2 - 1)) + '%';
        tr.style.height = (16 + Math.random() * 4) + 'vh';
        tr.style.opacity = String(0.7 + Math.random() * 0.2);
        tr.style.setProperty('--sway-speed', (4 + Math.random() * 2) + 's');
        tr.style.setProperty('--sway-delay', '-' + (Math.random() * 4) + 's');
        frontContainer.appendChild(tr);
      }
    }
  }

  // Generate scene: house, campfire, walking character
  function generateScene() {
    var bg = document.querySelector('.bg-container');
    if (!bg) return;

    var scene = document.createElement('div');
    scene.className = 'scene-wrapper';
    var frontEl = bg.querySelector('.trees-front');
    if (frontEl) {
      bg.insertBefore(scene, frontEl);
    } else {
      bg.appendChild(scene);
    }

    // --- House ---
    var houseWrap = document.createElement('div');
    houseWrap.className = 'scene-house-wrap';

    var houseImg = document.createElement('img');
    houseImg.src = 'house.png';
    houseImg.className = 'house-sprite';
    houseImg.alt = '';
    houseWrap.appendChild(houseImg);

    // Window glow overlay
    var glow = document.createElement('div');
    glow.className = 'window-glow';
    houseWrap.appendChild(glow);

    scene.appendChild(houseWrap);

    // --- Campfire ---
    var cf = document.createElement('div');
    cf.className = 'campfire-wrap';

    // Ground glow
    var cfGlow = document.createElement('div');
    cfGlow.className = 'cf-glow';
    cf.appendChild(cfGlow);

    // Smoke
    var smoke = document.createElement('div');
    smoke.className = 'cf-smoke';
    [
      {d:'0s',   dx:'0px'},
      {d:'0.6s', dx:'4px'},
      {d:'1.2s', dx:'-4px'},
      {d:'1.9s', dx:'2px'},
    ].forEach(function(s) {
      var sp = document.createElement('span');
      sp.style.setProperty('--d', s.d);
      sp.style.setProperty('--dx', s.dx);
      smoke.appendChild(sp);
    });
    cf.appendChild(smoke);

    // Flames
    var fire = document.createElement('div');
    fire.className = 'cf-fire';
    ['f1','f2','f3'].forEach(function(cls) {
      var sp = document.createElement('span');
      sp.className = cls;
      fire.appendChild(sp);
    });
    cf.appendChild(fire);

    // Logs
    var logs = document.createElement('div');
    logs.className = 'cf-logs';
    cf.appendChild(logs);

    scene.appendChild(cf);

    // --- Walking character (pixel art male) ---
    var walker = document.createElement('div');
    walker.className = 'scene-walker';

    // Simple pixel art male SVG
    walker.innerHTML =
      '<svg class="walker-svg" viewBox="0 0 9 16" xmlns="http://www.w3.org/2000/svg">' +
        // Hair
        '<rect x="3" y="0" width="3" height="1" fill="#5c3317"/>' +
        // Head
        '<rect x="3" y="1" width="3" height="3" fill="#fcd9a0"/>' +
        // Eyes
        '<rect x="4" y="2" width="1" height="1" fill="#2d1a00"/>' +
        // Shirt (body)
        '<rect x="2" y="4" width="5" height="4" fill="#2d6a4f"/>' +
        // Left arm
        '<rect x="1" y="4" width="1" height="3" fill="#fcd9a0"/>' +
        // Right arm
        '<rect x="7" y="4" width="1" height="3" fill="#fcd9a0"/>' +
        // Belt
        '<rect x="2" y="7" width="5" height="1" fill="#3d200e"/>' +
        // Left leg
        '<rect x="2" y="8" width="2" height="4" fill="#3d2b1a"/>' +
        // Right leg
        '<rect x="5" y="8" width="2" height="4" fill="#3d2b1a"/>' +
        // Left shoe
        '<rect x="2" y="12" width="2" height="1" fill="#1a0f00"/>' +
        // Right shoe
        '<rect x="5" y="12" width="2" height="1" fill="#1a0f00"/>' +
      '</svg>';

    scene.appendChild(walker);
  }

  // Scroll reveal animation
  function setupReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => io.observe(el));
  }

  // Mobile menu toggle
  function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Loader
  function setupLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('done'), LOADER_DELAY);
    });
  }

  // 8-bit click sound (synthesized with Web Audio)
  function setupClickSound() {
    let audioCtx = null;
    function playBeep() {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } catch (e) { /* ignore */ }
    }
    document.querySelectorAll('.pixel-btn, .social-btn, .action-card, .nav-links a').forEach(el => {
      el.addEventListener('click', playBeep);
    });
  }

  // Typewriter effect for hero subtitle
  function setupTypewriter() {
    const el = document.querySelector('[data-typewriter]');
    if (!el) return;
    const text = el.getAttribute('data-typewriter');
    el.textContent = '';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'blink';
    cursor.textContent = '_';
    function type() {
      if (i < text.length) {
        el.textContent = text.slice(0, i + 1);
        el.appendChild(cursor);
        i++;
        setTimeout(type, TYPEWRITER_SPEED);
      }
    }
    setTimeout(type, TYPEWRITER_DELAY);
  }

  // INIT
  function init() {
    generateStars();
    generateMeteors();
    generateClouds();
    generateRain();
    generateFireflies();
    generateMountains();
    generateTrees();
    generateScene();
    setupReveal();
    setupMobileMenu();
    setupLoader();
    setupClickSound();
    setupTypewriter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
