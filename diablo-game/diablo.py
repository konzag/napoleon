# -*- coding: utf-8 -*-
# ============================================================
#  diablo.py — Κόσμος των Δαιμόνων του Ναπολέων ⚔️🔥
#
#  Γεια σου Ναπολέων! Αυτό το πρόγραμμα σε βοηθά να εξερευνήσεις
#  τον κόσμο του Diablo 2 — Acts, κλάσεις ηρώων, τέρατα και αντικείμενα!
#
#  Για να τρέξεις: python diablo.py
# ============================================================

import sys
import time

try:
    import winsound
    SOUND_AVAILABLE = True
except ImportError:
    SOUND_AVAILABLE = False


# ============================================================
#  ASCII ART — Diablo θέμα!
# ============================================================

DIABLO_LOGO = r"""
     .  *  .   *   .  *  .   *   .
  *    /\\ DIABLO 2 //\    *
      /  \\       //  \
  .  / /\ \\     // /\ \  .
    / /  \ \\___// /  \ \
   /_/____\\ ⚔ //_____\_\
   |  ~~~~  ~~~  ~~~~  |
   |  🔥 ΚΟΣΜΟΣ ΤΩΝ 🔥 |
   |    ΔΑΙΜΟΝΩΝ!      |
   |___________________|
     * .   *  .  *  .
"""

SKULL_ART = r"""
     ___
    /   \
   | o o |
   |  ^  |
    \ == /
     |  |
    _|  |_
"""

FIRE_ART = r"""
    )  (
   (  )  )
    ) ( (
   ( )  )
    ~~~
"""


# ============================================================
#  ΔΕΔΟΜΕΝΑ — Acts, Κλάσεις, Τέρατα, Αντικείμενα
# ============================================================

ACTS = [
    {
        "number": 1,
        "name": "Πράξη Ι — Η Σκοτεινή Δασκάλα",
        "location": "Rogue Encampment, Tristram",
        "boss": "Andariel 👹",
        "description": (
            "Ο Πρώτος Πράξη ξεκινά στο Rogue Encampment. Ταξιδεύεις στο "
            "σκοτεινό δάσος και τις catacomb σπηλιές κάτω από το Tristram. "
            "Τελικά αντιμετωπίζεις την Andariel, τη Δαίμονα της Αγωνίας!"
        ),
        "fun_fact": "Το Tristram είναι η ίδια πόλη που ήταν στο Diablo 1!",
        "sound": 220,
    },
    {
        "number": 2,
        "name": "Πράξη ΙΙ — Τα Μυστικά της Ερήμου",
        "location": "Lut Gholein",
        "boss": "Duriel 🐛",
        "description": (
            "Φτάνεις στη λαμπερή πόλη Lut Gholein μέσα στην έρημο. "
            "Κάτω από τα αμμόλοφα βρίσκεις αρχαία Horadric ερείπια. "
            "Ο τρομακτικός Duriel, ο Κύριος της Ταλαιπωρίας, σε περιμένει!"
        ),
        "fun_fact": "Ο Duriel κλειδώθηκε για χιλιάδες χρόνια σε ένα μαυσωλείο!",
        "sound": 196,
    },
    {
        "number": 3,
        "name": "Πράξη ΙΙΙ — Η Πολιορκία της Travincal",
        "location": "Kurast Docks",
        "boss": "Mephisto 🧠",
        "description": (
            "Η ζούγκλα της Travincal κρύβει μεγάλο κίνδυνο. Οι Zakarum ιερείς "
            "έχουν διαφθαρεί από τον ίδιο τον Mephisto! Ο Mephisto, ο Κύριος "
            "του Μίσους, είναι ο πιο ισχυρός αδελφός στον τρίτο Act."
        ),
        "fun_fact": "Ο Mephisto μπορεί να σε τηλεπορτάρει δίπλα του — πολύ τρομακτικό!",
        "sound": 247,
    },
    {
        "number": 4,
        "name": "Πράξη ΙV — Η Πτώση του Παραδείσου",
        "location": "Pandemonium Fortress",
        "boss": "Diablo 😈",
        "description": (
            "Το Pandemonium Fortress αιωρείται ανάμεσα στον Παράδεισο και την Κόλαση. "
            "Ο ίδιος ο Diablo — ο Τρόμος του Κόσμου — σε περιμένει στο τέλος! "
            "Αυτή η μάχη είναι η πιο σκληρή σε ολόκληρο το παιχνίδι."
        ),
        "fun_fact": "Ο Diablo εμφανίζεται ως τεράστιο κόκκινο δαιμόνιο με κέρατα!",
        "sound": 165,
    },
    {
        "number": 5,
        "name": "Πράξη V — Στα Ερείπια του Harrogath",
        "location": "Harrogath (Lord of Destruction)",
        "boss": "Baal 👑",
        "description": (
            "Στα χιονισμένα βουνά του Arreat βρίσκεις το πολιορκημένο Harrogath. "
            "Ο Baal, ο Κύριος της Καταστροφής, θέλει να καταστρέψει τον "
            "Worldstone — την πηγή της δύναμης των ανθρώπων!"
        ),
        "fun_fact": "Ο Baal έχει 4 κλώνους-ψεύτικους εαυτούς πριν από τη πραγματική μάχη!",
        "sound": 147,
    },
]

