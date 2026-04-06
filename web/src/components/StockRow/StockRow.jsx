import {
  getPriceClass,
  getChangeClass,
  formatPrice,
  formatVol,
  formatChange,
  formatPct,
} from '../../controllers/stockController';

// Tính class highlight cho cả dòng (nền tím/xanh khi giá trần/sàn)
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

      {/* ── Cột cơ bản ─────────────────────────────── */}
      <td className="th-sticky col-symbol">{stock.symbol}</td>
      <td className="col-small text-ceiling">{formatPrice(ceiling)}</td>
      <td className="col-small text-floor">{formatPrice(floor)}</td>
      <td className="col-small text-ref">{formatPrice(ref)}</td>

      {/* ── Dư mua — bid[2] → bid[1] → bid[0] ─────── */}
      <td className={`col-price ${getPriceClass(bid[2]?.price, ref, ceiling, floor)}`}>
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

      {/* ── Khớp lệnh ──────────────────────────────── */}
      <td className={`col-price ${matchedClass}`}>{formatPrice(matched.price)}</td>
      <td className="col-vol">{formatVol(matched.vol)}</td>
      <td className={`col-change ${changeClass}`}>{formatChange(matched.change)}</td>
      <td className={`col-change ${changeClass}`}>{formatPct(matched.pctChange)}</td>

      {/* ── Dư bán — ask[0] → ask[1] → ask[2] ─────── */}
      <td className={`col-price ${getPriceClass(ask[0]?.price, ref, ceiling, floor)}`}>
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

      {/* ── Tổng KL + Giá thống kê ─────────────────── */}
      <td className="col-vol">{formatVol(stock.totalVol)}</td>
      <td className="col-price">{formatPrice(stock.avg)}</td>
      <td className="col-price">{formatPrice(stock.low)}</td>
      <td className="col-price">{formatPrice(stock.high)}</td>
      <td className="col-price">{formatPrice(stock.open)}</td>

      {/* ── Nhà ĐTNN ───────────────────────────────── */}
      <td className="col-vol">{formatVol(stock.foreignBuy)}</td>
      <td className="col-vol">{formatVol(stock.foreignSell)}</td>

    </tr>
  );
}

export default StockRow;
