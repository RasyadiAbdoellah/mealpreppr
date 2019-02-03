import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { RecipeForm } from '.';
import { clearRecipe } from '../redux/actions/recipe'



// RecipeList is visually going to be a card, or rectangular box, with the recipe name and details, and full info that expands or opens a RecipeEntry component in new view on click
// expanded view will reveal an edit and delete button
// edit button toggles the JSX fragment shown 
class RecipeDetail extends React.Component{
    constructor(props){
        super()
        this.state = {
            isEditing: false
        }
    }

    toggleEdit = () => {
        this.setState({ isEditing: !this.state.isEditing })
    }

    render(){
        const { recipe } = this.props
        // fragment rendered is changed depending on the local isEditing state
        let fragment = this.state.isEditing ? (
            <>
                <RecipeForm id={recipe.id} toggle={this.toggleEdit}/>
            </>
        //ternary operator below is checks whether recipe is defined yet. if not, then nothing is rendered
        ) : ( !recipe ? null :(
            <>
                <p>Name:{recipe.name}</p>
                <p>ID: {recipe.id}</p>
                <p>Details: {recipe.details}</p>
                <ul>
                    {recipe.Ingredients && recipe.Ingredients.map(ingredient => (
                        <li key={ingredient.name}>
                            <p>{ingredient.val} {ingredient.scale} {ingredient.name}</p>
                        </li>
                    ))}
                </ul>
            </>
        )
        )
        
        return (
            <div id='recipe'>
                <Link to='/recipes' type='button'> X </Link>
                <button onClick={this.toggleEdit}> Edit </button>
                {fragment}
            </div>
        )
    }
}

export default connect(null, { clearRecipe })(RecipeDetail)
