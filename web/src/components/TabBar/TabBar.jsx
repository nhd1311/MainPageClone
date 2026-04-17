import { useLang } from '../../context/LanguageContext';
import './TabBar.scss';

const MAIN_TABS  = ['VN30', 'HNX', 'UPCOM'];

function TabBar({ activeTab, onTabChange, collapseStep, onCollapse }) {
  const { t } = useLang();
  const tb = t.tabBar;

  const EXTRA_TABS = [
    { id: 'phai-sinh',   label: tb.derivatives },
    { id: 'nhom-nganh',  label: tb.sector      },
    { id: 'chung-quyen', label: tb.cw          },
    { id: 'etf',         label: tb.etf         },
    { id: 'trai-phieu',  label: tb.bond        },
  ];

  return (
    <div className="tab-bar">
      <div className="tab-bar__left">
        <input className="tab-bar__search" placeholder="Nhập mã CK" readOnly />
        <button className="tab-bar__btn tab-bar__btn--plus">+</button>
        <button className="tab-bar__btn tab-bar__btn--trade">{tb.trade}</button>
        <button className="tab-bar__btn tab-bar__btn--basic">{tb.basic}</button>
        <button className="tab-bar__btn tab-bar__btn--dropdown">
          {tb.watchlist} <span className="tab-bar__caret">▾</span>
        </button>

        <div className="tab-bar__main-tabs">
          {MAIN_TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-bar__tab ${activeTab === tab ? 'tab-bar__tab--active' : ''}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
              {activeTab === tab && <span className="tab-bar__caret">▾</span>}
            </button>
          ))}
        </div>

        <div className="tab-bar__extra-tabs">
          {EXTRA_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-bar__tab-extra ${activeTab === tab.id ? 'tab-bar__tab-extra--active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tab-bar__right">
        <button className="tab-bar__btn tab-bar__btn--icon" title={t.nav.dropdown.settings}>⚙</button>
        <button className="tab-bar__btn tab-bar__btn--collapse" onClick={onCollapse}>
          {collapseStep === 2 ? `▼ ${tb.expand}` : `▲ ${tb.collapse}`}
        </button>
      </div>
    </div>
  );
}

export default TabBar;
