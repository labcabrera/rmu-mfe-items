import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MfeRoot, NotFound } from '@labcabrera-rmu/rmu-react-shared-lib';
import ItemFormPage from './modules/items/form/ItemFormPage';
import ItemListPage from './modules/items/list/ItemListPage';
import ItemViewPage from './modules/items/view/ItemViewPage';

const App = () => (
  <MfeRoot>
    <Routes>
      <Route path="/" element={<ItemListPage />} />
      <Route path="/view/:itemId" element={<ItemViewPage />} />
      <Route path="/create" element={<ItemFormPage mode="create" />} />
      <Route path="/edit/:itemId" element={<ItemFormPage mode="edit" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </MfeRoot>
);

export default App;
