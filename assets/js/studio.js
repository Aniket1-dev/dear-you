const names = {hero:'Hero', photo:'Photo', date:'Date', venue:'Venue', food:'Food question', activity:'Activity', question:'Question', final:'Final response'};
  function selectSection(el, key){
    document.querySelectorAll('.sec-item').forEach(i=>i.classList.remove('active'));
    document.querySelectorAll('.cv-block').forEach(i=>i.classList.remove('active'));
    if(el) el.classList.add('active');
    else {
      const items = document.querySelectorAll('.sec-item');
      items.forEach(i=>{ if(i.querySelector('.name').textContent.toLowerCase().includes(key.split(' ')[0])) i.classList.add('active'); });
    }
    const block = document.getElementById('cv-'+key);
    if(block) block.classList.add('active');
    document.getElementById('prop-title').textContent = names[key] || key;
  }
