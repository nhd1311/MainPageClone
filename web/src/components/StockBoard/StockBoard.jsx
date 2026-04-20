import { useState, useMemo, useEffect, useRef } from 'react';
import StockRow from '../StockRow/StockRow';
import { useStocks } from '../../controllers/useStocks';
import { useLang } from '../../context/LanguageContext';
import './StockBoard.scss';

function SortIcon({ dir }) {
  if (dir === 'asc')  return <span className="sort-icon">↑</span>;
  if (dir === 'desc') return <span className="sort-icon">↓</span>;
  return <span className="sort-icon sort-icon--idle">⇅</span>;
}

function SortableTh({ children, col, sortConfig, onSort, rowSpan, className }) {
  const active = sortConfig.col === col;
  return (
    <th
      rowSpan={rowSpan}
      className={`${className} sortable${active ? ' sort-active' : ''}`}
      onClick={() => onSort(col)}
    >
      {children}
      <SortIcon dir={active ? sortConfig.dir : null} />
    </th>
  );
}

function TableHeader({ sb, sortConfig, onSort }) {
  return (
    <thead className="stock-board__thead">
      <tr className="stock-board__thead-group">
        <th rowSpan={2} className="th-sticky th-base col-stock">{sb.stock}</th>

        <SortableTh col="ceiling" sortConfig={sortConfig} onSort={onSort} rowSpan={2} className="th-base col-small text-ceiling">
          {sb.ceiling}
        </SortableTh>
        <SortableTh col="floor" sortConfig={sortConfig} onSort={onSort} rowSpan={2} className="th-base col-small text-floor">
          {sb.floor}
        </SortableTh>
        <SortableTh col="ref" sortConfig={sortConfig} onSort={onSort} rowSpan={2} className="th-base col-small text-ref">
          {sb.ref}
        </SortableTh>

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
  const baseStocks = useStocks(activeTab);
  const { t } = useLang();

  const [sortConfig, setSortConfig] = useState({ col: null, dir: 'asc' });
  const [orderedStocks, setOrderedStocks] = useState(baseStocks);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const dragIdx = useRef(null);

  useEffect(() => {
    setOrderedStocks(baseStocks);
    setSortConfig({ col: null, dir: 'asc' });
  }, [baseStocks]);

  const handleSort = (col) => {
    setSortConfig((prev) => {
      if (prev.col !== col) return { col, dir: 'asc' };
      if (prev.dir === 'asc') return { col, dir: 'desc' };
      return { col: null, dir: 'asc' };
    });
  };

  const displayedStocks = useMemo(() => {
    if (!sortConfig.col) return orderedStocks;
    return [...orderedStocks].sort((a, b) =>
      sortConfig.dir === 'asc'
        ? a[sortConfig.col] - b[sortConfig.col]
        : b[sortConfig.col] - a[sortConfig.col]
    );
  }, [orderedStocks, sortConfig]);

  const isDraggable = !sortConfig.col;

  const handleDragStart = (index) => { dragIdx.current = index; };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIdx(index);
  };

  const handleDrop = (dropIndex) => {
    if (dragIdx.current === null || dragIdx.current === dropIndex) {
      setDragOverIdx(null);
      return;
    }
    const next = [...orderedStocks];
    const [moved] = next.splice(dragIdx.current, 1);
    next.splice(dropIndex, 0, moved);
    setOrderedStocks(next);
    dragIdx.current = null;
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    dragIdx.current = null;
    setDragOverIdx(null);
  };

  return (
    <div className="stock-board">
      <div className="stock-board__table-wrap">
        <table className="stock-board__table">
          <TableHeader sb={t.stockBoard} sortConfig={sortConfig} onSort={handleSort} />
          <tbody>
            {displayedStocks.map((stock, index) => (
              <StockRow
                key={stock.symbol}
                stock={stock}
                draggable={isDraggable}
                isDragOver={isDraggable && dragOverIdx === index}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={handleDragEnd}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockBoard;
