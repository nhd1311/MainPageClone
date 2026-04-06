import StockRow from '../StockRow/StockRow';
import { useStocks } from '../../controllers/useStocks';
import './StockBoard.scss';

function TableHeader() {
  return (
    <thead className="stock-board__thead">
      <tr className="stock-board__thead-group">
        <th colSpan={4} className="th-sticky th-base" />
        <th colSpan={6} className="th-group th-group--bid">Thông tin dư mua</th>
        <th colSpan={4} className="th-group th-group--match">Khớp lệnh</th>
        <th colSpan={6} className="th-group th-group--ask">Thông tin dư bán</th>
        <th colSpan={1} className="th-group">↑Tổng KL↓</th>
        <th colSpan={4} className="th-group th-group--price">Giá</th>
        <th colSpan={2} className="th-group th-group--foreign">Nhà ĐTNN</th>
      </tr>
      <tr className="stock-board__thead-cols">
        <th className="th-sticky col-symbol">Mã CK</th>
        <th className="col-small text-ceiling">Trần</th>
        <th className="col-small text-floor">Sàn</th>
        <th className="col-small text-ref">TC</th>
        <th className="col-price">Giá 3</th>
        <th className="col-vol">KL 3</th>
        <th className="col-price">Giá 2</th>
        <th className="col-vol">KL 2</th>
        <th className="col-price">Giá 1</th>
        <th className="col-vol">KL 1</th>
        <th className="col-price">Giá</th>
        <th className="col-vol">KL</th>
        <th className="col-change">+/-</th>
        <th className="col-change">%</th>
        <th className="col-price">Giá 1</th>
        <th className="col-vol">KL 1</th>
        <th className="col-price">Giá 2</th>
        <th className="col-vol">KL 2</th>
        <th className="col-price">Giá 3</th>
        <th className="col-vol">KL 3</th>
        <th className="col-vol">Tổng KL</th>
        <th className="col-price">TB</th>
        <th className="col-price">Thấp</th>
        <th className="col-price">Cao</th>
        <th className="col-price">Mở cửa</th>
        <th className="col-vol">Mua</th>
        <th className="col-vol">Bán ▾</th>
      </tr>
    </thead>
  );
}

function StockBoard({ activeTab }) {
  const stocks = useStocks(activeTab);

  return (
    <div className="stock-board">
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
