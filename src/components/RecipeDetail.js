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
        super(props)
        console.log(this.props)
        this.state = {
            
            showInput: false
        }
    }

    toggleEdit = () => {
        this.setState({ showInput: !this.state.showInput })
    }

    render(){
        const { recipe, match } = this.props
        console.log('recipeDetail state',this.state)
        console.log('recipeDetail props', this.props)
        // fragment rendered is changed depending on the local showInput state
        let fragment = (this.state.showInput || match.params.id === 'new') ? (
            <>
                <RecipeForm id={(recipe && match.params.id !== 'new') ? recipe.id : null} toggle={this.toggleEdit}/>
            </>
        //ternary operator below is checks whether recipe is defined yet. if not, then nothing is rendered
        ) : ( recipe ? (
            <>
                <h1>{recipe.name}</h1>
                <h2>Ingredients</h2>
                <ul className='ingredients'>
                    {recipe.Ingredients && recipe.Ingredients.map(ingredient => (
                        <li key={ingredient.name}>
                            <p>{ingredient.val} {ingredient.scale} {ingredient.name}</p>
                        </li>
                    ))}
                </ul>
                <h2>Instructions</h2>
                <p>{recipe.details}</p>
            </>
        ) : null
        )
        
        return (
            <div id='recipe-detail'>
                <Link to='/recipes' type='button'> X </Link>
                {(match.params.id !== 'new' && <button onClick={this.toggleEdit}> Edit </button>)}
                {fragment}
            </div>
        )
    }
}

export default connect(null, { clearRecipe })(RecipeDetail)
