/* ============================================================
   script.js — Interactive Actions, Canvas Animation, & Theme Switcher
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  
  // ---------------------------------------------------------
  // 1. Preloader Slide-Up Animation
  // ---------------------------------------------------------
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      // Shutter slides up smoothly
      preloader.style.transform = 'translateY(-100%)';
      preloader.style.transition = 'transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)';
      setTimeout(() => {
        preloader.remove(); // Clear from DOM after sliding out
      }, 1200);
    }, 2200); // 1.6s water fill + 0.6s hold
  }

  // ---------------------------------------------------------
  // 2. Mobile Menu Toggle
  // ---------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('max-h-96');
      if (isOpen) {
        // Close menu
        mobileMenu.classList.remove('max-h-96', 'py-4', 'opacity-100');
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      } else {
        // Open menu
        mobileMenu.classList.remove('max-h-0', 'opacity-0');
        mobileMenu.classList.add('max-h-96', 'py-4', 'opacity-100');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
      }
    });

    // Close menu when clicking on any link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('max-h-96', 'py-4', 'opacity-100');
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }

  // ---------------------------------------------------------
  // 3. Floating Theme Selector
  // ---------------------------------------------------------
  const themes = {
    Red: { primary: '#ff2a2a', rgb: '255, 42, 42', hover: '#dc2626', glow: 'rgba(255, 42, 42, 0.4)' },
    Blue: { primary: '#00f2fe', rgb: '0, 242, 254', hover: '#08d1dd', glow: 'rgba(0, 242, 254, 0.4)' },
    Purple: { primary: '#8b5cf6', rgb: '139, 92, 246', hover: '#7c3aed', glow: 'rgba(139, 92, 246, 0.4)' },
    Green: { primary: '#10b981', rgb: '16, 185, 129', hover: '#059669', glow: 'rgba(16, 185, 129, 0.4)' }
  };

  const themeContainer = document.getElementById('theme-buttons-container');
  let currentRGB = '255, 42, 42'; // Default theme RGB color

  // Generate theme buttons dynamically
  if (themeContainer) {
    // 1. Generate preset buttons
    Object.keys(themes).forEach(name => {
      const btn = document.createElement('button');
      btn.setAttribute('data-theme', name);
      btn.className = `theme-btn text-[9px] font-mono tracking-widest uppercase cursor-pointer transition-all duration-300 font-bold text-white/50 hover:text-white`;
      btn.textContent = name;
      btn.title = `${name} Theme`;
      btn.setAttribute('aria-label', `${name} Theme`);
      themeContainer.appendChild(btn);
    });

    // 2. Add custom color picker button
    const customBtn = document.createElement('button');
    customBtn.setAttribute('data-theme', 'custom');
    customBtn.className = `theme-btn text-[9px] font-mono tracking-widest uppercase cursor-pointer transition-all duration-300 font-bold text-white/50 hover:text-white`;
    customBtn.textContent = 'Custom';
    customBtn.title = 'Choose custom color';
    themeContainer.appendChild(customBtn);

    const pickerInput = document.createElement('input');
    pickerInput.type = 'color';
    pickerInput.id = 'custom-color-picker';
    pickerInput.className = 'hidden';
    pickerInput.setAttribute('aria-label', 'Custom Color Theme');
    
    themeContainer.appendChild(pickerInput);

    // Trigger hidden color picker on button click
    customBtn.addEventListener('click', () => {
      pickerInput.click();
    });
  }

  // Get generated buttons references
  const themeButtons = document.querySelectorAll('.theme-btn');
  const customPicker = document.getElementById('custom-color-picker');

  const themeLabel = document.getElementById('theme-label');
  let activeThemeName = 'Red';

  const updateThemeLabel = (name) => {
    if (themeLabel) {
      themeLabel.textContent = `Theme: ${name}`;
    }
  };

  const applyThemeConfig = (config, themeNameOrKey) => {
    // Apply CSS custom variables to document
    document.documentElement.style.setProperty('--primary-color', config.primary);
    document.documentElement.style.setProperty('--primary-color-rgb', config.rgb);
    document.documentElement.style.setProperty('--primary-hover', config.hover);
    document.documentElement.style.setProperty('--primary-glow', config.glow);
    
    currentRGB = config.rgb;

    // Track active name and update label
    activeThemeName = themeNameOrKey === 'custom' ? 'Custom' : themeNameOrKey;
    updateThemeLabel(activeThemeName);

    // Update active visual text styles on selector buttons
    themeButtons.forEach(btn => {
      const btnTheme = btn.getAttribute('data-theme');
      if (btnTheme === themeNameOrKey) {
        btn.style.color = config.primary; // set text color dynamically to the primary theme color!
        btn.classList.add('opacity-100');
        btn.classList.remove('text-white/50');
      } else {
        btn.style.color = ''; // reset text color
        btn.classList.remove('opacity-100');
        btn.classList.add('text-white/50');
      }
    });

    // Update palette menu trigger icon and border dynamically
    const menuTrigger = document.getElementById('theme-menu-trigger');
    if (menuTrigger) {
      menuTrigger.style.borderColor = config.primary;
      const triggerSvg = menuTrigger.querySelector('svg');
      if (triggerSvg) {
        triggerSvg.style.color = config.primary;
      }
    }

    // Update specific dynamic SVG components or items that are outline styled
    const outlines = document.querySelectorAll('.text-outline');
    outlines.forEach(out => {
      out.style.webkitTextStroke = `1.5px ${config.primary}`;
    });

    // Update preloaded mailto email links with custom themes if necessary
    const hireLinks = document.querySelectorAll('.hire-mailto-link');
    hireLinks.forEach(link => {
      const subject = encodeURIComponent("Hiring Inquiry – Portfolio");
      const body = encodeURIComponent(`Hello Adarsh,\n\nI came across your portfolio and would like to discuss an opportunity with you.\n\nLooking forward to hearing from you.\nBest Regards,`);
      link.href = `mailto:adarshmhaske366@gmail.com?subject=${subject}&body=${body}`;
    });
  };

  const applyPresetTheme = (themeName) => {
    const selected = themes[themeName];
    if (!selected) return;

    // Save choice
    localStorage.setItem('portfolio-theme', themeName);
    localStorage.removeItem('portfolio-theme-custom'); // clear custom hex

    applyThemeConfig(selected, themeName);
  };

  const applyCustomColorTheme = (hex) => {
    // Generate config from custom hex
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    const rgb = `${r}, ${g}, ${b}`;
    
    // Create hover (darker)
    const hr = Math.round(r * 0.85);
    const hg = Math.round(g * 0.85);
    const hb = Math.round(b * 0.85);
    const hover = `rgb(${hr}, ${hg}, ${hb})`;
    
    const glow = `rgba(${r}, ${g}, ${b}, 0.4)`;

    const customConfig = {
      primary: hex,
      rgb,
      hover,
      glow
    };

    localStorage.setItem('portfolio-theme', 'custom');
    localStorage.setItem('portfolio-theme-custom', hex);

    applyThemeConfig(customConfig, 'custom');
  };

  // Add click and hover events to preset theme buttons
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.getAttribute('data-theme');
      if (selectedTheme !== 'custom') {
        applyPresetTheme(selectedTheme);
      }
    });

    btn.addEventListener('mouseenter', () => {
      const hoverName = btn.getAttribute('data-theme');
      updateThemeLabel(hoverName === 'custom' ? 'Custom' : hoverName);
    });

    btn.addEventListener('mouseleave', () => {
      updateThemeLabel(activeThemeName);
    });
  });

  // Handle custom color input changes and hover states
  if (customPicker) {
    customPicker.addEventListener('input', (e) => {
      const color = e.target.value;
      applyCustomColorTheme(color);
    });
    
    customPicker.addEventListener('change', (e) => {
      const color = e.target.value;
      applyCustomColorTheme(color);
    });
  }

  // Handle Collapsible Menu Slide-Out action
  const menuTrigger = document.getElementById('theme-menu-trigger');
  const themeMenu = document.getElementById('theme-menu');

  if (menuTrigger && themeMenu) {
    menuTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isClosed = themeMenu.classList.contains('opacity-0');
      if (isClosed) {
        // Open
        themeMenu.classList.remove('max-w-0', 'opacity-0');
        themeMenu.classList.add('max-w-xl', 'opacity-100', 'px-4');
        menuTrigger.querySelector('svg').style.transform = 'rotate(45deg)';
      } else {
        // Close
        themeMenu.classList.add('max-w-0', 'opacity-0');
        themeMenu.classList.remove('max-w-xl', 'opacity-100', 'px-4');
        menuTrigger.querySelector('svg').style.transform = 'rotate(0deg)';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!themeMenu.contains(e.target) && !menuTrigger.contains(e.target)) {
        themeMenu.classList.add('max-w-0', 'opacity-0');
        themeMenu.classList.remove('max-w-xl', 'opacity-100', 'px-4');
        menuTrigger.querySelector('svg').style.transform = 'rotate(0deg)';
      }
    });
  }

  // Load saved theme choice on start
  const savedThemeMode = localStorage.getItem('portfolio-theme') || 'Red';
  if (savedThemeMode === 'custom' || !themes[savedThemeMode]) {
    const customHex = localStorage.getItem('portfolio-theme-custom') || '#ff2a2a';
    if (customPicker) customPicker.value = customHex;
    applyCustomColorTheme(customHex);
  } else {
    applyPresetTheme(savedThemeMode);
  }

  // ---------------------------------------------------------
  // 4. Interactive Canvas Particles Animation (Hero Section)
  // ---------------------------------------------------------
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const maxParticles = window.innerWidth < 768 ? 40 : 90;
    const connectionDist = 120;

    const mouse = {
      x: null,
      y: null,
      radius: 170
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize particles array
    for (let i = 0; i < maxParticles; i++) {
      const isAccent = Math.random() < 0.35;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        isAccent,
        color: 'rgba(255, 255, 255, 0.45)'
      });
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections & points
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Connection to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            const alpha = (1 - dist / mouse.radius) * 0.25;
            ctx.strokeStyle = `rgba(${currentRGB}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Repel particles from cursor
            if (dist > 20) {
              const force = (mouse.radius - dist) / mouse.radius;
              p1.x += (dx / dist) * force * 1.2;
              p1.y += (dy / dist) * force * 1.2;
            }
          }
        }

        // Connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / connectionDist) * 0.12;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.isAccent ? `rgba(${currentRGB}, 0.75)` : p1.color;
        ctx.fill();

        // Update particle drift coordinates
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wall rebound collision physics
        if (p1.x < 0 || p1.x > canvas.width) p1.vx = -p1.vx;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy = -p1.vy;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  // ---------------------------------------------------------
  // 5. Contact Form Submission (EmailJS or Prefilled Mailto)
  // ---------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName').value || '';
      const lastName = document.getElementById('lastName').value || '';
      const email = document.getElementById('email').value || '';
      const message = document.getElementById('message').value || '';

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Sending...
      `;

      // EmailJS configuration variables (User placeholders)
      const serviceId = 'YOUR_EMAILJS_SERVICE_ID';
      const templateId = 'YOUR_EMAILJS_TEMPLATE_ID';
      const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';

      const isConfigured = 
        serviceId && serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
        templateId && templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
        publicKey && publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY';

      if (!isConfigured) {
        // Fallback: Prefilled mailto link
        const mailtoLink = `mailto:adarshmhaske366@gmail.com?subject=Portfolio Contact from ${firstName} ${lastName}&body=${encodeURIComponent(`From: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`)}`;
        window.open(mailtoLink, '_blank');
        
        submitBtn.innerHTML = 'Sent Successfully ✓';
        submitBtn.classList.remove('hover:bg-white', 'hover:text-[var(--primary-color)]');
        submitBtn.classList.add('bg-green-600', 'border-green-500', 'text-white');
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Message';
          submitBtn.classList.remove('bg-green-600', 'border-green-500', 'text-white');
          submitBtn.classList.add('hover:bg-white', 'hover:text-[var(--primary-color)]');
        }, 4000);
      } else {
        // EmailJS implementation (if library is loaded)
        if (window.emailjs) {
          window.emailjs.sendForm(serviceId, templateId, contactForm, publicKey)
            .then(() => {
              submitBtn.innerHTML = 'Sent Successfully ✓';
              submitBtn.classList.remove('hover:bg-white', 'hover:text-[var(--primary-color)]');
              submitBtn.classList.add('bg-green-600', 'border-green-500', 'text-white');
              contactForm.reset();
            })
            .catch((err) => {
              console.error('EmailJS submit error:', err);
              submitBtn.innerHTML = 'Failed — Try Again';
              submitBtn.classList.add('bg-red-800', 'border-red-700');
            })
            .finally(() => {
              setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
                submitBtn.classList.remove('bg-green-600', 'border-green-500', 'bg-red-800', 'border-red-700');
                submitBtn.classList.add('hover:bg-white', 'hover:text-[var(--primary-color)]');
              }, 4000);
            });
        }
      }
    });
  }

});
