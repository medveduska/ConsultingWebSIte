/**
 * articles.js
 * Handles article expand/collapse and mobile navigation toggle.
 *
 * HOW TO ADD A NEW ARTICLE:
 * Simply add a new <article class="article-card"> block in index.html or
 * index-LV.html — no changes to this file are needed.
 * See the comment block in the HTML near id="articles" for the template.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- Article expand / collapse ---- */
    var lang = document.documentElement.lang || 'ru';
    var labels = {
      expand:   lang === 'lv' ? 'Lasīt vairāk' : 'Читать далее',
      collapse: lang === 'lv' ? 'Aizvērt'      : 'Свернуть'
    };

    document.querySelectorAll('.article-toggle').forEach(function (btn) {
      // Set initial label from lang (overrides any hard-coded text)
      btn.textContent = labels.expand;

      btn.addEventListener('click', function () {
        var body    = btn.closest('.article-card-body');
        var full    = body.querySelector('.article-full');
        var isOpen  = btn.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
          full.style.display = 'none';
          btn.setAttribute('aria-expanded', 'false');
          btn.textContent = labels.expand;
        } else {
          full.style.display = 'block';
          btn.setAttribute('aria-expanded', 'true');
          btn.textContent = labels.collapse;
        }
      });
    });

    /* ---- Mobile hamburger menu ---- */
    var toggle = document.getElementById('navToggle');
    var nav    = document.getElementById('siteNav');

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label',
          open
            ? (lang === 'lv' ? 'Aizvērt izvēlni' : 'Закрыть меню')
            : (lang === 'lv' ? 'Atvērt izvēlni'  : 'Открыть меню')
        );
      });

      // Close nav when a link is clicked (smooth scroll targets)
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

  });

}());
