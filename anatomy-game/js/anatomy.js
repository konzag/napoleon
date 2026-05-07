/* ═══════════════════════════════════════════════════════
   Anatomy Game — Sci-Fi Body Explorer
   Ναπολέων, Α' Δημοτικού — εξερεύνηση σώματος
   ═══════════════════════════════════════════════════════ */

/* ── Data ── */

const BODY_PARTS = {
  brain: {
    name: 'Εγκέφαλος', emoji: '🧠', mascot: 'Νευρωνάκι',
    description: 'Ο εγκέφαλος είναι το κέντρο ελέγχου του σώματος. Στέλνει μηνύματα σε όλα τα μέρη του σώματος μέσω των νεύρων.',
    fact: 'Ο εγκέφαλος χρησιμοποιεί 20% από την ενέργεια όλου του σώματος!'
  },
  heart: {
    name: 'Καρδιά', emoji: '🫀', mascot: 'Καρδούλης',
    description: 'Η καρδιά χτυπά περίπου 100.000 φορές την ημέρα και σπρώχνει το αίμα σε όλο το σώμα.',
    fact: 'Σε μια ζωή, η καρδιά αντλεί αρκετό αίμα για να γεμίσει 1 εκατομμύριο μπανιέρες!'
  },
  lungs: {
    name: 'Πνεύμονες', emoji: '🫁', mascot: 'Πνευμονάκια',
    description: 'Οι πνεύμονες παίρνουν οξυγόνο από τον αέρα και το δίνουν στο αίμα. Αναπνέουμε περίπου 20.000 φορές την ημέρα!',
    fact: 'Αν απλώναμε τους πνεύμονες επίπεδα, θα κάλυπταν ένα γήπεδο τένις!'
  },
  stomach: {
    name: 'Στομάχι', emoji: '🫃', mascot: 'Κύριος Γαστράκης',
    description: 'Το στομάχι σπάει την τροφή σε μικρά κομμάτια με χυμούς και κινήσεις. Χωράει περίπου 1 λίτρο τροφή!',
    fact: 'Το στομάχι παράγει ένα νέο στρώμα βλέννας κάθε 2 εβδομάδες για να μην χωνέψει τον εαυτό του!'
  }
};

const SENSES = [
  { id: 'sight',   emoji: '👁️', name: 'Όραση',   organ: 'Μάτια',  description: 'Τα μάτια μετατρέπουν το φως σε εικόνες που στέλνουν στον εγκέφαλο. Βλέπουμε εκατομμύρια χρώματα!' },
  { id: 'hearing', emoji: '👂', name: 'Ακοή',    organ: 'Αυτιά',  description: 'Τα αυτιά ανιχνεύουν τα ηχητικά κύματα και τα μετατρέπουν σε ήχους. Μπορούμε να ακούμε 20.000 διαφορετικές συχνότητες!' },
  { id: 'smell',   emoji: '👃', name: 'Όσφρηση', organ: 'Μύτη',   description: 'Η μύτη μπορεί να ανιχνεύσει πάνω από 1 τρισεκατομμύριο διαφορετικές μυρωδιές! Η μυρωδιά συνδέεται με τη μνήμη.' },
  { id: 'taste',   emoji: '👅', name: 'Γεύση',   organ: 'Γλώσσα', description: 'Η γλώσσα έχει περίπου 10.000 γευστικές θηλές που αναγνωρίζουν γλυκό, ξινό, αλμυρό, πικρό και ουμάμι!' },
  { id: 'touch',   emoji: '✋', name: 'Αφή',     organ: 'Δέρμα',  description: 'Το δέρμα είναι το μεγαλύτερο όργανο! Αισθάνεται αφή, θερμοκρασία και πόνο. Έχει πάνω από 4 εκατομμύρια αισθητήρες!' }
];

const HABITS = [
  { emoji: '💧', name: 'Πίνω νερό',          tip: 'Χρειαζόμαστε 6-8 ποτήρια νερό κάθε μέρα!' },
  { emoji: '🥦', name: 'Τρώω λαχανικά',       tip: 'Τα λαχανικά δίνουν βιταμίνες για δυνατό σώμα!' },
  { emoji: '😴', name: 'Κοιμάμαι καλά',       tip: 'Παιδιά χρειάζονται 9-11 ώρες ύπνου κάθε βράδυ!' },
  { emoji: '🏃', name: 'Κάνω γυμναστική',     tip: 'Η άσκηση κάνει την καρδιά και τους μύες δυνατούς!' },
  { emoji: '🪥', name: 'Βουρτσίζω δόντια',    tip: 'Δύο φορές την ημέρα για 2 λεπτά!' },
  { emoji: '🧼', name: 'Πλένω χέρια',         tip: 'Πλύσιμο χεριών σκοτώνει τα μικρόβια!' }
];

