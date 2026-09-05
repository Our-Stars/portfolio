(function () {
  'use strict';

  var SUN_SVG =
    '<svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  var MOON_SVG =
    '<svg class="icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var EXT_SVG =
    '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';

  var NAV_HTML =
    '<div class="container nav-inner">' +
    '  <a class="nav-logo" href="index.html">Research Portfolio</a>' +
    '  <div class="nav-links">' +
    '    <a href="index.html#research" data-nav="research">科研项目</a>' +
    '    <a href="index.html#outputs" data-nav="outputs">成果与获奖</a>' +
    '    <a href="index.html#about" data-nav="about">关于我</a>' +
    '  </div>' +
    '  <div class="nav-actions">' +
    '    <button class="theme-btn" id="themeBtn" aria-label="切换昼夜主题">' + SUN_SVG + MOON_SVG + '</button>' +
    '    <button class="menu-btn" id="menuBtn" aria-label="打开菜单">' +
    '      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
    '    </button>' +
    '  </div>' +
    '</div>' +
    '<div class="mobile-menu" id="mobileMenu">' +
    '  <a href="index.html#research">科研项目</a>' +
    '  <a href="index.html#outputs">成果与获奖</a>' +
    '  <a href="index.html#about">关于我</a>' +
    '  <a href="mailto:yc956442829@163.com">联系我</a>' +
    '</div>';

  var FOOTER_HTML =
    '<div class="container footer-inner">' +
    '  <div class="footer-note">' +
    '    &copy; 2026 RESEARCH PORTFOLIO<br>' +
    '    COMPUTATIONAL TOXICOLOGY &amp; SCIENTIFIC AGENTS' +
    '  </div>' +
    '  <div class="footer-links">' +
    '    <div class="col">' +
    '      <div class="col-title">INDEX</div>' +
    '      <a href="index.html#research">科研项目</a>' +
    '      <a href="index.html#outputs">成果与获奖</a>' +
    '      <a href="index.html#about">关于我</a>' +
    '    </div>' +
    '    <div class="col">' +
    '      <div class="col-title">LINKS</div>' +
    '      <a href="https://github.com/Our-Stars/" target="_blank" rel="noopener noreferrer">GitHub ' + EXT_SVG + '</a>' +
    '    </div>' +
    '  </div>' +
    '</div>';

  // 注入导航与页脚
  var navRoot = document.getElementById('site-nav');
  var footerRoot = document.getElementById('site-footer');
  if (navRoot) {
    navRoot.innerHTML = NAV_HTML;
    navRoot.querySelectorAll('a[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === document.body.getAttribute('data-nav')) {
        a.classList.add('active');
      }
    });
  }
  if (footerRoot) footerRoot.innerHTML = FOOTER_HTML;

  // 昼夜主题切换
  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var root = document.documentElement;
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // 移动端菜单
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 滚动渐显
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
