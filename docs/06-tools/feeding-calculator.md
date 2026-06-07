# Feeding calculator

Enter your puppy's current weight and age to get a daily calorie estimate, the equivalent in cups for your food, and how many meals to split it into. For the full explanation of *what* and *how often* to feed, see the [Feeding chapter](../02-first-weeks/feeding.md).

<div id="pc-feeding" class="pc-widget" markdown>

### Daily food estimator

<div class="pc-row">
<div class="pc-field">
<label for="pc-f-weight">Current weight <span class="pc-hint">(lb)</span></label>
<input id="pc-f-weight" class="pc-input" type="number" min="0" step="0.1" placeholder="e.g. 12">
</div>
<div class="pc-field">
<label for="pc-f-age">Current age <span class="pc-hint">(months)</span></label>
<input id="pc-f-age" class="pc-input" type="number" min="0" step="0.5" placeholder="e.g. 4">
</div>
<div class="pc-field">
<label for="pc-f-kcal">Food energy <span class="pc-hint">(kcal/cup — on the bag)</span></label>
<input id="pc-f-kcal" class="pc-input" type="number" min="1" step="1" value="380">
</div>
</div>

<div class="pc-actions">
<button id="pc-f-calc" class="pc-btn" type="button">Estimate</button>
</div>

<div id="pc-feeding-out" class="pc-result is-empty">Enter a current weight and age to see an estimate.</div>

</div>

!!! tip "Getting the most accurate result"
    - Find your food's **kcal/cup** on the bag (often in the small print or
      feeding-guide section) and enter it — calorie density varies a lot
      between foods.
    - **Re-check weekly.** Puppies grow fast, so the right amount changes
      quickly. Adjust to keep your puppy lean (ribs easily felt, visible
      waist).
    - For **large-breed puppies**, pair this with a **large-breed puppy food**
      and lean toward the lower end — controlled growth protects their joints.

!!! warning "This is an estimate, not a prescription"
    Always start from the **feeding chart on your food's bag** (matched to that
    food) and confirm with your vet, especially for very small/toy breeds, very
    large breeds, or any puppy with a health condition.
