/**
 * Portfolio JavaScript - Digital Business Student
 * Features: Dark/Light Mode, Project Filtering, Interactive Case Study Modal,
 * Animated Stats, Form Validation & Bootstrap Toast, Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarScroll();
  initProjectFilter();
  initProjectModal();
  initAnimatedCounters();
  initContactForm();
  initBackToTop();
  initScrollspy();
});

/* ==========================================================================
   1. Dark / Light Mode Switch
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  if (!themeToggleBtn || !themeIcon) return;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('site-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('site-theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    
    if (theme === 'light') {
      themeIcon.className = 'bi bi-moon-stars-fill';
      themeToggleBtn.setAttribute('title', 'สลับเป็นโหมดมืด (Dark Mode)');
    } else {
      themeIcon.className = 'bi bi-sun-fill';
      themeToggleBtn.setAttribute('title', 'สลับเป็นโหมดสว่าง (Light Mode)');
    }
  }
}

/* ==========================================================================
   2. Navbar Scroll Behavior
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. Project Filter Tabs
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCols = document.querySelectorAll('.project-col');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCols.forEach(col => {
        const category = col.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          col.style.display = 'block';
          setTimeout(() => {
            col.style.opacity = '1';
            col.style.transform = 'scale(1)';
          }, 50);
        } else {
          col.style.opacity = '0';
          col.style.transform = 'scale(0.95)';
          setTimeout(() => {
            col.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Case Study Modal Data & Handling
   ========================================================================== */
const projectData = {
  'project-1': {
    title: '1. Creative Content Creator',
    category: 'Content Strategy & Production',
    image: 'assets/images/project-marketing.jpg',
    metric1: '3 แพลตฟอร์ม',
    metric2: 'High Engagement',
    metric3: 'Data & Trends',
    lbl1: 'TikTok, FB, IG',
    lbl2: 'Hook & Storytelling',
    lbl3: 'Content Calendar',
    client: 'การสร้างสรรค์และวางแผนคอนเทนต์สำหรับ TikTok, Facebook และ Instagram',
    problem: 'สร้างสรรค์และวางแผนคอนเทนต์สำหรับสื่อออนไลน์ โดยเริ่มตั้งแต่การคิดไอเดีย วิเคราะห์กลุ่มเป้าหมาย กำหนดรูปแบบและแนวทางการนำเสนอ เพื่อให้เนื้อหามีความน่าสนใจและเหมาะสมกับแต่ละแพลตฟอร์ม',
    strategy: 'มีประสบการณ์ในการสร้าง Content สำหรับ TikTok, Facebook และ Instagram รวมถึงการออกแบบภาพและสื่อประชาสัมพันธ์ โดยให้ความสำคัญกับ Hook ในช่วงแรกของคอนเทนต์ การเล่าเรื่อง และ Call to Action เพื่อกระตุ้นการมีส่วนร่วมของผู้ชม',
    tools: ['Canva', 'Adobe Photoshop', 'Adobe Illustrator', 'TikTok', 'Facebook', 'Instagram'],
    results: 'สิ่งที่รับผิดชอบหลัก: คิดและพัฒนาไอเดีย Content ให้เหมาะกับกลุ่มเป้าหมาย • วางแผน Content และกำหนดรูปแบบการนำเสนอ • เขียน Caption และกำหนดแนวทางการสื่อสาร • ออกแบบภาพและสื่อสำหรับ Social Media • วิเคราะห์ Engagement และนำ Feedback มาปรับปรุง Content • ติดตาม Trend เพื่อนำมาประยุกต์ใช้กับเนื้อหา'
  },
  'project-2': {
    title: '2. TikTok Shop & Shopee Management',
    category: 'E-Commerce & Social Commerce Operations',
    image: 'assets/images/project-ecommerce.jpg',
    metric1: '2 มาร์เก็ตเพลส',
    metric2: 'Customer Journey',
    metric3: 'Live & Affiliate',
    lbl1: 'TikTok & Shopee',
    lbl2: 'Full Funnel',
    lbl3: 'Creators Network',
    client: 'การดูแลและบริหารร้านค้าบน TikTok Shop และ Shopee',
    problem: 'มีประสบการณ์ในการดูแลและบริหารร้านค้าบน TikTok Shop และ Shopee ตั้งแต่การจัดการข้อมูลสินค้า การวางแผนโปรโมชั่น การสร้าง Content เพื่อกระตุ้นยอดขาย ไปจนถึงการติดตามและวิเคราะห์ผลการดำเนินงานของร้านค้า',
    strategy: 'ให้ความสำคัญกับการเชื่อมโยงระหว่าง Content + Social Commerce + Promotion เพื่อสร้าง Customer Journey ตั้งแต่การเห็นสินค้า การสนใจสินค้า ไปจนถึงการตัดสินใจซื้อ',
    tools: ['TikTok Shop', 'Shopee', 'TikTok Affiliate', 'Social Commerce', 'Excel'],
    results: 'สิ่งที่รับผิดชอบหลัก: จัดการข้อมูลสินค้าและหน้าร้านบน TikTok Shop และ Shopee • วางแผนโปรโมชั่นและเข้าร่วม Campaign ของแพลตฟอร์ม • วางแผน Content เพื่อสนับสนุนยอดขาย • สนับสนุนการทำ Live Commerce • ประสานงานกับ Micro-Creators และ Affiliate • ติดตามยอดขายและจำนวนคำสั่งซื้อ • วิเคราะห์ Performance ของร้านค้าและนำข้อมูลมาปรับกลยุทธ์'
  },
  'project-3': {
    title: '3. Social Media Ads & Customer Insights',
    category: 'Digital Advertising & Performance Analysis',
    image: 'assets/images/project-analytics.jpg',
    metric1: 'Meta & TikTok',
    metric2: 'Customer Insights',
    metric3: 'Conversion Focus',
    lbl1: 'Ad Platforms',
    lbl2: 'Data Analytics',
    lbl3: 'ROAS & Optimization',
    client: 'การวางแผนและบริหารการโฆษณาบน Meta Ads และ TikTok Ads',
    problem: 'วางแผนและบริหารการโฆษณาบน Meta Ads และ TikTok Ads โดยเริ่มจากการกำหนดกลุ่มเป้าหมาย วิเคราะห์ Customer Insights และเลือก Content ให้เหมาะสมกับพฤติกรรมของผู้บริโภค',
    strategy: 'ติดตาม Performance ของโฆษณาและนำข้อมูลมาวิเคราะห์เพื่อปรับปรุงประสิทธิภาพของ Campaign ทั้งในด้านการเข้าถึง การมีส่วนร่วม และการกระตุ้นให้เกิด Conversion',
    tools: ['Meta Ads Manager', 'TikTok Ads', 'Google Analytics 4', 'Canva', 'Excel'],
    results: 'สิ่งที่รับผิดชอบหลัก: วางแผน Campaign สำหรับ Meta Ads และ TikTok Ads • กำหนดกลุ่มเป้าหมายตามพฤติกรรมและความสนใจ • วิเคราะห์ Customer Insights และพฤติกรรมของผู้ชม • ทดสอบรูปแบบ Content และ Creative ที่แตกต่างกัน • วิเคราะห์ผลลัพธ์ เช่น Reach, Engagement, CTR และ Conversion • ปรับงบประมาณและแนวทางการโฆษณาตาม Performance • นำข้อมูลจาก Campaign มาพัฒนา Content และกลยุทธ์การตลาด'
  }
};

