// ============================================================
//  storage.js — Ασφαλής αποθήκευση για όλα τα παιχνίδια του Ναπολέων
//
//  Γεια σου Ναπολέων! Ο browser έχει ένα μικρό «συρτάρι» που λέγεται
//  localStorage, όπου τα παιχνίδια κρατάνε την πρόοδό σου.
//  Μερικές φορές όμως το συρτάρι:
//    - είναι κλειδωμένο (π.χ. σε ιδιωτικό παράθυρο),
//    - είναι γεμάτο (QuotaExceededError),
//    - έχει μέσα χαλασμένα δεδομένα.
//  Αυτές οι συναρτήσεις δοκιμάζουν προσεκτικά (try/catch) και, αν κάτι
//  πάει στραβά, το παιχνίδι συνεχίζει κανονικά αντί να «σπάσει».
// ============================================================

(function () {
  'use strict';

  // Διάβασε μια τιμή και μετάτρεψέ την από JSON.
  // Αν λείπει ή είναι χαλασμένη, δώσε πίσω την τιμή `fallback`.
  function readJson(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return fallback;
      const value = JSON.parse(raw);
      return value === null || value === undefined ? fallback : value;
    } catch (e) {
      return fallback;
    }
  }

  // Γράψε μια τιμή ως JSON. Επιστρέφει true αν πέτυχε, false αν όχι.
  function writeJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      // Συνήθως σημαίνει ότι το συρτάρι γέμισε ή είναι κλειδωμένο.
      console.warn('Δεν μπόρεσα να αποθηκεύσω το', key, e);
      return false;
    }
  }

  // Τα κάνουμε διαθέσιμα σε όλα τα παιχνίδια ως NapoleonStorage.readJson / writeJson.
  window.NapoleonStorage = { readJson: readJson, writeJson: writeJson };
})();
