
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home/Home/';
import Discipline from '../pages/Discipline/Discipline/';
import Page from '../pages/Page/Page';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discipline" element={<Discipline />} />
        <Route path="/page" element={<Page />} />

    </Routes>
);

export default AppRoutes;
