import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './features/home';
import NotFound from './components/NotFound';
import './app/GlobalStyled.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
        </Route>

        {/* not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
