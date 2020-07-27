import React from 'react';
import data from '../data';

import GlobalStyles from './GlobalStyles';
import Typeahead from './Typeahead';

function handleSelect(suggestion) {
  console.log(suggestion)
}

const App = () => {
  return (
    <>
      <GlobalStyles />
        <Typeahead
          suggestions={data.books}
          handleSelect={handleSelect}
          categories={data.categories}
        />
    </>
  )
};

export default App;
