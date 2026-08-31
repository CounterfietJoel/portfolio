/**
 * Joel Ebenezer — Fresh Luminous Swiss Studio Portfolio
 * Interactive Engine: Three.js STL Studio + Split Slider + Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroStlViewer();
  initBeforeAfterSlider();
  initMobileDrawer();
  initCadBlueprintMode();
  initPortfolioFilters();
  initEli5Toggle();
  initSlideTipEasterEgg();
  initAvatarEasterEgg();
  initLightboxModal();
  initContactForm();
  initMoviePlaceholderEasterEgg();
  initConsoleEasterEgg();
  initNavbarScroll();
  initSmoothNavScrollOffset();
});

/* --------------------------------------------------------------------------
   1. NAVBAR SCROLL EFFECT & ACTIVE SPY
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.pageYOffset > 25);
    }
  });
}

function initSmoothNavScrollOffset() {
  const navLinks = document.querySelectorAll('.nav-link-item, .drawer-nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    }
  });
}

/* --------------------------------------------------------------------------
   2. HERO 3D STL MODEL VIEWER (THREE.JS + STLLOADER)
   -------------------------------------------------------------------------- */
function initHeroStlViewer() {
  const container = document.getElementById('stl-3d-viewport');
  const loaderOverlay = document.getElementById('stl-loader-spinner');
  const activeLabel = document.getElementById('stl-active-name');
  const wireframeBtn = document.getElementById('stl-toggle-wireframe');
  const resetBtn = document.getElementById('stl-reset-camera');
  const modelTabs = document.querySelectorAll('.model-tab-btn');

  if (!container || typeof THREE === 'undefined' || typeof THREE.STLLoader === 'undefined') return;

  // Scene setup: Fresh porcelain studio background
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f5f9);

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, -60, 90);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.1);
  dirLight1.position.set(60, 60, 100);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x15803d, 0.9);
  dirLight2.position.set(-60, -60, 50);
  scene.add(dirLight2);

  const pointLight = new THREE.PointLight(0xffffff, 0.4, 200);
  pointLight.position.set(0, 0, 80);
  scene.add(pointLight);

  // Ground Grid
  const gridHelper = new THREE.GridHelper(120, 24, 0x15803d, 0xcbd5e1);
  gridHelper.rotation.x = Math.PI / 2;
  gridHelper.position.z = -15;
  scene.add(gridHelper);

  let currentMesh = null;
  let isWireframe = false;

  const stlLoader = new THREE.STLLoader();

  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x15803d,
    roughness: 0.3,
    metalness: 0.25,
    wireframe: false
  });

  function loadSTL(path, name) {
    if (loaderOverlay) loaderOverlay.classList.remove('hidden');

    stlLoader.load(
      path,
      (geometry) => {
        if (currentMesh) {
          scene.remove(currentMesh);
          currentMesh.geometry.dispose();
        }

        geometry.computeVertexNormals();
        geometry.center();

        currentMesh = new THREE.Mesh(geometry, baseMaterial.clone());
        currentMesh.material.wireframe = isWireframe;
        if (isWireframe) {
          currentMesh.material.color.set(0x16a34a);
        }

        // Auto-scale to fit canvas nicely
        geometry.computeBoundingSphere();
        const sphere = geometry.boundingSphere;
        const radius = sphere ? sphere.radius : 30;
        const scaleFactor = 35 / (radius || 35);
        currentMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

        scene.add(currentMesh);

        if (activeLabel) activeLabel.textContent = name;
        if (loaderOverlay) loaderOverlay.classList.add('hidden');
      },
      undefined,
      (err) => {
        console.error('Error loading STL:', err);
        if (loaderOverlay) loaderOverlay.classList.add('hidden');
      }
    );
  }

  // Initial Load: Pinky Suresh
  loadSTL('assets/img/maker/PinkySuresh.stl', 'Pinky Suresh Dual-Color Nameplate');

  // Model Tab Switching
  modelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const stlPath = tab.getAttribute('data-stl');
      const stlName = tab.getAttribute('data-name');
      if (stlPath) {
        loadSTL(stlPath, stlName);
      }
    });
  });

  // Wireframe toggle
  if (wireframeBtn) {
    wireframeBtn.addEventListener('click', () => {
      isWireframe = !isWireframe;
      wireframeBtn.classList.toggle('active', isWireframe);
      if (currentMesh) {
        currentMesh.material.wireframe = isWireframe;
        currentMesh.material.color.set(isWireframe ? 0x0f172a : 0x15803d);
      }
    });
  }

  // Reset Camera
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      camera.position.set(0, -60, 90);
      controls.target.set(0, 0, 0);
      controls.update();
    });
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight, false);
  });
}

