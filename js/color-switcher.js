/**
 * Color Scheme Switcher (Rewall Inspired)
 * Allows real-time switching of the primary brand accent color
 */

const colorPalettes = [
  { name: 'Amber Gold', hex: '#f59e0b', rgb: '245, 158, 11', hover: '#d97706' },
  { name: 'Electric Cyan', hex: '#06b6d4', rgb: '6, 182, 212', hover: '#0891b2' },
  { name: 'Emerald Green', hex: '#10b981', rgb: '16, 185, 129', hover: '#059669' },
  { name: 'Sunset Orange', hex: '#f97316', rgb: '249, 115, 22', hover: '#ea580c' },
  { name: 'Royal Purple', hex: '#8b5cf6', rgb: '139, 92, 246', hover: '#7c3aed' },
  { name: 'Rose Pink', hex: '#f43f5e', rgb: '244, 63, 94', hover: '#e11d48' },
  { name: 'Lime Volt', hex: '#84cc16', rgb: '132, 204, 22', hover: '#65a30d' },
  { name: 'Sky Blue', hex: '#38bdf8', rgb: '56, 189, 248', hover: '#0284c7' }
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
  localStorage.setItem('joel_portfolio_accent', palette.hex);
}

document.addEventListener('DOMContentLoaded', initColorSwitcher);
