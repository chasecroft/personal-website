/* ============================================================
   ANALYTICS — chasecroft.com
   Mixpanel project: ee228441a5631197fa07c1ee8bdbe5dc
   ============================================================ */

/* ---- Mixpanel snippet (v2 latest) ---- */
(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e].concat(call2))}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);

mixpanel.init('ee228441a5631197fa07c1ee8bdbe5dc', {
  track_pageview: false,   // we fire manually so we control props
  persistence: 'localStorage'
});

/* ---- Shared namespace ---- */
window.CC = window.CC || {};

/* ---- Helpers ---- */
CC.theme = function() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
};

CC.track = function(event, props) {
  try {
    mixpanel.track(event, Object.assign({
      page: CC.pageName,
      theme: CC.theme()
    }, props));
  } catch(e) {}
};

/* ---- Page Viewed — fires immediately ---- */
CC.pageName = document.title.replace(' · Chase Croft', '').replace('Chase Croft — ', '').trim();
CC.track('Page Viewed', {
  url: location.href,
  referrer: document.referrer || null
});

/* ---- Theme toggle — reads current value before handler flips it ---- */
CC.watchTheme = function() {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', function() {
    var before = CC.theme();
    var after  = before === 'light' ? 'dark' : 'light';
    CC.track('Theme Toggled', { from: before, to: after });
  }, true); // capture phase runs before the existing handler changes the value
};

/* ---- Section observer — fires 'Section Viewed' once per element ---- */
CC.observeSections = function(elements, labelFn) {
  var seen = new Set();
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el  = entry.target;
      var key = el.id || el.dataset.sectionPin || el.dataset.section || Math.random();
      if (seen.has(key)) return;
      seen.add(key);
      CC.track('Section Viewed', labelFn(el));
    });
  }, { threshold: 0.3 });
  elements.forEach(function(el) { io.observe(el); });
};

/* ---- Back link ---- */
CC.watchBackLink = function() {
  var link = document.querySelector('.back-link');
  if (!link) return;
  link.addEventListener('click', function() {
    CC.track('Back Link Clicked', { destination: this.getAttribute('href') });
  });
};
