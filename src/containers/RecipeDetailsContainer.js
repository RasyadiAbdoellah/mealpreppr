import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom'

import { RecipeForm, RecipeDetails } from '../components';
import { getRecipeById } from '../redux/selectors'



// RecipeList is visually going to be a card, or rectangular box, with the recipe name and details, and full info that expands or opens a RecipeEntry component in new view on click
// expanded view will reveal an edit and delete button
// edit button toggles the JSX fragment shown 
class Details extends React.Component{
    render(){
        const { recipe, match } = this.props
        console.log(match, recipe)
        // fragment rendered is changed depending on the local showInput state
        return (
            <div id='detail'>
                <Link to='/recipes' type='button'> X </Link>
                <Switch>
                    <Route exact path='/recipes/new' render={() => {
                        return (
                            <>
                                <Link to='/recipes'> Cancel </Link>
                                <RecipeForm id='new' />
                            </>
                        )
                    }}/>
                    <Route exact path={`${match.url}`} render={() => {
                        //RecipeDetails needs the parent match prop since 
                        return ( 
                            <>
                                {/* Match.url below should be /recipes/:id so the Link to should = recipes/1/edit when done correctly */}
                                <Link to={`${match.url}/edit`}> Edit </Link>
                                <RecipeDetails id={match.params.id} recipe={recipe} /> 
                            </>
                       )
                    }}/>
                    <Route path={`${match.url}/edit`} render={props=> {
                        return (
                            <>
                                <Link to={`${match.url}`}> Cancel </Link>
                                <RecipeForm id={match.params.id} />
                            </>
                        )
                    }}/>
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state, { match }) {
    const { id } = match.params
    const recipe = getRecipeById(state, id)
    console.log(recipe)
    return { recipe }
}

export default connect(mapStateToProps)(Details)
