import React from 'react'
import { RecipeForm, RecipeList } from './index'

export default class Dashboard extends React.Component {
    constructor(props){
        super()
        this.state = {
            displayRecipeList: true,
            displayRecipeForm: false,
            
        }
    }

    toggleRecipeList = () => {
        this.setState({
            displayRecipeList: !this.state.displayRecipeList
        })
    }

    toggleRecipeForm = () => {
        this.setState({
            displayRecipeForm: !this.state.displayRecipeForm
        })
    }

    render(){
        return (
            <div>
                <button onClick={this.toggleRecipeList}> Recipe List</button>
                <button onClick ={this.toggleRecipeForm}> Add Recipe </button>
                {this.state.displayRecipeForm && <RecipeForm/>}
                {this.state.displayRecipeList && <RecipeList/>}
            </div>
        )
    }
}
