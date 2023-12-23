import { DataSource } from '@utils/models';

import categories from './stubs/categories.json';

const DATA: Record<keyof typeof DataSource, any> = {
  CATEGORIES: categories
};

const MockServer = {
  getRecords: (dataSource: DataSource, fields: string[] | 'all'): Record<string, any> =>
    Promise.resolve(DATA[dataSource])
};

export default MockServer;
