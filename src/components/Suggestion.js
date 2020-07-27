import React from 'react';
import styled from 'styled-components';

const Suggestion = ({ book }) => {
  return (
    <li>{book.title}</li>
  )
}

export default Suggestion;