/* ═══════════════════════════════════════════════════
   SCRIPT.JS — Scroll Reveal + Header + UX
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. HERO ANIMATION TRIGGER ───────────────────
  const heroEls = document.querySelectorAll('.reveal-hero');
  // Fire once page is ready
  requestAnimationFrame(() => {
    heroEls.forEach(el => el.classList.add('animate'));
  });


  // ─── 2. SECTION ROLL CURTAIN OBSERVER ──────────
  const rollSections = document.querySelectorAll('.roll-section');

  const rollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rolled');
          rollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  rollSections.forEach(sec => rollObserver.observe(sec));


  // ─── 3. SCROLL REVEAL (Intersection Observer) ────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  // ─── 3. STICKY HEADER: style on scroll ───────────
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  const onScroll = () => {
    const current = window.scrollY;

    if (current > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = current;
  };

  window.addEventListener('scroll', onScroll, { passive: true });


  // ─── 4. SMOOTH SCROLL FOR ANCHOR LINKS ───────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });


  // ─── 5. LANGUAGE SWITCH — FULL i18n ENGINE ───────

  const translations = {
    en: {
      'nav.about':    'About',
      'nav.services': 'Services',
      'nav.contact':  'Contact',

      'hero.eyebrow': 'Strategist · Coach · Creator',
      'hero.tagline': 'Helping women build lives and careers<br>that are entirely their own.',
      'hero.cta':     'Discover more',

      'about.label':   '02 — About',
      'about.heading': 'I work at the intersection of<br><em>clarity and ambition.</em>',
      'about.p1':      'For over five years I have been working with women who are ready to stop performing someone else\'s script. My approach is direct, strategic, and deeply personal — because real change demands both.',
      'about.p2':      'I believe structure is a form of freedom. That the right question can shift an entire trajectory. And that luxury, in its truest sense, is having the life you actually want.',
      'about.cta':     'Work with me →',

      'work.label':    '03 — Program',
      'work.heading':  'Six Modules.<br><em>One Complete Transformation.</em>',
      'work.1.title':  'Building the Foundation',
      'work.1.sub':    'Idea &amp; Business Plan',
      'work.1.li1':    'Your motivation and vision: why a preschool / club?',
      'work.1.li2':    'Market analysis: who are your future clients?',
      'work.1.li3':    'The concept: from unique advantages to philosophy.',
      'work.1.li4':    'Business plan basics: budget, payback period, forecasts.',
      'work.2.title':  'Legal Aspects &amp; Documents',
      'work.2.sub':    'Permits, Contracts &amp; Standards',
      'work.2.li1':    'Choosing the legal structure (sole proprietor / LLC).',
      'work.2.li2':    'NACE codes for a childcare facility.',
      'work.2.li3':    'Certification &amp; licensing: step-by-step instructions.',
      'work.2.li4':    'Contracts with parents, staff, and suppliers.',
      'work.2.li5':    'Sanitary standards and fire safety.',
      'work.3.title':  'Premises &amp; Equipment',
      'work.3.sub':    'Space, Safety &amp; Materials',
      'work.3.li1':    'Choosing the ideal location for a preschool / club.',
      'work.3.li2':    'Premises requirements: renovation, safety, functionality.',
      'work.3.li3':    'Space zoning: play, learning, and sleeping areas.',
      'work.3.li4':    'Equipment &amp; materials: toys, furniture, educational aids.',
      'work.4.title':  'Dream Team',
      'work.4.sub':    'Staff Recruitment &amp; Management',
      'work.4.li1':    'The profile of the ideal caregiver / teacher.',
      'work.4.li2':    'Searching for and selecting staff.',
      'work.4.li3':    'A system for motivating and training your team.',
      'work.4.li4':    'Developing a corporate culture.',
      'work.5.title':  'Marketing &amp; Client Acquisition',
      'work.5.sub':    'Brand, Reach &amp; Community',
      'work.5.li1':    'Building a brand: how to make yourself known.',
      'work.5.li2':    'Effective promotion channels: online and offline.',
      'work.5.li3':    'Social media management and content creation.',
      'work.5.li4':    'Open house days and trial classes.',
      'work.5.li5':    'Building long-term relationships with parents.',
      'work.6.title':  'Management &amp; Growth',
      'work.6.sub':    'Systems, Finance &amp; Scaling',
      'work.6.li1':    'Financial management: bookkeeping and budgets.',
      'work.6.li2':    'Management software and tools.',
      'work.6.li3':    'Organizing the educational process and schedule.',
      'work.6.li4':    'Interaction with parents and conflict resolution.',
      'work.6.li5':    'Scaling the business and opening new branches.',

      'format.label':    '03b — Format',
      'format.heading':  'How the<br><em>Program Works.</em>',
      'format.cta':      'If you are ready to turn your dream into reality and create a space where children will be happy and you will be successful — join the program! I am ready to share all the secrets and guide you step by step along this exciting journey.',
      'format.btn':      'Join the Program',
      'format.1.title':  'Online Course',
      'format.1.desc':   'Video lessons, presentations, and homework — learn at your own pace.',
      'format.2.title':  'Group Webinars',
      'format.2.desc':   'Live meetings with Tetiana for Q&A and group discussion.',
      'format.3.title':  'Individual Consultations',
      'format.3.desc':   'Personalised 1:1 support — available for VIP packages.',
      'format.4.title':  'Private Community',
      'format.4.desc':   'A Telegram / Facebook group for sharing experience and support.',

      'results.label': '04 — Impact',
      'results.1':     'Women coached',
      'results.2':     'Years of practice',
      'results.3':     'Group programs',
      'results.4':     'Report major life shifts within 3 months',

      'services.label':        '05 — Services',
      'services.1.title':      '1:1 Intensive',
      'services.1.desc':       'A focused 3-month engagement for women who want deep, sustained change. We meet weekly and build a precise strategy together.',
      'services.2.title':      'Single Session',
      'services.2.desc':       'A 90-minute clarity session. Bring your most pressing question — leave with a map.',
      'services.3.title':      'Group Program',
      'services.3.desc':       'A 6-week intensive group experience. Curriculum-based, community-driven, and deeply practical.',
      'services.4.title':      'Digital Course',
      'services.4.desc':       'A structured self-study program for independent learners. Full methodology, exercises, and tools.',
      'services.tag.individual': 'Individual',
      'services.tag.cohort':     'Cohort',
      'services.tag.selfpaced':  'Self-paced',

      'contact.label':           '06 — Contact',
      'contact.heading':         'Let\'s talk<br><em>about your life.</em>',
      'contact.subtext':         'Fill in the form or reach out directly on social media. I read every message.',
      'contact.form.name':       'Your name',
      'contact.form.name_ph':    'Full name',
      'contact.form.email':      'Email',
      'contact.form.email_ph':   'your@email.com',
      'contact.form.message':    'Message',
      'contact.form.message_ph': 'What would you like to explore?',
      'contact.form.submit':     'Send message',
    },

    ua: {
      'nav.about':    'Про мене',
      'nav.services': 'Послуги',
      'nav.contact':  'Контакт',

      'hero.eyebrow': 'Стратег · Коуч · Автор',
      'hero.tagline': 'Допомагаю жінкам будувати життя та кар\'єру,<br>що є справді їхніми.',
      'hero.cta':     'Дізнатися більше',

      'about.label':   '02 — Про мене',
      'about.heading': 'Я працюю на перетині<br><em>ясності та амбіцій.</em>',
      'about.p1':      'Понад п\'ять років я працюю з жінками, які готові перестати жити за чужим сценарієм. Мій підхід — прямий, стратегічний і глибоко особистий, адже справжні зміни потребують і того, і іншого.',
      'about.p2':      'Я вірю, що структура — це форма свободи. Що правильне питання може змінити всю траєкторію. І що розкіш, у її справжньому сенсі, — це мати те життя, якого ти справді хочеш.',
      'about.cta':     'Працювати зі мною →',

      'work.label':    '03 — Програма',
      'work.heading':  'Шість Модулів.<br><em>Одна Повна Трансформація.</em>',
      'work.1.title':  'Закладаємо Фундамент',
      'work.1.sub':    'Ідея та Бізнес-план',
      'work.1.li1':    'Твоя мотивація та бачення: чому саме дитячий садок/клуб?',
      'work.1.li2':    'Аналіз ринку: хто твої майбутні клієнти?',
      'work.1.li3':    'Концепція закладу: від унікальних переваг до філософії.',
      'work.1.li4':    'Основи бізнес-плану: кошторис, окупність, прогнози.',
      'work.2.title':  'Юридичні Аспекти та Документи',
      'work.2.sub':    'Дозволи, Договори та Норми',
      'work.2.li1':    'Вибір форми власності (ФОП, ТОВ).',
      'work.2.li2':    'КВЕДи для дитячого закладу.',
      'work.2.li3':    'Сертифікація та ліцензування: покрокова інструкція.',
      'work.2.li4':    'Договори з батьками, персоналом та постачальниками.',
      'work.2.li5':    'Санітарні норми та пожежна безпека.',
      'work.3.title':  'Приміщення та Обладнання',
      'work.3.sub':    'Простір, Безпека та Матеріали',
      'work.3.li1':    'Вибір ідеального місця для дитячого садка/клубу.',
      'work.3.li2':    'Вимоги до приміщення: ремонт, безпека, функціональність.',
      'work.3.li3':    'Зонування простору: ігрові, навчальні, спальні зони.',
      'work.3.li4':    'Обладнання та матеріали: іграшки, меблі, розвиваючі посібники.',
      'work.4.title':  'Команда Мрії',
      'work.4.sub':    'Підбір та Управління Персоналом',
      'work.4.li1':    'Профіль ідеального вихователя/педагога.',
      'work.4.li2':    'Процес пошуку та відбору персоналу.',
      'work.4.li3':    'Система мотивації та навчання команди.',
      'work.4.li4':    'Розвиток корпоративної культури.',
      'work.5.title':  'Маркетинг та Залучення Клієнтів',
      'work.5.sub':    'Бренд, Охоплення та Спільнота',
      'work.5.li1':    'Як голосно заявити про себе: створення бренду.',
      'work.5.li2':    'Ефективні канали просування: онлайн та офлайн.',
      'work.5.li3':    'Ведення соцмереж та створення контенту.',
      'work.5.li4':    'Дні відкритих дверей та пробні заняття.',
      'work.5.li5':    'Побудова довгострокових відносин з батьками.',
      'work.6.title':  'Управління та Розвиток',
      'work.6.sub':    'Системи, Фінанси та Масштабування',
      'work.6.li1':    'Фінансовий менеджмент: ведення обліку, бюджети.',
      'work.6.li2':    'Програмне забезпечення для управління.',
      'work.6.li3':    'Організація навчального процесу та розклад.',
      'work.6.li4':    'Взаємодія з батьками та вирішення конфліктів.',
      'work.6.li5':    'Масштабування бізнесу та відкриття нових філій.',

      'format.label':    '03b — Формат',
      'format.heading':  'Як працює<br><em>Програма.</em>',
      'format.cta':      'Якщо ти готова перетворити свою мрію на реальність і створити простір, де діти будуть щасливими, а ти — успішною, долучайся до програми! Я готова ділитися всіма секретами та повести тебе за руку цим захопливим шляхом.',
      'format.btn':      'Долучитися до програми',
      'format.1.title':  'Онлайн-курс',
      'format.1.desc':   'Відеоуроки, презентації, домашні завдання — навчайся у власному темпі.',
      'format.2.title':  'Групові вебінари',
      'format.2.desc':   'Зустрічі з Тетяною для відповідей на питання та обговорень.',
      'format.3.title':  'Індивідуальні консультації',
      'format.3.desc':   'Персональна підтримка 1:1 — для VIP-пакетів.',
      'format.4.title':  'Закрита спільнота',
      'format.4.desc':   'Група в Telegram/Facebook для обміну досвідом та підтримки.',

      'results.label': '04 — Результати',
      'results.1':     'Жінок пройшли коучинг',
      'results.2':     'Роки практики',
      'results.3':     'Групові програми',
      'results.4':     'Відзначають значні зміни протягом 3 місяців',

      'services.label':        '05 — Послуги',
      'services.1.title':      'Інтенсив 1:1',
      'services.1.desc':       'Тримісячна співпраця для жінок, які прагнуть глибоких і стійких змін. Зустрічаємося щотижня та разом будуємо чітку стратегію.',
      'services.2.title':      'Разова сесія',
      'services.2.desc':       '90-хвилинна сесія ясності. Приходь із найгострішим питанням — іди з картою.',
      'services.3.title':      'Групова програма',
      'services.3.desc':       'Шеститижневий груповий інтенсив. На основі куррикулуму, у спільноті, з практичним фокусом.',
      'services.4.title':      'Цифровий курс',
      'services.4.desc':       'Структурована програма для самостійного навчання. Повна методологія, вправи та інструменти.',
      'services.tag.individual': 'Індивідуально',
      'services.tag.cohort':     'Група',
      'services.tag.selfpaced':  'Самостійно',

      'contact.label':           '06 — Контакт',
      'contact.heading':         'Поговоримо<br><em>про твоє життя.</em>',
      'contact.subtext':         'Заповни форму або напиши мені в соцмережах. Я читаю кожне повідомлення.',
      'contact.form.name':       'Твоє ім\'я',
      'contact.form.name_ph':    'Повне ім\'я',
      'contact.form.email':      'Електронна пошта',
      'contact.form.email_ph':   'your@email.com',
      'contact.form.message':    'Повідомлення',
      'contact.form.message_ph': 'Що ти хочеш дослідити?',
      'contact.form.submit':     'Надіслати',
    }
  };

  let currentLang = localStorage.getItem('lang') || 'ua';

  function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Swap text content (supports innerHTML for tags like <em> and <br>)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // Swap placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
    });

    // Update html lang attribute for accessibility
    document.documentElement.lang = lang === 'ua' ? 'uk' : 'en';

    // Persist choice
    currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  // ─── LANGUAGE WIPE: cinematic left→right sweep ──
  const wipeEl = document.getElementById('lang-wipe');

  function switchWithWipe(lang) {
    if (lang === currentLang) return;

    // Phase 1 — sweep IN from the left, covering the page
    wipeEl.style.transition = 'clip-path 0.36s cubic-bezier(0.77, 0, 0.175, 1)';
    wipeEl.style.clipPath    = 'inset(0 0% 0 0)';

    setTimeout(() => {
      // Swap all text while screen is hidden
      applyLanguage(lang);

      // Phase 2 — sweep OUT to the right, revealing new language
      wipeEl.style.transition = 'clip-path 0.36s cubic-bezier(0.175, 1, 0.77, 1)';
      wipeEl.style.clipPath    = 'inset(0 0% 0 100%)';

      setTimeout(() => {
        // Reset invisibly so it's ready for next switch
        wipeEl.style.transition = 'none';
        wipeEl.style.clipPath   = 'inset(0 100% 0 0)';
      }, 380);
    }, 380);
  }

  // Wire up UA / EN buttons
  const langBtns = document.querySelectorAll('.lang');

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chosen = btn.textContent.trim().toLowerCase();
      if (chosen === currentLang) return;
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      switchWithWipe(chosen);
    });
  });

  // Apply saved (or default UA) language on load, mark correct button active
  applyLanguage(currentLang);
  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === currentLang);
  });


  // ─── 6. FORM VALIDATION (basic) ──────────────────
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.querySelector('#name').value.trim();
      const email   = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', false);
        return;
      }

      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', false);
        return;
      }

      // ↓ Replace with actual fetch/POST to your backend
      showFormMessage('Your message has been sent. I\'ll be in touch soon.', true);
      form.reset();
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormMessage(text, success) {
    // Remove existing
    const existing = form.querySelector('.form-message');
    if (existing) existing.remove();

    const msg = document.createElement('p');
    msg.className = 'form-message';
    msg.textContent = text;

    Object.assign(msg.style, {
      marginTop: '1rem',
      fontSize: '0.8rem',
      letterSpacing: '0.05em',
      color: success ? '#A8C5A0' : '#C5A0A0',
      opacity: '0',
      transition: 'opacity 0.4s ease',
    });

    form.appendChild(msg);

    // Fade in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { msg.style.opacity = '1'; });
    });

    // Remove after delay
    setTimeout(() => {
      msg.style.opacity = '0';
      setTimeout(() => msg.remove(), 400);
    }, 5000);
  }


  // ─── 7. SUBTLE CURSOR LINE (desktop only) ────────
  // Adds a thin trailing cursor for premium feel
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    Object.assign(cursor.style, {
      position:       'fixed',
      top:            '0',
      left:           '0',
      width:          '4px',
      height:         '4px',
      borderRadius:   '50%',
      background:     '#C8F04A',
      pointerEvents:  'none',
      zIndex:         '9999',
      transform:      'translate(-50%, -50%)',
      transition:     'transform 0.1s ease, opacity 0.3s ease',
      mixBlendMode:   'difference',
      opacity:        '0',
    });
    document.body.appendChild(cursor);

    let mouseX = -100, mouseY = -100;
    let curX = -100, curY = -100;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });

    // Lerp for smoothness
    const lerp = (a, b, t) => a + (b - a) * t;

    const animateCursor = () => {
      curX = lerp(curX, mouseX, 0.18);
      curY = lerp(curY, mouseY, 0.18);
      cursor.style.left = curX + 'px';
      cursor.style.top  = curY + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Scale up on hoverable elements
    document.querySelectorAll('a, button, .service-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        Object.assign(cursor.style, {
          width: '32px', height: '32px',
          background: 'rgba(10,10,10,0.08)',
          mixBlendMode: 'normal',
        });
      });
      el.addEventListener('mouseleave', () => {
        Object.assign(cursor.style, {
          width: '4px', height: '4px',
          background: '#C8F04A',
          mixBlendMode: 'difference',
        });
      });
    });
  }

}); // end DOMContentLoaded
