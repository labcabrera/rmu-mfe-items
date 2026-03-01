import { getAuthHeaders } from '../services/auth-token-service';
import { apiCoreUrl } from '../services/config';
import { buildErrorFromResponse } from './api-errors';
import { NamedEntity } from './common.dto';

export async function fetchRealm(realmId: string): Promise<NamedEntity> {
  const url = `${apiCoreUrl}/realms/${realmId}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchRealms(rsql: string, page: number, size: number): Promise<NamedEntity[]> {
  const url = `${apiCoreUrl}/realms?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const pageContent = await response.json();
  return pageContent.content;
}