function initProjectModal() {
  const modalEl = document.getElementById('projectDetailModal');
  if (!modalEl) return;
  const projectModal = new bootstrap.Modal(modalEl);

  const viewBtns = document.querySelectorAll('.btn-view-project');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const data = projectData[projectId];

      if (data) {
        document.getElementById('modalProjectTitle').textContent = data.title;
        document.getElementById('modalProjectCategory').textContent = data.category;
        document.getElementById('modalProjectImg').src = data.image;
        document.getElementById('modalProjectClient').textContent = data.client;
        document.getElementById('modalProjectProblem').textContent = data.problem;
        document.getElementById('modalProjectStrategy').textContent = data.strategy;
        document.getElementById('modalProjectResults').textContent = data.results;

        document.getElementById('modalMetric1').textContent = data.metric1;
        document.getElementById('modalMetric2').textContent = data.metric2;
        document.getElementById('modalMetric3').textContent = data.metric3;
        if (data.lbl1 && document.getElementById('modalMetricLbl1')) document.getElementById('modalMetricLbl1').textContent = data.lbl1;
        if (data.lbl2 && document.getElementById('modalMetricLbl2')) document.getElementById('modalMetricLbl2').textContent = data.lbl2;
        if (data.lbl3 && document.getElementById('modalMetricLbl3')) document.getElementById('modalMetricLbl3').textContent = data.lbl3;

        // Populate tools pills
        const toolsContainer = document.getElementById('modalProjectTools');
        toolsContainer.innerHTML = '';
        data.tools.forEach(tool => {
          const span = document.createElement('span');
          span.className = 'skill-pill';
          span.innerHTML = `<i class="bi bi-check-circle-fill text-primary"></i> ${tool}`;
          toolsContainer.appendChild(span);
        });

        projectModal.show();
      }
    });
  });
}

/* ==========================================================================
   5. Animated Stat Numbers
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = easeProgress * targetVal;

          el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${targetVal.toFixed(decimals)}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   6. Contact Form Validation & Toast Notification
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toastEl = document.getElementById('contactToast');
  if (!form || !toastEl) return;

  const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');

    let isValid = true;

    // Name validation
    if (!nameInput.value.trim()) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
    }

    // Message validation
    if (!messageInput.value.trim()) {
      messageInput.classList.add('is-invalid');
      isValid = false;
    } else {
      messageInput.classList.remove('is-invalid');
    }

    if (!isValid) return;

    // Simulate sending with loading spinner
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>กำลังส่งข้อความ...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Show toast
      toast.show();

      // Reset form
      form.reset();
    }, 1000);
  });
}

/* ==========================================================================
   7. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   8. Scrollspy Nav Link Highlighting
   ========================================================================== */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
