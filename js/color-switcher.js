/**
 * Color Scheme Switcher (Rewall Inspired)
 * Allows real-time switching of the primary brand accent color
 */

const colorPalettes = [
  { name: 'Moss Green (Brand)', hex: '#636b2f', rgb: '99, 107, 47', hover: '#869042', pressed: '#42481d' },
  { name: 'Deep Violet', hex: '#372f6b', rgb: '55, 47, 107', hover: '#584da1', pressed: '#191537' },
  { name: 'Clay Wine', hex: '#8b3d2f', rgb: '139, 61, 47', hover: '#c15845', pressed: '#59241b' },
  { name: 'Slate Blue', hex: '#3b7080', rgb: '59, 112, 128', hover: '#5295a8', pressed: '#2c5561' },
  { name: 'Forest Anchor', hex: '#2d3319', rgb: '45, 51, 25', hover: '#4a542b', pressed: '#191d0e' },
  { name: 'Muted Taupe', hex: '#8a786e', rgb: '138, 120, 110', hover: '#a89487', pressed: '#6e5e55' }
];

function initColorSwitcher() {
  const toggleBtn = document.getElementById('color-switcher-toggle');
  const switcherContainer = document.getElementById('color-switcher');
  const paletteGrid = document.getElementById('color-palette-grid');

  if (!toggleBtn || !switcherContainer || !paletteGrid) return;

  // Toggle open/close
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    switcherContainer.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!switcherContainer.contains(e.target)) {
      switcherContainer.classList.remove('open');
    }
  });

  // Render color options
  paletteGrid.innerHTML = '';
  colorPalettes.forEach((palette, index) => {
    const dot = document.createElement('button');
    dot.className = `color-dot ${index === 0 ? 'active' : ''}`;
    dot.style.backgroundColor = palette.hex;
    dot.title = palette.name;
    dot.setAttribute('aria-label', `Select ${palette.name} theme`);

    dot.addEventListener('click', () => {
      applyThemeColor(palette);
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });

    paletteGrid.appendChild(dot);
  });

  // Load saved preference
  const savedColorHex = localStorage.getItem('joel_portfolio_accent');
  if (savedColorHex) {
    const matched = colorPalettes.find(p => p.hex === savedColorHex);
    if (matched) {
      applyThemeColor(matched);
      document.querySelectorAll('.color-dot').forEach(dot => {
        if (dot.style.backgroundColor === matched.hex || dot.title === matched.name) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }
}

function applyThemeColor(palette) {
  const root = document.documentElement;
  root.style.setProperty('--primary', palette.hex);
  root.style.setProperty('--primary-rgb', palette.rgb);
  root.style.setProperty('--primary-glow', `rgba(${palette.rgb}, 0.25)`);
  root.style.setProperty('--primary-hover', palette.hover);
  if (palette.pressed) {
    root.style.setProperty('--primary-pressed', palette.pressed);
  }
  localStorage.setItem('joel_portfolio_accent', palette.hex);
}

document.addEventListener('DOMContentLoaded', initColorSwitcher);
