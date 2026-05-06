const HOME_URL = 'home.html';
const STORAGE_KEY = 'napoleon_anatomy_progress_v1';

const bodyParts = {
  'Εγκέφαλος': {
    mascot: 'Νευρωνάκι',
    icon: '🧠',
    text: 'Ο εγκέφαλος είναι το κέντρο των σκέψεων. Στέλνει μικρά μηνύματα για να κινούμαστε, να θυμόμαστε και να μαθαίνουμε.',
    does: 'Σαν αρχηγός, λέει στα μέρη του σώματος τι να κάνουν.'
  },
  'Καρδιά': {
    mascot: 'Καρδούλης',
    icon: '❤',
    text: 'Η καρδιά χτυπά συνέχεια και στέλνει αίμα σε όλο το σώμα.',
    does: 'Το αίμα μεταφέρει οξυγόνο και ενέργεια.'
  },
  'Πνεύμονες': {
    mascot: 'Πνευμονάκια',
    icon: '🫁',
    text: 'Οι πνεύμονες γεμίζουν αέρα όταν εισπνέουμε και μικραίνουν όταν εκπνέουμε.',
    does: 'Μας βοηθούν να παίρνουμε οξυγόνο.'
  },
  'Στομάχι': {
    mascot: 'Γιατρός Πίξελ',
    icon: '🍽️',
    text: 'Το στομάχι ανακατεύει την τροφή για να αρχίσει η πέψη.',
    does: 'Ετοιμάζει την τροφή ώστε το σώμα να πάρει δύναμη.'
  }
};

const stations = [
  ['Εγκέφαλος', 'Το Νευρωνάκι στέλνει σπίθες σκέψης.', 'brain'],
  ['Καρδιά', 'Ο Καρδούλης κρατά ρυθμό.', 'heart'],
  ['Πνεύμονες', 'Τα Πνευμονάκια παίρνουν αέρα.', 'lungs'],
  ['Στομάχι', 'Η μπουκιά ξεκινά ταξίδι.', 'stomach'],
  ['Σκελετός', 'Ο Κύριος Σκελετούλης κρατά το σώμα.', 'bones'],
  ['Μύες', 'Οι μύες βοηθούν την κίνηση.', 'muscles'],
  ['Αισθήσεις', 'Τα μάτια, τα αυτιά και οι άλλες αισθήσεις ανάβουν.', 'senses']
];

const parts = [
  ['κεφάλι', '😊', 'Στο κεφάλι έχουμε μάτια, μύτη, στόμα και τον εγκέφαλο.'],
  ['χέρια', '🖐️', 'Με τα χέρια αγγίζουμε, κρατάμε και ζωγραφίζουμε.'],
  ['πόδια', '🦶', 'Τα πόδια μας βοηθούν να περπατάμε, να τρέχουμε και να χορεύουμε.'],
  ['δέρμα', '✨', 'Το δέρμα αγκαλιάζει το σώμα και νιώθει ζέστη, κρύο και άγγιγμα.']
];

const organs = [
  ['brain', '🧠 Εγκέφαλος', 'Μπράβο, ο εγκέφαλος βρήκε το σπίτι του!'],
  ['lungs', '🫁 Πνεύμονες', 'Μπράβο, οι πνεύμονες βρήκαν το σπίτι τους!'],
  ['heart', '❤ Καρδιά', 'Μπράβο, η καρδιά βρήκε το σπίτι της!'],
  ['stomach', '🍽️ Στομάχι', 'Μπράβο, το στομάχι βρήκε το σπίτι του!']
];

const senses = [
  ['μάτια', '👀', 'βλέπω χρώματα και σχήματα'],
  ['αυτιά', '👂', 'ακούω ήχους και μουσική'],
  ['μύτη', '👃', 'μυρίζω λουλούδια και φαγητό'],
  ['γλώσσα', '👅', 'δοκιμάζω γλυκό, αλμυρό και ξινό'],
  ['δέρμα', '🤲', 'νιώθω απαλό, ζεστό και κρύο']
];

