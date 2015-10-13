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
    var testBtn = document.createElement('span');

    fxosBanner.appendChild(bannerText);
    fxosBanner.appendChild(closeBtn);
    body.appendChild(fxosBanner);

    closeBtn.textContent = 'X';
    testBtn.textContent = 'Click me to getManifest';
    bannerText.innerHTML = 'Wow, you have an extension installed!<br>';
    bannerText.appendChild(testBtn);

    closeBtn.onclick = function() {
    	fxosBanner.parentNode.removeChild(fxosBanner);
    }
    testBtn.onclick = function() {
      try {
        var manifest = chrome.runtime.getManifest();
        bannerText.innerHTML += manifest;
      } catch(e) {
        bannerText.innerHTML += '<span style="color: red;">Error!!</span>';
        console.error(e);
      }
    }
  }
}
