import { DataSource, ParsedDataSource } from '@utils/models';

const SELECT_ALL_REGEX = /SELECT \* FROM ([\w]+)/i;

export const stringQueryParser = (query: string): ParsedDataSource => {
  if (SELECT_ALL_REGEX.test(query)) {
    const parsedAttributes = SELECT_ALL_REGEX.exec(query)!;
    const dataSource = DataSource[parsedAttributes[1].toLocaleUpperCase() as keyof typeof DataSource];

    if (dataSource) {
      return {
        dataSource,
        fields: 'all'
      };
    } else {
      throw new Error('Invalid DataSource');
    }
  } else {
    throw new Error('Invalid expression');
  }
};