CLASSES = [
    {
        "emoji": "⚔️",
        "name": "Amazon (Αμαζόνα)",
        "weapon": "Τόξο & Ακόντιο",
        "specialty": "Γρήγορη από απόσταση",
        "description": (
            "Η Αμαζόνα είναι πολεμίστρια που έρχεται από απομακρυσμένα νησιά. "
            "Χρησιμοποιεί τόξο με πύρινα βέλη ή ακόντια με αστραπή. "
            "Είναι πολύ γρήγορη και μπορεί να σκοτώσει τους εχθρούς πριν πλησιάσουν!"
        ),
        "cool_skill": "Multishot — εκτοξεύει 20 βέλη ταυτόχρονα! 🏹",
        "sound": 659,
    },
    {
        "emoji": "💀",
        "name": "Necromancer (Νεκρομάντης)",
        "weapon": "Ραβδί & Ασπίδα",
        "specialty": "Ανασταίνει στρατό σκελετών",
        "description": (
            "Ο Νεκρομάντης χρησιμοποιεί μαγεία θανάτου για να αναστήσει τους "
            "νεκρούς εχθρούς ως στρατιώτες του! Μπορεί να έχει μέχρι 20 σκελετούς "
            "που πολεμούν για αυτόν. Είναι ο πιο μοναδικός χαρακτήρας!"
        ),
        "cool_skill": "Corpse Explosion — κάνει εχθρούς να εκρήγνυνται! 💥",
        "sound": 277,
    },
    {
        "emoji": "🛡️",
        "name": "Paladin (Παλαντίν)",
        "weapon": "Σπαθί & Ασπίδα",
        "specialty": "Ιερός πολεμιστής με auras",
        "description": (
            "Ο Παλαντίν είναι ιερός πολεμιστής της τάξης Zakarum. Έχει μαγικές "
            "'auras' που βοηθούν τους φίλους και βλάπτουν τους εχθρούς. "
            "Είναι ο καλύτερος χαρακτήρας για να παίζεις με φίλους μαζί!"
        ),
        "cool_skill": "Holy Shock Aura — ηλεκτρίζει όλους τους εχθρούς γύρω! ⚡",
        "sound": 784,
    },
    {
        "emoji": "🔥",
        "name": "Sorceress (Μάγισσα)",
        "weapon": "Ραβδί",
        "specialty": "Ισχυρά ξόρκια στοιχείων",
        "description": (
            "Η Μάγισσα ελέγχει τις δυνάμεις της φωτιάς, του πάγου και της αστραπής! "
            "Μπορεί να εκτοξεύει μπάλες φωτιάς, να παγώνει εχθρούς ή να καλεί "
            "κεραυνούς. Είναι η πιο ισχυρή σε ξόρκια αλλά πεθαίνει εύκολα."
        ),
        "cool_skill": "Blizzard — καλεί χιονοθύελλα που συνθλίβει τα πάντα! ❄️",
        "sound": 523,
    },
    {
        "emoji": "🐺",
        "name": "Druid (Δρυΐδης)",
        "weapon": "Ραβδί & Ασπίδα",
        "specialty": "Μεταμορφώνεται σε ζώο",
        "description": (
            "Ο Δρυΐδης έρχεται από τα βόρεια δάση και ελέγχει τη φύση. "
            "Μπορεί να μεταμορφωθεί σε Αρκούδα ή Λύκαιμα για εκπληκτική δύναμη! "
            "Μπορεί επίσης να καλεί ζώα — αετούς, λύκους και αρκούδες!"
        ),
        "cool_skill": "Werewolf Form — γίνεται λύκαιμα με τεράστια δύναμη! 🐺",
        "sound": 392,
    },
    {
        "emoji": "🥷",
        "name": "Assassin (Δολοφόνος)",
        "weapon": "Nunchaku & Σουρικέν",
        "specialty": "Παγίδες και γρήγορα χτυπήματα",
        "description": (
            "Η Δολοφόνος είναι μέλος μυστικής τάξης που φυλάει το Horadric μυστικό. "
            "Χρησιμοποιεί παγίδες που εκρήγνυνται, γρήγορα χτυπήματα και ξόρκια σκιάς. "
            "Είναι ο πιο τεχνικός χαρακτήρας — χρειάζεται εξάσκηση!"
        ),
        "cool_skill": "Lightning Sentry — παγίδα που σκοτώνει 30 εχθρούς ταυτόχρονα! ⚡",
        "sound": 440,
    },
    {
        "emoji": "💪",
        "name": "Barbarian (Βάρβαρος)",
        "weapon": "2 Ξίφη ταυτόχρονα",
        "specialty": "Δύναμη και μάχη σώμα με σώμα",
        "description": (
            "Ο Βάρβαρος είναι ο πιο δυνατός πολεμιστής! Κρατά ΔΥΟ ξίφη ταυτόχρονα "
            "και πολεμά ανάμεσα στους εχθρούς. Μπορεί να πηδήξει πάνω σε εχθρούς "
            "και να φωνάξει για να φοβίσει τους γύρω! Ο αγαπημένος πολλών!"
        ),
        "cool_skill": "Whirlwind — περιστρέφεται σαν ανεμοστρόβιλος κόβοντας τα πάντα! 🌪️",
        "sound": 330,
    },
]

