import React, { ChangeEvent, FunctionComponent, useState } from 'react';

import '@assets/styles/App.scss';

const App: FunctionComponent = () => {
  const [query, setQuery] = useState('');

  const updateQuery = (e: ChangeEvent<HTMLTextAreaElement>): void => setQuery(e.target.value);

  return (
    <>
      <h1>SQL Query Executor</h1>
      <div>
        <div id='query-input-form'>
          <label htmlFor='input-query'>Query</label>
          <textarea id='input-query' onChange={updateQuery}>
            {query}
          </textarea>
        </div>
        <button>Execute</button>
      </div>
      <div className='container'>
        <table>
          <thead>
            <tr>
              <th>employeeID</th>
              <th>lastName</th>
              <th>firstName</th>
              <th>title</th>
              <th>titleOfCourtesy</th>
              <th>birthDate</th>
              <th>hireDate</th>
              <th>address</th>
              <th>city</th>
              <th>region</th>
              <th>postalCode</th>
              <th>country</th>
              <th>homePhone</th>
              <th>extension</th>
              <th>photo</th>
              <th>notes</th>
              <th>reportsTo</th>
              <th>photoPath</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Davolio</td>
              <td>Nancy</td>
              <td>Sales Representative</td>
              <td>Ms.</td>
              <td>1948-12-08 00:00:00.000</td>
              <td>1992-05-01 00:00:00.000</td>
              <td>507 20th Ave. E. Apt. 2A</td>
              <td>Seattle</td>
              <td>WA</td>
              <td>98122</td>
              <td>USA</td>
              <td>(206) 555-9857</td>
              <td>5467</td>
              <td>
                0x151C2F00020000000D000E0014002100FFFFFFFF4269746D617020496D616765005061696E742E506963747572650001050000020000000700000050427275736800000000000000000020540000424D20540000000000007600000028000000C0000000DF0000000100040000000000A0530000CE0E0000D80E0000000000
              </td>
              <td>
                Education includes a BA in psychology from Colorado State University in 1970. She also completed The Art
                of the Cold Call. Nancy is a member of Toastmasters International.
              </td>
              <td>2</td>
              <td>http://accweb/emmployees/davolio.bmp</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
