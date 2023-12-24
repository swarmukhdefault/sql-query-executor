/* eslint-disable no-restricted-syntax */
export enum DataSource {
  CATEGORIES = 'CATEGORIES',
  CUSTOMERS = 'CUSTOMERS',
  EMPLOYEES = 'EMPLOYEES',
  PRODUCTS = 'PRODUCTS',
  SUPPLIERS = 'SUPPLIERS'
}

export interface ParsedDataSource {
  dataSource: DataSource;
  fields: string[] | 'all';
}