MONSTERS = [
    {
        "emoji": "💀",
        "name": "Skeleton (Σκελετός)",
        "type": "Undead",
        "danger": "⭐",
        "description": "Ζωντανά κόκαλα που τριγυρίζουν στη νύχτα! Είναι αδύναμοι αλλά έρχονται σε μεγάλες ομάδες.",
        "weakness": "Ιερή ζημιά (Paladin aura)",
    },
    {
        "emoji": "👹",
        "name": "Fallen (Μικροί Δαίμονες)",
        "type": "Demon",
        "danger": "⭐",
        "description": "Μικρά κόκκινα δαιμόνια που φωνάζουν 'Rakanishu!' και τρέχουν γρήγορα. Είναι ανόητοι αλλά πολυάριθμοι!",
        "weakness": "Οτιδήποτε — είναι πολύ αδύναμοι!",
    },
    {
        "emoji": "🕷️",
        "name": "Tomb Viper (Φίδι Τάφου)",
        "type": "Animal",
        "danger": "⭐⭐",
        "description": "Γιγάντιες αράχνες και φίδια που ζουν στα ερείπια της ερήμου. Εκτοξεύουν δηλητήριο!",
        "weakness": "Αστραπή ή φωτιά",
    },
    {
        "emoji": "🐍",
        "name": "Hydra",
        "type": "Demon",
        "danger": "⭐⭐⭐",
        "description": "Τρικέφαλο τέρας που εκτοξεύει φωτιά από τα τρία κεφάλια του ταυτόχρονα! Πολύ επικίνδυνο!",
        "weakness": "Ψυχρά ξόρκια (πάγος)",
    },
    {
        "emoji": "😱",
        "name": "Abyss Knight",
        "type": "Undead",
        "danger": "⭐⭐⭐⭐",
        "description": "Ιπποτες της Άβυσσου με μαύρη πανοπλία! Χρησιμοποιούν σπαθιά αστραπής και μπορούν να τηλεμεταφερθούν.",
        "weakness": "Ιερή ζημιά",
    },
]

