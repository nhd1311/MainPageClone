import TopBar from '../Topbar/Topbar';
import Navbar from '../NavBar/NavBar';
import './MainLayout.scss';

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <TopBar />
      <Navbar />
      <main className="main-layout__content">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
