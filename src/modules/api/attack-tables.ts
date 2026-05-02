import { getAuthHeaders } from '../services/auth-token-service';
import { attackTablesUrl } from '../services/config';

export async function fetchAttackTables(): Promise<string[]> {
  const url = `${attackTablesUrl}/attack-tables`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    // throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchFumbleTables(): Promise<string[]> {
  const url = `${attackTablesUrl}/fumble-tables`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    // throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}
