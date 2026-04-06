import './BottomBar.scss';

function BottomBar() {
  return (
    <div className="bottom-bar">
      <button className="bottom-bar__btn bottom-bar__btn--order">
        Đặt lệnh nhanh
      </button>
      <button className="bottom-bar__btn bottom-bar__btn--book">
        Sổ lệnh
      </button>
    </div>
  );
}

export default BottomBar;
