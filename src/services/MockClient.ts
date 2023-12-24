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
  getDataSources: async (): Promise<string[]> => await Object.values(DataSource),
  getFields: async (dataSource: DataSource): Promise<Record<string, string>> => await DATA[dataSource].schema,
  getRecords: async (dataSource: DataSource, fields: string[] | 'all'): Promise<Record<string, any>> =>
    (await fields) === 'all'
      ? DATA[dataSource].records
      : DATA[dataSource].records.map((record) =>
          Object.fromEntries(Object.entries(record).filter((entry) => fields.includes(entry[0])))
        )
};

export default MockClient;
