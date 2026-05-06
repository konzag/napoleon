// ====================================================
    //  JAVASCRIPT — Ο κώδικας που κάνει τα πάντα να ζωντανεύουν!
    //  Σκέψου τον σαν τις οδηγίες μέσα σε ένα κουτί LEGO.
    // ====================================================

    // ── ΔΕΔΟΜΕΝΑ ΖΩΩΝ ───────────────────────────────────
    const animals = [
      {
        emoji: "🦁", name: "Λιοντάρι",
        fact: "Τα λιοντάρια είναι οι μόνες γάτες που ζουν σε ομάδες που λέγονται ΑΓΕΛΕΣ! Τα θηλυκά κυνηγούν ενώ τα αρσενικά προστατεύουν την αγέλη. Ο βρυχηθμός ενός λιονταριού ακούγεται από 8 χιλιόμετρα μακριά — πόσο δυνατά! 🌟",
        tip: "Jedi Wisdom: Όπως το λιοντάρι προστατεύει την αγέλη του, ο Jedi προστατεύει αυτούς που αγαπά."
      },
      {
        emoji: "🐘", name: "Ελέφαντας",
        fact: "Οι ελέφαντες ΠΟΤΕ δεν ξεχνούν! Έχουν τον μεγαλύτερο εγκέφαλο από όλα τα χερσαία ζώα. Τα μωρά ελέφαντες πίνουν μέχρι 11 λίτρα γάλα κάθε μέρα. Οι ελέφαντες αγκαλιάζουν ακόμα ο ένας τον άλλον με την προβοσκίδα τους! 🥰",
        tip: "Jedi Wisdom: Η μνήμη είναι μεγάλη δύναμη — χρησιμοποίησέ την για να θυμάσαι την καλοσύνη."
      },
      {
        emoji: "🦋", name: "Πεταλούδα",
        fact: "Η κάμπια μετατρέπεται σε υπέροχη πεταλούδα μέσα σε ένα κουκούλι — ουσιαστικά λιώνει και ξαναχτίζεται! Οι πεταλούδες γεύονται την τροφή τους με τα ΠΟΔΙΑ τους! Έχουν δύο ζεύγη φτερών καλυμμένα με μικροσκοπικά λέπια. 🌈",
        tip: "Jedi Wisdom: Η αλλαγή μπορεί να φοβίζει, αλλά οδηγεί σε κάτι όμορφο."
      },
      {
        emoji: "🐬", name: "Δελφίνι",
        fact: "Τα δελφίνια είναι πανέξυπνα — σχεδόν τόσο έξυπνα όσο οι άνθρωποι! Έχουν ονόματα το ένα για το άλλο και καλούν τους φίλους τους με ειδικά σφυρίγματα. Κοιμούνται με το ένα μάτι ανοιχτό για να μην βυθιστούν! 😲",
        tip: "Jedi Wisdom: Οι αληθινοί φίλοι πάντα ξέρουν το όνομά σου και έρχονται όταν τους καλείς."
      },
      {
        emoji: "🦅", name: "Αετός",
        fact: "Οι αετοί έχουν απίστευτα δυνατή όραση — μπορούν να δουν ένα κουνέλι από σχεδόν 3 χιλιόμετρα ψηλά! Χτίζουν τις μεγαλύτερες φωλιές από κάθε άλλο πουλί· μερικές ζυγίζουν πάνω από ΕΝΑ ΤΟΝΟ. Οι αετοί πετούν μέχρι 160 χλμ/ώρα! 🚀",
        tip: "Jedi Wisdom: Κοίτα μακριά πριν δράσεις — όπως ο αετός που σαρώνει τη γη."
      },
      {
        emoji: "🐙", name: "Χταπόδι",
        fact: "Ένα χταπόδι έχει ΤΡΕΙΣ καρδιές και ΜΠΛΕ αίμα! Μπορεί να αλλάξει χρώμα και υφή σε λιγότερο από ένα δευτερόλεπτο για να κρυφτεί. Αν χάσει ένα πλοκάμι, μεγαλώνει ΚΑΙΝΟΥΡΓΙΟ! Είναι επίσης εξαιρετικά έξυπνο. 💙",
        tip: "Jedi Wisdom: Η προσαρμοστικότητα είναι το μεγαλύτερο εργαλείο ενός Jedi."
      },
      {
        emoji: "🐸", name: "Βάτραχος",
        fact: "Οι βάτραχοι πίνουν νερό μέσα από το ΔΕΡΜΑ τους — δεν παίρνουν ποτέ μια γουλιά! Μερικοί βάτραχοι είναι φωτεινόχρωμοι για να προειδοποιούν ότι είναι δηλητηριώδεις. Τον χειμώνα, θάβονται στη λάσπη για να ξεχειμωνιάσουν. 🌿",
        tip: "Jedi Wisdom: Η ξεκούραση και η υπομονή (σαν κοιμισμένος βάτραχος) σε προετοιμάζουν για μεγάλα άλματα."
      },
      {
        emoji: "🦒", name: "Καμηλοπάρδαλη",
        fact: "Οι καμηλοπαρδάλεις είναι τα ψηλότερα ζώα στη Γη — φτάνουν τα 6 μέτρα! Η γλώσσα τους είναι σκούρα μωβ και σχεδόν 50 εκ. μακριά. Τα μωρά τους περπατούν μέσα σε μία ώρα από τη γέννησή τους. Κοιμούνται μόνο 30 λεπτά την ημέρα! 😴",
        tip: "Jedi Wisdom: Στάσου ψηλά, κοίτα μακριά, και ποτέ μη σταματάς να φτάνεις ψηλότερα."
      },
      {
        emoji: "🐺", name: "Λύκος",
        fact: "Οι λύκοι ζουν σε οικογενειακές ομάδες που λέγονται αγέλες και φροντίζουν ο ένας τον άλλον. Ουρλιάζουν για να επικοινωνούν σε μεγάλες αποστάσεις — σαν τηλεφώνημα μέσα από το δάσος! Οι λύκοι είναι πρόγονοι όλων των σκύλων. 🐕",
        tip: "Jedi Wisdom: Η δύναμη της αγέλης είναι ο λύκος· η δύναμη του λύκου είναι η αγέλη."
      },
      {
        emoji: "🦜", name: "Παπαγάλος",
        fact: "Οι παπαγάλοι μπορούν να μάθουν εκατοντάδες λέξεις και να καταλαβαίνουν τι σημαίνουν! Είναι από τα πιο έξυπνα πουλιά. Μερικοί παπαγάλοι ζουν πάνω από 80 χρόνια — περισσότερο από πολλούς ανθρώπους! Χρησιμοποιούν το ράμφος τους σαν τρίτο χέρι. 🎤",
        tip: "Jedi Wisdom: Ένας σοφός Padawan ακούει προσεκτικά πριν μιλήσει."
      }
    ];

    // ── ΔΕΔΟΜΕΝΑ ΦΥΤΩΝ ───────────────────────────────────
    const plants = [
      {
        emoji: "🌻", name: "Ηλίανθος",
        fact: "Οι ηλίανθοι στρέφονται πάντα προς τον ΗΛΙΟ καθώς μεγαλώνουν — αυτό λέγεται ηλιοτροπισμός! Ένας μόνο ηλίανθος είναι φτιαγμένος από έως 2.000 μικροσκοπικά λουλούδια μαζεμένα. Μπορούν να μεγαλώσουν πάνω από 3 μέτρα ψηλοί! ☀️",
        tip: "Jedi Wisdom: Πάντα να στρέφεσαι προς το φως, όπως ο ηλίανθος."
      },
      {
        emoji: "🎋", name: "Μπαμπού",
        fact: "Το μπαμπού είναι το γρηγορότερα αναπτυσσόμενο φυτό στον κόσμο — μπορεί να μεγαλώσει 90 εκ. ΣΕ ΜΙΑ ΜΟΝΟ ΜΕΡΑ! Είναι στην πραγματικότητα ένα γιγαντιαίο χορτάρι, όχι δέντρο. Τα γιγάντια πάντα τρώνε έως 40 κιλά μπαμπού την ημέρα! 🐼",
        tip: "Jedi Wisdom: Μεγάλωσε λίγο κάθε μέρα και μια μέρα θα είσαι γίγαντας."
      },
      {
        emoji: "🌵", name: "Κάκτος",
        fact: "Ένας κάκτος μπορεί να επιβιώσει μέχρι δύο χρόνια χωρίς βροχή! Αποθηκεύει νερό μέσα στο χοντρό σαρκώδες βλαστό του. Τα αγκάθια είναι τροποποιημένα φύλλα που το προστατεύουν και μαζεύουν σταγόνες δροσιάς. Μερικοί κάκτοι ζουν 200 χρόνια! 💧",
        tip: "Jedi Wisdom: Μπορείς να ευδοκιμήσεις ακόμα και σε δύσκολα μέρη, αν είσαι προετοιμασμένος."
      },
      {
        emoji: "🍄", name: "Μανιτάρι",
        fact: "Τα μανιτάρια δεν είναι φυτά — είναι ΜΥΚΗΤΕΣ! Κάτω από τη γη, συνδέονται με ένα τεράστιο δίκτυο μικροσκοπικών νημάτων που λέγεται μυκήλιο. Τα δέντρα μιλούν μεταξύ τους και μοιράζονται τροφή μέσω αυτού του δικτύου! 🌐",
        tip: "Jedi Wisdom: Ακόμα και πράγματα που δεν βλέπεις μπορούν να μας συνδέσουν όλους."
      },
      {
        emoji: "🌸", name: "Άνθη Κερασιάς",
        fact: "Τα άνθη κερασιάς ανθίζουν μόνο για ΔΥΟ ΕΒΔΟΜΑΔΕΣ κάθε χρόνο! Στην Ιαπωνία οι άνθρωποι κάνουν πικνίκ κάτω από τα δέντρα για να το γιορτάσουν — αυτό λέγεται «χανάμι». Το δέντρο μπορεί να ζήσει πάνω από 1.000 χρόνια! 🇯🇵",
        tip: "Jedi Wisdom: Οι όμορφες στιγμές είναι πολύτιμες γιατί δεν κρατούν για πάντα."
      },
      {
        emoji: "🌿", name: "Μέντα",
        fact: "Η μέντα είναι ένα από τα αρχαιότερα φυτά που χρησιμοποίησαν οι άνθρωποι — πάνω από 10.000 χρόνια! Μεγαλώνει τόσο καλά που μπορεί να καταλάβει ολόκληρο κήπο. Κρατά τα έντομα μακριά με την έντονη μυρωδιά της. 🐛",
        tip: "Jedi Wisdom: Ακόμα και μικρά πράγματα μπορούν να έχουν ισχυρή επίδραση στον κόσμο γύρω τους."
      },
      {
        emoji: "🌳", name: "Βελανιδιά",
        fact: "Μια βελανιδιά μπορεί να ζήσει πάνω από 1.000 χρόνια! Από ένα μικροσκοπικό βελανίδι μεγαλώνει γιγαντιαίο δέντρο που φτάνει τα 40 μέτρα. Μια μόνο βελανιδιά φιλοξενεί πάνω από 500 είδη εντόμων, πουλιών και ζώων! 🏡",
        tip: "Jedi Wisdom: Τα μεγάλα πράγματα ξεκινούν πάντα από κάτι πολύ μικρό — όπως ένα βελανίδι, ή ένας Padawan."
      }
    ];

    // ── ΔΕΔΟΜΕΝΑ ΔΕΙΝΟΣΑΥΡΩΝ ────────────────────────────
    const dinos = [
      {
        emoji: "🦕", name: "Βροντόσαυρος",
        fact: "Ζύγιζε όσο 4 ελέφαντες! Έτρωγε 400 κιλά φυτά κάθε μέρα. Ήταν ένα από τα μεγαλύτερα πλάσματα που περπάτησαν ποτέ στη Γη.",
        tip: "Jedi Wisdom: Ακόμα και οι γίγαντες τρέφονται με υπομονή και επιμονή."
      },
      {
        emoji: "🦖", name: "T-Rex",
        fact: "Τα χέρια του ήταν πολύ μικρά αλλά η δύναμη του δαγκώματός του ήταν τεράστια! Μπορούσε να σπάσει κόκαλα με μια μόνο δαγκωνιά.",
        tip: "Jedi Wisdom: Η αληθινή δύναμη δεν φαίνεται πάντα από έξω."
      },
      {
        emoji: "🐉", name: "Τρικεράτωψ",
        fact: "Τα τρία του κέρατα ήταν για άμυνα — σαν lightsaber! Το κεφάλι του ήταν ένα από τα μεγαλύτερα όλων των ζώων που υπήρξαν ποτέ.",
        tip: "Jedi Wisdom: Η άμυνα είναι τέχνη, όχι αδυναμία — ο Jedi προστατεύει."
      },
      {
        emoji: "🦎", name: "Βελοσιράπτορας",
        fact: "Κυνηγούσε σε ομάδες, έξυπνος σαν Jedi! Ήταν μόνο στο μέγεθος μιας γαλοπούλας αλλά εξαιρετικά επικίνδυνος και γρήγορος.",
        tip: "Jedi Wisdom: Η ομαδική δουλειά και η στρατηγική νικούν πάντα τη μοναχική δύναμη."
      },
      {
        emoji: "🌊", name: "Πλεσιόσαυρος",
        fact: "Ζούσε στη θάλασσα και είχε λαιμό 6 μέτρων! Χρησιμοποιούσε τα τέσσερα του πτερύγια σαν κουπιά για να κινείται στα βάθη του ωκεανού.",
        tip: "Jedi Wisdom: Η ευελιξία και η προσαρμογή σε κάνουν αήττητο σε κάθε περιβάλλον."
      },
      {
        emoji: "🪶", name: "Πτερόδακτυλος",
        fact: "Πετούσε με φτερά 7 μέτρων — μεγαλύτερος από άνθρωπο! Δεν ήταν δεινόσαυρος αλλά συγγενής τους που κυριαρχούσε στους ουρανούς.",
        tip: "Jedi Wisdom: Τα όνειρά σου μπορούν να πετάξουν ψηλότερα από οτιδήποτε άλλο."
      }
    ];

    // ── ΔΕΔΟΜΕΝΑ QUIZ ────────────────────────────────────
    const quizQuestions = [
      {
        question: "Ποιο ζώο έχει 3 καρδιές;",
        options: ["Δελφίνι", "Χταπόδι", "Ελέφαντας", "Λιοντάρι"],
        correct: 1
      },
      {
        question: "Ποιο φυτό μεγαλώνει 90 εκ. την ημέρα;",
        options: ["Ηλίανθος", "Μέντα", "Μπαμπού", "Βελανιδιά"],
        correct: 2
      },
      {
        question: "Ποιο ζώο αγκαλιάζει με την προβοσκίδα;",
        options: ["Καμηλοπάρδαλη", "Ελέφαντας", "Λύκος", "Βάτραχος"],
        correct: 1
      },
      {
        question: "Ποιο φυτό επιβιώνει 2 χρόνια χωρίς βροχή;",
        options: ["Μέντα", "Ηλίανθος", "Βελανιδιά", "Κάκτος"],
        correct: 3
      },
      {
        question: "Ποιο ζώο κοιμάται με ένα μάτι ανοιχτό;",
        options: ["Αετός", "Πεταλούδα", "Δελφίνι", "Παπαγάλος"],
        correct: 2
      },
      {
        question: "Ποιο ζώο μπορεί να αλλάξει χρώμα σε 1 δευτερόλεπτο;",
        options: ["Βάτραχος", "Χταπόδι", "Λύκος", "Πεταλούδα"],
        correct: 1
      },
      {
        question: "Ποιο πουλί φτιάχνει φωλιά 1 τόνου;",
        options: ["Παπαγάλος", "Πεταλούδα", "Αετός", "Δελφίνι"],
        correct: 2
      },
      {
        question: "Ποιο άνθος ανθίζει μόνο 2 εβδομάδες τον χρόνο;",
        options: ["Μέντα", "Άνθη Κερασιάς", "Ηλίανθος", "Μανιτάρι"],
        correct: 1
      }
    ];

    // ── ΚΑΤΑΣΤΑΣΗ ────────────────────────────────────────
    let soundEnabled = true;
    let currentTab = 'animals';
    let quizCurrentQuestion = 0;
    let quizScore = 0;
    let quizAnswered = false;
    let quizInitialized = false;

    // ── WEB AUDIO API ────────────────────────────────────
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function getAudioCtx() {
      if (!audioCtx) audioCtx = new AudioContext();
      return audioCtx;
    }

    // Βασική νότα — χρησιμοποιείται από τις ειδικές συναρτήσεις ήχου
    function playTone(frequency, duration = 0.18, type = 'sine', volume = 0.25) {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioCtx();
        const oscillator = ctx.createOscillator();
        const gainNode   = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
      } catch (e) {}
    }

    // Ήχος φωτόσπαθου — για κάρτες ζώων (χαμηλός oscillating τόνος ~0.4s)
    function playLightsaberHum() {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioCtx();
        const osc  = ctx.createOscillator();
        const lfo  = ctx.createOscillator();
        const lfoG = ctx.createGain();
        const gain = ctx.createGain();

        // LFO δίνει το χαρακτηριστικό «βούισμα» του lightsaber
        lfo.frequency.value = 7;
        lfoG.gain.value = 12;
        lfo.connect(lfoG);
        lfoG.connect(osc.frequency);

        osc.type = 'sawtooth';
        osc.frequency.value = 130;
        osc.connect(gain);
        gain.connect(ctx.destination);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.28, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.42);

        lfo.start(ctx.currentTime);
        osc.start(ctx.currentTime);
        lfo.stop(ctx.currentTime + 0.42);
        osc.stop(ctx.currentTime + 0.42);
      } catch (e) {}
    }

    // Ήχος φύσης — για κάρτες φυτών (απαλοί ψηλοί τόνοι)
    function playNatureChime() {
      if (!soundEnabled) return;
      playTone(784,  0.35, 'sine', 0.15);
      setTimeout(() => playTone(1047, 0.3,  'sine', 0.12), 130);
      setTimeout(() => playTone(1319, 0.4,  'sine', 0.1),  270);
    }

    // Ήχος «βρυχηθμός» — για κάρτες δεινόσαυρων
    function playDinoSound() {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioCtx();
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.55);
      } catch (e) {}
    }

    // R2-D2 χαρούμενα μπιπ — για σωστή απάντηση στο quiz
    function playCorrectSound() {
      if (!soundEnabled) return;
      playTone(880,  0.08, 'sine', 0.25);
      setTimeout(() => playTone(1100, 0.08, 'sine', 0.25), 130);
      setTimeout(() => playTone(1320, 0.14, 'sine', 0.3),  260);
    }

    // Droid malfunction — για λάθος απάντηση στο quiz (κατεβαίνουσα βουητή)
    function playWrongSound() {
      if (!soundEnabled) return;
      playTone(300, 0.12, 'square', 0.2);
      setTimeout(() => playTone(220, 0.12, 'square', 0.2), 130);
      setTimeout(() => playTone(150, 0.18, 'square', 0.15), 260);
    }

    // Whoosh — για εναλλαγή καρτελών
    function playTabWhoosh() {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioCtx();
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.18);
      } catch (e) {}
    }

    // Dispatcher: παίζει τον σωστό ήχο ανάλογα με τον τύπο κάρτας
    function playCardSound(type) {
      if (type === 'plant') playNatureChime();
      else if (type === 'dino') playDinoSound();
      else playLightsaberHum();
    }

    // Εναλλαγή ήχου ανοιχτό/κλειστό
    function toggleSound() {
      soundEnabled = !soundEnabled;
      document.getElementById('sound-btn').textContent =
        soundEnabled ? '🔊 Ήχοι: ΕΝΕΡΓΟΙ' : '🔇 Ήχοι: ΑΝΕΝΕΡΓΟΙ';
      if (soundEnabled) playTone(440, 0.1);
    }

    // ── ΔΗΜΙΟΥΡΓΙΑ ΚΑΡΤΩΝ ────────────────────────────────
    function buildGrid(items, type, containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';

      items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `card ${type}`;
        card.innerHTML = `
          <span class="card-emoji">${item.emoji}</span>
          <div class="card-name">${item.name.toUpperCase()}</div>
        `;

        card.addEventListener('click', () => {
          showFact(item, type);
          document.querySelectorAll('.card').forEach(c => c.style.outline = '');
          const outlineColor = type === 'plant' ? '#4f8' : type === 'dino' ? '#c084fc' : '#4af';
          card.style.outline = `2px solid ${outlineColor}`;
        });

        card.style.animationDelay = `${index * 40}ms`;
        container.appendChild(card);
      });
    }

    // ── ΕΜΦΑΝΙΣΗ ΠΑΝΕΛ ΓΕΓΟΝΟΤΟΣ ────────────────────────
    function showFact(item, type) {
      const panel = document.getElementById('fact-panel');
      document.getElementById('fact-emoji').textContent = item.emoji;
      document.getElementById('fact-name').textContent  = item.name;
      document.getElementById('fact-text').textContent  = item.fact;
      document.getElementById('fact-tip').textContent   = item.tip;

      if (type === 'dino') {
        panel.style.borderColor = '#c084fc';
        panel.style.boxShadow   = '0 0 28px #c084fc44, inset 0 0 30px rgba(192,132,252,0.03)';
      } else if (type === 'plant') {
        panel.style.borderColor = '#4f8';
        panel.style.boxShadow   = '0 0 28px #4f844, inset 0 0 30px rgba(68,255,136,0.03)';
      } else {
        panel.style.borderColor = '#4af';
        panel.style.boxShadow   = '0 0 28px #4af44, inset 0 0 30px rgba(68,170,255,0.03)';
      }

      panel.style.display = 'block';
      playCardSound(type);
      setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    }

    // ── ΕΝΑΛΛΑΓΗ ΚΑΡΤΕΛΩΝ ────────────────────────────────
    function showTab(tab) {
      currentTab = tab;
      playTabWhoosh();

      // Απόκρυψη όλων
      ['animals-grid', 'plants-grid', 'dinos-grid'].forEach(id =>
        document.getElementById(id).classList.add('hidden')
      );
      document.getElementById('quiz-section').classList.add('hidden');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

      // Εμφάνιση της επιλεγμένης καρτέλας
      if (tab === 'animals') {
        document.getElementById('animals-grid').classList.remove('hidden');
        document.querySelector('.tab-btn.animals').classList.add('active');
      } else if (tab === 'plants') {
        document.getElementById('plants-grid').classList.remove('hidden');
        document.querySelector('.tab-btn.plants').classList.add('active');
      } else if (tab === 'dinos') {
        document.getElementById('dinos-grid').classList.remove('hidden');
        document.querySelector('.tab-btn.dino').classList.add('active');
      } else if (tab === 'quiz') {
        document.getElementById('quiz-section').classList.remove('hidden');
        document.querySelector('.tab-btn.quiz').classList.add('active');
        if (!quizInitialized) {
          quizInitialized = true;
          startQuiz();
        }
      }

      // Απόκρυψη πάνελ γεγονότος
      document.getElementById('fact-panel').style.display = 'none';
      document.querySelectorAll('.card').forEach(c => c.style.outline = '');
    }

    // ── QUIZ ΛΟΓΙΚΗ ──────────────────────────────────────
    function startQuiz() {
      quizCurrentQuestion = 0;
      quizScore = 0;
      quizAnswered = false;
      document.getElementById('quiz-result').classList.add('hidden');
      document.getElementById('quiz-gameplay').classList.remove('hidden');
      showQuizQuestion();
    }

    function showQuizQuestion() {
      if (quizCurrentQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
      }

      quizAnswered = false;
      const q = quizQuestions[quizCurrentQuestion];

      document.getElementById('quiz-progress').textContent =
        `Ερώτηση ${quizCurrentQuestion + 1} από ${quizQuestions.length}`;
      document.getElementById('quiz-score-display').textContent =
        `Σκορ: ${quizScore}`;
      document.getElementById('quiz-question-text').textContent = q.question;

      const container = document.getElementById('quiz-options-container');
      container.innerHTML = '';

      q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => handleQuizAnswer(index, q.correct));
        container.appendChild(btn);
      });
    }

    function handleQuizAnswer(selectedIndex, correctIndex) {
      if (quizAnswered) return;
      quizAnswered = true;

      const buttons = document.querySelectorAll('.quiz-option-btn');

      if (selectedIndex === correctIndex) {
        buttons[selectedIndex].classList.add('correct');
        quizScore++;
        playCorrectSound();
      } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[correctIndex].classList.add('correct');
        playWrongSound();
      }

      buttons.forEach(btn => btn.disabled = true);

      setTimeout(() => {
        quizCurrentQuestion++;
        showQuizQuestion();
      }, 1500);
    }

    function showQuizResult() {
      document.getElementById('quiz-gameplay').classList.add('hidden');
      document.getElementById('quiz-result').classList.remove('hidden');

      let rank;
      if (quizScore === 8)      rank = "Grand Master Jedi! 🌟";
      else if (quizScore >= 6)  rank = "Jedi Knight! ⚔️";
      else if (quizScore >= 4)  rank = "Jedi Padawan! 💚";
      else                      rank = "Young Padawan, συνέχισε να μαθαίνεις! 💚";

      document.getElementById('quiz-final-score').textContent = `${quizScore} / ${quizQuestions.length}`;
      document.getElementById('quiz-rank').textContent = rank;
    }

    // ── LEGO BUILDER ─────────────────────────────────────
    const legoColors = [
      { name: 'Κόκκινο',   color: '#e3000f' },
      { name: 'Μπλε',      color: '#006db7' },
      { name: 'Κίτρινο',   color: '#ffd700' },
      { name: 'Πράσινο',   color: '#00a650' },
      { name: 'Λευκό',     color: '#f0f0f0' },
      { name: 'Μαύρο',     color: '#1a1a1a' },
      { name: 'Πορτοκαλί', color: '#f97316' },
      { name: 'Γόμα',      color: 'eraser'  }
    ];

    let selectedLegoColor = legoColors[0].color;
    let isLegoDragging = false;

    function toggleLegoBuilder() {
      const builder = document.getElementById('lego-builder');
      const btn     = document.getElementById('lego-toggle-btn');
      const isHidden = builder.classList.contains('hidden');

      if (isHidden) {
        builder.classList.remove('hidden');
        btn.textContent = '🧱 Κλείσε τον Builder';
        initLegoBuilder();
      } else {
        builder.classList.add('hidden');
        btn.textContent = '🧱 Χτίσε με LEGO!';
      }
    }

    function initLegoBuilder() {
      // Παλέτα χρωμάτων
      const palette = document.getElementById('lego-palette');
      palette.innerHTML = '';
      legoColors.forEach((colorObj, i) => {
        const swatch = document.createElement('div');
        swatch.className = 'palette-color' + (i === 0 ? ' selected' : '');
        swatch.title = colorObj.name;

        if (colorObj.color === 'eraser') {
          // Γόμα: διαγώνιο μοτίβο
          swatch.style.background = 'repeating-linear-gradient(45deg,#555 0px,#555 4px,#222 4px,#222 8px)';
          swatch.innerHTML = '<span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:1rem;pointer-events:none;">✕</span>';
          swatch.style.position = 'relative';
        } else {
          swatch.style.background = colorObj.color;
        }

        swatch.addEventListener('click', () => {
          document.querySelectorAll('.palette-color').forEach(s => s.classList.remove('selected'));
          swatch.classList.add('selected');
          selectedLegoColor = colorObj.color;
        });
        palette.appendChild(swatch);
      });

      // Πλέγμα 10x8
      const grid = document.getElementById('lego-grid');
      grid.innerHTML = '';
      for (let i = 0; i < 80; i++) {
        const cell = document.createElement('div');
        cell.className = 'lego-cell';

        cell.addEventListener('mousedown', (e) => {
          isLegoDragging = true;
          paintLegoCell(cell);
          e.preventDefault();
        });
        cell.addEventListener('mouseover', () => {
          if (isLegoDragging) paintLegoCell(cell);
        });
        cell.addEventListener('touchstart', (e) => {
          paintLegoCell(cell);
          e.preventDefault();
        }, { passive: false });
        cell.addEventListener('touchmove', (e) => {
          const t = e.touches[0];
          const elem = document.elementFromPoint(t.clientX, t.clientY);
          if (elem && elem.classList.contains('lego-cell')) paintLegoCell(elem);
          e.preventDefault();
        }, { passive: false });

        grid.appendChild(cell);
      }

      document.addEventListener('mouseup', () => { isLegoDragging = false; });
      updateLegoCounter();
    }

    function paintLegoCell(cell) {
      if (selectedLegoColor === 'eraser') {
        cell.style.background    = '';
        cell.style.borderColor   = 'rgba(255,255,255,0.1)';
        cell.style.boxShadow     = '';
      } else {
        cell.style.background    = selectedLegoColor;
        cell.style.borderColor   = 'rgba(0,0,0,0.35)';
        cell.style.boxShadow     = `inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.15)`;
      }
    }

    function clearLegoGrid() {
      document.querySelectorAll('.lego-cell').forEach(cell => {
        cell.style.background  = '';
        cell.style.borderColor = 'rgba(255,255,255,0.1)';
        cell.style.boxShadow   = '';
      });
    }

    // ── LEGO SAVE / LOAD ─────────────────────────────────
    const LEGO_STORAGE_KEY = 'napoleon_lego_saves';
    const LEGO_MAX_SAVES   = 345;

    function getLegoSaves() {
      try { return JSON.parse(localStorage.getItem(LEGO_STORAGE_KEY)) || []; }
      catch (e) { return []; }
    }

    function setLegoSaves(saves) {
      localStorage.setItem(LEGO_STORAGE_KEY, JSON.stringify(saves));
    }

    function getLegoGridColors() {
      return Array.from(document.querySelectorAll('.lego-cell')).map(cell => {
        const bg = cell.style.background;
        return (bg && bg !== '') ? bg : null;
      });
    }

    function applyLegoGridColors(colors) {
      const cells = document.querySelectorAll('.lego-cell');
      cells.forEach((cell, i) => {
        const c = colors[i];
        if (c) {
          cell.style.background  = c;
          cell.style.borderColor = 'rgba(0,0,0,0.35)';
          cell.style.boxShadow   = 'inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.15)';
        } else {
          cell.style.background  = '';
          cell.style.borderColor = 'rgba(255,255,255,0.1)';
          cell.style.boxShadow   = '';
        }
      });
    }

    function updateLegoCounter() {
      const el = document.getElementById('lego-counter');
      if (!el) return;
      const saves = getLegoSaves();
      el.textContent = `${saves.length}/345 αποθηκευμένα 🧱`;
    }

    function toggleLegoSaveInput() {
      const area  = document.getElementById('lego-save-input-area');
      const panel = document.getElementById('lego-load-panel');
      panel.classList.remove('open');
      area.classList.toggle('open');
      if (area.classList.contains('open')) {
        document.getElementById('lego-design-name').focus();
      }
    }

    function toggleLegoLoadPanel() {
      const panel = document.getElementById('lego-load-panel');
      const area  = document.getElementById('lego-save-input-area');
      area.classList.remove('open');
      panel.classList.toggle('open');
      if (panel.classList.contains('open')) renderLegoLoadPanel();
    }

    function confirmLegoSave() {
      const saves = getLegoSaves();
      if (saves.length >= LEGO_MAX_SAVES) {
        alert('Γέμισες τη συλλογή σου! Διάγραψε κάποια για να αποθηκεύσεις νέα. 🧱');
        return;
      }
      const nameInput = document.getElementById('lego-design-name');
      const name = nameInput.value.trim() || 'Σχέδιο ' + (saves.length + 1);
      saves.push({ name, date: new Date().toLocaleString('el-GR'), colors: getLegoGridColors() });
      setLegoSaves(saves);
      updateLegoCounter();
      nameInput.value = '';
      document.getElementById('lego-save-input-area').classList.remove('open');
      playTone(880, 0.1, 'sine', 0.2);
      setTimeout(() => playTone(1100, 0.12, 'sine', 0.2), 120);
    }

    function renderLegoLoadPanel() {
      const saves = getLegoSaves();
      const list  = document.getElementById('lego-saves-list');
      list.innerHTML = '';

      if (saves.length === 0) {
        list.innerHTML = '<div class="lego-empty-msg">Δεν έχεις αποθηκεύσει κάτι ακόμα! 🧱</div>';
        return;
      }

      // Νεότερα πρώτα
      [...saves].reverse().forEach((save, revIdx) => {
        const realIdx = saves.length - 1 - revIdx;
        const item = document.createElement('div');
        item.className = 'lego-save-item';

        // Μικρογραφία 10x8
        const thumb = document.createElement('div');
        thumb.className = 'lego-thumb';
        (save.colors || []).forEach(c => {
          const tc = document.createElement('div');
          tc.className = 'lego-thumb-cell';
          tc.style.background = c || 'rgba(255,255,255,0.04)';
          thumb.appendChild(tc);
        });

        // Πληροφορίες
        const info = document.createElement('div');
        info.className = 'lego-save-info';
        info.innerHTML = `<div class="lego-save-name">${save.name}</div>
                          <div class="lego-save-date">${save.date}</div>`;

        // Κουμπί φόρτωσης
        const loadBtn = document.createElement('button');
        loadBtn.className = 'lego-load-design-btn';
        loadBtn.textContent = '📂 Φόρτωση';
        loadBtn.addEventListener('click', () => {
          applyLegoGridColors(save.colors);
          document.getElementById('lego-load-panel').classList.remove('open');
          playTone(660, 0.1, 'sine', 0.2);
          setTimeout(() => playTone(880, 0.12, 'sine', 0.2), 100);
        });

        // Κουμπί διαγραφής
        const delBtn = document.createElement('button');
        delBtn.className = 'lego-delete-btn';
        delBtn.textContent = '🗑️';
        delBtn.addEventListener('click', () => {
          const s2 = getLegoSaves();
          s2.splice(realIdx, 1);
          setLegoSaves(s2);
          updateLegoCounter();
          renderLegoLoadPanel();
        });

        item.appendChild(thumb);
        item.appendChild(info);
        item.appendChild(loadBtn);
        item.appendChild(delBtn);
        list.appendChild(item);
      });
    }

    // ── ΕΚΚΙΝΗΣΗ ────────────────────────────────────────
    buildGrid(animals, 'animal', 'animals-grid');
    buildGrid(plants,  'plant',  'plants-grid');
    buildGrid(dinos,   'dino',   'dinos-grid');
