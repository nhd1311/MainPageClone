import {
  formatIndexValue,
  formatIndexChange,
  formatKLGD,
  getIndexClass,
  normalizeChartData,
} from '../../controllers/indexController';
import './IndexCard.scss';

function SparklineSVG({ chartData, refValue, colorClass }) {
  const W = 100;
  const H = 100;
  const PAD = { top: 6, bottom: 2, left: 0, right: 0 };

  const points = normalizeChartData(chartData);
  if (points.length === 0) return null;

  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const toX = (nx) => PAD.left + nx * chartW;
  const toY = (ny) => PAD.top + ny * chartH;

  const linePoints = points
    .map((p) => `${toX(p.x).toFixed(1)},${toY(p.y).toFixed(1)}`)
    .join(' ');

  const allValues = chartData.map((d) => d.value);
  const minV = Math.min(...allValues);
  const maxV = Math.max(...allValues);
  const range = maxV - minV || 1;
  const refY = toY(1 - (refValue - minV) / range);

  const lastPoint = points[points.length - 1];
  const lastX = toX(lastPoint.x);
  const lastY = toY(lastPoint.y);

  return (
    <svg
      className="index-card__svg"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
    >
      <line
        className="index-card__ref-line"
        x1={0} y1={refY}
        x2={W} y2={refY}
      />
      <polyline
        className={`index-card__line index-card__line--${colorClass}`}
        points={linePoints}
      />
      <circle
        cx={lastX} cy={lastY} r={2.5}
        className={`index-card__dot--${colorClass}`}
        style={{ fill: 'currentColor' }}
      />
    </svg>
  );
}

function TimeAxis({ chartData }) {
  return (
    <div className="index-card__axis">
      {chartData.map((d) => (
        <span key={d.time} className="index-card__axis-label">
          {d.time}
        </span>
      ))}
    </div>
  );
}

function IndexCard({ data }) {
  const colorClass = getIndexClass(data.pctChange);
  const lineClass  = colorClass.replace('text-', '');

  const volStr = data.totalVol
    ? data.totalVol.toLocaleString('en-US')
    : '0';

  return (
    <div className="index-card">

      <div className="index-card__chart">
        {data.chartData && (
          <>
            <div className="index-card__chart-area">
              <SparklineSVG
                chartData={data.chartData}
                refValue={data.refValue}
                colorClass={lineClass}
              />
              <span className="index-card__ref-value">
                {data.refValue.toFixed(2)}
              </span>
            </div>
            <TimeAxis chartData={data.chartData} />
          </>
        )}
      </div>

      <div className="index-card__info">
        <div className="index-card__name">
          {data.name}
          <span className="index-card__arrow">▾</span>
        </div>
        <div className="index-card__price-block">
          <span className={`index-card__value ${colorClass}`}>
            {data.change >= 0 ? '↑' : '↓'} {formatIndexValue(data.value)}
          </span>
          <span className={`index-card__change ${colorClass}`}>
            ({data.change > 0 ? '+' : ''}{data.change.toFixed(2)} {formatIndexChange(data.pctChange)})
          </span>
        </div>
      </div>

      <div className="index-card__stats">
        <span className="index-card__vol">
          <span>{volStr}</span> CP
        </span>
        <span className="index-card__gtgd">
          <span>{formatKLGD(data.gtgd)}</span> Tỷ
        </span>
      </div>

      <div className="index-card__footer">
        <div className="index-card__updown">
          <span className="index-card__up">↑{data.up}({data.upNew ?? 0})</span>
          <span className="index-card__neutral">{data.ref}</span>
          <span className="index-card__down">↓{data.down}({data.downNew ?? 0})</span>
        </div>
        {data.session && (
          <span className="index-card__session">{data.session}</span>
        )}
      </div>

    </div>
  );
}

export default IndexCard;
