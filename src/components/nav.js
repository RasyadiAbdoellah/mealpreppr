import React from 'react';
import { NavLink } from 'react-router-dom';

export default function (props) {
  return (
    <nav>
      <NavLink to='/recipes'>My Recipes</NavLink>
      <NavLink to='/recipes/new'>Add Recipe</NavLink>
    </nav>
  )
}