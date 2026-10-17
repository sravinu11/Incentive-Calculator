'use strict';

/* ========== SEPTEMBER 2026 DATA (from SEC Incentive Scheme PDFs) ========== */

// Monthly Smartphone – rates by Dealer Price slab
// Labels order: All 5G (7 slabs) + Other M&F (7 slabs) + GFE Booster
const phoneLabels = [
  'All 5G ≥100K','All 5G 70-<100K','All 5G 40-<70K','All 5G 30-<40K',
  'All 5G 20-<30K','All 5G 15-<20K','All 5G 10-<15K',
  'Other M&F ≥100K','Other M&F 70-<100K','Other M&F 40-<70K','Other M&F 30-<40K',
  'Other M&F 20-<30K','Other M&F 15-<20K','Other M&F 10-<15K',
  'GFE Booster (FF8 & S26)'
];
const phoneRates = [600,550,400,250,150,50,30, 300,275,200,125,75,25,15, 200];

// Awesome Focus Models (replaces Festive)
const focusLabels = ['A07 5G','A17','A27'];
const focusRatesSlab1 = [25,50,100];   // 110 – <120%
const focusRatesSlab2 = [35,75,150];   // 120% & above

// Tablet
const tabletLabels = ['S11 Ultra, S11, S10 Plus','S10 FE & FE+','S10 Lite','A11 Plus','A11 & Other Tablets'];
const tabletRates  = [1500,1000,800,400,300];
const tabletBonus  = [2500,1500,1250,750,500];

// Wearable
const wearableLabels = [
  'Watch Ultra 2','Watch 9 Series','Watch Ultra & Watch 8 Classic','Watch 8',
  'Other Watches','Buds 4 Pro','Buds 4 & Buds3 Pro','Buds3 & FE','Other Buds'
];
const wearableRates = [1500,1200,1000,600,500,600,500,300,200];
const wearableBonus = [2500,2000,1800,1000,800,750,500,300,200];

// Note PC
const pcLabels = [
  'GB6 Pro | GB6 Ultra | GB5 Pro | GB5 Pro 360','GB6','GB5 360',
  'GB5 | GB3 360 | GB4 C7','GB4 Edge | GB4 C5 | GB4 360','Other Models'
];
const pcRates = [3000,2500,2000,1500,1000,750];

const sum = a => a.reduce((x,y) => x+y, 0);
const weighted = (a,r) => sum(a.map((v,i) => v * r[i]));
const money = v => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0,minimumFractionDigits:0}).format(v||0);

function field(id,label,cell,value){
  return '<label for="'+id+'"><span>'+label+'<small>'+cell+'</small></span><input id="'+id+'" type="number" min="0" step="any" inputmode="decimal" value="'+value+'"></label>';
}

