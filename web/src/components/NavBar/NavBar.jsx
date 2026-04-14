import { useLang } from '../../context/LanguageContext';
import './NavBar.scss';

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
            <div key={sub.key} className="navbar__dropdown-item">
              {sub.label}
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

function Navbar() {
  const { t } = useLang();
  const d = t.nav.dropdown;

  const NAV_ITEMS = [
    { label: t.nav.priceBoard, dropdown: null },
    {
      label: t.nav.marketInfo,
      dropdown: [
        { key: 'marketView', label: d.marketView },
        { key: 'liquidity',      label: d.liquidity      },
        { key: 'marketCap',      label: d.marketCap      },
        { key: 'foreignTrading',   label: d.foreignTrading   },
        { key: 'news',           label: d.news           },
      ],
    },
    {
      label: t.nav.stockTrade,
      dropdown: [
        { key: 'placeOrder',    label: d.placeOrder    },
        { key: 'putThrough',     label: d.putThrough     },
        { key: 'condOrder',     label: d.condOrder     },
        { key: 'orderHistory',  label: d.orderHistory  },
        { key: 'confirmOrder',  label: d.confirmOrder  },
        { key: 'alert',         label: d.alert         },
        { key: 'rightInfo',     label: d.rightInfo     },
        { key: 'expectedInfo', label: d.expectedInfo },
        { key: 'stockTransfer', label: d.stockTransfer },
        { key: 'infoRegistration', label: d.infoRegistration },
        { key: 'adOrder',       label: d.adOrder       },
      ],
    },
    {
      label: t.nav.moneyTrade,
      dropdown: [
        { key: 'internalTransfer', label: d.internalTransfer },
        { key: 'cia',      label: d.cia      },
        { key: 'withdrawReq',      label: d.withdrawReq      },
        { key: 'deposit',          label: d.deposit          },
      ],
    },
    {
      label: t.nav.assetMgmt,
      dropdown: [
        { key: 'portOverview', label: d.portOverview },
        { key: 'statement',     label: d.statement     },
        { key: 'interestTable', label: d.interestTable },
      ],
    },
    {
      label: t.nav.utilities,
      dropdown: [
        { key: 'signUp', label: d.signUp },
        { key: 'manageBankInfo', label: d.manageBankInfo },
        { key: 'manageContract', label: d.manageContract },
        { key: 'changeMargin',   label: d.changeMargin   },
        { key: 'userGuide',      label: d.userGuide      },
        { key: 'marginList',     label: d.marginList     },
        { key: 'research',       label: d.research       },
        { key: 'advisory',       label: d.advisory       },
        { key: 'sysSetting',      label: d.sysSetting      },
        { key: 'loginHistory',   label: d.loginHistory   },
        { key: 'devices',        label: d.devices        },
      ],
    },
  ];

  return (
    <nav className="navbar">
      <ul className="navbar__menu">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.label} item={item} />
        ))}
      </ul>
      <div className="navbar__right">
        <button className="navbar__icon-btn" title={d.settings}>⚙</button>
      </div>
    </nav>
  );
}

export default Navbar;
