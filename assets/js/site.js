// Extend site.js with RSVP behavior and smooth scroll

// preserve existing search index code
async function loadSearchIndex(){
  try{
    const res = await fetch('/search.json');
    if(!res.ok) return;
    const idx = await res.json();
    window._searchIndex = idx;
  }catch(e){console.warn('Search index not available')}
}

function initSearch(){
  const input = document.getElementById('search-input');
  if(!input) return;
  input.addEventListener('input', function(){
    const q = this.value.toLowerCase().trim();
    if(!q || !window._searchIndex){return}
    const results = window._searchIndex.filter(p => (p.title + ' ' + p.content).toLowerCase().includes(q)).slice(0,8);
    console.log('Search results', results);
  });
}

// Smooth scroll to anchors for elements with data-scroll or hash links
function initSmoothScroll(){
  const links = document.querySelectorAll('[data-scroll], a[href^="#"]');
  const supports = 'scrollBehavior' in document.documentElement.style;
  links.forEach(link => {
    link.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const top = target.getBoundingClientRect().top + window.scrollY - 24;
        if(supports && !prefersReduced){
          window.scrollTo({ top, behavior: 'smooth' });
        } else {
          window.scrollTo(0, top);
        }
        // focus for accessibility
        target.setAttribute('tabindex','-1');
        target.focus({preventScroll: true});
      }
    });
  });
}

// Simple client-side RSVP handling
function setupRSVP(){
  const form = document.getElementById('rsvp-form');
  if(!form) return;
  const success = document.getElementById('rsvp-success');
  const submitBtn = document.getElementById('submit-btn');

  function setError(id, msg){
    const el = document.getElementById(id);
    if(el) el.textContent = msg;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    // clear errors
    ['err-name','err-email','err-phone','err-guests','err-ack'].forEach(id=>setError(id,''));

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const guests = form.guests.value;
    const ack = form.ack.checked;

    let ok = true;
    if(!name){ setError('err-name','Please provide your full name.'); ok=false }
    if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ setError('err-email','Please provide a valid email address.'); ok=false }
    if(!guests){ setError('err-guests','Please select number of guests.'); ok=false }
    if(!ack){ setError('err-ack','Please confirm you understand and have shared allergies if applicable.'); ok=false }

    if(!ok) return;

    // show loading state
    submitBtn.disabled = true;
    const origText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';

    // simulate async submission (to be wired to backend)
    setTimeout(()=>{
      // hide form, show success
      form.hidden = true;
      success.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = origText;
    }, 900);
  });
}

// init on DOM
document.addEventListener('DOMContentLoaded', function(){
  loadSearchIndex().then(initSearch);
  initSmoothScroll();
  setupRSVP();
});
