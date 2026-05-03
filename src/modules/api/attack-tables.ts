import { attackTablesUrl } from '../services/config';

export async function fetchAttackTables(): Promise<string[]> {
  const url = `${attackTablesUrl}/attack-tables`;
  const response = await fetch(url, { method: 'GET' });
  return await response.json();
}

export async function fetchFumbleTables(): Promise<string[]> {
  const url = `${attackTablesUrl}/fumble-tables`;
  const response = await fetch(url, { method: 'GET' });
  return await response.json();
}
