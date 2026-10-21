# -*- coding: utf-8 -*-
# test_terminal.py — έλεγχοι για τα παιχνίδια τερματικού (common/terminal.py, jedi-game/jedi.py, diablo-game/diablo.py).
# Μόνο η standard library (unittest): δεν χρειάζεται εγκατάσταση. Ο ήχος σβήνει (SOUND_AVAILABLE = False), το
# time.sleep δεν περιμένει και το input() παίρνει έτοιμες απαντήσεις, άρα οι έλεγχοι τρέχουν σε λίγα ms.
# Run: python3 -m unittest discover -s tests -v
import importlib.util
import io
import os
import sys
import unittest
from contextlib import redirect_stdout
from unittest import mock

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(ROOT, "common"))
import terminal  # noqa: E402  # pyright: ignore[reportMissingImports]


def load_game(rel):
    """Φόρτωσε ένα παιχνίδι ως module (το main() ΔΕΝ τρέχει: είναι μέσα στο if __name__ == "__main__")."""
    name = "game_" + os.path.basename(rel).split(".")[0]
    spec = importlib.util.spec_from_file_location(name, os.path.join(ROOT, rel))
    assert spec and spec.loader, rel
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


jedi = load_game("jedi-game/jedi.py")
diablo = load_game("diablo-game/diablo.py")
BACK = ("B", "Β", "b", "β")  # λατινικό και ελληνικό «Β», μικρό ή κεφαλαίο (το μενού κάνει .upper())


class Quiet(unittest.TestCase):
    """Χωρίς ήχο, χωρίς αναμονές· το stdout πάει σε ένα buffer (self.out)."""

    def setUp(self):
        for target in (mock.patch.object(terminal, "SOUND_AVAILABLE", False), mock.patch("time.sleep")):
            target.start()
            self.addCleanup(target.stop)

    def run_with_input(self, fn, answers):
        """Τρέξε fn() με τις απαντήσεις `answers` στο input(); επιστρέφει ό,τι τυπώθηκε."""
        out = io.StringIO()
        with mock.patch("builtins.input", side_effect=list(answers)), redirect_stdout(out):
            fn()
        return out.getvalue()


class TerminalHelpers(Quiet):
    def test_print_divider(self):
        out = io.StringIO()
        with redirect_stdout(out):
            terminal.print_divider()
            terminal.print_divider("~", 10)
        self.assertEqual(out.getvalue(), "=" * 55 + "\n" + "~" * 10 + "\n")

    def test_slow_print_prints_the_whole_text(self):
        out = io.StringIO()
        with redirect_stdout(out):
            terminal.slow_print("Γεια σου Ναπολέων!", 0.5)
        self.assertEqual(out.getvalue(), "Γεια σου Ναπολέων!\n")

    def test_beep_without_sound_prints_the_note(self):
        out = io.StringIO()
        with redirect_stdout(out):
            terminal.beep(440)
            terminal.beep(262, 100, fallback="nota {hz}")
        self.assertEqual(out.getvalue(), "  ♪ (440 Hz) ♪\nnota 262\n")

    def test_beep_with_a_broken_speaker_falls_back(self):
        speaker = mock.Mock()
        speaker.Beep.side_effect = RuntimeError("no speaker")
        out = io.StringIO()
        with mock.patch.object(terminal, "SOUND_AVAILABLE", True), mock.patch.object(terminal, "winsound", speaker), \
                redirect_stdout(out):
            terminal.beep(523, 200)
        speaker.Beep.assert_called_once_with(523, 200)
        self.assertEqual(out.getvalue(), "  ♪ (523 Hz) ♪\n")

    def test_beep_with_sound_prints_nothing(self):
        speaker = mock.Mock()
        out = io.StringIO()
        with mock.patch.object(terminal, "SOUND_AVAILABLE", True), mock.patch.object(terminal, "winsound", speaker), \
                redirect_stdout(out):
            terminal.beep(330, 150)
        speaker.Beep.assert_called_once_with(330, 150)
        self.assertEqual(out.getvalue(), "")

    def test_wrap_print_keeps_every_word_and_the_width(self):
        text = " ".join(["δεινόσαυρος"] * 20)
        out = io.StringIO()
        with redirect_stdout(out):
            terminal.wrap_print(text, width=40)
        lines = out.getvalue().splitlines()
        self.assertGreater(len(lines), 1)
        for line in lines:
            self.assertTrue(line.startswith("  "))
            self.assertLessEqual(len(line.rstrip()), 40)
        self.assertEqual(" ".join(out.getvalue().split()), text)

    def test_wrap_print_empty_text_prints_nothing(self):
        out = io.StringIO()
        with redirect_stdout(out):
            terminal.wrap_print("   ")
        self.assertEqual(out.getvalue(), "")

    def test_run_game_says_goodbye_on_ctrl_c_and_closed_input(self):
        for error in (KeyboardInterrupt, EOFError):
            out = io.StringIO()
            with redirect_stdout(out):
                terminal.run_game(mock.Mock(side_effect=error), goodbye="αντίο")
            self.assertEqual(out.getvalue(), "\nαντίο\n", error.__name__)

    def test_run_game_does_not_hide_real_bugs(self):
        with self.assertRaises(ZeroDivisionError):
            terminal.run_game(lambda: 1 / 0)


