import StockRow from '../StockRow/StockRow';
import { useStocks } from '../../controllers/useStocks';
import { useLang } from '../../context/LanguageContext';
import './StockBoard.scss';

function TableHeader({ sb }) {
  return (
    <thead className="stock-board__thead">
      <tr className="stock-board__thead-group">
        <th rowSpan={2} className="th-sticky th-base col-stock">{sb.stock}</th>
        <th rowSpan={2} className="th-base col-small text-ceiling">{sb.ceiling}</th>
        <th rowSpan={2} className="th-base col-small text-floor">{sb.floor}</th>
        <th rowSpan={2} className="th-base col-small text-ref">{sb.ref}</th>

        <th colSpan={6} className="th-group th-group--bid">{sb.bidInfo}</th>
        <th colSpan={4} className="th-group th-group--match">{sb.matchedInfo}</th>
        <th colSpan={6} className="th-group th-group--ask">{sb.askInfo}</th>

        <th rowSpan={2} className="th-group th-group--total col-vol">{sb.totalVol}</th>

        <th colSpan={4} className="th-group th-group--price">{sb.price}</th>
        <th colSpan={2} className="th-group th-group--foreign">{sb.foreign}</th>
      </tr>

      <tr className="stock-board__thead-cols">
        <th className="col-price gs gs--bid">{sb.price} 3</th>
        <th className="col-vol">KL 3</th>
        <th className="col-price">{sb.price} 2</th>
        <th className="col-vol">KL 2</th>
        <th className="col-price">{sb.price} 1</th>
        <th className="col-vol">KL 1</th>

        <th className="col-price gs gs--match">{sb.price}</th>
        <th className="col-vol">KL</th>
        <th className="col-change">+/-</th>
        <th className="col-change">%</th>

        <th className="col-price gs gs--ask">{sb.price} 1</th>
        <th className="col-vol">KL 1</th>
        <th className="col-price">{sb.price} 2</th>
        <th className="col-vol">KL 2</th>
        <th className="col-price">{sb.price} 3</th>
        <th className="col-vol">KL 3</th>

        <th className="col-price gs gs--price">{sb.avg}</th>
        <th className="col-price">{sb.low}</th>
        <th className="col-price">{sb.high}</th>
        <th className="col-price">{sb.open}</th>

        <th className="col-vol gs gs--foreign">{sb.buy}</th>
        <th className="col-vol">{sb.sell} ▾</th>
      </tr>
    </thead>
  );
}

function StockBoard({ activeTab }) {
  const stocks = useStocks(activeTab);
  const { t } = useLang();

  return (
    <div className="stock-board">
      <div className="stock-board__table-wrap">
        <table className="stock-board__table">
          <TableHeader sb={t.stockBoard} />
          <tbody>
            {stocks.map((stock) => (
              <StockRow key={stock.stock} stock={stock} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockBoard;
