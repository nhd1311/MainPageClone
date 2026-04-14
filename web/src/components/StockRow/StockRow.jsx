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

  const rowClass     = getRowHighlight(matched.price, ceiling, floor);
  const matchedClass = getPriceClass(matched.price, ref, ceiling, floor);
  const avgClass     = getPriceClass(stock.avg, ref, ceiling, floor);
  const lowClass     = getPriceClass(stock.low, ref, ceiling, floor);
  const highClass    = getPriceClass(stock.high, ref, ceiling, floor);
  const openClass    = getPriceClass(stock.open, ref, ceiling, floor);
  const changeClass  = getChangeClass(matched.change);

  // Tính màu cho từng cặp giá bid/ask
  const bidClass = [
    getPriceClass(bid[2]?.price, ref, ceiling, floor),
    getPriceClass(bid[1]?.price, ref, ceiling, floor),
    getPriceClass(bid[0]?.price, ref, ceiling, floor),
  ];
  const askClass = [
    getPriceClass(ask[0]?.price, ref, ceiling, floor),
    getPriceClass(ask[1]?.price, ref, ceiling, floor),
    getPriceClass(ask[2]?.price, ref, ceiling, floor),
  ];

  return (
    <tr className={`stock-board__row ${rowClass}`}>

      <td className="th-sticky col-symbol">{stock.symbol}</td>
      <td className="col-small text-ceiling">{formatPrice(ceiling)}</td>
      <td className="col-small text-floor">{formatPrice(floor)}</td>
      <td className="col-small text-ref">{formatPrice(ref)}</td>

      <td className={`col-price gs gs--bid ${bidClass[0]}`}>{formatPrice(bid[2]?.price)}</td>
      <td className={`col-vol ${bidClass[0]}`}>{formatVol(bid[2]?.vol)}</td>

      <td className={`col-price ${bidClass[1]}`}>{formatPrice(bid[1]?.price)}</td>
      <td className={`col-vol ${bidClass[1]}`}>{formatVol(bid[1]?.vol)}</td>

      <td className={`col-price ${bidClass[2]}`}>{formatPrice(bid[0]?.price)}</td>
      <td className={`col-vol ${bidClass[2]}`}>{formatVol(bid[0]?.vol)}</td>

      <td className={`col-price gs gs--match ${matchedClass}`}>{formatPrice(matched.price)}</td>
      <td className={`col-vol ${matchedClass}`}>{formatVol(matched.vol)}</td>
      <td className={`col-change ${changeClass}`}>{formatChange(matched.change)}</td>
      <td className={`col-change ${changeClass}`}>{formatPct(matched.pctChange)}</td>

      <td className={`col-price gs gs--ask ${askClass[0]}`}>{formatPrice(ask[0]?.price)}</td>
      <td className={`col-vol ${askClass[0]}`}>{formatVol(ask[0]?.vol)}</td>

      <td className={`col-price ${askClass[1]}`}>{formatPrice(ask[1]?.price)}</td>
      <td className={`col-vol ${askClass[1]}`}>{formatVol(ask[1]?.vol)}</td>

      <td className={`col-price ${askClass[2]}`}>{formatPrice(ask[2]?.price)}</td>
      <td className={`col-vol ${askClass[2]}`}>{formatVol(ask[2]?.vol)}</td>

      {/* ── Tổng KL + Giá thống kê ─────────────────── */}
      <td className="col-vol gs gs--total">{formatVol(stock.totalVol)}</td>
      <td className={`col-price gs gs--price ${avgClass}`}>{formatPrice(stock.avg)}</td>
      <td className={`col-price ${lowClass}`}>{formatPrice(stock.low)}</td>
      <td className={`col-price ${highClass}`}>{formatPrice(stock.high)}</td>
      <td className={`col-price ${openClass}`}>{formatPrice(stock.open)}</td>

      <td className="col-vol gs gs--foreign">{formatVol(stock.foreignBuy)}</td>
      <td className="col-vol">{formatVol(stock.foreignSell)}</td>

    </tr>
  );
}

export default StockRow;