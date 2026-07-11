
document.addEventListener('DOMContentLoaded',()=>{
  const input=document.getElementById('indexSearch');
  const select=document.getElementById('indexBranch');
  const cards=[...document.querySelectorAll('.paper-card')];
  const count=document.getElementById('indexCount');
  function filter(){
    const q=input.value.trim().toLowerCase();const b=select.value;let n=0;
    cards.forEach(card=>{const ok=(!q||card.dataset.search.includes(q))&&(!b||card.dataset.branch===b);card.hidden=!ok;if(ok)n++;});
    count.textContent=`${n} paper${n===1?'':'s'} found`;
  }
  input.addEventListener('input',filter);select.addEventListener('change',filter);filter();
  document.getElementById('menuBtn')?.addEventListener('click',()=>{const nav=document.getElementById('navLinks');const open=nav.classList.toggle('open');document.getElementById('menuBtn').setAttribute('aria-expanded',String(open));});
});
