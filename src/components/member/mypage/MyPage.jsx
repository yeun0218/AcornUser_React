import { Route, Routes } from 'react-router-dom';
import MyPageView from './MyPageView';

function App() {
  return (
    <div className="App">
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/" element={<MyPageView/>} />
        {/* <Route path="/customer/:customerId/edit" element={<CustomerDetail/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
