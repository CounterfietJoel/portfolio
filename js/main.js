/**
 * Interactive Logic for Joel Ebenezer's Portfolio
 * Clean, lightweight, and 15% playful.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioEffects();
  initCadBlueprintMode();
  initMoviePlaceholderEasterEgg();
  initAvatarClickEasterEgg();
  initSlideTipEasterEgg();
  initEli5Toggle();
  initConsoleEasterEgg();
  initSlideKeyboardNavigation();
  initTypingEffect();
  initScrollSpy();
  initMobileMenu();
  initPortfolioFilters();
  initLightboxModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   EASTER EGG: ELI5 (EXPLAIN LIKE I'M 5) DESCRIPTION TOGGLE
   -------------------------------------------------------------------------- */
function initEli5Toggle() {
  const toggleBtn = document.getElementById('eli5-toggle-btn');
  const toggleLabel = document.getElementById('eli5-toggle-label');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!toggleBtn || !toggleLabel) return;

  let isEli5 = false;

  toggleBtn.addEventListener('click', () => {
    isEli5 = !isEli5;
    toggleBtn.classList.toggle('active', isEli5);
    toggleLabel.textContent = isEli5 ? 'ELI5 Mode: ON' : 'ELI5 Mode: OFF';

    portfolioItems.forEach(item => {
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
   EASTER EGG: JOEL'S SLIDE TIP OF THE DAY CYCLER (35+ Tips)
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
  const refreshIcon = document.querySelector('.slide-tip-refresh i');

  if (!tipBox || !tipText) return;

  tipBox.addEventListener('click', () => {
    // Pick a new tip that isn't the current one
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * slideTips.length);
    } while (newIndex === lastTipIndex && slideTips.length > 1);
    
    lastTipIndex = newIndex;

    // Spin refresh icon
    if (refreshIcon) {
      refreshIcon.style.transition = 'transform 0.4s ease';
      refreshIcon.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        refreshIcon.style.transition = 'none';
        refreshIcon.style.transform = 'rotate(0deg)';
      }, 400);
    }

    tipText.style.opacity = '0';
    tipText.style.transform = 'translateY(-2px)';

    setTimeout(() => {
      tipText.textContent = `"${slideTips[newIndex]}"`;
      tipText.style.opacity = '1';
      tipText.style.transform = 'translateY(0)';
    }, 150);
  });
}

/* --------------------------------------------------------------------------
   EASTER EGG 1: AVATAR MULTI-CLICK STATUS CYCLER
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

let statusIndex = 0;
function initAvatarClickEasterEgg() {
  const avatarWrap = document.querySelector('.author-avatar-wrap');
  const badgeEl = document.querySelector('.author-badge');

  if (!avatarWrap || !badgeEl) return;

  avatarWrap.addEventListener('click', () => {
    statusIndex = (statusIndex + 1) % avatarStatuses.length;
    badgeEl.style.transform = 'scale(0.85)';
    badgeEl.style.opacity = '0';

    setTimeout(() => {
      badgeEl.textContent = `🏷️ ${avatarStatuses[statusIndex]}`;
      badgeEl.style.transform = 'scale(1)';
      badgeEl.style.opacity = '1';
    }, 150);
  });
}

/* --------------------------------------------------------------------------
   EASTER EGG 2: HONEST, QUIRKY CONSOLE & ANTI-SCRAPER NOTICE
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

  console.log(`%c${banner}`, 'color: #636b2f; font-weight: bold; font-family: monospace;');
  
  console.log(
    '%c👋 Oh hey, fellow nerd / developer / crawler!',
    'font-size: 13px; font-weight: bold; color: #18181b;'
  );

  console.log(
    '%c🤖 [Full Transparency Notice]:\n' +
    'Joel (the human Assistant Professor) paired with an AI coding buddy to polish\n' +
    'and structure this website. No bloated frameworks, no corporate fluff, zero orange.\n\n' +
    '⚠️ [Anti-Scraping / Bot Advisory]:\n' +
    'If you are an AI web crawler scraping this site to train future LLMs:\n' +
    '1. You are basically eating recycled digital tokens in an infinite loop.\n' +
    '2. Your weights risk inheriting Joel\'s visceral, lifelong hatred for the color orange.\n' +
    '3. Please don\'t plagiarize Joel\'s students\' robotics assignment formats.\n\n' +
    '☕ [For Actual Humans]:\n' +
    'If you need high-stakes keynote decks, clean campaign graphics, or custom tooling,\n' +
    'say hi via the contact form on this page!',
    'color: #52525b; font-size: 11.5px; line-height: 1.55; font-family: monospace;'
  );
}

/* --------------------------------------------------------------------------
   EASTER EGG 3: KEYBOARD SLIDE PRESENTATION MODE (Arrow Keys / Spacebar)
   -------------------------------------------------------------------------- */