class JediGame(Quiet):
    def test_data_tables_have_every_field_the_menus_use(self):
        for table in (jedi.ANIMALS, jedi.PLANTS):
            self.assertGreater(len(table), 0)
            for entry in table:
                for key in ("emoji", "name", "fact", "sound_note"):
                    self.assertIn(key, entry)
                self.assertIsInstance(entry["sound_note"], int)
        for name, freq in jedi.MUSIC_NOTES:
            self.assertTrue(name)
            self.assertTrue(37 <= freq <= 32767, "winsound.Beep accepts 37..32767 Hz")

    def test_every_animal_and_plant_number_shows_its_fact(self):
        for menu, table in ((jedi.animal_menu, jedi.ANIMALS), (jedi.plant_menu, jedi.PLANTS)):
            for i, entry in enumerate(table, start=1):
                out = self.run_with_input(menu, [str(i), ""])
                self.assertIn(entry["name"].upper(), out, f"{menu.__name__} {i}")

    def test_every_music_choice_plays(self):
        for i, (name, _freq) in enumerate(jedi.MUSIC_NOTES, start=1):
            self.assertIn(f"Παίζω {name}", self.run_with_input(jedi.play_music_menu, [str(i), ""]))
        self.assertIn("Υπέροχο", self.run_with_input(jedi.play_music_menu, ["9", ""]))
        self.assertIn("Star Wars", self.run_with_input(jedi.play_music_menu, ["0", ""]))

    def test_back_and_wrong_answers_never_crash(self):
        for menu in (jedi.animal_menu, jedi.plant_menu, jedi.play_music_menu):
            for back in BACK:
                self.run_with_input(menu, [back])  # επιστροφή χωρίς «Πάτα ENTER»
            for wrong in ("999", "-1", "γάτα", ""):
                self.run_with_input(menu, [wrong, ""])

    def test_main_menu_maps_every_choice_to_its_handler(self):
        handlers = {"1": "animal_menu", "2": "plant_menu", "3": "play_music_menu"}
        mocks = {name: mock.Mock() for name in handlers.values()}
        with mock.patch.multiple(jedi, **mocks):
            out = self.run_with_input(jedi.main, ["", "1", "2", "3", "xyz", "4"])
        for name in handlers.values():
            mocks[name].assert_called_once_with()
        self.assertIn("Δοκίμασε να γράψεις 1, 2, 3, ή 4", out)
        self.assertIn("Αντίο, Padawan Ναπολέων!", out)


class DiabloGame(Quiet):
    MENUS = (
        ("acts_menu", "ACTS"),
        ("classes_menu", "CLASSES"),
        ("monsters_menu", "MONSTERS"),
        ("items_menu", "ITEMS"),
    )

    def test_every_number_of_every_menu_shows_its_entry(self):
        for menu_name, table_name in self.MENUS:
            table = getattr(diablo, table_name)
            self.assertGreater(len(table), 0, table_name)
            for i, entry in enumerate(table, start=1):
                out = self.run_with_input(getattr(diablo, menu_name), [str(i), ""])
                self.assertIn(entry["name"].upper(), out, f"{menu_name} {i}")

    def test_back_and_wrong_answers_never_crash(self):
        for menu_name, _ in self.MENUS:
            menu = getattr(diablo, menu_name)
            for back in BACK:
                self.run_with_input(menu, [back])
            for wrong in ("999", "0", "δράκος", ""):
                self.run_with_input(menu, [wrong, ""])

    def test_main_menu_maps_every_choice_to_its_handler(self):
        handlers = {"1": "acts_menu", "2": "classes_menu", "3": "monsters_menu", "4": "items_menu"}
        mocks = {name: mock.Mock() for name in handlers.values()}
        with mock.patch.multiple(diablo, **mocks):
            out = self.run_with_input(diablo.main, ["", "1", "2", "3", "4", "6", "5"])
        for name in handlers.values():
            mocks[name].assert_called_once_with()
        self.assertIn("Λανθασμένη επιλογή!", out)
        self.assertIn("Αντίο, γενναίε ήρωα!", out)


if __name__ == "__main__":
    unittest.main()
