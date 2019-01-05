import React, {Component} from 'react';
import IngredientItem from '../presentational/IngredientItem'

export default class IngredientList extends Component {
  
  //function to check for enter key stroke
  keyCheck = (event) => {
    if(event.keyCode === 13){
      event.preventDefault()
    }
  }

  addIngredient = (event) => {
    event.preventDefault()
    const ingredientArr = this.props.Ingredients

    ingredientArr.push({
      name:'',
      val:'',
      scale:'',
    })
    this.props.onIngredientChange(ingredientArr)
  }

  ingredientInput = (event) => {
    const eventID = event.target.id.split('_')
    const index = eventID[1]
    const key = eventID[2]
    const val = event.target.value
    const ingredientArr = this.props.Ingredients

    ingredientArr[index][key] = val

    if(key === 'val' || key === 'scale'){
      ingredientArr[index][key] = val
    } else {
      
      
    }

    this.props.onIngredientChange(ingredientArr)
  }

  removeIngredient = (event) => {
    event.preventDefault()
    const index = event.target.id.split('_')[1]
    const ingredientArr = this.props.Ingredients

    ingredientArr.splice(index, 1)

    this.props.onIngredientChange(ingredientArr)
  }
  render () {
    
    const IngredientItems = this.props.Ingredients.map((ingredient, i, array) => {
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