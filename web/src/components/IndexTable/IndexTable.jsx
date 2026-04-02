import IndexCard from '../IndexCard/IndexCard';
import {
  getAllData,
  getCardData,
  formatIndexValue,
  formatIndexChange,
  formatKLGD,
  getIndexClass,
} from '../../controllers/indexController';
import './IndexTable.scss';

function MarketSummary() {
  const indices = getAllData();

  return (
    <table className="index-table__summary-table">
      <thead className="index-table__summary-thead">
        <tr>
          <th className="mc-col--name">Chỉ số chính</th>
          <th className="mc-col--val" colSpan={2}>+ / - ▾</th>
          <th className="mc-col--num">KLGD (Triệu)</th>
          <th className="mc-col--num">GTGD (Tỷ)</th>
          <th className="mc-col--ud" colSpan={3}>CK Tăng/Giảm</th>
        </tr>
      </thead>
      <tbody className="index-table__summary-tbody">
        {indices.map((idx) => {
          const colorClass = getIndexClass(idx.pctChange);
          return (
            <tr key={idx.name}>
              <td className={`mc-col--name ${colorClass}`}>{idx.name}</td>
              <td className={`mc-col--num ${colorClass}`}>{formatIndexValue(idx.value)}</td>
              <td className={`mc-col--pct ${colorClass}`}>{formatIndexChange(idx.pctChange)}</td>
              <td className="mc-col--num">{formatKLGD(idx.klgd)}</td>
              <td className="mc-col--num">{formatKLGD(idx.gtgd)}</td>
              <td className="mc-col--ud">
                <span className="index-table__up">↑ {idx.up}</span>
              </td>
              <td className="mc-col--ud">
                <span className="index-table__ref">{idx.ref}</span>
              </td>
              <td className="mc-col--ud">
                <span className="index-table__down">↓ {idx.down}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function IndexTable() {
  const cardIndices = getCardData();

  return (
    <div className="index-table">
      <div className="index-table__cards">
        {cardIndices.map((index) => (
          <IndexCard key={index.name} data={index} />
        ))}
      </div>
      <div className="index-table__summary">
        <MarketSummary />
      </div>
    </div>
  );
}

export default IndexTable;
