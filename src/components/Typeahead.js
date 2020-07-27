import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-top: 50px;
  text-align: center;
  justify-content: center;
`

const Input = styled.input`
  border: 1px solid lightgray;
  border-radius: 3px;
  height: 30px;
  padding: 10px 5px;
  margin-right: 10px;
  outline: none;
  &:focus {
    border: 1px solid black;
  }
`;

const Button = styled.button`
  position: fixed;
  height: 30px;
  width: 70px;
  color: white;
  background-color: #4285F4;
  border: none;
  border-radius: 4px;
`;

const Suggestions = styled.ul`
  position: fixed;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 270px;
  max-height: 100px;
  margin-top: 50px;
  margin-left: 75px;
  min-height: 50vh;
  box-shadow: 3px 3px 10px 2px lightgray;
  overflow-y: scroll;
`;

const Suggestion = styled.li`
  display: inline-block;
  line-height: 1.1;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f06292;
  }
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Italic = styled.span`
  font-style: italic;
  font-size: 14px;
`

const PurpleItalics = styled(Italic)`
  color: purple;
`

function Typeahead({ categories, suggestions, handleSelect }) {
  const [ input, setInput ] = React.useState('');

  let results = [];

  if (input.length >= 1) {
    results = suggestions.filter(suggestion => {
      const suggestionTitle = suggestion.title;

      if (suggestionTitle.toLowerCase().includes(input)) {
        let index = suggestionTitle.toLowerCase().search(input);

        let beforeTyped = suggestionTitle.slice(0, index);
        let typed = suggestionTitle.slice(index, index + input.length);
        let afterTyped = suggestionTitle.slice(index + input.length);

        console.log(index)

        const titleComponents = {
          before: beforeTyped,
          matched: typed,
          after: afterTyped
        }
        suggestion.titleComponents = titleComponents;

        return suggestion;
      }
      else return false;
    });
  }

  const handleChange = e => {
    const inputValue = e.target.value.toLowerCase();

    setInput(inputValue);
  }

  const handleSubmit = e => {
    if (e.key === 'Enter') handleSelect(e.target.value);
  }
  
  return (
    <Wrapper>
      <div>
        <Input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        />

        <Button onClick={() => setInput('')}>Clear</Button>
      </div>

    {results.length > 0 && (
      <Suggestions>
        {results.map(book => {
          return (
            <Suggestion
              key={book.id}
              onClick={() => handleSelect(book.title)}
            >
              <Bold>{book.titleComponents.before}</Bold>
              <span>{book.titleComponents.matched}</span>
              <Bold>{book.titleComponents.after}</Bold>
              <Italic> in </Italic>
              <PurpleItalics>{categories[book.categoryId].name}</PurpleItalics>
            </Suggestion>
          )
        })}
      </Suggestions>
    )}
    </Wrapper>
  )
}

export default Typeahead;