const STATIONS = [
  { id: 'brain',    icon: '🧠', name: 'Εγκέφαλος',  story: 'Το Νευρωνάκι στέλνει σπίθες σκέψης σε όλο το σώμα.' },
  { id: 'heart',    icon: '🫀', name: 'Καρδιά',     story: 'Ο Καρδούλης χτυπά ρυθμικά κάθε δευτερόλεπτο.' },
  { id: 'lungs',    icon: '🫁', name: 'Πνεύμονες',  story: 'Τα Πνευμονάκια γεμίζουν αέρα και δίνουν οξυγόνο.' },
  { id: 'stomach',  icon: '🫃', name: 'Στομάχι',    story: 'Η μπουκιά ξεκινά το μεγάλο ταξίδι πέψης.' },
  { id: 'skeleton', icon: '🦴', name: 'Σκελετός',   story: 'Ο Κύριος Σκελετούλης κρατά το σώμα όρθιο.' },
  { id: 'muscles',  icon: '💪', name: 'Μύες',       story: 'Οι μύες τραβούν τα κόκαλα για κίνηση.' },
  { id: 'senses',   icon: '✨', name: 'Αισθήσεις',  story: 'Μάτια, αυτιά, μύτη, γλώσσα και δέρμα ανάβουν!' }
];

const DIGESTION_STEPS = [
  { id: 'mouth',       info: '👄 Στόμα: Μασάμε την τροφή και ανακατεύουμε με σάλιο!' },
  { id: 'esophagus',   info: '🔴 Οισοφάγος: Η τροφή ταξιδεύει κάτω μέσα σε 8 δευτερόλεπτα!' },
  { id: 'stomach',     info: '🟡 Στομάχι: Χυμοί διαλύουν την τροφή για 2-4 ώρες!' },
  { id: 'intestines',  info: '🟢 Έντερα: Η ενέργεια μπαίνει στο αίμα και τα υπόλοιπα φεύγουν!' }
];

const STORAGE_KEY_COLLECTED = 'napoleon_anatomy_collected';
const STORAGE_KEY_PROGRESS  = 'napoleon_anatomy_progress';

/* ── State ── */

let state = {
  activeSection: 'profile',
  twoPlayer: false,
  players: ['Ναπολέων', 'Παίκτης 2'],
  activePlayer: 0,
  collected: [],            // array of string IDs
  discoveredOrgans: [],     // organ keys
  completedStations: [],    // station IDs
  activatedSenses: [],      // sense IDs
  habitsChecked: [],        // habit names
  organsPlaced: [],         // organ keys placed correctly
  digestionDone: false,
  player2Collected: [],
  player2Organs: [],
  player2Senses: []
};

/* ── Storage ── */

function loadState() {
  try {
    const c = JSON.parse(localStorage.getItem(STORAGE_KEY_COLLECTED) || '[]');
    const p = JSON.parse(localStorage.getItem(STORAGE_KEY_PROGRESS)  || '{}');
    if (Array.isArray(c)) state.collected = c;
    Object.assign(state, p);
  } catch (_) { /* fresh start */ }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY_COLLECTED, JSON.stringify(state.collected));
  const { collected, ...rest } = state;
  localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(rest));
}

/* ── Mascot ── */

function setMascot(text) {
  const el = document.getElementById('mascotBubble');
  if (el) el.textContent = text;
}

/* ── Section Navigation ── */

function showSection(id) {
  // Hide all, show target
  document.querySelectorAll('.section-screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  // Update nav active state
  document.querySelectorAll('.nav-link[data-section]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === id);
  });

  state.activeSection = id;
}

function setupNavigation() {
  // Sidebar nav buttons
  document.querySelectorAll('[data-section]').forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });

  // Jump buttons like "Ξεκίνα εξερεύνηση"
  document.querySelectorAll('[data-section-jump]').forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.sectionJump));
  });
}