/* ========== BUILD SECTIONS (same visual structure as original) ========== */
document.getElementById('sections').innerHTML = [

/* ---- 01 Monthly Smartphone ---- */
`<section class="card">
<div class="heading"><div><small>01</small><h2>Monthly Smartphone Incentive</h2>
<p>1–30 September 2026 · 5G models only · Max ₹75,000 (with Wearable)</p></div>
<output id="amount-monthly"></output></div>
<div class="fields" style="grid-template-columns:repeat(4,minmax(0,1fr))">
${field('m-target','Volume Target','C6',100)}
${field('m-val-target','Value Target (Lac)','C7',10)}
${field('m-vol-ach','Volume Achieved','D6',0)}
${field('m-val-ach','Value Achieved (Lac)','D7',0)}
</div>
<p style="padding:4px 12px;margin:0;font-size:11px;color:#476b8b">Enter units sold in each Dealer Price slab. GFE Booster = extra ₹200/unit for FF8 &amp; S26 under GFE.</p>
<div class="fields" style="grid-template-columns:repeat(4,minmax(0,1fr))">
${phoneLabels.map((l,i)=>field('ph-'+i,l,'P'+(i+1),0)).join('')}
</div>
<details class="calculation"><summary>Calculation details</summary><p class="detail" id="detail-monthly"></p></details>
<details><summary>Rates &amp; Eligibility (Sep 2026)</summary>
<p class="detail">• Min Gate by store type (Exclusive 30u/12L · RRF 30u/10L · PC&amp;SCP 35u/12L · SIS Pro 28u/8L · SIS+ &amp; below 25u/6L)<br>
• Qualification: best of Volume % or Value % ≥80%<br>
• Payout %: ≥100% → 100% · 80–&lt;100% → same as achievement · &lt;80% → 0<br>
• Multiplier (only at ≥100%): Master &amp; Champion ×1.2 · Expert Plus ×1.1 · Expert ×1.0<br>
• Max (Smartphone + Wearable) = ₹75,000</p>
<div class="scroll"><table>
<thead><tr><th>Dealer Price</th><th>≥100K</th><th>70–&lt;100K</th><th>40–&lt;70K</th><th>30–&lt;40K</th><th>20–&lt;30K</th><th>15–&lt;20K</th><th>10–&lt;15K</th></tr></thead>
<tbody>
<tr><th>All 5G Smartphones</th><td>₹600</td><td>₹550</td><td>₹400</td><td>₹250</td><td>₹150</td><td>₹50</td><td>₹30</td></tr>
<tr><th>Other M&amp;F Series</th><td>₹300</td><td>₹275</td><td>₹200</td><td>₹125</td><td>₹75</td><td>₹25</td><td>₹15</td></tr>
</tbody></table></div>
</details>
</section>`,

/* ---- 02 Awesome Focus Models (was Festive) ---- */
`<section class="card">
<div class="heading"><div><small>02</small><h2>Awesome Focus Models Incentive</h2>
<p>1–30 September 2026 · A07 5G, A17 &amp; A27 · Max ₹15,000 · Over &amp; above monthly</p></div>
<output id="amount-focus"></output></div>
<div class="fields">
${field('f-target','Focus Models Target','C10',50)}
${focusLabels.map((l,i)=>field('f-'+i,l+' sold','F'+(i+1),0)).join('')}
</div>
<details class="calculation"><summary>Calculation details</summary><p class="detail" id="detail-focus"></p></details>
<details><summary>Awesome Focus rates &amp; rules</summary>
<p class="detail">• Min Gate: 10 units (Slab 1) / 12 units (Slab 2)<br>
• Linked with overall SEC Volume target achievement %<br>
• 110 – &lt;120% → Slab 1 · 120% &amp; above → Slab 2<br>
• Paid even if monthly scheme not qualified<br>
• Max ₹15,000 per SEC</p>
<div class="scroll"><table>
<thead><tr><th>Vol Achievement</th><th>Slab</th><th>A07 5G</th><th>A17</th><th>A27</th></tr></thead>
<tbody>
<tr><td>110 – &lt;120%</td><td>Slab 1</td><td>₹25</td><td>₹50</td><td>₹100</td></tr>
<tr><td>120% &amp; above</td><td>Slab 2</td><td>₹35</td><td>₹75</td><td>₹150</td></tr>
</tbody></table></div>
</details>
</section>`,

/* ---- 03 Tablet ---- */
`<section class="card">
<div class="heading"><div><small>03</small><h2>Galaxy Tablet Incentive</h2>
<p>1–30 September 2026 · Max ₹25,000 (with Wearable) extra</p></div>
<output id="amount-tablet"></output></div>
<div class="fields">
${field('t-bonus','Eligible for Bonus? (1=Yes)','B1',0)}
${tabletLabels.map((l,i)=>field('t-'+i,l,'T'+(i+1),0)).join('')}
</div>
<details class="calculation"><summary>Calculation details</summary><p class="detail" id="detail-tablet"></p></details>
<details><summary>Tablet rates &amp; Bonus</summary>
<p class="detail">*Bonus → SECs with zero Tab/Watch/Buds sell-out in last 2 months get Bonus on the <strong>1st unit</strong> (highest value product if multiple same day).</p>
<div class="scroll"><table>
<thead><tr><th>Galaxy Tablets</th><th>Incentive / Unit</th><th>Bonus Incentive*</th></tr></thead>
<tbody>
<tr><td>S11 Ultra, S11, S10 Plus</td><td>₹1,500</td><td>₹2,500</td></tr>
<tr><td>S10 FE &amp; FE+</td><td>₹1,000</td><td>₹1,500</td></tr>
<tr><td>S10 Lite</td><td>₹800</td><td>₹1,250</td></tr>
<tr><td>A11 Plus</td><td>₹400</td><td>₹750</td></tr>
<tr><td>A11 &amp; Other Tablets</td><td>₹300</td><td>₹500</td></tr>
</tbody></table></div>
</details>
</section>`,

/* ---- 04 Wearable ---- */
`<section class="card">
<div class="heading"><div><small>04</small><h2>Wearable Incentive</h2>
<p>1–30 September 2026 · Max ₹25,000 (with Tablet) extra</p></div>
<output id="amount-wearable"></output></div>
<div class="fields">
${field('w-bonus','Eligible for Bonus? (1=Yes)','B2',0)}
${wearableLabels.map((l,i)=>field('w-'+i,l,'W'+(i+1),0)).join('')}
</div>
<details class="calculation"><summary>Calculation details</summary><p class="detail" id="detail-wearable"></p></details>
<details><summary>Wearable rates &amp; Bonus</summary>
<div class="scroll"><table>
<thead><tr><th>Model</th><th>Incentive / Unit</th><th>Bonus Incentive*</th></tr></thead>
<tbody>
<tr><td>Watch Ultra 2</td><td>₹1,500</td><td>₹2,500</td></tr>
<tr><td>Watch 9 Series</td><td>₹1,200</td><td>₹2,000</td></tr>
<tr><td>Watch Ultra &amp; Watch 8 Classic</td><td>₹1,000</td><td>₹1,800</td></tr>
<tr><td>Watch 8</td><td>₹600</td><td>₹1,000</td></tr>
<tr><td>Other Watches</td><td>₹500</td><td>₹800</td></tr>
<tr><td>Buds 4 Pro</td><td>₹600</td><td>₹750</td></tr>
<tr><td>Buds 4 &amp; Buds3 Pro</td><td>₹500</td><td>₹500</td></tr>
<tr><td>Buds3 &amp; FE</td><td>₹300</td><td>₹300</td></tr>
<tr><td>Other Buds</td><td>₹200</td><td>₹200</td></tr>
</tbody></table></div>
</details>
</section>`,

/* ---- 05 Note PC ---- */
`<section class="card">
<div class="heading"><div><small>05</small><h2>Note PC Incentive</h2>
<p>1–30 September 2026 · Flat per unit · Max ₹50,000 extra · No target / min gate</p></div>
<output id="amount-pc"></output></div>
<div class="fields">
${pcLabels.map((l,i)=>field('pc-'+i,l,'N'+(i+1),0)).join('')}
</div>
<details class="calculation"><summary>Calculation details</summary><p class="detail" id="detail-pc"></p></details>
<details><summary>Note PC rates</summary>
<div class="scroll"><table>
<thead><tr><th>Galaxy Note PC</th><th>Incentive / Unit</th></tr></thead>
<tbody>
<tr><td>GB6 Pro | GB6 Ultra | GB5 Pro | GB5 Pro 360</td><td>₹3,000</td></tr>
<tr><td>GB6</td><td>₹2,500</td></tr>
<tr><td>GB5 360</td><td>₹2,000</td></tr>
<tr><td>GB5 | GB3 360 | GB4 C7</td><td>₹1,500</td></tr>
<tr><td>GB4 Edge | GB4 C5 | GB4 360</td><td>₹1,000</td></tr>
<tr><td>Other Models</td><td>₹750</td></tr>
</tbody></table></div>
</details>
</section>`

].join('');

