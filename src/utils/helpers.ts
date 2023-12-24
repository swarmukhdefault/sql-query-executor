import { DataSource, ParsedDataSource } from '@utils/models';

const SELECT_ALL_REGEX = /SELECT \* FROM ([\w]+)/i;
const SELECT_SPECIFIC_FIELDS_REGEX = /SELECT ([\w]+)(, ?[\w]+)* FROM ([\w]+)/i;

export const sqlQueryParser = (query: string): ParsedDataSource => {
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
  } else if (SELECT_SPECIFIC_FIELDS_REGEX.test(query)) {
    const parsedAttributes = SELECT_SPECIFIC_FIELDS_REGEX.exec(query);

    const fields = parsedAttributes!
      .slice(1, -1)
      .filter(Boolean)
      .map((field) => {
        if (field.startsWith(', ')) {
          return field.substring(2);
        } else if (field.startsWith(',')) {
          return field.substring(1);
        } else {
          return field;
        }
      });
    const dataSource = DataSource[parsedAttributes?.at(-1)?.toLocaleUpperCase() as keyof typeof DataSource];

    if (dataSource) {
      return {
        dataSource,
        fields
      };
    } else {
      throw new Error('Invalid DataSource');
    }
  } else {
    throw new Error('Invalid expression');
  }
};
