import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { ErrorProvider } from './ErrorContext';
import './i18n';
import ItemCreation from './modules/items/create/ItemCreation';
import ItemEdit from './modules/items/edit/ItemEdit';
import ItemList from './modules/items/list/ItemList';
import ItemView from './modules/items/view/ItemView';

const App = () => {
  return (
    <ErrorProvider>
      <Box sx={{ p: 5 }}>
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/view/:itemId" element={<ItemView />} />
          <Route path="/create" element={<ItemCreation />} />
          <Route path="/edit/:itemId" element={<ItemEdit />} />
        </Routes>
      </Box>
    </ErrorProvider>
  );
};

export default App;
