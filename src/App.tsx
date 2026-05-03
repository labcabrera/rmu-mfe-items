import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NotFound } from '@labcabrera-rmu/rmu-react-shared-lib';
import { ErrorProvider } from './ErrorContext';
import ItemCreation from './modules/items/create/ItemCreation';
import ItemEdit from './modules/items/edit/ItemEdit';
import ItemList from './modules/items/list/ItemList';
import ItemView from './modules/items/view/ItemView';

const App = () => {
  return (
    <ThemeProvider theme={useTheme()}>
      <ErrorProvider>
        <Box>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/view/:itemId" element={<ItemView />} />
            <Route path="/create" element={<ItemCreation />} />
            <Route path="/edit/:itemId" element={<ItemEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </ErrorProvider>
    </ThemeProvider>
  );
};

export default App;
