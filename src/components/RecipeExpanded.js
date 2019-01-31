import React from 'react';
import { connect } from 'react-redux';
import { RecipeForm } from '.';
import { clearRecipe } from '../redux/actions/recipe'



// RecipeList is visually going to be a card, or rectangular box, with the recipe name and details, and full info that expands or opens a RecipeEntry component in new view on click
// expanded view will reveal an edit and delete button
// edit button toggles the JSX fragment shown 
class RecipeExpanded extends React.Component{
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
        console.log(recipe)
        // fragment rendered is changed depending on the local isEditing state
        // future versions may instead pass the recipe id to a selectedRecipe key in the redux store, which will then trigger a secondary view to appear.
        let fragment = this.state.isEditing ? (
            <>
                <RecipeForm id={recipe.id} toggle={this.toggleEdit}/>
            </>
        ) : (
            <>
                <p>Name:{recipe.name}</p>
                <p>ID: {recipe.id}</p>
                <p>Details: {recipe.details}</p>
                <ul>
                    {recipe.Ingredients.map(ingredient => (
                        <li key={ingredient.name}>
                            <p>{ingredient.val} {ingredient.scale} {ingredient.name}</p>
                        </li>
                    ))}
                </ul>
            </>
        )
        
        return (
            <li key={recipe.id}>
                <button onClick={this.toggleEdit}> Edit </button>
                <button onClick={this.props.clearRecipe}> Close </button>

                {fragment}
            </li>
        )
    }
}

export default connect(null, { clearRecipe })(RecipeExpanded)