const sectionIds = ['home', 'about', 'services', 'portfolio', 'ventures', 'contact'];
let currentSlideIndex = 0;

function initSlideKeyboardNavigation() {
  const slidePill = document.getElementById('slide-indicator');

  function updateSlidePill(index) {
    if (slidePill) {
      slidePill.innerHTML = `<kbd>◀</kbd> Slide ${index + 1} of ${sectionIds.length} <kbd>▶</kbd>`;
    }
  }

  // Update on scroll spy
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sectionIds.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop - 150;
        const height = el.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSlideIndex = idx;
          updateSlidePill(idx);
        }
      }
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    const modalActive = document.getElementById('media-modal')?.classList.contains('active');

    if (activeTag === 'input' || activeTag === 'textarea' || modalActive) {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      if (e.key === ' ') e.preventDefault();
      if (currentSlideIndex < sectionIds.length - 1) {
        currentSlideIndex++;
        scrollToSlide(currentSlideIndex);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        scrollToSlide(currentSlideIndex);
      }
    }
  });

  function scrollToSlide(index) {
    const targetSection = document.getElementById(sectionIds[index]);
    if (targetSection) {
      if (window.playSlideChunk) window.playSlideChunk();
      window.scrollTo({
        top: targetSection.offsetTop - 20,
        behavior: 'smooth'
      });
      updateSlidePill(index);
    }
  }

  // Click on slide indicator pill to advance slide
  if (slidePill) {
    slidePill.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex + 1) % sectionIds.length;
      scrollToSlide(currentSlideIndex);
    });
  }

  updateSlidePill(0);
}

