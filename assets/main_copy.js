/* Mobile nav toggle */
(function(){
  const burger=document.querySelector('.burger');
  const mnav=document.querySelector('.mobile-nav');
  if(burger&&mnav){
    burger.addEventListener('click',()=>{
      mnav.classList.toggle('open');
      burger.classList.toggle('active');
      document.body.style.overflow=mnav.classList.contains('open')?'hidden':'';
    });
    mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      mnav.classList.remove('open');burger.classList.remove('active');document.body.style.overflow='';
    }));
  }
})();

/* Scroll reveal */
(function(){
  const els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'));return;}
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  els.forEach(e=>io.observe(e));
})();

/* Animated counters */
(function(){
  const nums=document.querySelectorAll('[data-count]');
  if(!nums.length)return;
  const run=(el)=>{
    const target=parseFloat(el.dataset.count);
    const dec=(el.dataset.dec|0);
    const dur=1400;const t0=performance.now();
    const tick=(t)=>{
      const p=Math.min((t-t0)/dur,1);
      const eased=1-Math.pow(1-p,3);
      const val=target*eased;
      el.textContent=dec?val.toFixed(dec):Math.round(val).toString();
      if(p<1)requestAnimationFrame(tick);else el.textContent=dec?target.toFixed(dec):target;
    };
    requestAnimationFrame(tick);
  };
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){run(e.target);io.unobserve(e.target);}});
  },{threshold:.5});
  nums.forEach(n=>io.observe(n));
})();

/* Gallery filter */
(function(){
  const btns=document.querySelectorAll('.filters button');
  const items=document.querySelectorAll('.gitem');
  if(!btns.length)return;
  btns.forEach(b=>b.addEventListener('click',()=>{
    btns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const f=b.dataset.filter;
    items.forEach(it=>{
      const cats=(it.dataset.cat||'').split('|');
      it.classList.toggle('hide',!(f==='all'||cats.includes(f)));
    });
  }));
})();

/* Header border on scroll */
(function(){
  const h=document.querySelector('header.site');
  if(!h)return;
  const onScroll=()=>{h.style.borderBottomColor=window.scrollY>10?'rgba(255,122,24,.25)':'rgba(255,255,255,.08)';};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
})();

/* Contact form (front-end only demo) */
(function(){
  const f=document.getElementById('quoteForm');
  if(!f)return;
  f.addEventListener('submit',(e)=>{
    e.preventDefault();
    const btn=f.querySelector('button[type=submit]');
    const orig=btn.textContent;
    btn.textContent='Sent ✓';btn.disabled=true;
    f.reset();
    setTimeout(()=>{btn.textContent=orig;btn.disabled=false;},2600);
  });
})();

/* Tabs (machineries) */
(function(){
  const nav=document.querySelector('.tabs-nav');
  if(!nav)return;
  const btns=nav.querySelectorAll('button');
  const panels=document.querySelectorAll('.tab-panel');
  btns.forEach(b=>b.addEventListener('click',()=>{
    btns.forEach(x=>x.classList.remove('active'));
    panels.forEach(p=>p.classList.remove('active'));
    b.classList.add('active');
    const t=document.getElementById(b.dataset.tab);
    if(t)t.classList.add('active');
  }));
})();

/* Job accordion */
(function(){
  const jobs=document.querySelectorAll('.job');
  if(!jobs.length)return;
  jobs.forEach(j=>{
    const head=j.querySelector('.jhead');
    const body=j.querySelector('.jbody');
    head.addEventListener('click',()=>{
      const isOpen=j.classList.contains('open');
      jobs.forEach(other=>{
        other.classList.remove('open');
        other.querySelector('.jbody').style.maxHeight=null;
      });
      if(!isOpen){
        j.classList.add('open');
        body.style.maxHeight=body.scrollHeight+'px';
      }
    });
  });
})();


