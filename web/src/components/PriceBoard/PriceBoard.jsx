import IndexTable from '../IndexTable/IndexTable';
import StockBoard from '../StockBoard/StockBoard';
import './PriceBoard.scss';

function PriceBoard() {
  return (
    <div className="price-board">
      <IndexTable />
      <StockBoard />
    </div>
  );
}

export default PriceBoard;