/* ── Celebration Banner ── */

function celebrate(msg) {
  const old = document.querySelector('.celebrate-banner');
  if (old) old.remove();
  const banner = document.createElement('div');
  banner.className = 'celebrate-banner';
  banner.textContent = msg;
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), 3600);
}

/* ── Collect item ── */

function collectItem(id) {
  const key = state.twoPlayer && state.activePlayer === 1
    ? 'player2Collected'
    : 'collected';
  if (!state[key].includes(id)) {
    state[key].push(id);
    saveState();
    renderCollections();
    renderProgress();
    updateMissionStatus();
  }
}

/* ── Player Mode ── */

function setupPlayerMode() {
  const single = document.getElementById('singleModeBtn');
  const two    = document.getElementById('twoPlayerBtn');
  const switchBtn = document.getElementById('switchPlayerBtn');

  single.addEventListener('click', () => {
    state.twoPlayer = false;
    state.activePlayer = 0;
    single.classList.add('active-mode');
    two.classList.remove('active-mode');
    switchBtn.style.display = 'none';
    document.getElementById('currentPlayerName').textContent = state.players[0];
    saveState();
    setMascot('Λειτουργία 1 παίκτη ενεργή!');
  });

  two.addEventListener('click', () => {
    state.twoPlayer = true;
    state.activePlayer = 0;
    two.classList.add('active-mode');
    single.classList.remove('active-mode');
    switchBtn.style.display = 'inline-block';
    document.getElementById('currentPlayerName').textContent = state.players[0];
    saveState();
    setMascot('Λειτουργία 2 παικτών! Σειρά: ' + state.players[0]);
  });

  switchBtn.addEventListener('click', () => {
    state.activePlayer = state.activePlayer === 0 ? 1 : 0;
    const name = state.players[state.activePlayer];
    document.getElementById('currentPlayerName').textContent = name;
    saveState();
    setMascot('Αλλαγή σειράς! Τώρα παίζει: ' + name);
    celebrate('🔄 Σειρά: ' + name + '!');
  });
}

/* ── Mission status ── */

function updateMissionStatus() {
  const m1 = document.getElementById('mission1');
  const m2 = document.getElementById('mission2');
  const m3 = document.getElementById('mission3');

  if (state.discoveredOrgans.length > 0) m1.classList.add('done');
  if (state.activatedSenses.length > 0)  m2.classList.add('done');
  if (state.collected.length > 0)        m3.classList.add('done');
}

/* ── Body Explorer ── */

function setupBodyExplorer() {
  document.querySelectorAll('.body-area').forEach(area => {
    area.setAttribute('tabindex', '0');
    area.setAttribute('role', 'button');
    area.setAttribute('aria-label', 'Επιλογή οργάνου: ' + (BODY_PARTS[area.dataset.organ]?.name || ''));

    area.addEventListener('click', () => selectOrgan(area.dataset.organ));
    area.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOrgan(area.dataset.organ); }
    });
  });
}

function selectOrgan(key) {
  const data = BODY_PARTS[key];
  if (!data) return;

  // Highlight selected, clear others
  document.querySelectorAll('.body-area').forEach(a => a.classList.toggle('selected', a.dataset.organ === key));

  const alreadyCollected = state.discoveredOrgans.includes(key);
  const panel = document.getElementById('discoveryPanel');

  panel.innerHTML = `
    <span class="mascot-tag">🤖 ${data.mascot}</span>
    <span class="organ-emoji">${data.emoji}</span>
    <div class="organ-name">${data.name}</div>
    <p class="organ-desc">${data.description}</p>
    <div class="organ-fact">💡 ${data.fact}</div>
    ${alreadyCollected
      ? '<span class="collected-badge">✅ Ήδη ανακαλύφθηκε!</span>'
      : '<button class="cyan-btn" id="learnedBtn" style="margin-top:8px">✅ Το έμαθα!</button>'
    }
  `;

  if (!alreadyCollected) {
    document.getElementById('learnedBtn').addEventListener('click', () => discoverOrgan(key));
  }

  setMascot(data.mascot + ': ' + data.fact);
}

