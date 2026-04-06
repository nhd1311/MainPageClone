import { useState } from 'react';
import IndexCard from '../IndexCard/IndexCard';
import TabBar from '../TabBar/TabBar';
import StockBoard from '../StockBoard/StockBoard';
import './Dashboard.scss';



function Dashboard() {
  const [activeTab, setActiveTab] = useState('VN30');

  return (
    <div className="dashboard">
      <IndexCard />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <StockBoard activeTab={activeTab} />
    </div>
  );
}

export default Dashboard;
