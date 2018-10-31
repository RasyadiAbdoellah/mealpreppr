import React, {Component} from 'react';
import IngredientItem from '../components/IngredientItem'

export default class IngredientList extends Component {
  constructor(props){
    super(props)

    this.state = {
      Ingredients:[{
        name:'',
        RecipeIngredients:{
          val: '',
          scale:'',
        }
      }]
    }
  }

  addIngredient = (event) => {
    event.preventDefault()
    const ingredientArr = this.state.Ingredients

    ingredientArr.push({
      name:'',
      RecipeIngredients:{
        val:'',
        scale:'',
      }
    })

    this.setState({Ingredients: ingredientArr})
  }

//function to check for enter key stroke
  keyCheck = (event) => {
    if(event.keyCode === 13){
      this.addIngredient(event)
    }
  }

  ingredientInput = (event) => {
    const index = event.target.id.split('_')[1]
    const key = event.target.id.split('_')[2]
    const val = event.target.value
    const ingredientArr = this.state.Ingredients

    if(key === 'val' || key === 'scale'){
      ingredientArr[index].RecipeIngredients[key] = val
    } else {
      ingredientArr[index][key] = val
      
    }

    this.setState({Ingredients:ingredientArr})
  }

  removeIngredient = (event) => {
    event.preventDefault()
    const index = event.target.id.split('_')[1]
    const ingredientArr = this.state.Ingredients

    ingredientArr.splice(index, 1)

    this.setState({Ingredients: ingredientArr})
  }
  render () {
    
    const IngredientItems = this.state.Ingredients.map((ingredient, i, array) => {
      const returnValue = i === array.length-1 ? (
        <IngredientItem 
        value={ingredient.name} 
        keyCheck={this.keyCheck} 
        ingredientInput={this.ingredientInput}
        addIngredient={this.addIngredient}
        removeIngredient={this.removeIngredient}
        index={i}
        ingredient={ingredient}
        last
        />
      ):(
        <IngredientItem 
      value={ingredient.name} 
      keyCheck={this.keyCheck} 
      ingredientInput={this.ingredientInput}
      addIngredient={this.addIngredient}
      removeIngredient={this.removeIngredient}
      index={i}
      ingredient={ingredient}
      />
      );
      return returnValue
    })


    return (
      <div>
        <h2> Ingredients </h2>
        <ul>
          {IngredientItems}
        </ul>

      </div>
    )
  }
}