/* ========== READ & CALCULATE ========== */
function read(id){
  const e = document.getElementById(id);
  if(!e) return 0;
  const v = e.value === '' ? 0 : Number(e.value);
  const ok = !e.validity.badInput && Number.isFinite(v) && v >= 0;
  e.setAttribute('aria-invalid', String(!ok));
  return ok ? v : NaN;
}

function calcMonthly(){
  const tVol = read('m-target'), tVal = read('m-val-target');
  const aVol = read('m-vol-ach'), aVal = read('m-val-ach');
  const units = phoneLabels.map((_,i) => read('ph-'+i));
  if([tVol,tVal,aVol,aVal,...units].some(Number.isNaN)) return {amount:null,text:'Check highlighted inputs.'};

  const base = weighted(units, phoneRates);
  const level = document.getElementById('level').value;
  const mult = level === 'Master & Champion' ? 1.2 : level === 'Expert Plus' ? 1.1 : 1.0;

  const volPct = tVol > 0 ? (aVol / tVol) * 100 : 0;
  const valPct = tVal > 0 ? (aVal / tVal) * 100 : 0;
  const best = Math.max(volPct, valPct);

  let payoutPct = 0;
  if(best >= 100) payoutPct = 100;
  else if(best >= 80) payoutPct = best;

  const finalMult = best >= 100 ? mult : 1;
  const amount = Math.round(base * (payoutPct/100) * finalMult);

  return {
    amount,
    text: `Base ${money(base)} · Best ach ${best.toFixed(1)}% (Vol ${volPct.toFixed(1)}% / Val ${valPct.toFixed(1)}%) · Payout ${payoutPct.toFixed(1)}% · ×${finalMult} → ${money(amount)}` +
      (payoutPct === 0 ? ' · Below 80% → No payout' : '')
  };
}

