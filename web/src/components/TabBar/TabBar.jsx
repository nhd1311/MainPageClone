import './TabBar.scss';

const MAIN_TABS = [
  { id: 'VN30',    label: 'VN30'    },
  { id: 'HNX',     label: 'HNX'     },
  { id: 'UPCOM',   label: 'UPCOM'   },
];

const EXTRA_TABS = [
  { id: 'phai-sinh',  label: 'Phái sinh'              },
  { id: 'nhom-nganh', label: 'Nhóm ngành'             },
  { id: 'chung-quyen',label: 'Chứng quyền'            },
  { id: 'etf',        label: 'ETF HOSE'               },
  { id: 'trai-phieu', label: 'Trái phiếu doanh nghiệp'},
];

function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="tab-bar">

      <div className="tab-bar__left">

        {/* Ô nhập mã + nút giao dịch */}
        <input className="tab-bar__search" placeholder="Nhập mã CK" readOnly />
        <button className="tab-bar__btn tab-bar__btn--plus">+</button>
        <button className="tab-bar__btn tab-bar__btn--trade">Giao dịch</button>
        <button className="tab-bar__btn tab-bar__btn--basic">Cơ bản</button>
        <button className="tab-bar__btn tab-bar__btn--dropdown">
          DM theo dõi <span className="tab-bar__caret">▾</span>
        </button>

        {/* Tab chính — đổi dữ liệu bảng */}
        <div className="tab-bar__main-tabs">
          {MAIN_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-bar__tab ${activeTab === tab.id ? 'tab-bar__tab--active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && <span className="tab-bar__caret">▾</span>}
            </button>
          ))}
        </div>

        {/* Tab phụ — chưa có data, chỉ hiển thị */}
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
        <button className="tab-bar__btn tab-bar__btn--icon" title="Cài đặt">⚙</button>
        <button className="tab-bar__btn tab-bar__btn--collapse">▲ Thu gọn</button>
      </div>

    </div>
  );
}

export default TabBar;