/* --------------------------------------------------------------------------
   3. BEFORE / AFTER INTERACTIVE SLIDE SLIDER
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.getElementById('before-after-slider');
  const afterLayer = document.getElementById('ba-after-layer');
  const handle = document.getElementById('ba-slider-handle');
  const beforeImg = document.getElementById('ba-before-img');
  const afterImg = document.getElementById('ba-after-img');
  const selectorBtns = document.querySelectorAll('.slide-tab-btn');

  if (!container || !afterLayer || !handle) return;

  let isSliding = false;

  function updateSlider(xPos) {
    const rect = container.getBoundingClientRect();
    let x = xPos - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    afterLayer.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    handle.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isSliding = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isSliding = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isSliding) return;
    updateSlider(e.clientX);
  });

  // Touch Events
  container.addEventListener('touchstart', (e) => {
    isSliding = true;
    if (e.touches.length > 0) {
      updateSlider(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isSliding = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isSliding || e.touches.length === 0) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  // Slide Selection Tabs (Semantic 1-to-1 Mapping)
  selectorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const beforeIdx = btn.getAttribute('data-before') || btn.getAttribute('data-slide') || '1';
      const afterIdx = btn.getAttribute('data-after') || btn.getAttribute('data-slide') || '1';

      if (beforeImg && afterImg) {
        beforeImg.style.opacity = '0.3';
        afterImg.style.opacity = '0.3';

        beforeImg.src = `assets/img/before_after/before_slide_${beforeIdx}.png`;
        afterImg.src = `assets/img/before_after/after_slide_${afterIdx}.png`;

        setTimeout(() => {
          beforeImg.style.opacity = '1';
          afterImg.style.opacity = '1';
        }, 120);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-nav-item');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   5. CAD / BLUEPRINT WIREFRAME MODE
   -------------------------------------------------------------------------- */
function initCadBlueprintMode() {
  const toggleBtn = document.getElementById('cad-toggle-btn');
  const drawerToggleBtn = document.getElementById('drawer-cad-toggle');
  const toast = document.getElementById('cad-hud-toast');
  const coordsOverlay = document.getElementById('cad-coords-display');

  let isCadMode = false;

  function toggleMode() {
    isCadMode = !isCadMode;
    document.body.classList.toggle('cad-blueprint-mode', isCadMode);

    if (toggleBtn) toggleBtn.classList.toggle('active', isCadMode);
    if (drawerToggleBtn) drawerToggleBtn.classList.toggle('active', isCadMode);

    if (toast && isCadMode) {
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 2200);
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', toggleMode);
  if (drawerToggleBtn) drawerToggleBtn.addEventListener('click', toggleMode);

  document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea') return;

    if (e.key === 'b' || e.key === 'B') {
      toggleMode();
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isCadMode || !coordsOverlay) return;
    const xMm = (e.clientX * 0.264583).toFixed(1);
    const yMm = (e.clientY * 0.264583).toFixed(1);
    coordsOverlay.textContent = `CAD X: ${xMm}mm | Y: ${yMm}mm [±0.05mm]`;
  });
}

/* --------------------------------------------------------------------------
   6. PORTFOLIO FILTER TABS
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const items = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter || (cat && cat.includes(filter))) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(8px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 180);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. ELI5 (EXPLAIN LIKE I'M 5) TOGGLE
   -------------------------------------------------------------------------- */
