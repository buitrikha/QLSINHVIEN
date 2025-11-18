import React, { useState } from 'react';
import SinhvienCrud from './components/SinhvienCrud';
import GiangvienCrud from './components/GiangvienCrud';
import MonhocCrud from './components/MonhocCrud';
import ReportCrud from './components/ReportCrud';
import DangkyLophp from './components/DangkyLophp';

function App() {
  const [activeTab, setActiveTab] = useState('sinhvien');

  const tabs = [
    { id: 'sinhvien', label: 'Sinh viên', component: <SinhvienCrud /> },
    { id: 'giangvien', label: 'Giảng viên', component: <GiangvienCrud /> },
    { id: 'monhoc', label: 'Môn học', component: <MonhocCrud /> },
    { id: 'dangky', label: 'Đăng ký kỳ sau', component: <DangkyLophp /> },
    { id: 'report', label: 'Báo cáo', component: <ReportCrud /> }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f5f5f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <header style={{
        background: '#007bff',
        color: 'white',
        padding: '1.5rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Hệ thống Quản lý Sinh viên</h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Quản lý thông tin sinh viên, giảng viên, môn học và báo cáo</p>
      </header>

      <nav style={{
        background: 'white',
        borderBottom: '1px solid #ddd',
        padding: '0 2rem',
        display: 'flex',
        gap: '0.5rem'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '1rem 1.5rem',
              background: activeTab === tab.id ? '#007bff' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#333',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid #0056b3' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: activeTab === tab.id ? '600' : '400',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {tabs.find(tab => tab.id === activeTab)?.component}
      </main>

      <footer style={{
        background: '#343a40',
        color: 'white',
        padding: '1.5rem 2rem',
        textAlign: 'center',
        marginTop: '3rem'
      }}>
        <p style={{ margin: 0 }}>© 2024 Hệ thống Quản lý Sinh viên</p>
      </footer>
    </div>
  );
}

export default App;
