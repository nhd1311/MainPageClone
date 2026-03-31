import './NavBar.scss';

const NAV_ITEMS = [
  {
    label: 'BẢNG GIÁ',
    dropdown: null,
  },
  {
    label: 'THÔNG TIN THỊ TRƯỜNG',
    dropdown: [
      { label: 'Tổng quan thị trường' },
      { label: 'Thống kê giao dịch'   },
      { label: 'Biến động giá'        },
      { label: 'Dữ liệu lịch sử'      },
    ],
  },
  {
    label: 'GIAO DỊCH CHỨNG KHOÁN',
    dropdown: [
      { label: 'Đặt lệnh'          },
      { label: 'Sổ lệnh'           },
      { label: 'Danh mục đầu tư'   },
      { label: 'Lịch sử giao dịch' },
    ],
  },
  {
    label: 'GIAO DỊCH TIỀN',
    dropdown: [
      { label: 'Nộp tiền'    },
      { label: 'Rút tiền'    },
      { label: 'Chuyển tiền' },
    ],
  },
  {
    label: 'QUẢN LÝ TÀI SẢN',
    dropdown: [
      { label: 'Tài sản tổng hợp' },
      { label: 'Báo cáo'          },
    ],
  },
  {
    label: 'TIỆN ÍCH KHÁC',
    dropdown: [
      { label: 'Cài đặt' },
      { label: 'Hỗ trợ'  },
    ],
  },
  {
    label: 'CHỨNG CHỈ QUỸ',
    dropdown: null,
  },
];

function NavItem({ item }) {
  const hasDropdown = item.dropdown && item.dropdown.length > 0;

  return (
    <li className="navbar__item">
      <div className="navbar__link">
        {item.label}
        {hasDropdown && <span className="navbar__arrow">▾</span>}
      </div>
      {hasDropdown && (
        <div className="navbar__dropdown">
          {item.dropdown.map((sub) => (
            <div key={sub.label} className="navbar__dropdown-item">
              {sub.label}
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__menu">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.label} item={item} />
        ))}
      </ul>
      <div className="navbar__right">
        <button className="navbar__icon-btn" title="Cài đặt">
          ⚙
        </button>
      </div>

    </nav>
  );
}

export default Navbar;