const habits = [
  ['Νερό', '💧', 'Το νερό βοηθά το σώμα να δουλεύει καλά.'],
  ['Ύπνος', '🌙', 'Ο ύπνος ξεκουράζει τον εγκέφαλο και τους μύες.'],
  ['Υγιεινό φαγητό', '🥗', 'Φρούτα, λαχανικά και καλό φαγητό δίνουν ενέργεια.'],
  ['Άσκηση', '🏃', 'Η κίνηση δυναμώνει καρδιά, πνεύμονες και μύες.'],
  ['Καθαρά χέρια', '🧼', 'Το πλύσιμο των χεριών κρατά μικρόβια μακριά.']
];

const defaultProgress = {
  profile: { players: ['Ναπολέων'], activePlayer: 0, twoPlayer: false },
  discovered: [],
  completedStations: [],
  collections: [],
  settings: { soundPlaceholders: true, bigText: false }
};

let progress = loadProgress();
let selectedPart = null;
let draggedOrgan = null;

function loadProgress() {
  try {
    return { ...structuredClone(defaultProgress), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return structuredClone(defaultProgress);
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function setGuide(text) {
  document.getElementById('guideBubble').textContent = text;
}

function showSection(sectionId) {
  document.querySelectorAll('.section-screen').forEach((screen) => screen.classList.toggle('active', screen.id === sectionId));
  document.querySelectorAll('.nav-link[data-section]').forEach((button) => button.classList.toggle('active', button.dataset.section === sectionId));
}

function selectBodyPart(name) {
  selectedPart = name;
  const info = bodyParts[name];
  document.querySelectorAll('.body-area').forEach((area) => area.classList.toggle('selected', area.dataset.part === name));
  const panel = document.getElementById('discoveryPanel');
  panel.innerHTML = `
    <span class="mascot">${info.mascot}</span>
    <h2>${info.icon} ${name}</h2>
    <p>${info.text}</p>
    <p><strong>Τι κάνει:</strong> ${info.does}</p>
    <div class="mini-animation ${name === 'Καρδιά' ? 'heart-animation' : name === 'Πνεύμονες' ? 'lungs-animation' : ''}">${info.icon}</div>
    <button id="learnedBtn" class="primary-action">Το έμαθα!</button>
  `;
  document.getElementById('learnedBtn').addEventListener('click', () => completeDiscovery(name));
  setGuide(`${info.mascot}: Ανακάλυψες το μέρος "${name}". Πάτα "Το έμαθα!" για αυτοκόλλητο.`);
}

function completeDiscovery(name = selectedPart) {
  if (!name) return;
  if (!progress.discovered.includes(name)) progress.discovered.push(name);
  addCollection(`sticker:${name}`);
  saveProgress();
  renderProgress();
  renderCollections();
  setGuide(`Μπράβο ${currentPlayerName()}! Το έμαθες με προσοχή.`);
}

function addCollection(item) {
  if (!progress.collections.includes(item)) progress.collections.push(item);
}

function renderParts() {
  const grid = document.getElementById('partsGrid');
  grid.textContent = '';
  parts.forEach(([name, icon, text]) => {
    const card = document.createElement('article');
    card.className = 'learning-card';
    card.innerHTML = `<span class="icon">${icon}</span><h3>${name}</h3><p>${text}</p>`;
    const btn = document.createElement('button');
    btn.textContent = 'Το ανακάλυψα';
    btn.addEventListener('click', () => {
      if (!progress.discovered.includes(name)) progress.discovered.push(name);
      addCollection(`card:${name}`);
      saveProgress();
      renderProgress();
      renderCollections();
      setGuide(`Γιατρός Πίξελ: Το ${name} μπήκε στις κάρτες εξερευνητή.`);
    });
    card.appendChild(btn);
    grid.appendChild(card);
  });
}

function renderOrgans() {
  const palette = document.getElementById('organPalette');
  palette.textContent = '';
  organs.forEach(([id, label]) => {
    const piece = document.createElement('button');
    piece.className = 'organ-piece';
    piece.draggable = true;
    piece.dataset.organ = id;
    piece.textContent = label;
    piece.addEventListener('dragstart', () => { draggedOrgan = id; });
    piece.addEventListener('click', () => {
      draggedOrgan = id;
      setGuide('Διάλεξες όργανο. Τώρα πάτα στη σωστή θέση στο σώμα.');
    });
    palette.appendChild(piece);
  });

  document.querySelectorAll('.drop-slot').forEach((slot) => {
    slot.addEventListener('dragover', (event) => event.preventDefault());
    slot.addEventListener('drop', (event) => {
      event.preventDefault();
      dropOrgan(slot.dataset.organ, draggedOrgan);
    });
    slot.addEventListener('click', () => dropOrgan(slot.dataset.organ, draggedOrgan));
  });
}

function dropOrgan(target, organ) {
  const feedback = document.getElementById('builderFeedback');
  if (!organ) {
    feedback.textContent = 'Πρώτα διάλεξε ένα όργανο.';
    return;
  }
  if (target !== organ) {
    feedback.textContent = 'Αυτό το όργανο ψάχνει άλλη θέση.';
    return;
  }
  const organInfo = organs.find(([id]) => id === organ);
  document.querySelector(`.drop-slot[data-organ="${target}"]`).classList.add('filled');
  feedback.textContent = organInfo[2];
  addCollection(`organ:${organInfo[1]}`);
  saveProgress();
  renderCollections();
  renderProgress();
}

function renderSenses() {
  const row = document.getElementById('senseRow');
  row.textContent = '';
  senses.forEach(([name, icon, text]) => {
    const button = document.createElement('button');
    button.className = 'sense-button';
    button.innerHTML = `<strong>${icon} ${name}</strong><br>${text}`;
    button.addEventListener('click', () => {
      button.classList.add('active');
      addCollection(`badge:Αίσθηση ${name}`);
      saveProgress();
      renderCollections();
      renderProgress();
      setGuide(`Άναψες την αίσθηση: ${name}.`);
    });
    row.appendChild(button);
  });
}

function renderHabits() {
  const grid = document.getElementById('habitGrid');
  grid.textContent = '';
  habits.forEach(([name, icon, text]) => {
    const card = document.createElement('article');
    card.className = 'habit-card';
    card.innerHTML = `<span class="icon">${icon}</span><h3>${name}</h3><p>${text}</p>`;
    const button = document.createElement('button');
    button.textContent = 'Αστέρι συνήθειας';
    button.addEventListener('click', () => {
      addCollection(`star:${name}`);
      saveProgress();
      renderCollections();
      renderProgress();
      setGuide(`Υγιεινή συνήθεια: ${name}. Το σώμα λέει ευχαριστώ!`);
    });
    card.appendChild(button);
    grid.appendChild(card);
  });
}

function renderStations() {
  const map = document.getElementById('stationMap');
  map.textContent = '';
  stations.forEach(([name, story, key], index) => {
    const card = document.createElement('article');
    card.className = 'learning-card station-card';
    card.innerHTML = `<h3>Σταθμός ${index + 1}: ${name}</h3><p>${story}</p>`;
    const button = document.createElement('button');
    button.textContent = progress.completedStations.includes(key) ? 'Ολοκληρώθηκε' : 'Παίξε σταθμό';
    button.addEventListener('click', () => completeStation(key, name));
    card.appendChild(button);
    map.appendChild(card);
  });
}

function completeStation(key, name) {
  if (!progress.completedStations.includes(key)) progress.completedStations.push(key);
  addCollection(`badge:${name}`);
  saveProgress();
  renderStations();
  renderProgress();
  renderCollections();
  setGuide(`Σταθμός ολοκληρώθηκε: ${name}. Πήρες νέο σήμα!`);
}

function renderCollections() {
  const grid = document.getElementById('collectionGrid');
  grid.textContent = '';
  const items = progress.collections.length ? progress.collections : ['Άγγιξε ένα μέρος του σώματος για να ξεκινήσει η συλλογή.'];
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'collection-card';
    const [type, label = item] = item.split(':');
    const icon = type === 'sticker' ? '🌟' : type === 'badge' ? '🏅' : type === 'star' ? '⭐' : type === 'organ' ? '🧩' : '🃏';
    card.innerHTML = `<span class="icon">${icon}</span><strong>${label}</strong><p>${collectionTypeLabel(type)}</p>`;
    grid.appendChild(card);
  });
}

function collectionTypeLabel(type) {
  return {
    sticker: 'Αυτοκόλλητο οργάνου',
    badge: 'Σήμα συστήματος',
    star: 'Αστέρι υγείας',
    card: 'Κάρτα εξερευνητή',
    organ: 'Κομμάτι anatomy builder'
  }[type] || 'Συλλογή';
}

function renderProgress() {
  const board = document.getElementById('progressBoard');
  if (!board) return;
  const rows = [
    ['Ανακαλύψεις', progress.discovered.length],
    ['Σταθμοί σώματος', `${progress.completedStations.length}/7`],
    ['Συλλογές', progress.collections.length],
    ['Παίκτης', currentPlayerName()],
    ['Λειτουργία', progress.profile.twoPlayer ? '2 παίκτες' : 'Μόνος μου']
  ];
  board.textContent = '';
  rows.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'progress-row';
    row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    board.appendChild(row);
  });
}

