export const enum DataSource {
  CATEGORIES = 'CATEGORIES'
  // CUSTOMERS = "CUSTOMERS",
  // EMPLOYEES = "EMPLOYEES",
  // ORDER_DETAILS = "ORDER_DETAILS",
  // ORDERS = "ORDERS",
}

export interface ParsedDataSource {
  dataSource: DataSource;
  fields: string[] | 'all';
}