ITEMS = [
    {
        "emoji": "🗡️",
        "type": "Όπλο",
        "name": "Windforce",
        "rarity": "🟡 Unique",
        "description": "Ένα μυθικό τόξο που σπρώχνει τους εχθρούς πίσω με κάθε βέλος! Ιδανικό για Αμαζόνα.",
    },
    {
        "emoji": "🛡️",
        "type": "Πανοπλία",
        "name": "Shaftstop",
        "rarity": "🟡 Unique",
        "description": "Θωρακικός θώρακας που μειώνει τη ζημιά 30%! Καθιστά τον Βάρβαρο σχεδόν άτρωτο.",
    },
    {
        "emoji": "💎",
        "type": "Δαχτυλίδι",
        "name": "Stone of Jordan",
        "rarity": "🟡 Unique",
        "description": "Το πιο διάσημο δαχτυλίδι! Ήταν το νόμισμα του Diablo 2 — οι παίκτες τα χρησιμοποιούσαν για ανταλλαγές!",
    },
    {
        "emoji": "🪖",
        "type": "Κράνος",
        "name": "Harlequin Crest (Shako)",
        "rarity": "🟡 Unique",
        "description": "Το πιο γνωστό κράνος! Δίνει +2 σε ΟΛΑ τα skills και +life. Το θέλουν ΟΛΟΙ οι χαρακτήρες!",
    },
    {
        "emoji": "📜",
        "type": "Runeword",
        "name": "Enigma",
        "rarity": "🔮 Runeword",
        "description": "Φτιαγμένο από ρούνες Jah+Ith+Ber. Δίνει τη δυνατότητα να τηλεμεταφερθείς! Αυτό άλλαξε το παιχνίδι για πάντα.",
    },
]


# ============================================================
#  ΒΟΗΘΗΤΙΚΕΣ ΣΥΝΑΡΤΗΣΕΙΣ
# ============================================================

def clear_ish():
    """Εκτύπωσε μερικές κενές γραμμές για εφέ «καθαρής οθόνης»."""
    print("\n" * 2)


def print_divider(char="=", width=55):
    """Εκτύπωσε μια διακοσμητική γραμμή."""
    print(char * width)


def slow_print(text, delay=0.03):
    """Εκτύπωσε κείμενο ένα γράμμα τη φορά."""
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()


def beep(frequency, duration_ms=300):
    """Παίξε έναν ήχο χρησιμοποιώντας το ενσωματωμένο ηχείο."""
    if SOUND_AVAILABLE:
        winsound.Beep(frequency, duration_ms)
    else:
        print(f"  ♪ ({frequency} Hz) ♪")


def wrap_print(text, indent="  ", width=56):
    """Εκτύπωσε κείμενο με αναδίπλωση γραμμής."""
    words = text.split()
    line = indent
    for word in words:
        if len(line) + len(word) + 1 > width:
            print(line)
            line = indent + word + " "
        else:
            line += word + " "
    if line.strip():
        print(line)


# ============================================================
#  ΜΕΝΟΥ ACTS
# ============================================================

def acts_menu():
    """Εμφάνισε τις πράξεις του Diablo 2."""
    clear_ish()
    print_divider("~")
    print("  🗺️  ΠΡΑΞΕΙΣ ΤΟΥ DIABLO 2  🗺️")
    print_divider("~")
    print()
    print("  Διάλεξε μια Πράξη για να μάθεις:")
    print()

    for act in ACTS:
        print(f"    {act['number']}. {act['name']}")

    print()
    print("  Β. Πίσω στο κύριο μενού")
    print()

    choice = input("  Επιλογή: ").strip().upper()

    if choice in ('B', 'Β'):
        return

    try:
        index = int(choice) - 1
        if 0 <= index < len(ACTS):
            act = ACTS[index]
            clear_ish()
            print_divider("-")
            print(f"  🗺️  {act['name'].upper()}")
            print_divider("-")
            print()
            print(f"  📍 Τοποθεσία: {act['location']}")
            print(f"  👹 Αρχηγός:   {act['boss']}")
            print()
            wrap_print(act['description'])
            print()
            print(f"  💡 Fun fact: {act['fun_fact']}")
            print()
            beep(act['sound'], 400)
            print_divider("-")
        else:
            print("  Λανθασμένος αριθμός!")
    except ValueError:
        print("  Γράψε έναν αριθμό!")

    print()
    input("  Πάτα ENTER για να συνεχίσεις...")


