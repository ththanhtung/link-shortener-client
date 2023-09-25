import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './page/Main';
import NotFound from '../../components/NotFound';

const Auth: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Auth;
