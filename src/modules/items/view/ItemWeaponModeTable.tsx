import React, { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { t } from 'i18next';
import { WeaponMode } from '../../api/item.dto';

const ItemWeaponModeTable: FC<{
  modes: WeaponMode[];
}> = ({ modes }) => {
  if (!modes || modes.length === 0) return <p>{t('no-modes') || 'No modes.'}</p>;

  return (
    <Box sx={{ mt: 2 }}>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table>
          <TableHead
            sx={{
              '& .MuiTableCell-root': {
                color: 'primary.main',
                fontWeight: 'bold',
              },
            }}
          >
            <TableRow>
              <TableCell>{t('attack-type')}</TableCell>
              <TableCell>{t('attack-types') || 'Attack types'}</TableCell>
              <TableCell>{t('attack-table')}</TableCell>
              <TableCell>{t('fumble-table')}</TableCell>
              <TableCell align="right">{t('size-adjustment')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modes.map((mode, idx) => (
              <TableRow key={idx}>
                <TableCell>{t(mode.type)}</TableCell>
                <TableCell>
                  {mode.attackTypes && mode.attackTypes.length > 0 ? mode.attackTypes.map((a) => t(a)).join(', ') : '-'}
                </TableCell>
                <TableCell>{t(mode.attackTable)}</TableCell>
                <TableCell>{t(mode.fumbleTable)}</TableCell>
                <TableCell align="right">{mode.sizeAdjustment ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ItemWeaponModeTable;
