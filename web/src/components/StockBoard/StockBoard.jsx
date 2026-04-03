import { useState } from 'react';
import {
  filterStockData,
  getPriceClass,
  getChangeClass,
  formatPrice,
  formatVol,
  formatChange,
  formatPct,
} from '../../controllers/stockController';
import './StockBoard.scss';

const MAIN_TABS = ['VN30', 'HNX', 'UPCOM'];
const EXTRA_TABS = ['Phái sinh', 'Nhóm ngành', 'Chứng quyền', 'ETF HOSE', 'Trái phiếu doanh nghiệp'];

function Toolbar({ activeTab, onTabChange }) {
  return (
    <div className="stock-board__toolbar">

      <div className="stock-board__toolbar-left">
        <input
          className="stock-board__search"
          placeholder="Nhập mã CK"
          readOnly
        />
        <button className="stock-board__btn stock-board__btn--plus">+</button>
        <button className="stock-board__btn stock-board__btn--trade">Giao dịch</button>
        <button className="stock-board__btn stock-board__btn--basic">Cơ bản</button>
        <button className="stock-board__btn stock-board__btn--dropdown">
          DM theo dõi <span className="stock-board__caret">▾</span>
        </button>

        <div className="stock-board__tab-group">
          {MAIN_TABS.map((tab) => (
            <button
              key={tab}
              className={`stock-board__tab ${activeTab === tab ? 'stock-board__tab--active' : ''}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
              {activeTab === tab && <span className="stock-board__caret">▾</span>}
            </button>
          ))}
        </div>

        <div className="stock-board__tab-group stock-board__tab-group--extra">
          {EXTRA_TABS.map((tab) => (
            <button
              key={tab}
              className={`stock-board__tab-extra ${activeTab === tab ? 'stock-board__tab-extra--active' : ''}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="stock-board__toolbar-right">
        <button className="stock-board__btn stock-board__btn--icon">⚙</button>
        <button className="stock-board__btn stock-board__btn--collapse">▲ Thu gọn</button>
      </div>

    </div>
  );
}


function TableHeader() {
  return (
    <thead className="stock-board__thead">
      {/* Row 1: group labels */}
      <tr className="stock-board__thead-group">
        <th colSpan={4} className="th-sticky th-base" />
        <th colSpan={6} className="th-group th-group--bid">Thông tin dư mua</th>
        <th colSpan={4} className="th-group th-group--match">Khớp lệnh</th>
        <th colSpan={6} className="th-group th-group--ask">Thông tin dư bán</th>
        <th colSpan={1} className="th-group" />
        <th colSpan={4} className="th-group th-group--price">Giá</th>
        <th colSpan={2} className="th-group th-group--foreign">Nhà ĐTNN</th>
      </tr>
      {/* Row 2: column labels */}
      <tr className="stock-board__thead-cols">
        <th className="th-sticky col-symbol">Mã CK</th>
        <th className="col-small text-ceiling">Trần</th>
        <th className="col-small text-floor">Sàn</th>
        <th className="col-small text-ref">TC</th>

        {/* Bid */}
        <th className="col-price text-ceiling">Giá 3</th>
        <th className="col-vol">KL 3</th>
        <th className="col-price text-ceiling">Giá 2</th>
        <th className="col-vol">KL 2</th>
        <th className="col-price text-ceiling">Giá 1</th>
        <th className="col-vol">KL 1</th>

        {/* Match */}
        <th className="col-price">Giá</th>
        <th className="col-vol">KL</th>
        <th className="col-change">+/-</th>
        <th className="col-change">%</th>

        {/* Ask */}
        <th className="col-price text-ceiling">Giá 1</th>
        <th className="col-vol">KL 1</th>
        <th className="col-price text-ceiling">Giá 2</th>
        <th className="col-vol">KL 2</th>
        <th className="col-price text-ceiling">Giá 3</th>
        <th className="col-vol">KL 3</th>

        {/* Total */}
        <th className="col-vol">Tổng KL</th>

        {/* Price stats */}
        <th className="col-price">TB</th>
        <th className="col-price">Thấp</th>
        <th className="col-price">Cao</th>
        <th className="col-price">Mở cửa</th>

        {/* Foreign */}
        <th className="col-vol">Mua</th>
        <th className="col-vol">Bán ▾</th>
      </tr>
    </thead>
  );
}


function StockRow({ stock }) {
  const { ceiling, floor, ref, bid, ask, matched } = stock;

  const matchedClass = getPriceClass(matched.price, ref, ceiling, floor);
  const changeClass  = getChangeClass(matched.change);

  const bidPriceClass = (p) => getPriceClass(p, ref, ceiling, floor);
  const askPriceClass = (p) => getPriceClass(p, ref, ceiling, floor);

  return (
    <tr className="stock-board__row">
      {/* Base info */}
      <td className="th-sticky col-symbol">{stock.symbol}</td>
      <td className={`col-small text-ceiling`}>{formatPrice(ceiling)}</td>
      <td className={`col-small text-floor`}>{formatPrice(floor)}</td>
      <td className={`col-small text-ref`}>{formatPrice(ref)}</td>

      {/* Bid — hiển thị ngược: bid[2], bid[1], bid[0] = xa nhất → gần nhất */}
      <td className={`col-price ${bidPriceClass(bid[2]?.price)}`}>{formatPrice(bid[2]?.price)}</td>
      <td className="col-vol">{formatVol(bid[2]?.vol)}</td>
      <td className={`col-price ${bidPriceClass(bid[1]?.price)}`}>{formatPrice(bid[1]?.price)}</td>
      <td className="col-vol">{formatVol(bid[1]?.vol)}</td>
      <td className={`col-price ${bidPriceClass(bid[0]?.price)}`}>{formatPrice(bid[0]?.price)}</td>
      <td className="col-vol">{formatVol(bid[0]?.vol)}</td>

      {/* Matched */}
      <td className={`col-price ${matchedClass}`}>{formatPrice(matched.price)}</td>
      <td className="col-vol">{formatVol(matched.vol)}</td>
      <td className={`col-change ${changeClass}`}>{formatChange(matched.change)}</td>
      <td className={`col-change ${changeClass}`}>{formatPct(matched.pctChange)}</td>

      {/* Ask — hiển thị: ask[0], ask[1], ask[2] = gần nhất → xa nhất */}
      <td className={`col-price ${askPriceClass(ask[0]?.price)}`}>{formatPrice(ask[0]?.price)}</td>
      <td className="col-vol">{formatVol(ask[0]?.vol)}</td>
      <td className={`col-price ${askPriceClass(ask[1]?.price)}`}>{formatPrice(ask[1]?.price)}</td>
      <td className="col-vol">{formatVol(ask[1]?.vol)}</td>
      <td className={`col-price ${askPriceClass(ask[2]?.price)}`}>{formatPrice(ask[2]?.price)}</td>
      <td className="col-vol">{formatVol(ask[2]?.vol)}</td>

      {/* Total KL */}
      <td className="col-vol">{formatVol(stock.totalVol)}</td>

      {/* Price stats */}
      <td className="col-price">{formatPrice(stock.avg)}</td>
      <td className="col-price">{formatPrice(stock.low)}</td>
      <td className="col-price">{formatPrice(stock.high)}</td>
      <td className="col-price">{formatPrice(stock.open)}</td>

      {/* Foreign */}
      <td className="col-vol">{formatVol(stock.foreignBuy)}</td>
      <td className="col-vol">{formatVol(stock.foreignSell)}</td>
    </tr>
  );
}

function StockBoard() {
  const [activeTab, setActiveTab] = useState('VN30');
  const stocks = filterStockData(activeTab);

  return (
    <div className="stock-board">
      <Toolbar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="stock-board__table-wrap">
        <table className="stock-board__table">
          <TableHeader />
          <tbody>
            {stocks.map((stock) => (
              <StockRow key={stock.symbol} stock={stock} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockBoard;
