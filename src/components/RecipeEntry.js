import React from 'react';
import { RecipeForm } from '.';

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
        let fragment
        if(!this.state.isEditing){
            fragment = (
                <>
                    <p>Name:{recipe.name}</p>
                    <p>ID: {recipe.id}</p>
                </>
            )
        } else {
            fragment = (
                <>
                    <RecipeForm id={recipe.id} />
                </>
            )
        }
        return (
            <li key={recipe.id}>
                <button onClick={this.toggleEdit}> Edit </button>
                {fragment}
            </li>
        )
    }
}