function currentPlayerName() {
  return progress.profile.players[progress.profile.activePlayer] || 'Ναπολέων';
}

function switchPlayer() {
  if (!progress.profile.twoPlayer) return;
  progress.profile.activePlayer = progress.profile.activePlayer === 0 ? 1 : 0;
  saveProgress();
  document.getElementById('turnMessage').textContent = `Παίζει τώρα: ${currentPlayerName()}.`;
  renderProgress();
}

function setupSettings() {
  const sound = document.getElementById('soundToggle');
  const big = document.getElementById('bigTextToggle');
  sound.checked = progress.settings.soundPlaceholders;
  big.checked = progress.settings.bigText;
  document.body.classList.toggle('big-text', progress.settings.bigText);

  sound.addEventListener('change', () => {
    progress.settings.soundPlaceholders = sound.checked;
    saveProgress();
    setGuide(sound.checked ? 'Οι ήχοι placeholder είναι έτοιμοι για μελλοντική αφήγηση.' : 'Οι ήχοι placeholder έκλεισαν.');
  });
  big.addEventListener('change', () => {
    progress.settings.bigText = big.checked;
    document.body.classList.toggle('big-text', big.checked);
    saveProgress();
  });
  document.getElementById('resetBtn').addEventListener('click', () => {
    progress = structuredClone(defaultProgress);
    saveProgress();
    renderAll();
    setGuide('Η πρόοδος καθαρίστηκε. Ξεκινάμε ξανά απαλά.');
  });
}

