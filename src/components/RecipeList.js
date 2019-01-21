import React from 'react';
import { connect } from "react-redux";
import { getRecipesList } from '../redux/selectors';
import * as axios from 'axios';
import API_URL from '../config';
import { getAllRecipes } from '../redux/actions/recipe'
import { RecipeEntry } from '.';

class RecipeList extends React.Component{

    //simple getter function that sends an api call to get all Recipes, then passes it to state.
    get = () => {
        axios.get(API_URL + '/recipes')
            .then(res =>this.props.getAllRecipes(res))
            .catch(error => console.log(error))
    }

    //getter func is called when the component will mount
    componentWillMount() {
        this.get()
    }

    render(){
        return (
            <ul>
                {this.props.recipes.map(recipe => <RecipeEntry recipe={recipe}/>)} 
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
export default connect(mapStateToProps, { getAllRecipes })(RecipeList)