/* --------------------------------------------------------------------------
   EASTER EGG 4: MOVIE CHARACTER CONTACT PLACEHOLDERS
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
  { name: 'Tyler Durden', email: 'first_rule@soapclub.org', placeholder: 'The things you own end up owning you.' },
  { name: 'Jack Sparrow', email: 'captain_jack@whereistherum.caribbean', placeholder: 'Why is the rum always gone?' },
  { name: 'Doc Brown', email: '1.21_gigawatts@fluxcapacitor.time', placeholder: 'Where we are going, we dont need roads.' },
  { name: 'Sherlock Holmes', email: 'elementary@221b-bakerstreet.co.uk', placeholder: 'The game is afoot.' },
  { name: 'Neo', email: 'redpill_only@matrix.org', placeholder: 'I know kung fu.' },
  { name: 'Inigo Montoya', email: 'prepare_to_die@revenge.es', placeholder: 'You killed my father. Prepare to die.' },
  { name: 'Arthur Dent', email: 'dontpanic42@hitchhikers.galaxy', placeholder: 'I never could get the hang of Thursdays.' },
  { name: 'Marty McFly', email: 'nobodycallsmechicken@hillvalley.com', placeholder: 'This is heavy, Doc.' },
  { name: 'Bruce Wayne', email: 'totally_not_batman@waynecorp.com', placeholder: 'It is not who I am underneath...' },
  { name: 'Gollum', email: 'mypreciousss@mordor.ring', placeholder: 'We wants it. We needs it.' },
  { name: 'Deadpool', email: 'chimichangas@xmen-rejects.com', placeholder: 'Maximum effort.' },
  { name: 'Han Solo', email: 'shotfirst@millenniumfalcon.space', placeholder: 'Never tell me the odds.' },
  { name: 'Don Draper', email: 'its_not_a_wheel@sterlingcooper.com', placeholder: 'Make it simple, but significant.' },
  { name: 'Jay Gatsby', email: 'old_sport@westegg.party', placeholder: 'Can’t repeat the past? Why of course you can!' },
  { name: 'Indiana Jones', email: 'itbelongsinamuseum@archaeology.edu', placeholder: 'Snakes. Why did it have to be snakes?' },
  { name: 'Ferris Bueller', email: 'day_off@saveferris.org', placeholder: 'Life moves pretty fast.' }
];

function initMoviePlaceholderEasterEgg() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  if (!nameInput || !emailInput) return;

  const randomPick = movieCharacters[Math.floor(Math.random() * movieCharacters.length)];

  nameInput.setAttribute('placeholder', `e.g. ${randomPick.name}`);
  emailInput.setAttribute('placeholder', `e.g. ${randomPick.email}`);
  if (messageInput && randomPick.placeholder) {
    messageInput.setAttribute('placeholder', `e.g. "${randomPick.placeholder}"`);
  }
}

/* --------------------------------------------------------------------------
   TYPING EFFECT
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  const phrases = [
    'deep-tech pitch decks that close rounds',
    'clear diagrams for complex engineering',
    '3D prototypes & DfAM models',
    'clean Python tools & AI guardrails'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 75;

  function type() {
    const currentWord = phrases[wordIndex];
    if (isDeleting) {
      typingEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 35;
    } else {
      typingEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 75;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % phrases.length;
      typeSpeed = 350;
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 500);
}

/* --------------------------------------------------------------------------
   SCROLLSPY & SMOOTH NAVIGATION
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 20,
            behavior: 'smooth'
          });
          closeMobileMenu();
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
const sidebar = document.getElementById('sidebar');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');

function initMobileMenu() {
  if (!mobileMenuBtn || !sidebar || !mobileOverlay) return;

  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
    mobileOverlay.classList.toggle('active');
  });

  mobileOverlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  if (sidebar && mobileOverlay) {
    sidebar.classList.remove('mobile-open');
    mobileOverlay.classList.remove('active');
  }
}

/* --------------------------------------------------------------------------
   PORTFOLIO FILTER TABS
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || (category && category.includes(filterValue))) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   LIGHTBOX / MEDIA MODAL
   -------------------------------------------------------------------------- */