# ============================================================
#  ΜΕΝΟΥ ΚΛΑΣΕΩΝ
# ============================================================

def classes_menu():
    """Εμφάνισε τις κλάσεις ηρώων."""
    clear_ish()
    print_divider("~")
    print("  ⚔️  ΚΛΑΣΕΙΣ ΗΡΩΩΝ  ⚔️")
    print_divider("~")
    print()
    print("  Διάλεξε μια κλάση:")
    print()

    for i, cls in enumerate(CLASSES, start=1):
        print(f"    {i}. {cls['emoji']}  {cls['name']}")

    print()
    print("  Β. Πίσω στο κύριο μενού")
    print()

    choice = input("  Επιλογή: ").strip().upper()

    if choice in ('B', 'Β'):
        return

    try:
        index = int(choice) - 1
        if 0 <= index < len(CLASSES):
            cls = CLASSES[index]
            clear_ish()
            print_divider("-")
            print(f"  {cls['emoji']}  {cls['name'].upper()}")
            print_divider("-")
            print()
            print(f"  🗡️  Όπλο:      {cls['weapon']}")
            print(f"  ✨ Ειδικότητα: {cls['specialty']}")
            print()
            wrap_print(cls['description'])
            print()
            print(f"  🌟 Cool skill: {cls['cool_skill']}")
            print()
            beep(cls['sound'], 350)
            print_divider("-")
        else:
            print("  Λανθασμένος αριθμός!")
    except ValueError:
        print("  Γράψε έναν αριθμό!")

    print()
    input("  Πάτα ENTER για να συνεχίσεις...")


# ============================================================
#  ΜΕΝΟΥ ΤΕΡΑΤΩΝ
# ============================================================

def monsters_menu():
    """Εμφάνισε τα τέρατα του Diablo 2."""
    clear_ish()
    print_divider("~")
    print("  👹  ΤΕΡΑΤΑ ΤΟΥ DIABLO 2  👹")
    print_divider("~")
    print()
    print("  Διάλεξε ένα τέρας:")
    print()

    for i, m in enumerate(MONSTERS, start=1):
        print(f"    {i}. {m['emoji']}  {m['name']}  {m['danger']}")

    print()
    print("  Β. Πίσω στο κύριο μενού")
    print()

    choice = input("  Επιλογή: ").strip().upper()

    if choice in ('B', 'Β'):
        return

    try:
        index = int(choice) - 1
        if 0 <= index < len(MONSTERS):
            m = MONSTERS[index]
            clear_ish()
            print_divider("-")
            print(f"  {m['emoji']}  {m['name'].upper()}  {m['danger']}")
            print_divider("-")
            print()
            print(f"  🏷️  Τύπος:     {m['type']}")
            print(f"  ⚡ Αδυναμία:  {m['weakness']}")
            print()
            wrap_print(m['description'])
            print_divider("-")
        else:
            print("  Λανθασμένος αριθμός!")
    except ValueError:
        print("  Γράψε έναν αριθμό!")

    print()
    input("  Πάτα ENTER για να συνεχίσεις...")


# ============================================================
#  ΜΕΝΟΥ ΑΝΤΙΚΕΙΜΕΝΩΝ
# ============================================================

def items_menu():
    """Εμφάνισε τα διάσημα αντικείμενα."""
    clear_ish()
    print_divider("~")
    print("  💎  ΘΡΥΛΙΚΑ ΑΝΤΙΚΕΙΜΕΝΑ  💎")
    print_divider("~")
    print()
    print("  Διάλεξε ένα αντικείμενο:")
    print()

    for i, item in enumerate(ITEMS, start=1):
        print(f"    {i}. {item['emoji']}  {item['name']}  ({item['type']})")

    print()
    print("  Β. Πίσω στο κύριο μενού")
    print()

    choice = input("  Επιλογή: ").strip().upper()

    if choice in ('B', 'Β'):
        return

    try:
        index = int(choice) - 1
        if 0 <= index < len(ITEMS):
            item = ITEMS[index]
            clear_ish()
            print_divider("-")
            print(f"  {item['emoji']}  {item['name'].upper()}")
            print_divider("-")
            print()
            print(f"  🏷️  Τύπος:    {item['type']}")
            print(f"  🌟 Σπανιότητα: {item['rarity']}")
            print()
            wrap_print(item['description'])
            print_divider("-")
        else:
            print("  Λανθασμένος αριθμός!")
    except ValueError:
        print("  Γράψε έναν αριθμό!")

    print()
    input("  Πάτα ENTER για να συνεχίσεις...")


