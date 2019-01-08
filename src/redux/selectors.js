export const getStateRecipes = store => store.recipes

export const getRecipeIds = store => ( getStateRecipes(store) ? getStateRecipes(store).allIds : [] )

export const getRecipeById = (store, id) => ( getStateRecipes(store) ? getStateRecipes(store).byId[id] : {} )

export const getRecipesList = (store) => getRecipeIds(store).map(id => getRecipeById(store, id))