(function () {
  'use strict';

  var storageKey = 'consulting_cookie_consent_v1';
  var lang = document.documentElement.lang === 'lv' ? 'lv' : 'ru';
  var copy = lang === 'lv' ? {
    text: 'Mēs izmantojam tikai nepieciešamo pārlūka krātuvi, lai atcerētos jūsu izvēli. Ar jūsu piekrišanu tiek ielādēta Google karte, un Google var apstrādāt tehniskos datus un izmantot sīkdatnes.',
    policy: 'Privātuma un sīkdatņu politika',
    policyUrl: 'privacy-LV.html',
    reject: 'Noraidīt',
    accept: 'Pieņemt'
  } : {
    text: 'Мы используем только необходимое хранилище браузера, чтобы запомнить ваш выбор. С вашего согласия загружается карта Google, и Google может обрабатывать технические данные и использовать cookies.',
    policy: 'Политика конфиденциальности и cookies',
    policyUrl: 'privacy.html',
    reject: 'Отклонить',
    accept: 'Принять'
  };

  function readChoice() {
    try { return localStorage.getItem(storageKey); } catch (error) { return null; }
  }

  function saveChoice(value) {
    try { localStorage.setItem(storageKey, value); } catch (error) { /* The choice lasts for this page only. */ }
  }

  function setMapsEnabled(enabled) {
    document.querySelectorAll('.contact-map').forEach(function (map) {
      var frame = map.querySelector('iframe[data-consent-src]');
      if (!frame) return;
      if (enabled) {
        if (!frame.src) frame.src = frame.dataset.consentSrc;
        map.classList.add('has-consent');
      } else {
        frame.removeAttribute('src');
        map.classList.remove('has-consent');
      }
    });
  }

  function createBanner() {
    var banner = document.createElement('aside');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', copy.policy);
    banner.innerHTML = '<p>' + copy.text + ' <a href="' + copy.policyUrl + '">' + copy.policy + '</a>.</p>' +
      '<div class="cookie-actions"><button type="button" class="cookie-button reject">' + copy.reject + '</button>' +
      '<button type="button" class="cookie-button accept">' + copy.accept + '</button></div>';
    document.body.appendChild(banner);
    banner.querySelector('.accept').addEventListener('click', function () { choose('accepted', banner); });
    banner.querySelector('.reject').addEventListener('click', function () { choose('rejected', banner); });
    return banner;
  }

  function choose(value, banner) {
    saveChoice(value);
    setMapsEnabled(value === 'accepted');
    banner.hidden = true;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var banner = createBanner();
    var choice = readChoice();
    banner.hidden = choice === 'accepted' || choice === 'rejected';
    setMapsEnabled(choice === 'accepted');

    document.querySelectorAll('.btn-map-consent').forEach(function (button) {
      button.addEventListener('click', function () { choose('accepted', banner); });
    });
    document.querySelectorAll('.cookie-settings').forEach(function (button) {
      button.addEventListener('click', function () { banner.hidden = false; });
    });
  });
}());
