
(() => {
  const data = Array.isArray(window.BTECH_PYQ_DATA) ? window.BTECH_PYQ_DATA : [];
  const years = ['2025-26','2024-25','2023-24'];
  const state = { year: '', semester: 0, branch: 'all', query: '' };
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  const esc = (value) => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));

  function parseQuery(){
    const p = new URLSearchParams(location.search);
    const y = p.get('year'); const s = Number(p.get('semester')); const b = p.get('branch'); const q = p.get('q');
    if(years.includes(y)) state.year = y;
    if(Number.isInteger(s) && s >= 1 && s <= 8) state.semester = s;
    if(b) state.branch = b;
    if(q) state.query = q;
  }
  function updateUrl(){
    const p = new URLSearchParams();
    if(state.year) p.set('year', state.year);
    if(state.semester) p.set('semester', String(state.semester));
    if(state.branch !== 'all') p.set('branch', state.branch);
    if(state.query) p.set('q', state.query);
    history.replaceState(null,'', `${location.pathname}${p.toString() ? '?' + p : ''}`);
  }
  function countFor(year, semester){ return data.filter(x => x.year===year && (!semester || x.semester===semester)).length; }
  function renderYears(){
    const host = $('#yearGrid');
    host.innerHTML = years.map(year => `<button class="year-card ${state.year===year?'active':''}" type="button" data-year="${year}"><strong>${year}</strong><span>AKTU B.Tech examination session</span><small>${countFor(year,0)} verified PDF papers</small></button>`).join('');
    $$('[data-year]',host).forEach(btn => btn.addEventListener('click',()=>{ state.year=btn.dataset.year; state.semester=0; state.branch='all'; state.query=''; $('#paperSearch').value=''; render(); $('#semesterStep').scrollIntoView({behavior:'smooth',block:'center'}); }));
  }
  function renderSemesters(){
    const step = $('#semesterStep');
    step.classList.toggle('hidden', !state.year);
    if(!state.year) return;
    const host = $('#semesterGrid');
    host.innerHTML = Array.from({length:8},(_,i)=>i+1).map(sem => `<button class="sem-btn ${state.semester===sem?'active':''}" type="button" data-sem="${sem}">${sem}<small>${countFor(state.year,sem)} papers</small></button>`).join('');
    $$('[data-sem]',host).forEach(btn => btn.addEventListener('click',()=>{ state.semester=Number(btn.dataset.sem); state.branch='all'; state.query=''; $('#paperSearch').value=''; render(); $('#filterStep').scrollIntoView({behavior:'smooth',block:'start'}); }));
  }
  function matchingBase(){ return data.filter(x=>x.year===state.year && x.semester===state.semester); }
  function renderBranches(){
    const base = matchingBase();
    const map = new Map(); base.forEach(x=>map.set(x.branchKey,x.branch));
    const ordered = [...map.entries()].sort((a,b)=>a[1].localeCompare(b[1]));
    if(state.branch!=='all' && !map.has(state.branch)) state.branch='all';
    const host=$('#branchChips');
    host.innerHTML = `<button class="chip ${state.branch==='all'?'active':''}" type="button" data-branch="all">All branches (${base.length})</button>` + ordered.map(([key,label])=>`<button class="chip ${state.branch===key?'active':''}" type="button" data-branch="${esc(key)}">${esc(label)} (${base.filter(x=>x.branchKey===key).length})</button>`).join('');
    $$('[data-branch]',host).forEach(btn=>btn.addEventListener('click',()=>{state.branch=btn.dataset.branch; renderBranches(); renderResults(); updateUrl();}));
  }
  function filtered(){
    const q=state.query.trim().toLowerCase();
    return matchingBase().filter(x=>(state.branch==='all'||x.branchKey===state.branch) && (!q || `${x.code} ${x.name} ${x.branch}`.toLowerCase().includes(q))).sort((a,b)=>a.code.localeCompare(b.code)||a.name.localeCompare(b.name));
  }
  function card(x){
    return `<article class="paper-card"><div class="paper-top"></div><div class="paper-body"><div class="badges"><span class="badge gold">${esc(x.year)}</span><span class="badge">${esc(x.branch)}</span><span class="badge gray">${x.pages} page${x.pages===1?'':'s'}</span></div><div class="paper-code">${esc(x.code)}</div><h3>${esc(x.name)}</h3><div class="paper-meta"><div class="meta-item"><small>Semester</small><strong>${x.semester}${x.semester===1?'st':x.semester===2?'nd':x.semester===3?'rd':'th'} Semester</strong></div><div class="meta-item"><small>PDF Size</small><strong>${esc(x.sizeLabel)}</strong></div></div></div><div class="paper-actions"><a class="btn btn-navy" href="${esc(x.page)}">View Paper</a><a class="btn btn-download" href="${esc(x.pdf)}" download>Download PDF</a></div></article>`;
  }
  function renderResults(){
    const items=filtered();
    $('#resultCount').textContent = `${items.length} paper${items.length===1?'':'s'} found`;
    $('#selectionText').textContent = state.year && state.semester ? `${state.year} • ${state.semester}${state.semester===1?'st':state.semester===2?'nd':state.semester===3?'rd':'th'} Semester` : 'Choose a session and semester';
    $('#paperGrid').innerHTML = items.length ? items.map(card).join('') : `<div class="empty" style="grid-column:1/-1"><strong>No paper matches these filters.</strong>Try another branch or clear the search box.</div>`;
  }
  function renderFilters(){
    const step=$('#filterStep'); step.classList.toggle('hidden',!(state.year&&state.semester));
    if(!(state.year&&state.semester)) return;
    renderBranches(); renderResults();
  }
  function render(){ renderYears(); renderSemesters(); renderFilters(); updateUrl(); }
  function init(){
    parseQuery();
    const search=$('#paperSearch'); search.value=state.query;
    search.addEventListener('input',()=>{state.query=search.value;renderResults();updateUrl();});
    $('#clearFilters').addEventListener('click',()=>{state.branch='all';state.query='';search.value='';renderBranches();renderResults();updateUrl();});
    $('#menuBtn')?.addEventListener('click',()=>{const nav=$('#navLinks');const open=nav.classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',String(open));});
    $$('.faq-q').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq-item').classList.toggle('open')));
    render();
  }
  document.addEventListener('DOMContentLoaded',init);
})();