function setupNavigation() {
  document.querySelectorAll('[data-section]').forEach((button) => {
    button.addEventListener('click', () => showSection(button.dataset.section));
  });
  document.querySelectorAll('[data-section-jump]').forEach((button) => {
    button.addEventListener('click', () => showSection(button.dataset.sectionJump));
  });
  document.querySelectorAll('.body-area').forEach((area) => {
    area.setAttribute('tabindex', '0');
    area.addEventListener('click', () => selectBodyPart(area.dataset.part));
    area.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectBodyPart(area.dataset.part);
      }
    });
  });
}

function setupModes() {
  document.getElementById('singleModeBtn').addEventListener('click', () => {
    progress.profile.twoPlayer = false;
    progress.profile.players = ['Ναπολέων'];
    progress.profile.activePlayer = 0;
    saveProgress();
    document.getElementById('turnMessage').textContent = 'Παίζει ο Ναπολέων.';
    renderProgress();
  });
  document.getElementById('twoPlayerBtn').addEventListener('click', () => {
    progress.profile.twoPlayer = true;
    progress.profile.players = ['Ναπολέων', 'Φίλος'];
    progress.profile.activePlayer = 0;
    saveProgress();
    document.getElementById('turnMessage').textContent = '2 παίκτες: Ναπολέων και Φίλος. Οι σταθμοί αλλάζουν σειρά με τη σειρά.';
    renderProgress();
  });
}

function setupCollectButtons() {
  document.querySelectorAll('.collect-btn').forEach((button) => {
    button.addEventListener('click', () => {
      addCollection(button.dataset.collect);
      if (button.dataset.collect.includes('badge:')) {
        const label = button.dataset.collect.split(':')[1];
        const station = stations.find(([name]) => name === label);
        if (station && !progress.completedStations.includes(station[2])) progress.completedStations.push(station[2]);
      }
      saveProgress();
      renderCollections();
      renderProgress();
      setGuide('Μάζεψες νέο αντικείμενο στη συλλογή σου.');
      switchPlayer();
    });
  });
}

function renderAll() {
  renderParts();
  renderOrgans();
  renderSenses();
  renderHabits();
  renderStations();
  renderCollections();
  renderProgress();
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupModes();
  setupSettings();
  setupCollectButtons();
  renderAll();
});
