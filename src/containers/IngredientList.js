import React, {Component} from 'react';

export default class IngredientList extends Component {
  constructor(props){
    super(props)

    this.state = {
      Ingredients:['']
    }
  }

  addIngredient = (event) => {
    event.preventDefault()
    const ingredientArr = this.state.Ingredients

    ingredientArr.push('')

    this.setState({Ingredients: ingredientArr})
  }

//function to check for enter key stroke
  keyCheck = (event) => {
    if(event.keyCode === 13){
      this.addIngredient(event)
    }
  }

  ingredientInput = (event) => {
    const target = event.target
    const index = target.id.split('_')[1]
    const ingredientArr = this.state.Ingredients
    ingredientArr[index] = target.value

    this.setState({Ingredients:ingredientArr})
  }

  removeIngredient = (event) => {
    event.preventDefault()
    const target = event.target
    const index = target.id.split('_')[1]
    const ingredientArr = this.state.Ingredients

    ingredientArr.splice(index, 1)

    this.setState({Ingredients: ingredientArr})
  }
  render () {
    console.log(this.state.Ingredients[0])

    const IngredientItems = this.state.Ingredients.map((ingredient, i, array) => {
      console.log(`test`)
      console.log(`index is ${i}, element is ${ingredient}, array is ${array}`)
      if(typeof this.state.Ingredients[i] == 'undefined' || i === array.length-1 ){
        return (
          <li id={`ingredient_${i}`}>
              <input id={`ingredient_${i}_input`} value={ingredient} onKeyDown={this.keyCheck} onChange={this.ingredientInput}/>
              <button onClick={this.addIngredient}> + </button>
          </li>
        )
      }else {
        return (
           <li id={`ingredient_${i}`}>
            <p> {ingredient} </p>
            <button id={`ingredient_${i}_btn`} onClick={this.removeIngredient}> - </button>
          </li>
        )
      }
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