import React from 'react';
import { connect } from "react-redux";
import { getRecipesList } from '../redux/selectors';
import * as axios from 'axios';
import API_URL from '../config';
import { getAllRecipes, selectRecipe } from '../redux/actions/recipe'
import { RecipeItem } from '.';

function RecipeCard(props) {
    const { recipe, selectRecipe } = props
    return (
        <li key={recipe.id}>
        <button onClick={()=>selectRecipe(recipe.id)}>More</button>
            <p>Name:{recipe.name}</p>
            <p>ID: {recipe.id}</p>
        </li>
    )
}

class RecipeList extends React.Component{

    //simple getter function that sends an api call to get all Recipes, then passes it to state.
    get = () => {
        axios.get(API_URL + '/recipes')
            .then(res =>this.props.getAllRecipes(res))
            .catch(error => console.log(error))
    }

    selectRecipe = (id) => {
        this.props.selectRecipe(id)
    }

    //getter func is called when the component will mount
    componentWillMount() {
        this.get()
    }

    render(){
        return (
            <ul>
                {this.props.recipes.map(recipe => <RecipeCard recipe={recipe} selectRecipe={this.selectRecipe}/>)} 
            </ul>
        )
    }
}

//the state mapped to props.recipes is actually formatted through selectors.js
//getRecipesList returns an array of recipe objects
function mapStateToProps(state) {
    const recipes = getRecipesList(state)
    return { recipes } 
}

//exports the connected component
export default connect(mapStateToProps, { getAllRecipes, selectRecipe })(RecipeList)