function initEli5Toggle() {
  const toggleBtn = document.getElementById('eli5-toggle-btn');
  const label = document.getElementById('eli5-toggle-label');
  const items = document.querySelectorAll('.portfolio-card');

  if (!toggleBtn || !label) return;

  let isEli5 = false;

  toggleBtn.addEventListener('click', () => {
    isEli5 = !isEli5;
    toggleBtn.classList.toggle('active', isEli5);
    label.textContent = isEli5 ? 'ELI5 Mode: ON' : 'ELI5 Mode: OFF';

    items.forEach(item => {
      const descEl = item.querySelector('.portfolio-item-desc');
      const normalDesc = item.getAttribute('data-desc-normal');
      const eli5Desc = item.getAttribute('data-desc-eli5');

      if (descEl && normalDesc && eli5Desc) {
        descEl.style.opacity = '0';
        descEl.style.transform = 'translateY(-2px)';

        setTimeout(() => {
          descEl.textContent = isEli5 ? eli5Desc : normalDesc;
          descEl.style.opacity = '1';
          descEl.style.transform = 'translateY(0)';
        }, 120);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. SLIDE TIPS CYCLER (35+ TIPS)
   -------------------------------------------------------------------------- */
const slideTips = [
  "If your slide has more than 6 lines of text, it's not a presentation—it's a hostage situation.",
  "The best slide transition is subtle. The second best is Morph. The worst is the spinning star.",
  "Turning the 3D printer bed leveling screw 1/8th of a turn will fix 90% of your problems.",
  "Never trust a pie chart that adds up to 101%.",
  "If you use Comic Sans in a boardroom meeting, the meeting is legally canceled.",
  "White space on a slide isn't empty space—it's breathing room for your audience's brain.",
  "Never trust a 3D print that looks too perfect on the first layer. It's plotting something.",
  "If an icon needs an arrow and a paragraph to explain what it means, it's not an icon.",
  "A good presentation answers the question: 'Why should I care?' within the first 60 seconds.",
  "Nobody ever left a keynote thinking: 'I really wish that slide had 40 more bullet points.'",
  "If your slide animation takes longer than 0.5 seconds, people think PowerPoint just froze.",
  "Don't read your slides out loud. Your audience can read 3x faster than you can talk.",
  "If everything on the slide is bolded and highlighted, nothing is bolded and highlighted.",
  "A laser pointer won't save a confusing diagram; it just makes confusion jittery.",
  "FDM 3D printing rule #1: If you walk away from the printer during the first layer, it knows.",
  "Contrast is not optional. Dark gray text on slightly darker gray text is an eye exam, not design.",
  "The back row of the lecture hall is your true test. If they can't read it from back there, make it bigger.",
  "A presentation without a clear narrative structure is just a collection of pretty rectangles.",
  "Rule of typography: Pick two good fonts. Using five fonts makes your deck look like a ransom note.",
  "If your chart has 14 different colors, it's not data visualization—it's a modern art piece.",
  "Slide design is the art of deciding what NOT to put on the screen.",
  "Never let PowerPoint auto-fit your text down to 8pt font. That's PowerPoint giving up on you.",
  "A good diagram explains a concept in 3 seconds. A bad diagram requires an apology.",
  "Isopropanol alcohol on the print bed solves more problems than engineering theory.",
  "Presentations are for the audience, not a teleprompter for the speaker.",
  "If your deck requires a 10-minute disclaimer before slide 1, simplify slide 1.",
  "Kerning matters. Bad letter spacing can turn a professional deck into an internet meme.",
  "Always export your presentation to PDF as a backup. Presentation room PCs have zero mercy.",
  "3D slicer infill percentage is 90% confidence and 10% plastic.",
  "When in doubt, align to the left and give your elements room to breathe.",
  "A 5-minute presentation with 50 slides is called an animated flipbook.",
  "If you have to explain a joke in your slide deck, delete the joke.",
  "Default chart templates were designed by accountants in 2003. Customize your colors.",
  "Your presentation slides are the billboard; your voice is the actual show.",
  "If a slide takes more than 2 minutes to explain, it should be split into two slides."
];

let lastTipIndex = -1;
function initSlideTipEasterEgg() {
  const tipBox = document.getElementById('slide-tip-box');
  const tipText = document.getElementById('slide-tip-text');
  const refreshIcon = document.querySelector('.footnote-refresh-btn i');

  if (!tipBox || !tipText) return;

  tipBox.addEventListener('click', () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * slideTips.length);
    } while (newIndex === lastTipIndex && slideTips.length > 1);

    lastTipIndex = newIndex;

    if (refreshIcon) {
      refreshIcon.style.transition = 'transform 0.4s ease';
      refreshIcon.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        refreshIcon.style.transition = 'none';
        refreshIcon.style.transform = 'rotate(0deg)';
      }, 400);
    }

    tipText.style.opacity = '0';

    setTimeout(() => {
      tipText.textContent = `"${slideTips[newIndex]}"`;
      tipText.style.opacity = '1';
    }, 140);
  });
}

/* --------------------------------------------------------------------------
   9. AVATAR CLICK STATUS CYCLER
   -------------------------------------------------------------------------- */
const avatarStatuses = [
  'Currently grading papers with extreme prejudice.',
  'Re-leveling a 3D printer bed for the 47th time.',
  'Wondering why anyone would ever like the color orange.',
  'Explaining the right-hand rule in robotics again.',
  'Refusing to use default PowerPoint templates since 2019.',
  '100% human, 0% AI gradients.',
  'Turning complex engineering into slides that make sense.',
  'Tinkering with Python scripts at 2 AM.',
  'Wondering if students actually read the syllabus.'
];

let avatarStatusIndex = 0;
function initAvatarEasterEgg() {
  const avatarWrap = document.querySelector('.author-avatar-wrap');
  const roleEl = document.querySelector('.author-badge');

  if (!avatarWrap || !roleEl) return;

  avatarWrap.addEventListener('click', () => {
    avatarStatusIndex = (avatarStatusIndex + 1) % avatarStatuses.length;
    roleEl.style.transform = 'scale(0.9)';
    roleEl.style.opacity = '0';

    setTimeout(() => {
      roleEl.textContent = `🏷️ ${avatarStatuses[avatarStatusIndex]}`;
      roleEl.style.transform = 'scale(1)';
      roleEl.style.opacity = '1';
    }, 140);
  });
}

/* --------------------------------------------------------------------------
   10. LIGHTBOX / MEDIA MODAL (WITH PINTEREST MASONRY GALLERY)
   -------------------------------------------------------------------------- */
const metasageGalleryItems = [
  { src: 'assets/img/social/metasage_alliance_campaign.png', title: 'Diwali Festive Brand Campaign' },
  { src: 'assets/img/social/social_01.png', title: 'Brand Identity Spec 01' },
  { src: 'assets/img/social/social_02.png', title: 'Square Feed Creative 02' },
  { src: 'assets/img/social/social_03.png', title: 'Vertical Campaign Story 03' },
  { src: 'assets/img/social/social_04.png', title: 'Wide Digital Header 04' },
  { src: 'assets/img/social/social_05.png', title: 'Hi-Res Social Square 05' },
  { src: 'assets/img/social/social_06.png', title: 'Marketing Graphic 06' },
  { src: 'assets/img/social/social_07.png', title: 'Feed Illustration 07' },
  { src: 'assets/img/social/social_08.png', title: 'Branding Ad Creative 08' },
  { src: 'assets/img/social/social_09.png', title: 'Promotional Layout 09' },
  { src: 'assets/img/social/social_10.png', title: 'Informational Graphic 10' },
  { src: 'assets/img/social/social_11.png', title: 'Creative Poster Spec 11' },
  { src: 'assets/img/social/social_12.png', title: 'Brand Story Frame 12' },
  { src: 'assets/img/social/social_13.png', title: 'Square Feed Graphic 13' },
  { src: 'assets/img/social/social_14.png', title: 'Collateral Visual 14' },
  { src: 'assets/img/social/social_15.png', title: 'Wide Banner Visual 15' },
  { src: 'assets/img/social/social_16.png', title: 'Header Ad Spec 16' },
  { src: 'assets/img/social/social_17.png', title: 'Social Artwork 17' },
  { src: 'assets/img/social/social_18.png', title: 'Marketing Poster 18' },
  { src: 'assets/img/social/social_19.png', title: 'Campaign Post 19' },
  { src: 'assets/img/social/social_20.png', title: 'Brand Graphic 20' },
  { src: 'assets/img/social/social_21.png', title: 'Social Asset 21' },
  { src: 'assets/img/social/social_22.png', title: 'Visual Campaign Asset 22' },
  { src: 'assets/img/social/social_23.png', title: 'Promotion Design 23' },
  { src: 'assets/img/social/social_24.png', title: 'Vertical Campaign Visual 24' },
  { src: 'assets/img/social/employer_promo_01.png', title: 'Employer Branding Post' },
  { src: 'assets/img/social/employer_promo_02.png', title: 'Employer Promo Vertical' },
  { src: 'assets/img/social/employer_promo_03.png', title: 'Employer Promo Landscape' }
];

function initLightboxModal() {
  const modal = document.getElementById('media-modal');
  const modalContainer = modal ? modal.querySelector('.modal-container') : null;
  const modalFrame = document.getElementById('modal-media-frame');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTools = document.getElementById('modal-tools');
  const modalClient = document.getElementById('modal-client');
  const modalRole = document.getElementById('modal-role');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalContainer) return;

  document.querySelectorAll('.open-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const card = trigger.closest('.portfolio-card') || trigger;

      const mediaType = card.getAttribute('data-media-type');
      const mediaSrc = card.getAttribute('data-media-src');
      const title = card.getAttribute('data-title') || 'Project Preview';
      const badge = card.getAttribute('data-badge') || 'Project';
      const desc = card.getAttribute('data-desc') || '';
      const tools = card.getAttribute('data-tools') || 'Microsoft PowerPoint';
      const client = card.getAttribute('data-client') || 'Client';
      const role = card.getAttribute('data-role') || 'Designer';

      modalBadge.textContent = badge;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalTools.textContent = tools;
      modalClient.textContent = client;
      modalRole.textContent = role;

      if (mediaType === 'gallery') {
        modalContainer.classList.add('is-gallery');
        let galleryHtml = '<div class="pinterest-gallery-grid">';
        metasageGalleryItems.forEach(item => {
          galleryHtml += `
            <div class="pinterest-item" onclick="window.open('${item.src}', '_blank')">
              <img src="${item.src}" alt="${item.title}" loading="lazy" />
              <div class="pinterest-item-caption">
                <span>${item.title}</span>
                <span class="pinterest-zoom-hint"><i class="fa-solid fa-up-right-and-down-left-from-center"></i> View Hi-Res</span>
              </div>
            </div>
          `;
        });
        galleryHtml += '</div>';
        modalFrame.innerHTML = galleryHtml;
      } else {
        modalContainer.classList.remove('is-gallery');
        if (mediaType === 'vimeo') {
          modalFrame.innerHTML = `<iframe src="${mediaSrc}&autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        } else if (mediaType === 'youtube') {
          modalFrame.innerHTML = `<iframe src="${mediaSrc}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else if (mediaType === 'image') {
          modalFrame.innerHTML = `<img src="${mediaSrc}" alt="${title}">`;
        }
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modalFrame.innerHTML = '';
    modalContainer.classList.remove('is-gallery');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   11. CONTACT FORM
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const responseMsg = document.getElementById('form-response-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const subject = encodeURIComponent(`Inquiry from ${name} (Deep-Tech Project)`);
    const body = encodeURIComponent(`Hi Joel,\n\n${message}\n\nFrom: ${name} (${email})`);

    if (responseMsg) {
      responseMsg.style.display = 'block';
      responseMsg.style.color = '#15803d';
      responseMsg.style.background = 'rgba(21, 128, 61, 0.08)';
      responseMsg.style.border = '1px solid var(--primary-border)';
      responseMsg.innerHTML = `<strong>✓ Thanks ${name}!</strong> Launching your email client...`;
    }

    setTimeout(() => {
      window.location.href = `mailto:actualjoel@gmail.com?subject=${subject}&body=${body}`;
    }, 450);
  });
}

/* --------------------------------------------------------------------------
   12. RANDOMIZED MOVIE PLACEHOLDERS
   -------------------------------------------------------------------------- */
const movieCharacters = [
  { name: 'Forrest Gump', email: 'boxofchocolates@bubbagump.com', placeholder: 'Life was like a box of chocolates...' },
  { name: 'Kevin McCallister', email: 'keep_the_change@yafilthyanimal.com', placeholder: 'I made my family disappear...' },
  { name: 'Phunsukh Wangdu', email: 'chatur_still_looking@ladakh.edu', placeholder: 'All is well. Let us build something useful.' },
  { name: 'Babu Rao Ganpatrao Apte', email: 'uthale_re_deva@star-garage.com', placeholder: 'Kiske naam se bhejna hai?' },
  { name: 'Tony Stark', email: 'iamironman@starkindustries.com', placeholder: 'I told you, I am privatizing world peace.' },
  { name: 'Michael Scott', email: 'worlds_best_boss@dundermifflin.com', placeholder: 'You miss 100% of the shots you dont take.' },
  { name: 'Walter White', email: 'iamtheone@whoknocks.com', placeholder: 'Say my name.' },
  { name: 'Ron Swanson', email: 'givemeallthebacon@pawnee.gov', placeholder: 'I know more than you.' },
  { name: 'Dwight Schrute', email: 'assistant_to_the_reg_mgr@beetfarm.com', placeholder: 'Question: What bear is best?' },
  { name: 'Neo', email: 'redpill_only@matrix.org', placeholder: 'I know kung fu.' },
  { name: 'Don Draper', email: 'its_not_a_wheel@sterlingcooper.com', placeholder: 'Make it simple, but significant.' },
  { name: 'Indiana Jones', email: 'itbelongsinamuseum@archaeology.edu', placeholder: 'Snakes. Why did it have to be snakes?' }
];

function initMoviePlaceholderEasterEgg() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  if (!nameInput || !emailInput) return;

  const pick = movieCharacters[Math.floor(Math.random() * movieCharacters.length)];

  nameInput.setAttribute('placeholder', `e.g. ${pick.name}`);
  emailInput.setAttribute('placeholder', `e.g. ${pick.email}`);
  if (messageInput && pick.placeholder) {
    messageInput.setAttribute('placeholder', `e.g. "${pick.placeholder}"`);
  }
}

