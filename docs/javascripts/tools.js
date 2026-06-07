/* ==========================================================================
   The Puppy Compass — interactive tools (no dependencies)
   Two tools share this file; each is a no-op on pages where its markup is
   absent. Re-initialised on every page via Material's `document$` observable
   so it survives instant (SPA) navigation.
   ========================================================================== */

(function () {
  "use strict";

  /* ----------------------------- helpers -------------------------------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const lbToKg = (lb) => lb * 0.45359237;
  const fmt = (n, d = 0) => Number(n).toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d });
  const addDays = (date, days) => { const d = new Date(date); d.setDate(d.getDate() + days); return d; };
  const addWeeks = (date, w) => addDays(date, w * 7);
  const niceDate = (d) =>
    d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  /* ======================================================================
     TOOL 1 — Feeding calculator
     RER = 70 * (kg ^ 0.75); puppy energy = factor * RER.
     Factor: <4 mo -> 3.0 ; 4 mo to maturity -> 2.0  (standard WSAVA values)
     Cups = kcal/day / kcal_per_cup.  Meals/day set by age.
     ====================================================================== */
  function initFeeding() {
    const root = $("#pc-feeding");
    if (!root || root.dataset.ready) return;
    root.dataset.ready = "1";

    const out = $("#pc-feeding-out", root);

    function meals(ageMonths) {
      if (ageMonths < 3) return 4;
      if (ageMonths < 6) return 3;
      return 2;
    }

    function calc() {
      const lb = parseFloat($("#pc-f-weight", root).value);
      const ageMonths = parseFloat($("#pc-f-age", root).value);
      const kcalCup = parseFloat($("#pc-f-kcal", root).value) || 380;

      if (!(lb > 0) || !(ageMonths > 0)) {
        out.className = "pc-result is-empty";
        out.innerHTML = "Enter a current weight and age to see an estimate.";
        return;
      }

      const kg = lbToKg(lb);
      const rer = 70 * Math.pow(kg, 0.75);
      const factor = ageMonths < 4 ? 3.0 : 2.0;
      const kcalDay = rer * factor;
      const cups = kcalDay / kcalCup;
      const m = meals(ageMonths);
      const cupsPerMeal = cups / m;

      out.className = "pc-result";
      out.innerHTML =
        '<div class="pc-big">' + fmt(kcalDay) + " kcal/day</div>" +
        '<div class="pc-sub">≈ <strong>' + fmt(cups, 2) + " cups/day</strong> of a " +
        fmt(kcalCup) + " kcal/cup food &nbsp;·&nbsp; split into <strong>" + m +
        " meals</strong> (~" + fmt(cupsPerMeal, 2) + " cups each)</div>" +
        '<div class="pc-disclaimer">Resting energy ' + fmt(rer) +
        " kcal × growth factor " + factor.toFixed(1) +
        " (puppies under 4 months burn ~3×; older puppies ~2×). This is a " +
        "<em>starting estimate</em>. Always begin with the feeding chart on your " +
        "food's bag, then adjust to keep your puppy at a lean body condition " +
        "(you should feel ribs easily, see a waist from above). Re-check weight " +
        "weekly and recalculate — puppies grow fast.</div>";
    }

    root.addEventListener("input", calc);
    const btn = $("#pc-f-calc", root);
    if (btn) btn.addEventListener("click", calc);
    calc();
  }

  /* ======================================================================
     TOOL 2 — Vaccine & deworming planner
     Builds a dated schedule from date of birth + projected adult size,
     following AAHA 2024 (lepto now core) and CAPC deworming cadence.
     ====================================================================== */
  function initPlanner() {
    const root = $("#pc-planner");
    if (!root || root.dataset.ready) return;
    root.dataset.ready = "1";

    const out = $("#pc-planner-out", root);

    function getDOB() {
      const dobVal = $("#pc-p-dob", root).value;
      if (dobVal) return new Date(dobVal + "T00:00:00");
      const ageWeeks = parseFloat($("#pc-p-age", root).value);
      if (ageWeeks > 0) return addWeeks(new Date(), -ageWeeks);
      return null;
    }

    function spayWindow(size) {
      // returns {earliestWeeks, discussWeeks, note}
      switch (size) {
        case "toy":   return { e: 24, d: 26, note: "Small/toy breeds: commonly around 6 months; females often spayed before the first heat (~5–6 mo)." };
        case "medium":return { e: 26, d: 39, note: "Medium breeds: roughly 6–9 months; ask your vet whether waiting closer to 12 months suits your dog." };
        case "large": return { e: 52, d: 65, note: "Large/giant breeds: wait for skeletal maturity, ~12–18 months. Early neutering raises orthopedic risk in big dogs." };
        default:      return { e: 39, d: 52, note: "Size unknown — defaulting to a cautious window. Confirm timing with your vet." };
      }
    }

    function build() {
      const dob = getDOB();
      const size = $("#pc-p-size", root).value;

      if (!dob || isNaN(dob.getTime())) {
        out.className = "pc-result is-empty";
        out.innerHTML = "Enter a date of birth (or current age in weeks) to generate the plan.";
        return;
      }

      const rows = [];
      const add = (week, what, tag, note) =>
        rows.push({ week, date: addWeeks(dob, week), what, tag, note });

      // --- Deworming: every 2 wks from wk2 to wk12, then monthly to ~6 mo
      [2, 4, 6, 8, 10, 12].forEach((w) =>
        add(w, "Deworming (broad-spectrum)", "worm",
            "Every 2 weeks until 12 weeks old — puppies are commonly born with roundworms."));
      [16, 20, 24].forEach((w) =>
        add(w, "Deworming / fecal check", "worm", "Monthly through ~6 months of age."));

      // --- Core DAPP/DHPP series: ~8, 12, 16 wks (final must be >=16 wks)
      add(8,  "DAPP / DHPP — dose 1", "core", "Distemper, adenovirus, parainfluenza, parvovirus.");
      add(12, "DAPP / DHPP — dose 2", "core", "2–4 weeks after dose 1.");
      add(16, "DAPP / DHPP — dose 3 (final)", "core", "Final puppy dose must be at 16 weeks or older.");

      // --- Leptospirosis: core since 2024; 2 doses from 12 wks
      add(12, "Leptospirosis — dose 1", "core", "Core as of the 2024 AAHA update; often combined as DHLPP.");
      add(15, "Leptospirosis — dose 2", "core", "2–4 weeks after dose 1.");

      // --- Rabies: single dose 12–16 wks (state law)
      add(16, "Rabies", "core", "Required by law in most U.S. states; timing varies locally.");

      // --- Non-core, lifestyle-based
      add(12, "Bordetella (kennel cough)", "non", "If using daycare, boarding, grooming, or classes.");
      add(12, "Canine influenza — dose 1", "non", "Two doses 2–4 wks apart; for social/boarding dogs.");
      add(12, "Lyme — dose 1", "non", "Two doses 2–4 wks apart; if in a tick-heavy region.");

      // --- Heartworm prevention can start ~8 wks, year-round
      add(8, "Start heartworm prevention", "worm", "Year-round monthly prevention; many products also cover intestinal worms.");

      // --- Boosters at ~1 year
      add(52, "1-year boosters (DAPP, lepto, rabies)", "core", "Then core vaccines every 3 years; lepto/Lyme/flu/Bordetella annually.");

      // --- Spay / neuter window
      const sw = spayWindow(size);
      add(sw.e, "Spay / neuter — earliest to discuss", "non", sw.note);

      rows.sort((a, b) => a.week - b.week || (a.tag === "core" ? -1 : 1));

      const tagLabel = { core: "Core", non: "Optional", worm: "Parasite" };
      let html =
        '<table class="pc-schedule"><thead><tr>' +
        "<th>Approx. date</th><th>Age</th><th>What</th><th>Type</th></tr></thead><tbody>";
      rows.forEach((r) => {
        html +=
          "<tr><td>" + niceDate(r.date) + "</td>" +
          "<td>" + r.week + " wks</td>" +
          '<td>' + r.what + '<div class="pc-sub">' + r.note + "</div></td>" +
          '<td><span class="pc-tag pc-tag--' + r.tag + '">' + tagLabel[r.tag] + "</span></td></tr>";
      });
      html += "</tbody></table>";

      out.className = "pc-result";
      out.innerHTML =
        '<div class="pc-sub" style="margin-bottom:.6rem">Plan generated from a birth date of <strong>' +
        niceDate(dob) + "</strong>. Dates are approximate — your vet sets the exact schedule.</div>" +
        html +
        '<div class="pc-disclaimer"><strong>Core</strong> = recommended for every dog. ' +
        "<strong>Optional</strong> = decided with your vet based on lifestyle and region. " +
        "<strong>Parasite</strong> = deworming &amp; heartworm prevention. " +
        "Puppies are not fully protected until ~1–2 weeks after the final DAPP dose at 16+ weeks — " +
        "keep socialization safe until then (see the Socializing Safely chapter). " +
        "This planner reflects AAHA 2024 U.S. guidance and is not a substitute for your vet's plan.</div>";
    }

    root.addEventListener("input", build);
    const btn = $("#pc-p-build", root);
    if (btn) btn.addEventListener("click", build);
    build();
  }

  /* ======================================================================
     TOOL 3 — Checklist progress (persists only in-memory for the session)
     ====================================================================== */
  function initChecklists() {
    document.querySelectorAll(".pc-checklist").forEach((list) => {
      if (list.dataset.ready) return;
      list.dataset.ready = "1";
      const prog = list.querySelector(".pc-progress");
      const boxes = list.querySelectorAll('input[type="checkbox"]');
      function update() {
        let done = 0;
        boxes.forEach((b) => {
          b.closest("li").classList.toggle("is-done", b.checked);
          if (b.checked) done++;
        });
        if (prog) prog.textContent = done + " of " + boxes.length + " packed ✓";
      }
      boxes.forEach((b) => b.addEventListener("change", update));
      update();
    });
  }

  /* ----------------------------- bootstrap ------------------------------ */
  function initAll() {
    initFeeding();
    initPlanner();
    initChecklists();
  }

  if (typeof window.document$ !== "undefined" && window.document$.subscribe) {
    window.document$.subscribe(initAll);     // Material instant navigation
  } else {
    document.addEventListener("DOMContentLoaded", initAll);
  }
})();
