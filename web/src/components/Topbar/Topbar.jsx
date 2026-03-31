import { useState, useEffect } from 'react';
import './Topbar.scss';

const TOTAL_GTGD = '121Tỷ VNĐ';

function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString('vi-VN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });

  const dateStr = currentTime.toLocaleDateString('vi-VN', {
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
          <span className="topbar__search-placeholder">Xem chi tiết mã</span>
        </div>

        <span className="topbar__gtgd">
          Tổng GTGD: <strong>{TOTAL_GTGD}</strong>
        </span>
      </div>

      <div className="topbar__right">

        <div className="topbar__clock">
          <span className="topbar__time">{timeStr}</span>
          <span className="topbar__date">{dateStr}</span>
        </div>

        <div className="topbar__divider" />

        <div className="topbar__controls">

          <button className="topbar__btn">Tiếng Việt ▾</button>

          <div className="topbar__divider" />

          <button className="topbar__btn topbar__btn--icon" title="Chuyển giao diện">🌙</button>

          <button className="topbar__btn">💬 Phản hồi</button>

          <div className="topbar__badge">
            <button className="topbar__btn topbar__btn--icon" title="Thông báo">🔔</button>
            <span className="topbar__badge-dot" />
          </div>

          <div className="topbar__divider" />

          <button className="topbar__btn">👤 Đăng nhập</button>
        </div>
      </div>

    </header>
  );
}

export default TopBar;
