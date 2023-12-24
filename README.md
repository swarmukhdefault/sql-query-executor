# SQL Query Executor

A web-based application (written in React) capable of running SQL queries and displaying the results of said query.

## Features

1. Run multiple queries through a tabbed interface
2. Take assistance from the in-built `Query Assistant` in generating SQL queries (_Limited functionality: only retrieval mode currently supported_)
3. Keep track of queries run in a tab through the `History` feature
4. Rudimentary support for SQL query parser through simple `RegEx`es

## Issues

1. **Incomplete:** Upon closing of a tab, sometimes no tab content is shown due to loss of focus
2. **Bug**: Regex for multiple fields currently only retrieves the first and the last field
3. **Bug**: `DataSource` value resets even though `Query Assistant` (through underlying modal) has an associated `resetOnClose: false` attribute passed to it