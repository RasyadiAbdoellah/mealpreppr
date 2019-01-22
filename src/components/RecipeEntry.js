import React from 'react';
import { RecipeForm } from '.';


// RecipeEntry is visually going to be a card, or rectangular box, with the recipe name and details, and full info that expands or opens in new view on click
// expanded view will reveal an edit and delete button
// edit button toggles the JSX fragment shown 
export default class RecipeEntry extends React.Component{
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
        // future versions may instead pass the recipe id to a selectedRecipe key in the redux store, which will then trigger a secondary view to appear.
        let fragment = this.state.isEditing ? (
            <>
                <RecipeForm id={recipe.id} />
            </>
        ) : (
            <>
                <p>Name:{recipe.name}</p>
                <p>ID: {recipe.id}</p>
            </>
        )
        
        return (
            <li key={recipe.id}>
                <button onClick={this.toggleEdit}> Edit </button>
                {fragment}
            </li>
        )
    }
}