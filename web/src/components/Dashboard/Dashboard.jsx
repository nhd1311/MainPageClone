import { useState } from 'react';
import IndexTable from '../IndexTable/IndexTable';
import TabBar from '../TabBar/TabBar';
import StockBoard from '../StockBoard/StockBoard';
import './Dashboard.scss';



function Dashboard() {
  const [activeTab, setActiveTab] = useState('VN30');

  return (
    <div className="dashboard">
      <IndexTable />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <StockBoard activeTab={activeTab} />
    </div>
  );
}

export default Dashboard;
