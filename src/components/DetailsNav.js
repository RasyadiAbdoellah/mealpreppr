import React from 'react';
import { Link } from 'react-router-dom';

export default class DetailsNav extends React.Component {
  constructor(props){
    super()
    this.state = {
        showWarning: false,
    }
}
  
  warningHandler = () => {
    this.setState({showWarning: !this.state.showWarning})
  }
  
  render() {
    const { isForm = null, match:{params:{id}, url}, deleteSelectedRecipe } = this.props
    const { showWarning } = this.state
    return (
      <div>
        {!isForm ? <>
          <Link to='/recipes'> X </Link>
          <Link to={`${url}/edit`}> Edit </Link>
          <button onClick={() => this.warningHandler()}>Delete</button>
          { showWarning && <>
              <h4>Are you sure?</h4>
              <button onClick={() => deleteSelectedRecipe(id) }> yes </button>
              <button onClick={() => this.warningHandler()}> no </button>
          </>}        
        </> : <Link to={ id !== 'new' ? `${url}` : '/recipes'}> Cancel </Link> }
      </div>
    )
  }
}