import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { ErrorProvider } from './ErrorContext';
import './i18n';
// import NpcCreation from './modules/items/create/NpcCreation';
// import NpcEdit from './modules/items/edit/NpcEdit';
import ItemList from './modules/items/list/ItemList';
import ItemView from './modules/items/view/ItemView';

// import NpcView from './modules/items/view/NpcView';

const App = () => {
  return (
    <ErrorProvider>
      <Box sx={{ p: 5 }}>
        <Routes>
          <Route path="/" element={<ItemList />} />
          {/* <Route path="/create" element={<NpcCreation />} /> */}
          <Route path="/view/:itemId" element={<ItemView />} />
          {/* <Route path="/edit/:npcId" element={<NpcEdit />} /> */}
        </Routes>
      </Box>
    </ErrorProvider>
  );
};

export default App;
