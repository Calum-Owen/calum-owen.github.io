// Basic site JS: search, small helpers

// Simple search: will fetch /search.json and filter client-side
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
    // For now: quick console results
    console.log('Search results', results);
  });
}

document.addEventListener('DOMContentLoaded', function(){
  loadSearchIndex().then(initSearch);
});
