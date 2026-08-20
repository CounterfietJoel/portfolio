/**
 * Interactive Logic for Joel Ebenezer's Portfolio
 * Clean, lightweight, and 15% playful.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMoviePlaceholderEasterEgg();
  initTypingEffect();
  initScrollSpy();
  initMobileMenu();
  initPortfolioFilters();
  initLightboxModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. MOVIE CHARACTER EASTER EGG (Randomized on every page load)
   -------------------------------------------------------------------------- */
const movieCharacters = [
  { name: 'Forrest Gump', email: 'boxofchocolates@bubbagump.com', placeholder: 'Life is like a box of chocolates...' },
  { name: 'Kevin McCallister', email: 'keep_the_change@yafilthyanimal.com', placeholder: 'I made my family disappear...' },
  { name: 'Phunsukh Wangdu', email: 'chatur_still_looking@ladakh.edu', placeholder: 'All is well. Let us make something useful.' },
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
   2. PLAYFUL & CONCISE TYPING EFFECT
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingEl = document.getElementById('typing-text');
  if (!typingEl) return;

  const phrases = [
    'powerpoint decks that keep people awake',
    'clean social media graphics',
    '3D prints and weird hardware builds',
    'simple python tools for real tasks'
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
   3. SCROLLSPY & SMOOTH NAVIGATION
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

  // Smooth scroll
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
   4. MOBILE DRAWER NAVIGATION
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
   5. PORTFOLIO FILTER TABS
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
   6. LIGHTBOX / MEDIA MODAL
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
   7. CONTACT FORM
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
      window.location.href = `mailto:joelebenezer@example.com?subject=${subject}&body=${body}`;
    }, 500);
  });
}
