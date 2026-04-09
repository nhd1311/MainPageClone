import {
  getPriceClass,
  getChangeClass,
  formatPrice,
  formatVol,
  formatChange,
  formatPct,
} from '../../controllers/stockController';

function getRowHighlight(matchedPrice, ceiling, floor) {
  if (matchedPrice == null) return '';
  if (matchedPrice >= ceiling) return 'row--ceiling';
  if (matchedPrice <= floor)   return 'row--floor';
  return '';
}

function StockRow({ stock }) {
  const { ceiling, floor, ref, bid, ask, matched } = stock;

  const rowClass      = getRowHighlight(matched.price, ceiling, floor);
  const matchedClass  = getPriceClass(matched.price, ref, ceiling, floor);
  const changeClass   = getChangeClass(matched.change);

  return (
    <tr className={`stock-board__row ${rowClass}`}>

      <td className="th-sticky col-symbol">{stock.symbol}</td>
      <td className="col-small text-ceiling">{formatPrice(ceiling)}</td>
      <td className="col-small text-floor">{formatPrice(floor)}</td>
      <td className="col-small text-ref">{formatPrice(ref)}</td>

      <td className={`col-price gs gs--bid ${getPriceClass(bid[2]?.price, ref, ceiling, floor)}`}>
        {formatPrice(bid[2]?.price)}
      </td>
      <td className="col-vol">{formatVol(bid[2]?.vol)}</td>
      <td className={`col-price ${getPriceClass(bid[1]?.price, ref, ceiling, floor)}`}>
        {formatPrice(bid[1]?.price)}
      </td>
      <td className="col-vol">{formatVol(bid[1]?.vol)}</td>
      <td className={`col-price ${getPriceClass(bid[0]?.price, ref, ceiling, floor)}`}>
        {formatPrice(bid[0]?.price)}
      </td>
      <td className="col-vol">{formatVol(bid[0]?.vol)}</td>

      <td className={`col-price gs gs--match ${matchedClass}`}>{formatPrice(matched.price)}</td>
      <td className="col-vol">{formatVol(matched.vol)}</td>
      <td className={`col-change ${changeClass}`}>{formatChange(matched.change)}</td>
      <td className={`col-change ${changeClass}`}>{formatPct(matched.pctChange)}</td>

      <td className={`col-price gs gs--ask ${getPriceClass(ask[0]?.price, ref, ceiling, floor)}`}>
        {formatPrice(ask[0]?.price)}
      </td>
      <td className="col-vol">{formatVol(ask[0]?.vol)}</td>
      <td className={`col-price ${getPriceClass(ask[1]?.price, ref, ceiling, floor)}`}>
        {formatPrice(ask[1]?.price)}
      </td>
      <td className="col-vol">{formatVol(ask[1]?.vol)}</td>
      <td className={`col-price ${getPriceClass(ask[2]?.price, ref, ceiling, floor)}`}>
        {formatPrice(ask[2]?.price)}
      </td>
      <td className="col-vol">{formatVol(ask[2]?.vol)}</td>

      <td className="col-vol gs gs--total">{formatVol(stock.totalVol)}</td>
      <td className="col-price gs gs--price">{formatPrice(stock.avg)}</td>
      <td className="col-price">{formatPrice(stock.low)}</td>
      <td className="col-price">{formatPrice(stock.high)}</td>
      <td className="col-price">{formatPrice(stock.open)}</td>

      <td className="col-vol gs gs--foreign">{formatVol(stock.foreignBuy)}</td>
      <td className="col-vol">{formatVol(stock.foreignSell)}</td>

    </tr>
  );
}

export default StockRow;
