function go(n){
    document.querySelectorAll('.step').forEach(s=>s.classList.remove('active'));
    document.getElementById('step'+n).classList.add('active');
  }
