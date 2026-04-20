import { useState } from 'react';
import IndexTable from '../IndexTable/IndexTable';
import TabBar from '../TabBar/TabBar';
import StockBoard from '../StockBoard/StockBoard';
import './Dashboard.scss';



const COLLAPSE_STEPS = ['full', 'half', 'hidden'];

function Dashboard() {
  const [activeTab, setActiveTab] = useState('VN30');
  const [collapseStep, setCollapseStep] = useState(0);

  const handleCollapse = () => {
    setCollapseStep((prev) => (prev + 1) % COLLAPSE_STEPS.length);
  };

  return (
    <div className="dashboard">
      <div className={`dashboard__index-wrap dashboard__index-wrap--${COLLAPSE_STEPS[collapseStep]}`}>
        <IndexTable />
      </div>
      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapseStep={collapseStep}
        onCollapse={handleCollapse}
      />
      <StockBoard activeTab={activeTab} />
    </div>
  );
}

export default Dashboard;