function discoverOrgan(key) {
  const data = BODY_PARTS[key];
  if (!state.discoveredOrgans.includes(key)) state.discoveredOrgans.push(key);
  collectItem('organ_' + key);
  saveState();

  // Refresh panel to show collected badge
  selectOrgan(key);
  celebrate('🧠 Ανακάλυψες: ' + data.name + '! +1 σήμα');
  setMascot('Μπράβο! Έμαθες για ' + data.name + '!');
  updateMissionStatus();
  updateStations();
}

/* ── Station Map ── */

function renderStations() {
  const map = document.getElementById('stationMap');
  map.innerHTML = '';
  STATIONS.forEach(station => {
    const done = state.completedStations.includes(station.id);
    const card = document.createElement('div');
    card.className = 'station-card' + (done ? ' completed' : '');
    card.innerHTML = `
      <span class="station-icon">${station.icon}</span>
      <span class="station-name">${station.name}</span>
      ${done ? '<span class="station-check">✅</span>' : ''}
    `;
    card.addEventListener('click', () => {
      if (!done) completeStation(station.id, station.name);
    });
    card.setAttribute('title', station.story);
    map.appendChild(card);
  });
  updateStationProgress();
}

function updateStations() {
  // Auto-complete stations that match discovered organs
  state.discoveredOrgans.forEach(key => {
    if (!state.completedStations.includes(key)) {
      state.completedStations.push(key);
    }
  });
  if (state.activatedSenses.length >= 5 && !state.completedStations.includes('senses')) {
    state.completedStations.push('senses');
  }
  saveState();
  renderStations();
}

function completeStation(id, name) {
  if (!state.completedStations.includes(id)) state.completedStations.push(id);
  collectItem('station_' + id);
  saveState();
  renderStations();
  renderProgress();
  celebrate('🗺️ Σταθμός ολοκληρώθηκε: ' + name + '!');
  setMascot('Νέος σταθμός! ' + name + ' ολοκληρώθηκε.');
}

function updateStationProgress() {
  const fill = document.getElementById('stationProgressFill');
  if (fill) fill.style.width = ((state.completedStations.length / 7) * 100) + '%';
}

/* ── Drag & Drop Organs ── */

let draggedOrganKey = null;
let touchDragging   = null;
let touchClone      = null;

