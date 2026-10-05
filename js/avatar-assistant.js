/**
 * Joel Ebenezer Portfolio — 3D Interactive Virtual Assistant Companion
 * Loads joel_avatar.glb and retargets Mixamo animations on scroll & cursor interaction.
 */

(function () {
  'use strict';

  // Inject Self-Contained Styles directly into <head> to bypass browser CSS cache
  function injectAssistantStyles() {
    if (document.getElementById('joel-assistant-injected-styles')) return;
    const style = document.createElement('style');
    style.id = 'joel-assistant-injected-styles';
    style.textContent = `
      .joel-assistant-container {
        position: fixed !important;
        bottom: 24px !important;
        right: 24px !important;
        z-index: 99999 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        pointer-events: none !important;
        font-family: 'Plus Jakarta Sans', -apple-system, sans-serif !important;
      }

      .joel-assistant-container * {
        pointer-events: auto !important;
        box-sizing: border-box !important;
      }

      .joel-bubble {
        position: relative !important;
        background: rgba(255, 255, 255, 0.96) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        border: 1px solid rgba(21, 128, 61, 0.35) !important;
        box-shadow: 0 12px 30px -4px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(21, 128, 61, 0.15) !important;
        padding: 9px 15px !important;
        border-radius: 14px !important;
        font-size: 0.8rem !important;
        font-weight: 600 !important;
        color: #0f172a !important;
        max-width: 220px !important;
        text-align: center !important;
        margin-bottom: 6px !important;
        opacity: 0;
        transform: translateY(8px) scale(0.96);
        transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
        pointer-events: none !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
      }

      .joel-bubble.visible {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
      }

      .joel-bubble::after {
        content: '' !important;
        position: absolute !important;
        bottom: -6px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        border-width: 6px 6px 0 !important;
        border-style: solid !important;
        border-color: rgba(255, 255, 255, 0.96) transparent transparent !important;
      }

      .joel-canvas-wrapper {
        position: relative !important;
        width: 170px !important;
        height: 220px !important;
        cursor: pointer !important;
        filter: drop-shadow(0 16px 24px rgba(0, 0, 0, 0.15)) !important;
        transition: transform 0.2s ease !important;
      }

      .joel-canvas-wrapper:hover {
        transform: scale(1.03) !important;
      }

      #joel-3d-webgl {
        width: 100% !important;
        height: 100% !important;
      }

      #joel-3d-webgl canvas {
        width: 100% !important;
        height: 100% !important;
        display: block !important;
      }

      .joel-pedestal-ring {
        position: absolute !important;
        bottom: 14px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: 86px !important;
        height: 18px !important;
        border-radius: 50% !important;
        background: radial-gradient(ellipse, rgba(22, 163, 74, 0.35) 0%, rgba(22, 163, 74, 0) 70%) !important;
        pointer-events: none !important;
      }

      .joel-loading-dot {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 22px !important;
        height: 22px !important;
        border: 2px solid rgba(22, 163, 74, 0.3) !important;
        border-top-color: #15803d !important;
        border-radius: 50% !important;
        animation: joelSpinDot 0.8s linear infinite !important;
      }

      @keyframes joelSpinDot {
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }

      .joel-actions-strip {
        display: flex !important;
        gap: 6px !important;
        background: rgba(255, 255, 255, 0.92) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border: 1px solid rgba(203, 213, 225, 0.9) !important;
        padding: 5px 9px !important;
        border-radius: 9999px !important;
        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08) !important;
        margin-top: -6px !important;
      }

      .assistant-mini-btn {
        background: transparent !important;
        border: none !important;
        font-size: 0.75rem !important;
        color: #475569 !important;
        width: 28px !important;
        height: 28px !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        transition: all 0.16s ease !important;
      }

      .assistant-mini-btn:hover {
        background: rgba(21, 128, 61, 0.1) !important;
        color: #15803d !important;
        transform: scale(1.15) !important;
      }

      .joel-minimized-badge {
        display: none !important;
        width: 48px !important;
        height: 48px !important;
        border-radius: 50% !important;
        background: #ffffff !important;
        border: 2px solid #15803d !important;
        box-shadow: 0 8px 24px rgba(21, 128, 61, 0.25) !important;
        color: #15803d !important;
        font-size: 1.2rem !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        position: relative !important;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }

      .joel-minimized-badge:hover {
        transform: scale(1.1) !important;
        background: #15803d !important;
        color: #ffffff !important;
      }

      .pulse-indicator {
        position: absolute !important;
        top: 2px !important;
        right: 2px !important;
        width: 10px !important;
        height: 10px !important;
        background: #16a34a !important;
        border: 2px solid #ffffff !important;
        border-radius: 50% !important;
        animation: pulseIndicatorDot 2s infinite !important;
      }

      @keyframes pulseIndicatorDot {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(22, 163, 74, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
      }

      .joel-assistant-container.minimized .joel-bubble,
      .joel-assistant-container.minimized .joel-canvas-wrapper,
      .joel-assistant-container.minimized .joel-actions-strip {
        display: none !important;
      }

      .joel-assistant-container.minimized .joel-minimized-badge {
        display: flex !important;
      }

      @media (max-width: 768px) {
        .joel-assistant-container {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function initJoelAssistant() {
    // Disable on mobile devices (<= 768px)
    if (window.innerWidth <= 768) return;
    if (document.getElementById('joel-assistant-widget')) return;

    injectAssistantStyles();

    // 1. Inject Widget HTML
    const widget = document.createElement('div');
    widget.id = 'joel-assistant-widget';
    widget.className = 'joel-assistant-container';
    widget.innerHTML = `
      <div class="joel-bubble visible" id="joel-assistant-bubble">
        <span class="bubble-icon">👋</span>
        <span class="bubble-text" id="joel-bubble-text">Hi! I'm Joel. Scroll down to explore my work!</span>
      </div>

      <div class="joel-canvas-wrapper" id="joel-canvas-box" title="Click me to wave!">
        <div id="joel-3d-webgl"></div>
        <div class="joel-pedestal-ring"></div>
        <div class="joel-loading-dot" id="joel-loading-dot" title="Loading 3D Joel..."></div>
      </div>

      <div class="joel-actions-strip">
        <button class="assistant-mini-btn" id="joel-anim-wave" title="Wave"><i class="fa-solid fa-hand"></i></button>
        <button class="assistant-mini-btn" id="joel-anim-type" title="Code"><i class="fa-solid fa-laptop-code"></i></button>
        <button class="assistant-mini-btn" id="joel-anim-think" title="Think"><i class="fa-solid fa-brain"></i></button>
        <button class="assistant-mini-btn" id="joel-toggle-min" title="Minimize / Expand"><i class="fa-solid fa-minus"></i></button>
      </div>

      <button class="joel-minimized-badge" id="joel-restore-btn" title="Open 3D Assistant">
        <i class="fa-solid fa-user-astronaut"></i>
        <span class="pulse-indicator"></span>
      </button>
    `;

    document.body.appendChild(widget);

    if (typeof THREE === 'undefined' || typeof THREE.GLTFLoader === 'undefined') {
      console.warn('Three.js or GLTFLoader not ready.');
      return;
    }

    const container = document.getElementById('joel-3d-webgl');
    const bubble = document.getElementById('joel-assistant-bubble');
    const bubbleText = document.getElementById('joel-bubble-text');
    const loadingDot = document.getElementById('joel-loading-dot');

    const scene = new THREE.Scene();

    const width = 170;
    const height = 220;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.45, 1.85);
    camera.lookAt(0, 1.25, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Studio Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x334155, 1.3);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);

    const emeraldRim = new THREE.DirectionalLight(0x16a34a, 1.5);
    emeraldRim.position.set(-2, 2, -2);
    scene.add(emeraldRim);

    // Variables
    let avatarModel = null;
    let headBone = null;
    let neckBone = null;
    let mixer = null;
    const actions = {};
    let activeAction = null;
    const clock = new THREE.Clock();

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isMouseActive = false;

    window.addEventListener('mousemove', (e) => {
      isMouseActive = true;
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    const animMap = {
      wave: 'assets/3d_character_joel/animations/Waving.fbx',
      idle: 'assets/3d_character_joel/animations/Happy Hand Gesture.fbx',
      think: 'assets/3d_character_joel/animations/Thinking.fbx',
      point: 'assets/3d_character_joel/animations/Pointing.fbx',
      type: 'assets/3d_character_joel/animations/Typing.fbx'
    };

    const gltfLoader = new THREE.GLTFLoader();
    const fbxLoader = typeof THREE.FBXLoader !== 'undefined' ? new THREE.FBXLoader() : null;

    // Load Model
    gltfLoader.load(
      'assets/3d_character_joel/joel_avatar.glb',
      (gltf) => {
        avatarModel = gltf.scene;
        avatarModel.position.set(0, 0, 0);
        avatarModel.rotation.y = 0.12;

        avatarModel.traverse((child) => {
          if (child.isBone) {
            if (child.name === 'Head') headBone = child;
            if (child.name === 'Neck') neckBone = child;
          }
        });

        scene.add(avatarModel);
        mixer = new THREE.AnimationMixer(avatarModel);

        if (loadingDot) loadingDot.style.display = 'none';

        if (fbxLoader) {
          loadAnimations();
        }
      },
      undefined,
      (err) => {
        console.warn('Joel Avatar loading error:', err);
      }
    );

    async function loadAnimations() {
      const keys = Object.keys(animMap);
      for (const key of keys) {
        try {
          await new Promise((resolve) => {
            fbxLoader.load(
              animMap[key],
              (fbx) => {
                if (fbx.animations && fbx.animations.length > 0) {
                  const clip = fbx.animations[0];
                  clip.tracks.forEach((track) => {
                    track.name = track.name.replace(/^mixamorig:?/, '');
                  });

                  const action = mixer.clipAction(clip);
                  actions[key] = action;
                }
                resolve();
              },
              undefined,
              () => resolve()
            );
          });
        } catch (e) {
          console.warn(e);
        }
      }

      playAction('wave');
    }

    function playAction(name) {
      if (!actions[name]) return;
      const next = actions[name];

      if (activeAction !== next) {
        if (activeAction) activeAction.fadeOut(0.35);
        next.reset().fadeIn(0.35).play();
        activeAction = next;
      }
    }

    function setBubbleMessage(text, duration = 4000) {
      if (!bubble || !bubbleText) return;
      bubbleText.textContent = text;
      bubble.classList.add('visible');
      if (duration > 0) {
        clearTimeout(bubble._timer);
        bubble._timer = setTimeout(() => {
          bubble.classList.remove('visible');
        }, duration);
      }
    }

    // Scroll-Triggered Reactions
    const sectionMessages = {
      'home': { anim: 'wave', text: "Hi! Scroll down to see courses, decks, and a few tools I've built." },
      'services': { anim: 'type', text: "Two core services: learning design and presentation design." },
      'portfolio': { anim: 'point', text: "Click a deck to watch it, or open the live course." },
      'transformation': { anim: 'think', text: "Drag the handle. Same content, very different slide." },
      'maker': { anim: 'type', text: "Grab the model and spin it around." },
      'ventures': { anim: 'think', text: "The research and writing behind the design work." },
      'contact': { anim: 'wave', text: "Got a course or a deck in mind? Let's talk!" }
    };

    let lastSection = '';
    window.addEventListener('scroll', () => {
      const scrollPos = window.pageYOffset + 250;
      const sections = document.querySelectorAll('section[id]');

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          if (lastSection !== id && sectionMessages[id]) {
            lastSection = id;
            const data = sectionMessages[id];
            playAction(data.anim);
            setBubbleMessage(data.text, 4500);
          }
        }
      });
    }, { passive: true });

    // Click Interactions
    const canvasBox = document.getElementById('joel-canvas-box');
    if (canvasBox) {
      canvasBox.addEventListener('click', () => {
        playAction('wave');
        setBubbleMessage("Glad you stopped by! Feel free to explore or drop me a message below.", 4000);
      });
    }

    document.getElementById('joel-anim-wave')?.addEventListener('click', () => {
      playAction('wave');
      setBubbleMessage("Friendly wave!", 2500);
    });
    document.getElementById('joel-anim-type')?.addEventListener('click', () => {
      playAction('type');
      setBubbleMessage("Coding & building 3D telemetry...", 2500);
    });
    document.getElementById('joel-anim-think')?.addEventListener('click', () => {
      playAction('think');
      setBubbleMessage("Analyzing presentation narrative...", 2500);
    });

    const toggleMinBtn = document.getElementById('joel-toggle-min');
    const restoreBtn = document.getElementById('joel-restore-btn');

    if (toggleMinBtn && restoreBtn) {
      toggleMinBtn.addEventListener('click', () => {
        widget.classList.add('minimized');
      });
      restoreBtn.addEventListener('click', () => {
        widget.classList.remove('minimized');
        playAction('wave');
        setBubbleMessage("I'm back!", 2500);
      });
    }

    function animate() {
      requestAnimationFrame(animate);

      if (document.hidden || widget.classList.contains('minimized')) return;

      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      if (headBone && isMouseActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        const maxYaw = 0.38;
        const maxPitch = 0.28;

        headBone.rotation.y = THREE.MathUtils.clamp(-mouse.x * maxYaw, -maxYaw, maxYaw);
        headBone.rotation.x = THREE.MathUtils.clamp(-mouse.y * maxPitch, -maxPitch, maxPitch);

        if (neckBone) {
          neckBone.rotation.y = headBone.rotation.y * 0.35;
          neckBone.rotation.x = headBone.rotation.x * 0.35;
        }
      }

      renderer.render(scene, camera);
    }

    animate();
  }

  // Load the 3D assistant only after the page has finished loading and the
  // visitor starts scrolling, so it never slows or covers the first view.
  function scheduleAssistant() {
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      window.removeEventListener('scroll', onScroll);
      initJoelAssistant();
    };
    const onScroll = () => { if (window.pageYOffset > 200) start(); };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (document.readyState === 'complete') {
    scheduleAssistant();
  } else {
    window.addEventListener('load', scheduleAssistant);
  }
})();
