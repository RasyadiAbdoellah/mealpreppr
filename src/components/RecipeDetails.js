import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom'

export default class RecipeDetails extends React.Component {
  constructor(){
    super()
    this.state = {
      showWarning:false
    }
  }
  render() {
    const {recipe, match:{params:{id}, url} } = this.props
    if(recipe && (recipe.id === +id)){
       return (
        <>
          <Link to='/recipes'> X </Link>
          <Link to={`${url}/edit`}> Edit </Link>
          <button onClick={() => {this.setState({showWarning: true})}}>Delete</button>
          { this.state.showWarning && <>
              <h4>Are you sure?</h4>
            </>
          }
          <h1>{recipe.name}</h1>
          <h2>Ingredients</h2>
          <ul className='ingredients'>
              {recipe.Ingredients && recipe.Ingredients.map(ingredient => (
                  <li className='ingredient-entry' key={ingredient.name}>
                      <span>{ingredient.val} {ingredient.scale} {ingredient.name}</span>
                  </li>
              ))}
          </ul>
          <h2>Instructions</h2>
          <div>{ReactHtmlParser(recipe.details)}</div>
        </>
      )
    } else {
      return null
    }
  }

}