function renderOrgans() {
  const palette = document.getElementById('organPalette');
  palette.innerHTML = '';

  Object.entries(BODY_PARTS).forEach(([key, data]) => {
    const placed = state.organsPlaced.includes(key);
    const piece  = document.createElement('div');
    piece.className = 'organ-piece' + (placed ? ' placed' : '');
    piece.draggable  = !placed;
    piece.dataset.organ = key;
    piece.innerHTML = `<span class="piece-emoji">${data.emoji}</span>${data.name}`;

    if (!placed) {
      // Mouse drag
      piece.addEventListener('dragstart', e => {
        draggedOrganKey = key;
        piece.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      piece.addEventListener('dragend', () => piece.classList.remove('dragging'));

      // Touch drag
      piece.addEventListener('touchstart', e => touchDragStart(e, key, piece), { passive: false });
      piece.addEventListener('touchmove',  e => touchDragMove(e), { passive: false });
      piece.addEventListener('touchend',   e => touchDragEnd(e), { passive: false });
    }
    palette.appendChild(piece);
  });

  setupDropSlots();
}

function setupDropSlots() {
  document.querySelectorAll('.drop-slot').forEach(slot => {
    const targetKey = slot.dataset.organ;
    const alreadyFilled = state.organsPlaced.includes(targetKey);
    if (alreadyFilled) applySlotSuccess(slot, targetKey);

    slot.addEventListener('dragover', e => { e.preventDefault(); slot.classList.add('drag-over'); });
    slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
    slot.addEventListener('drop', e => {
      e.preventDefault();
      slot.classList.remove('drag-over');
      handleOrganDrop(targetKey, draggedOrganKey);
      draggedOrganKey = null;
    });
  });
}

function handleOrganDrop(targetKey, droppedKey) {
  if (!droppedKey) return;
  const feedback = document.getElementById('builderFeedback');
  const slot = document.querySelector(`.drop-slot[data-organ="${targetKey}"]`);

  if (targetKey === droppedKey) {
    // Correct!
    applySlotSuccess(slot, targetKey);
    if (!state.organsPlaced.includes(targetKey)) state.organsPlaced.push(targetKey);
    collectItem('placed_' + targetKey);
    saveState();
    renderOrgans();

    const organName = BODY_PARTS[targetKey].name;
    feedback.className = 'builder-feedback success';
    feedback.textContent = '✅ Μπράβο! ' + organName + ' βρήκε το σπίτι της! 🎉';
    setMascot('Τέλεια τοποθέτηση! ' + BODY_PARTS[targetKey].emoji);

    // Check if all 4 placed
    if (state.organsPlaced.length >= 4) {
      feedback.className = 'builder-feedback celebrate';
      feedback.textContent = '🎊 Όλα τα όργανα τοποθετήθηκαν! Είσαι εξπέρ ανατόμος!';
      collectItem('all_organs');
      celebrate('🎊 Όλα τα όργανα στη θέση τους! Τέλειο!');
    }
  } else {
    // Wrong slot
    slot.classList.add('wrong');
    setTimeout(() => slot.classList.remove('wrong'), 450);
    feedback.className = 'builder-feedback error';
    feedback.textContent = '🔍 Αυτό το όργανο ψάχνει άλλη θέση...';
    setMascot('Προσπάθησε ξανά! Ψάξε τη σωστή θέση.');
  }
}

function applySlotSuccess(slot, key) {
  slot.innerHTML = `
    <span class="piece-emoji" style="font-size:1.4rem">${BODY_PARTS[key].emoji}</span>
    <span class="slot-label">${BODY_PARTS[key].name}</span>
    <span class="slot-success">✅</span>
  `;
  slot.classList.add('correct');
}

/* Touch drag support */
function touchDragStart(e, key, piece) {
  e.preventDefault();
  draggedOrganKey = key;
  touchDragging   = piece;

  // Create floating clone
  touchClone = piece.cloneNode(true);
  touchClone.style.cssText = `
    position:fixed; pointer-events:none; z-index:1000; opacity:0.85;
    transform:scale(1.1); transition:none;
    border:2px solid var(--cyan); border-radius:12px;
    background:#0d1f35; padding:14px 10px; text-align:center;
    width:${piece.offsetWidth}px;
  `;
  document.body.appendChild(touchClone);
  moveTouchClone(e.touches[0]);
}

function touchDragMove(e) {
  if (!touchClone) return;
  e.preventDefault();
  moveTouchClone(e.touches[0]);
}

function moveTouchClone(touch) {
  if (!touchClone) return;
  touchClone.style.left = (touch.clientX - 50) + 'px';
  touchClone.style.top  = (touch.clientY - 50) + 'px';
}

function touchDragEnd(e) {
  if (!touchClone) return;
  touchClone.remove();
  touchClone = null;

  const touch = e.changedTouches[0];
  const el    = document.elementFromPoint(touch.clientX, touch.clientY);
  const slot  = el?.closest('.drop-slot');

  if (slot) {
    handleOrganDrop(slot.dataset.organ, draggedOrganKey);
  }
  draggedOrganKey = null;
}

/* ── Senses ── */

function renderSenses() {
  const grid = document.getElementById('sensesGrid');
  grid.innerHTML = '';

  SENSES.forEach(sense => {
    const active = state.activatedSenses.includes(sense.id);
    const btn = document.createElement('button');
    btn.className = 'sense-btn' + (active ? ' active' : '');
    btn.innerHTML = `
      <span class="sense-emoji">${sense.emoji}</span>
      <span class="sense-name">${sense.name}</span>
    `;
    btn.addEventListener('click', () => activateSense(sense, btn));
    grid.appendChild(btn);
  });

  updateSensesCount();
}

function activateSense(sense, btn) {
  btn.classList.add('active');

  // Show detail panel
  const detail = document.getElementById('senseDetail');
  detail.style.display = 'block';
  detail.innerHTML = `
    <div class="sense-detail-inner">
      <span class="sense-detail-emoji">${sense.emoji}</span>
      <div>
        <h3>${sense.name}</h3>
        <div class="sense-organ">🏥 Όργανο: ${sense.organ}</div>
        <p>${sense.description}</p>
      </div>
    </div>
  `;

  if (!state.activatedSenses.includes(sense.id)) {
    state.activatedSenses.push(sense.id);
    collectItem('sense_' + sense.id);
    saveState();
    updateSensesCount();
    setMascot('Ανακάλυψες: ' + sense.name + '! ' + sense.emoji);
    updateMissionStatus();
    updateStations();

    if (state.activatedSenses.length >= 5) {
      celebrate('🌟 Και οι 5 αισθήσεις ενεργές! Σούπερ εξερευνητής!');
      collectItem('all_senses');
    }
  }
}

function updateSensesCount() {
  const el = document.getElementById('sensesCount');
  if (el) el.textContent = state.activatedSenses.length;
}

/* ── Digestion Animation ── */

function setupDigestion() {
  const btn = document.getElementById('startDigestionBtn');
  if (!btn) return;
  btn.addEventListener('click', runDigestion);
}

function runDigestion() {
  const btn  = document.getElementById('startDigestionBtn');
  const info = document.getElementById('digestionInfo');
  btn.disabled = true;
  btn.textContent = '⏳ Ταξίδι σε εξέλιξη...';

  // Reset all steps
  document.querySelectorAll('.dig-step').forEach(s => s.classList.remove('active'));
  info.textContent = '';

  const steps = [
    document.getElementById('step-mouth'),
    document.getElementById('step-esophagus'),
    document.getElementById('step-stomach'),
    document.getElementById('step-intestines')
  ];

  let i = 0;
  const foodEl = document.querySelector('.food-traveler');
  if (foodEl) foodEl.innerHTML = '<span>🍎</span>';

  function nextStep() {
    if (i > 0) steps[i - 1].classList.remove('active');
    if (i >= steps.length) {
      // Done
      info.textContent = '✅ Τέλος ταξιδιού! Το σώμα πήρε την ενέργεια!';
      btn.disabled = false;
      btn.textContent = '🔄 Ξανά!';
      if (!state.digestionDone) {
        state.digestionDone = true;
        collectItem('digestion_complete');
        saveState();
        celebrate('🍎 Πέψη ολοκληρώθηκε! +1 σήμα!');
      }
      return;
    }

    steps[i].classList.add('active');
    info.textContent = DIGESTION_STEPS[i].info;

    // Move food emoji proportionally
    const pct = (i / (steps.length - 1)) * 80;
    if (foodEl) {
      const span = foodEl.querySelector('span');
      if (span) span.style.transform = `translateX(${pct}vw)`;
    }

    i++;
    setTimeout(nextStep, 1400);
  }

  nextStep();
}

/* ── Habits ── */

function renderHabits() {
  const grid = document.getElementById('habitsGrid');
  grid.innerHTML = '';

  HABITS.forEach(habit => {
    const done = state.habitsChecked.includes(habit.name);
    const card = document.createElement('article');
    card.className = 'habit-card' + (done ? ' done' : '');
    card.innerHTML = `
      <span class="habit-emoji">${habit.emoji}</span>
      <span class="habit-name">${habit.name}</span>
      <span class="habit-tip">${habit.tip}</span>
      ${done
        ? '<span class="collected-badge">✅ Ολοκληρώθηκε!</span>'
        : `<button class="green-btn" style="width:100%">✅ Το κάνω!</button>`
      }
    `;
    if (!done) {
      card.querySelector('button').addEventListener('click', () => checkHabit(habit.name, card));
    }
    grid.appendChild(card);
  });
}

function checkHabit(name, card) {
  if (!state.habitsChecked.includes(name)) state.habitsChecked.push(name);
  collectItem('habit_' + name.replace(/\s/g, '_'));
  saveState();
  card.classList.add('done');
  card.innerHTML = `
    <span class="habit-emoji">${HABITS.find(h => h.name === name).emoji}</span>
    <span class="habit-name">${name}</span>
    <span class="habit-tip">${HABITS.find(h => h.name === name).tip}</span>
    <span class="collected-badge">✅ Ολοκληρώθηκε!</span>
  `;
  setMascot('Υγιεινή συνήθεια: ' + name + '! Μπράβο!');
}

/* ── Collections ── */

// All possible collectables — used to show locked silhouettes
const ALL_COLLECTABLES = [
  { id: 'organ_brain',    icon: '🧠', name: 'Εγκέφαλος',  type: 'Όργανο' },
  { id: 'organ_heart',    icon: '🫀', name: 'Καρδιά',     type: 'Όργανο' },
  { id: 'organ_lungs',    icon: '🫁', name: 'Πνεύμονες',  type: 'Όργανο' },
  { id: 'organ_stomach',  icon: '🫃', name: 'Στομάχι',    type: 'Όργανο' },
  { id: 'all_organs',     icon: '🏆', name: 'Πλήρης Ανατομία', type: 'Επίτευξη' },
  { id: 'sense_sight',    icon: '👁️', name: 'Όραση',      type: 'Αίσθηση' },
  { id: 'sense_hearing',  icon: '👂', name: 'Ακοή',       type: 'Αίσθηση' },
  { id: 'sense_smell',    icon: '👃', name: 'Όσφρηση',    type: 'Αίσθηση' },
  { id: 'sense_taste',    icon: '👅', name: 'Γεύση',      type: 'Αίσθηση' },
  { id: 'sense_touch',    icon: '✋', name: 'Αφή',        type: 'Αίσθηση' },
  { id: 'all_senses',     icon: '⭐', name: 'Κύριος Αισθήσεων', type: 'Επίτευξη' },
  { id: 'digestion_complete', icon: '🍎', name: 'Ταξιδιώτης Πέψης', type: 'Επίτευξη' },
  { id: 'all_habits',     icon: '💚', name: 'Υγιεινός Ήρωας', type: 'Επίτευξη' }
];

function renderCollections() {
  const grid = document.getElementById('collectionsGrid');
  grid.innerHTML = '';

  ALL_COLLECTABLES.forEach(item => {
    const earned = state.collected.includes(item.id);
    const card   = document.createElement('article');
    card.className = 'collection-card' + (earned ? ' earned collect-anim' : ' locked');
    card.innerHTML = `
      <span class="coll-icon">${earned ? item.icon : '🔒'}</span>
      <span class="coll-name">${earned ? item.name : '???'}</span>
      <span class="coll-type">${item.type}</span>
    `;
    grid.appendChild(card);
  });
}

/* ── Progress ── */

function renderProgress() {
  const container = document.getElementById('progressContainer');
  container.innerHTML = '';

  const sections = [
    {
      label: 'Όργανα Σώματος',
      current: state.discoveredOrgans.length,
      total: 4
    },
    {
      label: 'Σταθμοί Ταξιδιού',
      current: state.completedStations.length,
      total: 7
    },
    {
      label: '5 Αισθήσεις',
      current: state.activatedSenses.length,
      total: 5
    },
    {
      label: 'Υγιεινές Συνήθειες',
      current: state.habitsChecked.length,
      total: HABITS.length
    },
    {
      label: 'Συλλογές',
      current: state.collected.length,
      total: ALL_COLLECTABLES.length
    }
  ];

  sections.forEach(sec => {
    const pct  = Math.round((sec.current / sec.total) * 100);
    const div  = document.createElement('div');
    div.className = 'progress-section glass-card';
    div.innerHTML = `
      <div class="progress-label">
        <span>${sec.label}</span>
        <span>${sec.current}/${sec.total}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
    `;
    container.appendChild(div);
  });

  // Total %
  const totalCurrent = sections.reduce((a, s) => a + s.current, 0);
  const totalMax     = sections.reduce((a, s) => a + s.total, 0);
  const totalPct     = Math.round((totalCurrent / totalMax) * 100);

  const totalDiv = document.createElement('div');
  totalDiv.className = 'progress-section glass-card total-progress';
  totalDiv.innerHTML = `
    <div class="progress-label"><span class="orbitron">ΣΥΝΟΛΙΚΗ ΠΡΟΟΔΟΣ</span></div>
    <span class="total-percent">${totalPct}%</span>
    <div class="progress-bar">
      <div class="progress-bar-fill" style="width:${totalPct}%"></div>
    </div>
  `;
  container.appendChild(totalDiv);
}

/* ── Init ── */

function init() {
  loadState();
  setupNavigation();
  setupPlayerMode();
  setupBodyExplorer();
  setupDigestion();
  renderStations();
  renderOrgans();
  renderSenses();
  renderHabits();
  renderCollections();
  renderProgress();
  updateMissionStatus();

  // Restore senses UI from state
  document.querySelectorAll('.sense-btn').forEach((btn, i) => {
    if (state.activatedSenses.includes(SENSES[i]?.id)) btn.classList.add('active');
  });

  setMascot('Γεια σου! Πάτα ένα όργανο για να ξεκινήσεις!');
}

document.addEventListener('DOMContentLoaded', init);
