/**
 * Middlefork Volunteer Fire and Rescue
 * Powell County, Kentucky • Official Website Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initBurnLawChecker();
  initMobileNavigation();
  initHeaderScrollEffect();
  initApparatusFilter();
  initContactForm();
  initCopyAddress();
  initBurnLawModal();
  initFooterYear();
});

/**
 * 1. Kentucky Forest Fire Hazard Law (KRS 149.370) Real-Time Season Engine
 * Spring Season: Feb 15 - Apr 30
 * Fall Season: Oct 1 - Dec 15
 * Daytime Restriction: 6:00 AM - 6:00 PM within 150 ft of woodland/brush
 */
function initBurnLawChecker() {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed: 0=Jan, 1=Feb, ...
  const day = now.getDate();
  const hours = now.getHours();

  // Check Spring Season: Feb 15 to Apr 30
  const isSpringSeason = (month === 1 && day >= 15) || (month === 2) || (month === 3);

  // Check Fall Season: Oct 1 to Dec 15
  const isFallSeason = (month === 9) || (month === 10) || (month === 11 && day <= 15);

  const isHazardSeason = isSpringSeason || isFallSeason;
  const isDaytimeRestrictedHours = hours >= 6 && hours < 18; // 6:00 AM to 6:00 PM

  // Elements to update
  const topBadge = document.getElementById('burnStatusBadge');
  const topText = document.getElementById('burnStatusText');
  const cardContainer = document.getElementById('burnCardContainer');
  const seasonStatusTag = document.getElementById('burnSeasonStatus');
  const cardHeadline = document.getElementById('burnCardHeadline');
  const cardDesc = document.getElementById('burnCardDescription');
  const modalStatusBadge = document.getElementById('modalStatusBadge');

  if (isHazardSeason) {
    const seasonName = isSpringSeason ? 'Spring' : 'Fall';

    if (topBadge) {
      topBadge.classList.add('hazard-season');
    }
    if (cardContainer) {
      cardContainer.classList.add('season-active');
    }

    if (isDaytimeRestrictedHours) {
      // It is currently between 6 AM and 6 PM during fire season
      if (topText) {
        topText.textContent = `KY Fire Season: Outdoor Burning Banned (6 AM - 6 PM)`;
      }
      if (seasonStatusTag) {
        seasonStatusTag.textContent = `Active ${seasonName} Forest Fire Hazard Season &bull; Daytime Restriction In Effect`;
      }
      if (cardHeadline) {
        cardHeadline.textContent = `Outdoor Burning Within 150ft of Woods Restricted (6:00 AM &ndash; 6:00 PM)`;
      }
      if (cardDesc) {
        cardDesc.innerHTML = `Kentucky law (KRS 149.370) prohibits burning within 150 feet of any woodland or brushland between 6:00 AM and 6:00 PM right now during the <strong>${seasonName} Forest Fire Hazard Season</strong>. High winds and dry afternoon humidity create extreme mountain fire danger in eastern Powell County.`;
      }
      if (modalStatusBadge) {
        modalStatusBadge.className = 'modal-status-badge hazard';
        modalStatusBadge.textContent = `Active ${seasonName} Season: Burning Prohibited 6:00 AM to 6:00 PM`;
      }
    } else {
      // Evening/night during fire season
      if (topText) {
        topText.textContent = `KY Fire Season: Night Burning Permitted With Caution (6 PM - 6 AM)`;
      }
      if (seasonStatusTag) {
        seasonStatusTag.textContent = `Active ${seasonName} Forest Fire Hazard Season &bull; Evening Hours`;
      }
      if (cardHeadline) {
        cardHeadline.textContent = `Evening Burning Permissible (6:00 PM &ndash; 6:00 AM) With Constant Attendance`;
      }
      if (cardDesc) {
        cardDesc.innerHTML = `During the <strong>${seasonName} Forest Fire Hazard Season</strong>, outdoor burning is permissible between 6:00 PM and 6:00 AM if winds are calm, water is immediately available, and the fire remains attended until completely extinguished. Daytime burning remains prohibited.`;
      }
      if (modalStatusBadge) {
        modalStatusBadge.className = 'modal-status-badge hazard';
        modalStatusBadge.textContent = `Active ${seasonName} Season: Evening Hours (Keep Fires Attended)`;
      }
    }
  } else {
    // Outside hazard seasons
    if (topBadge) {
      topBadge.classList.add('open-burning');
    }
    if (topText) {
      topText.textContent = `KY Burn Law: Open Burning Allowed (Standard Precautions Apply)`;
    }
    if (seasonStatusTag) {
      seasonStatusTag.textContent = `Outside Mandatory Hazard Season &bull; Standard Open Burning Laws Apply`;
    }
    if (cardHeadline) {
      cardHeadline.textContent = `Normal Fire Season Conditions &bull; Exercise Continuous Caution`;
    }
    if (cardDesc) {
      cardDesc.innerHTML = `Powell County is currently outside mandatory state forest fire hazard seasons. Open burning of clean vegetative materials is permissible; however, fires must be attended at all times and kept away from structures and dry brush. Check for local drought bans before lighting.`;
    }
    if (modalStatusBadge) {
      modalStatusBadge.className = 'modal-status-badge safe';
      modalStatusBadge.textContent = `Status: Outside Mandatory Hazard Season (Standard Rules Apply)`;
    }
  }
}

/**
 * 2. Mobile Navigation Drawer Controls
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('navToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const closeBtn = document.getElementById('drawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * 3. Sticky Header Scroll Effect & Active Navigation Spy
 */
function initHeaderScrollEffect() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * 4. Apparatus Fleet Filter System
 */
function initApparatusFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.apparatus-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active tab styles
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/**
 * 5. Non-Emergency Contact Form
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successAlert = document.getElementById('contactSuccessAlert');
  const submitBtn = document.getElementById('submitContactBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      alert('Please complete your Name, Email address, and Message details.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Transmitting Message...';

    setTimeout(() => {
      form.style.display = 'none';
      if (successAlert) {
        successAlert.style.display = 'flex';
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 600);
  });
}

/**
 * 7. Copy Address to Clipboard with Toast Notification
 */
function initCopyAddress() {
  const copyBtn = document.getElementById('copyAddressBtn');
  const toast = document.getElementById('toastNotice');
  const addressText = 'Middlefork Volunteer Fire and Rescue, 9219 Campton Road, Slade, KY 40376';

  if (!copyBtn || !toast) return;

  copyBtn.addEventListener('click', () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(addressText).then(() => {
        showToast('Station address copied to clipboard!');
      }).catch(() => {
        fallbackCopy(addressText);
      });
    } else {
      fallbackCopy(addressText);
    }
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('Station address copied to clipboard!');
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/**
 * 8. Kentucky Burn Law Modal Dialog
 */
function initBurnLawModal() {
  const openBtn = document.getElementById('openBurnLawModalBtn');
  const modal = document.getElementById('burnLawModal');
  const closeBtn = document.getElementById('closeBurnModalBtn');
  const confirmBtn = document.getElementById('confirmBurnModalBtn');

  if (!openBtn || !modal) return;

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (confirmBtn) confirmBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * 9. Set Dynamic Current Year in Footer
 */
function initFooterYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