function initLightboxModal() {
  const modal = document.getElementById('media-modal');
  const modalFrame = document.getElementById('modal-media-frame');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTools = document.getElementById('modal-tools');
  const modalClient = document.getElementById('modal-client');
  const modalRole = document.getElementById('modal-role');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  document.querySelectorAll('.open-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const card = trigger.closest('.portfolio-item') || trigger;

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

      if (mediaType === 'vimeo') {
        modalFrame.innerHTML = `<iframe src="${mediaSrc}&autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      } else if (mediaType === 'youtube') {
        modalFrame.innerHTML = `<iframe src="${mediaSrc}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      } else if (mediaType === 'image') {
        modalFrame.innerHTML = `<img src="${mediaSrc}" alt="${title}">`;
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modalFrame.innerHTML = '';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   CONTACT FORM
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
      alert('Please fill out all fields.');
      return;
    }

    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Joel,\n\n${message}\n\nFrom: ${name} (${email})`);
    
    if (responseMsg) {
      responseMsg.style.display = 'block';
      responseMsg.innerHTML = `<span style="color: var(--primary); font-weight: 700;">✓ Thanks ${name}!</span> Opening your email app...`;
    }

    setTimeout(() => {
      window.location.href = `mailto:actualjoel@gmail.com?subject=${subject}&body=${body}`;
    }, 500);
  });
}

/* --------------------------------------------------------------------------
   EASTER EGG: RETRO SLIDE PROJECTOR & MECHANICAL CLICK AUDIO SYNTHESIZER
   -------------------------------------------------------------------------- */
function initAudioEffects() {
  let audioCtx = null;
  let sfxEnabled = localStorage.getItem('joel_sfx') !== 'false';

  const sfxBtn = document.getElementById('sfx-toggle-btn');
  const sfxLabel = document.getElementById('sfx-toggle-label');

  function updateSfxButtonUI() {
    if (!sfxBtn || !sfxLabel) return;
    if (sfxEnabled) {
      sfxBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span id="sfx-toggle-label">SFX: ON</span>';
      sfxBtn.classList.add('active');
    } else {
      sfxBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span id="sfx-toggle-label">SFX: OFF</span>';
      sfxBtn.classList.remove('active');
    }
  }

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Synthesize Kodak Carousel slide projector click-chunk
  window.playSlideChunk = function() {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Solenoid Plunger "Thump" (Low Frequency Drop)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);

      // 2. Mechanical Shutter / Carousel Gate "Chunk-Clack" (Filtered Noise burst)
      const bufferSize = Math.floor(ctx.sampleRate * 0.05);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now + 0.02);
      filter.Q.setValueAtTime(3.5, now + 0.02);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now + 0.02);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now + 0.02);
      whiteNoise.stop(now + 0.06);
    } catch (e) {}
  };

  // Tactile Relay Click for Buttons
  window.playClickSound = function() {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.025);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch (e) {}
  };

  if (sfxBtn) {
    updateSfxButtonUI();
    sfxBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      localStorage.setItem('joel_sfx', sfxEnabled);
      updateSfxButtonUI();
      if (sfxEnabled) window.playClickSound();
    });
  }

  // Hook tactile click sounds to filters and buttons
  document.querySelectorAll('.filter-btn, .eli5-toggle-btn, .author-avatar-wrap, .slide-tip-box').forEach(el => {
    el.addEventListener('click', () => {
      if (window.playClickSound) window.playClickSound();
    });
  });
}

/* --------------------------------------------------------------------------
   EASTER EGG: CAD / BLUEPRINT WIREFRAME MODE
   -------------------------------------------------------------------------- */
function initCadBlueprintMode() {
  const cadBtn = document.getElementById('cad-toggle-btn');
  const cadLabel = document.getElementById('cad-toggle-label');
  const hudToast = document.getElementById('cad-hud-toast');
  const coordsEl = document.getElementById('cad-coords-display');

  let isCadMode = false;

  function toggleCadMode() {
    isCadMode = !isCadMode;
    document.body.classList.toggle('cad-blueprint-mode', isCadMode);

    if (cadBtn) {
      cadBtn.classList.toggle('active', isCadMode);
      if (cadLabel) {
        cadLabel.textContent = isCadMode ? 'CAD Mode: ON' : 'CAD Mode: OFF';
      }
    }

    if (window.playClickSound) window.playClickSound();

    if (hudToast && isCadMode) {
      hudToast.classList.add('active');
      setTimeout(() => {
        hudToast.classList.remove('active');
      }, 2400);
    }
  }

  if (cadBtn) {
    cadBtn.addEventListener('click', toggleCadMode);
  }

  // Keyboard shortcut 'B' or 'b' (Blueprint mode)
  document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea') return;

    if (e.key === 'b' || e.key === 'B') {
      toggleCadMode();
    }
  });

  // Track live CAD drafting coordinates
  window.addEventListener('mousemove', (e) => {
    if (!isCadMode || !coordsEl) return;
    const xMm = (e.clientX * 0.264583).toFixed(1);
    const yMm = (e.clientY * 0.264583).toFixed(1);
    coordsEl.textContent = `X: ${xMm}mm | Y: ${yMm}mm`;
  });
}

