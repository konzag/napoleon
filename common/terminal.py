# -*- coding: utf-8 -*-
# ============================================================
#  terminal.py — Κοινές βοηθητικές συναρτήσεις για τα παιχνίδια
#  τερματικού του Ναπολέων (jedi.py και diablo.py).
#
#  Γεια σου Ναπολέων! Αντί να γράφουμε τον ίδιο κώδικα δύο φορές
#  (μία στο jedi.py και μία στο diablo.py), τον γράφουμε ΜΙΑ φορά
#  εδώ και τα δύο παιχνίδια τον «δανείζονται» με την εντολή import.
#  Έτσι, αν διορθώσουμε κάτι εδώ, διορθώνεται και στα δύο!
# ============================================================

import sys
import time

# Προσπαθούμε να φορτώσουμε το winsound (υπάρχει μόνο στα Windows).
# Αν δεν υπάρχει, απλώς γράφουμε τη νότα στην οθόνη αντί να την παίξουμε.
try:
    import winsound
    SOUND_AVAILABLE = True
except ImportError:
    winsound = None
    SOUND_AVAILABLE = False


def clear_ish():
    """Εκτύπωσε μερικές κενές γραμμές για εφέ «καθαρής οθόνης»."""
    print("\n" * 2)


def print_divider(char="=", width=55):
    """Εκτύπωσε μια διακοσμητική γραμμή στην οθόνη."""
    print(char * width)


def slow_print(text, delay=0.03):
    """Εκτύπωσε κείμενο ένα γράμμα τη φορά — σαν το text crawl του Star Wars!"""
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()


def beep(frequency, duration_ms=300, fallback="  ♪ ({hz} Hz) ♪"):
    """Παίξε έναν ήχο από το ηχείο του υπολογιστή.

    Αν ο υπολογιστής δεν μπορεί να παίξει ήχο, γράφουμε το μήνυμα
    `fallback` στην οθόνη ({hz} = η συχνότητα της νότας).
    """
    if SOUND_AVAILABLE:
        try:
            winsound.Beep(frequency, duration_ms)
            return
        except RuntimeError:
            # Μερικοί υπολογιστές δεν έχουν ηχείο — δεν πειράζει!
            pass
    print(fallback.format(hz=frequency))


def wrap_print(text, indent="  ", width=56):
    """Εκτύπωσε κείμενο με αναδίπλωση γραμμής (σπάει τις μεγάλες γραμμές)."""
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


def run_game(main, goodbye="  Αντίο, Ναπολέων! 👋"):
    """Τρέξε το παιχνίδι με ασφάλεια.

    Αν πατήσεις Ctrl+C (KeyboardInterrupt) ή κλείσει η είσοδος
    (EOFError), αντί για ένα τρομακτικό μήνυμα λάθους λέμε απλώς αντίο.
    """
    try:
        main()
    except (KeyboardInterrupt, EOFError):
        print()
        print(goodbye)
