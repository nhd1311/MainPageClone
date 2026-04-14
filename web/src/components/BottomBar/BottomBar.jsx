import { useLang } from '../../context/LanguageContext';
import './BottomBar.scss';

function BottomBar() {
  const { t } = useLang();
  return (
    <div className="bottom-bar">
      <button className="bottom-bar__btn bottom-bar__btn--order">
        {t.bottomBar.quickOrder}
      </button>
      <button className="bottom-bar__btn bottom-bar__btn--book">
        {t.bottomBar.orderBook}
      </button>
    </div>
  );
}

export default BottomBar;