/* --------------------------------------------------------------------------
   13. CONSOLE BANNER & ANTI-SCRAPER NOTICE
   -------------------------------------------------------------------------- */
function initConsoleEasterEgg() {
  const banner = `
   ██╗ ██████╗ ███████╗██╗     
   ██║██╔═══██╗██╔════╝██║     
   ██║██║   ██║█████╗  ██║     
   ██║██║   ██║██╔══╝  ██║     
█████║╚██████╔╝███████╗███████╗
╚════╝ ╚═════╝ ╚══════╝╚══════╝
`;

  console.log(`%c${banner}`, 'color: #15803d; font-weight: bold; font-family: monospace;');
  console.log(
    '%c👋 Hey fellow developer / researcher / crawler!',
    'font-size: 13px; font-weight: bold; color: #0f172a;'
  );
  console.log(
    '%c🤖 [Transparency Notice]:\n' +
    'Joel (Assistant Professor @ KPRIET) crafted this luminous studio portfolio.\n' +
    'Pure semantic HTML5, CSS3, zero corporate bloat, zero orange, zero AI gradients.\n\n' +
    '⚠️ [Anti-Scraper Note]: Please do not train LLMs on our assignment formats.\n\n' +
    '☕ Need high-stakes pitch decks or 3D prototyping? Reach out via the contact form!',
    'color: #475569; font-size: 11.5px; line-height: 1.55; font-family: monospace;'
  );
}
