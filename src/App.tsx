import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransactionsList } from './pages/TransactionsList';
import { TransactionDetail } from './pages/TransactionDetail';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.appWrapper}>
        <Routes>
          <Route path="/" element={<TransactionsList />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
