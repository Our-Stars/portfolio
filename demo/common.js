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

  // 鼠标拖影（仅桌面端精确指针生效，遵循系统减少动态设置）
  (function initTrail() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var canvas = document.createElement('canvas');
    canvas.className = 'trail-canvas';
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var points = [];
    var TAIL = 450;
    var moveCount = 0;

    function palette() {
      return document.documentElement.getAttribute('data-theme') === 'light'
        ? { core: '29, 155, 240', fleck: '15, 20, 25' }
        : { core: '29, 155, 240', fleck: '255, 255, 255' };
    }

    function resize() {
      canvas.width = Math.round(window.innerWidth * DPR);
      canvas.height = Math.round(window.innerHeight * DPR);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);
    document.body.appendChild(canvas);

    window.addEventListener('mousemove', function (e) {
      var last = points[points.length - 1];
      if (last) {
        var d = Math.hypot(e.clientX - last.x, e.clientY - last.y);
        if (d < 4) return;
      }
      moveCount++;
      points.push({
        x: e.clientX,
        y: e.clientY,
        t: performance.now(),
        fleck: moveCount % 7 === 0
      });
      if (points.length > 48) points.shift();
    });

    function frame(now) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = points.length - 1; i >= 0; i--) {
        if (now - points[i].t > TAIL) points.splice(i, 1);
      }
      var pal = palette();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (var j = 1; j < points.length; j++) {
        var a = points[j - 1], b = points[j];
        var k = 1 - (now - b.t) / TAIL;
        if (k <= 0) continue;
        ctx.strokeStyle = 'rgba(' + pal.core + ',' + (0.3 * k).toFixed(3) + ')';
        ctx.lineWidth = 2 * k + 0.3;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      for (var m = 0; m < points.length; m++) {
        var p = points[m];
        var k2 = 1 - (now - p.t) / TAIL;
        if (k2 <= 0) continue;
        var col = p.fleck ? pal.fleck : pal.core;
        var r = (p.fleck ? 3 : 1.8) * k2;
        var glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.5);
        glow.addColorStop(0, 'rgba(' + col + ',' + (0.4 * k2).toFixed(3) + ')');
        glow.addColorStop(1, 'rgba(' + col + ',0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(' + col + ',' + (0.9 * k2).toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();
})();