# ============================================================
#  ΑΚΟΛΟΥΘΙΑ ΕΙΣΑΓΩΓΗΣ
# ============================================================

def show_intro():
    """Εμφάνισε την οθόνη καλωσορίσματος."""
    clear_ish()
    print_divider("*")
    print(DIABLO_LOGO)
    print_divider("*")
    print()

    slow_print("  Ένας κόσμος σκοταδιού σε περιμένει...", 0.04)
    print()
    time.sleep(0.6)
    slow_print("  ⚔️  DIABLO 2 — ΚΟΣΜΟΣ ΤΩΝ ΔΑΙΜΟΝΩΝ  ⚔️", 0.05)
    print()
    time.sleep(0.4)

    print(SKULL_ART)
    print()

    # Δραματικό fanfare
    print("  🔥 Η φωτιά της Κολάσεως ανάβει...")
    beep(147, 300)
    beep(165, 300)
    beep(196, 300)
    beep(147, 600)
    print()

    time.sleep(0.3)
    slow_print("  Καλωσήλθες, ηρωικέ περιπλανητή!", 0.05)
    time.sleep(0.2)
    slow_print("  Ο κόσμος του Diablo 2 σε περιμένει.", 0.05)
    time.sleep(0.2)
    slow_print("  Εξερεύνησε τις Πράξεις, τους Ήρωες και τα Τέρατα!", 0.04)
    print()
    time.sleep(0.4)

    print(FIRE_ART)
    print()
    print_divider()
    print()
    input("  Πάτα ENTER για να ξεκινήσεις, γενναίε ήρωα...")


# ============================================================
#  ΚΥΡΙΟΣ ΒΡΟΧΟΣ
# ============================================================

def main():
    """Κύριος βρόχος — εμφανίζει το μενού Diablo 2."""
    show_intro()

    while True:
        clear_ish()
        print_divider("=")
        print("  ⚔️  DIABLO 2 — ΚΟΣΜΟΣ ΤΩΝ ΔΑΙΜΟΝΩΝ ⚔️")
        print_divider("=")
        print()
        print(SKULL_ART)
        print()
        print("  Τι θέλεις να εξερευνήσεις;")
        print()
        print("  1. 🗺️  Μάθε για μια ΠΡΑΞΗ")
        print("  2. ⚔️  Μάθε για μια ΚΛΑΣΗ ΗΡΩΑ")
        print("  3. 👹  Μάθε για ένα ΤΕΡΑΣ")
        print("  4. 💎  Μάθε για ένα ΑΝΤΙΚΕΙΜΕΝΟ")
        print("  5. 🚪  Έξοδος (αντίο!)")
        print()
        print_divider("-")
        print("  🔥 Stay a while and listen! 🔥")
        print_divider("-")
        print()

        choice = input("  Γράψε 1-5: ").strip()

        if choice == '1':
            acts_menu()
        elif choice == '2':
            classes_menu()
        elif choice == '3':
            monsters_menu()
        elif choice == '4':
            items_menu()
        elif choice == '5':
            clear_ish()
            print_divider("*")
            print()
            slow_print("  Αντίο, γενναίε ήρωα!", 0.05)
            time.sleep(0.3)
            slow_print("  Η μάχη κατά του σκοταδιού συνεχίζεται...", 0.04)
            slow_print("  Stay a while and listen! 🔥", 0.04)
            print()
            beep(196, 200)
            beep(165, 200)
            beep(147, 400)
            print()
            print_divider("*")
            print()
            break
        else:
            print()
            print("  Λανθασμένη επιλογή! Γράψε έναν αριθμό 1-5.")
            time.sleep(1.5)


if __name__ == "__main__":
    main()
