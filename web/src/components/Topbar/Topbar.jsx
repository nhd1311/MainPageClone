import { useEffect, useState } from 'react';
import { useLang } from '../../context/LanguageContext';
import './Topbar.scss';

const TOTAL_GTGD = '121Tỷ VNĐ';

function LangDropdown() {
  const { lang, setLang, t } = useLang();

  const options = [
    { id: 'vi', label: 'Tiếng Việt' },
    { id: 'en', label: 'English'    },
  ];

  return (
    <div className="topbar__lang">
      <button className="topbar__btn topbar__btn--lang">
        {t.topbar.langLabel} ▾
      </button>
      <div className="topbar__lang-dropdown">
        {options.map((opt) => (
          <button
            key={opt.id}
            className={`topbar__lang-option ${lang === opt.id ? 'topbar__lang-option--active' : ''}`}
            onClick={() => setLang(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function TopBar() {
  const { t, lang } = useLang();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const locale  = lang === 'en' ? 'en-US' : 'vi-VN';
  const timeStr = currentTime.toLocaleTimeString(locale, {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });
  const dateStr = currentTime.toLocaleDateString(locale, {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });

  return (
    <header className="topbar">
      <div className="topbar__left">
        <div className="topbar__logo">
          <div className="topbar__logo-icon">Y</div>
          <div className="topbar__logo-text">
            <span>Chứng Khoán</span>
            <span>Yuanta Việt Nam</span>
          </div>
        </div>
        <div className="topbar__search">
          <span className="topbar__search-icon">🔍</span>
          <span className="topbar__search-placeholder">{t.topbar.search}</span>
        </div>
        <span className="topbar__gtgd">
          {t.topbar.totalGtgd}: <strong>{TOTAL_GTGD}</strong>
        </span>
      </div>

      <div className="topbar__right">
        <div className="topbar__clock">
          <span className="topbar__time">{timeStr}</span>
          <span className="topbar__date">{dateStr}</span>
        </div>
        <div className="topbar__divider" />
        <div className="topbar__controls">
          <LangDropdown />
          <div className="topbar__divider" />
          <button className="topbar__btn topbar__btn--icon" title={t.topbar.darkMode}>🌙</button>
          <button className="topbar__btn">💬 {t.topbar.feedback}</button>
          <div className="topbar__badge">
            <button className="topbar__btn topbar__btn--icon" title={t.topbar.notify}>🔔</button>
            <span className="topbar__badge-dot" />
          </div>
          <div className="topbar__divider" />
          <button className="topbar__btn">👤 {t.topbar.login}</button>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