function calcFocus(){
  const target = read('f-target');
  const sold = focusLabels.map((_,i) => read('f-'+i));
  if([target,...sold].some(Number.isNaN)) return {amount:null,text:'Check highlighted inputs.'};
  const volume = sum(sold);
  if(target === 0) return {amount:0,text:'Enter focus models target.'};

  // Use monthly volume achievement for overall %
  const mTarget = read('m-target') || 1;
  const mAch = read('m-vol-ach') || 0;
  const overallPct = (mAch / mTarget) * 100;

  let rates = null, slab = 'None';
  if(overallPct >= 120 && volume >= 12){ rates = focusRatesSlab2; slab = 'Slab 2 (120%+)'; }
  else if(overallPct >= 110 && volume >= 10){ rates = focusRatesSlab1; slab = 'Slab 1 (110–<120%)'; }

  const amount = rates ? Math.min(weighted(sold, rates), 15000) : 0;
  return {
    amount,
    text: rates
      ? `${volume} focus units · Overall ${overallPct.toFixed(1)}% → ${slab} · ${money(amount)} (max ₹15k)`
      : `${volume} focus units · Overall ${overallPct.toFixed(1)}% · Min gate / slab not met → ₹0`
  };
}

function calcTablet(){
  const units = tabletLabels.map((_,i) => read('t-'+i));
  const bonusEl = read('t-bonus') >= 1;
  if(units.some(Number.isNaN)) return {amount:null,text:'Check highlighted inputs.'};
  let base = weighted(units, tabletRates);
  let bonus = 0;
  if(bonusEl && sum(units) > 0){
    const idx = tabletBonus.reduce((b,v,i) => units[i]>0 && v>tabletBonus[b] ? i : b, 0);
    if(units[idx] > 0) bonus = tabletBonus[idx];
  }
  return {amount: base+bonus, text: `${sum(units)} tablets · Base ${money(base)}${bonus?' + Bonus '+money(bonus):''} = ${money(base+bonus)}`};
}

function calcWearable(){
  const units = wearableLabels.map((_,i) => read('w-'+i));
  const bonusEl = read('w-bonus') >= 1;
  if(units.some(Number.isNaN)) return {amount:null,text:'Check highlighted inputs.'};
  let base = weighted(units, wearableRates);
  let bonus = 0;
  if(bonusEl && sum(units) > 0){
    const idx = wearableBonus.reduce((b,v,i) => units[i]>0 && v>wearableBonus[b] ? i : b, 0);
    if(units[idx] > 0) bonus = wearableBonus[idx];
  }
  return {amount: base+bonus, text: `${sum(units)} wearables · Base ${money(base)}${bonus?' + Bonus '+money(bonus):''} = ${money(base+bonus)}`};
}

function calcPC(){
  const units = pcLabels.map((_,i) => read('pc-'+i));
  if(units.some(Number.isNaN)) return {amount:null,text:'Check highlighted inputs.'};
  const amount = Math.min(weighted(units, pcRates), 50000);
  return {amount, text: `${sum(units)} Note PCs · ${money(amount)} (capped ₹50k)`};
}

function update(){
  let total = 0, invalid = false;
  const parts = [
    ['monthly', calcMonthly()],
    ['focus', calcFocus()],
    ['tablet', calcTablet()],
    ['wearable', calcWearable()],
    ['pc', calcPC()]
  ];
  for(const [id, r] of parts){
    document.getElementById('amount-'+id).textContent = r.amount === null ? 'Invalid' : money(r.amount);
    document.getElementById('detail-'+id).textContent = r.text;
    if(r.amount === null) invalid = true;
    else total += r.amount;
  }
  document.getElementById('error').hidden = !invalid;
  document.getElementById('total').textContent = invalid ? 'Check inputs' : money(total);
}

function load(clear){
  document.querySelectorAll('input[type="number"]').forEach(el => el.value = 0);
  document.getElementById('level').value = 'Master & Champion';
  document.getElementById('m-target').value = 100;
  document.getElementById('m-val-target').value = 10;
  document.getElementById('f-target').value = 50;
  if(!clear){
    // keep zeros
  }
  update();
}

document.addEventListener('input', update);
document.getElementById('level').addEventListener('change', update);
document.getElementById('reset').addEventListener('click', () => load(true));
update();
