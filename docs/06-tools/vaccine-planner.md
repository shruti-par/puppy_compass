# Vaccine & deworming planner

Enter your puppy's **date of birth** (or current age) and projected **adult size**, and this builds an approximate, dated schedule of core vaccines, deworming, heartworm prevention, and a size-based spay/neuter window. Bring it to your vet to confirm. The full explanation lives in the [Vaccines chapter](../02-first-weeks/vaccines.md).

<div id="pc-planner" class="pc-widget" markdown>

### Build your schedule

<div class="pc-row">
<div class="pc-field">
<label for="pc-p-dob">Date of birth</label>
<input id="pc-p-dob" class="pc-input" type="date">
</div>
<div class="pc-field">
<label for="pc-p-age">…or current age <span class="pc-hint">(weeks)</span></label>
<input id="pc-p-age" class="pc-input" type="number" min="0" step="1" placeholder="e.g. 10">
</div>
<div class="pc-field">
<label for="pc-p-size">Projected adult size</label>
<select id="pc-p-size" class="pc-select">
<option value="toy">Small / toy (under ~25 lb)</option>
<option value="medium" selected>Medium (25–50 lb)</option>
<option value="large">Large / giant (over ~50 lb)</option>
</select>
</div>
</div>

<div class="pc-actions">
<button id="pc-p-build" class="pc-btn" type="button">Generate plan</button>
</div>

<div id="pc-planner-out" class="pc-result is-empty">Enter a date of birth (or current age in weeks) to generate the plan.</div>

</div>

!!! note "How to read it"
    - **Core** items are recommended for every dog; **Optional** items are
      lifestyle/region choices to discuss with your vet; **Parasite** items are
      deworming and heartworm prevention.
    - Dates are **approximate**. Your vet sets the exact schedule based on your
      puppy, your region, and local rabies law.
    - The **spay/neuter** row is an *earliest-to-discuss* point based on size —
      large/giant breeds generally wait for skeletal maturity (~12–18 months).
      See [Spay & neuter timing](../04-growing-up/spay-neuter.md).

!!! warning "Safe socialization during the series"
    Your puppy isn't fully protected until ~1–2 weeks after the final DAPP dose
    at 16+ weeks. Keep socialization **safe** (not absent) in the meantime —
    see [Socializing safely](../03-foundations/socialization.md).
