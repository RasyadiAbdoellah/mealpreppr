import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom'

import { RecipeForm } from '.';
import { clearRecipe } from '../redux/actions/recipe'



// RecipeList is visually going to be a card, or rectangular box, with the recipe name and details, and full info that expands or opens a RecipeEntry component in new view on click
// expanded view will reveal an edit and delete button
// edit button toggles the JSX fragment shown 
class RecipeDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
            showInput: false
        }
    }

    toggleEdit = () => {
        this.setState({ showInput: !this.state.showInput })
    }

    render(){
        const { recipe, match } = this.props
        // fragment rendered is changed depending on the local showInput state
        let fragment;
        if(recipe && (recipe.id === +match.params.id)){
            fragment = (
            <>
                {(match.params.id !== 'new' && <Link to={`${match.url}/edit`}> Edit </Link>)}
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
                <div>{recipe.details}</div>
            </>
            )
        } else if(match.params.id ==='new') {
            fragment = <RecipeForm id={match.params.id}/>
        } else {
            fragment = null
        }
        
        return (
            <div id='detail'>
                <Link to='/recipes' type='button'> X </Link>
                <Switch>
                    <Route exact path={`${match.url}`} render={props => {
                        return ( 
                           fragment
                       )
                    }}/>
                    <Route path={`${match.url}/edit`} render={props=> {
                        return (
                            <>
                                <Link to={`${match.url}`}> Cancel </Link>
                                <RecipeForm id={match.params.id} toggle={this.toggleEdit}/>
                            </>
                        )
                    }}/>
                </Switch>
            </div>
        )
    }
}

export default connect(null, { clearRecipe })(RecipeDetail)
