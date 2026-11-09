import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MfeRoot, NotFound } from '@labcabrera-rmu/rmu-react-shared-lib';

// Workspace spec 091, E1: every page is its own chunk; the Suspense is in MfeRoot / the shell layout.
const ItemFormPage = lazy(() => import('./modules/items/form/ItemFormPage'));
const ItemListPage = lazy(() => import('./modules/items/list/ItemListPage'));
const ItemViewPage = lazy(() => import('./modules/items/view/ItemViewPage'));

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
