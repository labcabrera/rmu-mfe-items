import { getAuthHeaders, mergeJsonHeaders } from '../services/auth-token-service';
import { apiItemsUrl } from '../services/config';
import { buildErrorFromResponse } from './api-errors';
import { Page } from './common.dto';
import { CreateItemDto, Item, UpdateItemDto } from './item.dto';

export async function fetchItem(itemId: string): Promise<Item> {
  const url = `${apiItemsUrl}/items/${itemId}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchItems(rsql: string, page: number, size: number): Promise<Item[]> {
  const url = `${apiItemsUrl}/items?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const pageContent = await response.json();
  return pageContent.content;
}

export async function fetchPagedItems(rsql: string, page: number, size: number): Promise<Page<Item>> {
  const url = `${apiItemsUrl}/items?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const pageContent = await response.json();
  return pageContent;
}

export async function createItem(item: CreateItemDto): Promise<Item> {
  const url = `${apiItemsUrl}/items`;
  const response = await fetch(url, {
    method: 'POST',
    headers: mergeJsonHeaders(),
    body: JSON.stringify(item),
  });
  if (response.status !== 201) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function updateItem(itemId: string, dto: UpdateItemDto): Promise<Item> {
  const url = `${apiItemsUrl}/items/${itemId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: mergeJsonHeaders(),
    body: JSON.stringify(dto),
  });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function deleteItem(itemId: string): Promise<void> {
  const url = `${apiItemsUrl}/items/${itemId}`;
  const response = await fetch(url, { method: 'DELETE', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  // delete endpoints commonly return an empty body; don't attempt to parse JSON
  return;
}
