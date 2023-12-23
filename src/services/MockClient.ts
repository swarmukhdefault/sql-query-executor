import { DataSource } from '@utils/models';

import categories from './stubs/categories.json';
import customers from './stubs/customers.json';
import employees from './stubs/employees.json';
import products from './stubs/products.json';
import suppliers from './stubs/suppliers.json';

const DATA: Record<keyof typeof DataSource, any> = {
  CATEGORIES: categories,
  CUSTOMERS: customers,
  EMPLOYEES: employees,
  PRODUCTS: products,
  SUPPLIERS: suppliers
};

const MockClient = {
  getRecords: (dataSource: DataSource, fields: string[] | 'all'): Record<string, any> =>
    Promise.resolve(DATA[dataSource])
};

export default MockClient;
