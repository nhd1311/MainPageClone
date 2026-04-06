import TopBar from '../Topbar/Topbar';
import Navbar from '../NavBar/NavBar';
import BottomBar from '../BottomBar/BottomBar';
import './MainLayout.scss';

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <TopBar />
      <Navbar />
      <main className="main-layout__content">
        {children}
      </main>
      <BottomBar />
    </div>
  );
}

export default MainLayout;
