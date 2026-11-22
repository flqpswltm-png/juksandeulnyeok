/* 죽산들녘 홈페이지 동작 스크립트 — 내용 수정은 data.js에서 하세요 (이 파일은 고칠 필요 없음) */
(function () {
  var S = window.SITE || {};
  var TODO = '<span class="todo">[확인 필요]</span>';
  var hideEmpty = (S.showTodo === false);
  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, S);
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function won(n) { return Number(n).toLocaleString('ko-KR') + '원'; }
  function digits(t) { return String(t || '').replace(/[^0-9+]/g, ''); }
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  // [확인 필요] 표시 켜기/끄기
  if (hideEmpty) document.documentElement.classList.add('hide-todo');

  // 브랜드 이름
  var brand = (S.brand && S.brand.name) || '죽산들녘';
  $$('[data-brand]').forEach(function (el) { el.textContent = brand; });
  var pt = document.documentElement.getAttribute('data-page-title');
  document.title = pt ? pt + ' | ' + brand : brand + ' | ' + ((S.brand && S.brand.tagline) || '');
  var og = document.querySelector('meta[property="og:site_name"]'); if (og) og.setAttribute('content', brand);

  function hideEl(el) {
    if (!el) return;
    el.hidden = true;
    el.setAttribute('aria-hidden', 'true');
  }

  // 글자 채우기: data-bind="contact.phone" (비어 있으면 공개 화면에선 숨김)
  $$('[data-bind]').forEach(function (el) {
    var v = get(el.getAttribute('data-bind'));
    if (v) {
      var path = el.getAttribute('data-bind');
      if (path === 'contact.phone') {
        el.innerHTML = '<a href="tel:' + digits(v) + '">' + esc(v) + '</a>';
        return;
      }
      if (path === 'contact.sms') {
        el.innerHTML = '<a href="sms:' + digits(v) + '">' + esc(v) + '</a>';
        return;
      }
      if (path === 'contact.email') {
        el.innerHTML = '<a href="mailto:' + esc(v) + '">' + esc(v) + '</a>';
        return;
      }
      el.textContent = v; return;
    }
    if (hideEmpty) {
      hideEl(el.closest('.contact-card') || el.closest('.f-legal > span') || el);
      return;
    }
    var e = el.getAttribute('data-empty');
    el.innerHTML = e ? esc(e) + ' ' + TODO : TODO;
  });

  // 링크 버튼: data-link="links.smartstore" / data-tel / data-sms / data-mail
  function disable(el) {
    if (hideEmpty) { hideEl(el); return; }
    el.classList.add('is-disabled'); el.setAttribute('aria-disabled', 'true'); el.removeAttribute('href');
    var lbl = el.getAttribute('data-off'); if (lbl) { var t = el.querySelector('.t'); (t || el).textContent = lbl; }
    el.addEventListener('click', function (ev) { ev.preventDefault(); });
  }
  $$('[data-link]').forEach(function (el) {
    var v = get(el.getAttribute('data-link'));
    if (v) { el.href = v; el.target = '_blank'; el.rel = 'noopener'; } else disable(el);
  });
  var phone = S.contact && S.contact.phone, sms = (S.contact && (S.contact.sms || S.contact.phone)) || '';
  $$('[data-tel]').forEach(function (el) { phone ? el.href = 'tel:' + digits(phone) : disable(el); });
  $$('[data-sms]').forEach(function (el) {
    if (!sms) return disable(el);
    var body = '[' + brand + ' 주문 문의]\n이름:\n상품/용량/수량:\n받는 주소:\n연락처:';
    el.href = 'sms:' + digits(sms) + '?&body=' + encodeURIComponent(body);
  });
  $$('[data-mail]').forEach(function (el) { var m = S.contact && S.contact.email; m ? el.href = 'mailto:' + m : disable(el); });

  // 카카오톡 채널 — links.kakaoChannelUrl 이 있으면 버튼·카드가 나타납니다
  var kakao = ((S.links && S.links.kakaoChannelUrl) || '').trim();
  $$('[data-kakao]').forEach(function (el) {
    if (!kakao) { hideEl(el); return; }
    el.hidden = false;
    var url = kakao.replace(/\/$/, '');
    var kind = el.getAttribute('data-kakao');
    if (kind === 'chat' && /pf\.kakao\.com/i.test(url) && !/\/chat\/?$/.test(url)) url += '/chat';
    el.href = url;
    el.target = '_blank';
    el.rel = 'noopener';
  });
  $$('[data-kakao-block]').forEach(function (el) {
    if (kakao) { el.hidden = false; } else hideEl(el);
  });

  // 상품 용량·가격
  function priceText(o) { return o.soldout ? '품절' : (o.price ? won(o.price) : '가격 준비 중'); }
  $$('[data-options]').forEach(function (el) {
    var p = S.products && S.products[el.getAttribute('data-options')]; if (!p) return;
    el.innerHTML = p.options.map(function (o) {
      return '<div class="opt' + (o.soldout ? ' soldout' : '') + '"><b>' + esc(o.weight) + '</b><span>' + priceText(o) + '</span></div>';
    }).join('');
  });
  $$('[data-pfield]').forEach(function (el) {
    var a = el.getAttribute('data-pfield').split('.'), p = S.products && S.products[a[0]]; if (!p) return;
    var v = p[a[1]];
    if (a[1] === 'weights') v = p.options.map(function (o) { return o.weight; }).join(' / ');
    if (a[1] === 'from') {
      var ps = p.options.filter(function (o) { return o.price && !o.soldout; }).map(function (o) { return o.price; });
      v = ps.length ? Math.min.apply(null, ps).toLocaleString('ko-KR') + '원부터' : '가격 준비 중';
    }
    if (v) el.textContent = v; else if (hideEmpty) { el.textContent = ''; } else el.innerHTML = TODO;
  });

  function visibleText(el) {
    var rest = '';
    el.childNodes.forEach(function (n) {
      if (n.nodeType === 3) rest += n.textContent;
      else if (n.nodeType === 1 && !n.classList.contains('todo')) rest += n.textContent;
    });
    return rest.trim();
  }

  // 공개 화면에서 [확인 필요]만 남은 항목은 숨깁니다
  if (hideEmpty) {
    $$('dd').forEach(function (dd) {
      if (dd.querySelector('.todo') && !visibleText(dd)) {
        var dt = dd.previousElementSibling;
        hideEl(dd);
        if (dt && dt.tagName === 'DT') hideEl(dt);
      }
    });
    // 표 칸이 비었거나 [확인 필요]만 남은 행도 숨겨, 빈 '배송비' 같은 행이 다시 보이지 않게 합니다
    $$('table tr').forEach(function (tr) {
      var tds = tr.querySelectorAll('td');
      if (!tds.length) return;
      var any = false;
      for (var i = 0; i < tds.length; i++) {
        if (visibleText(tds[i])) { any = true; break; }
      }
      if (!any) hideEl(tr);
    });
  }

  // 모바일 메뉴
  var btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
  if (btn && nav) btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', open);
  });
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
