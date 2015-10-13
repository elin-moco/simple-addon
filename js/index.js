// If injecting into an app that was already running at the time
// the app was enabled, simply initialize it.
if (document.documentElement) {
  initialize();
}

// Otherwise, we need to wait for the DOM to be ready before
// starting initialization since add-ons are injected
// *before* `document.documentElement` is defined.
else {
  window.addEventListener('DOMContentLoaded', initialize);
}

navigator.mozApps.mgmt.onenabledstatechange = function(event) {
  try {
    console.log('onenabledstatechange');
    var app = event.application;
    console.log(app.enabled);
    var state = document.getElementById('enstate');
    state.innerHTML = 'EnabledState: '+app.enabled;
  } catch(e) {
   console.error(e);    
  }
};

function initialize() {
  if (document.querySelector('.fxos-banner')) {
    // Already injected, abort.
    return;
  } else {
    var body = document.querySelector('body');
    var fxosBanner = document.createElement('div');
    fxosBanner.classList.add('fxos-banner');
    var bannerText = document.createElement('p');
    var closeBtn = document.createElement('button');
    var state = document.createElement('div');
    state.setAttribute('id', 'enstate');
    state.setAttribute('style', 'color: red; ');
    state.innerHTML = 'EnabledState: unknown';

    fxosBanner.appendChild(bannerText);
    fxosBanner.appendChild(closeBtn);
    body.appendChild(fxosBanner);

    closeBtn.textContent = 'X';
    bannerText.textContent = 'Wow, you have an extension installed!';
    bannerText.appendChild(state);
    
    closeBtn.onclick = function() {
    	fxosBanner.parentNode.removeChild(fxosBanner);
    }
  }
}
