import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import fireDb from "../firebase.js";
import AddItem from "./AddItem";
import AllRecipes from "./AllRecipes";
import Recipes from './Recipes.js';
import Favourites from "./Favourites"
import MyNavbar from "./MyNavbar"

export default function Display() {

    const [errorCode, setErrorCode] = useState(0)
    const [recipes, setRecipes] = useState(0)
    const [currentId, setCurrentId] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [recipeId, setRecipeId] = useState({ ids: [] })

    useEffect(() => {
        //document.body.style.backgroundColor = '#1597bb'
        fireDb.child("Recipes").on("value", snapshot => {
            if (snapshot.val() !== null) {
                setRecipes({
                    ...snapshot.val()
                })
                //console.log(snapshot.val())
                const ids = []
                Object.keys(snapshot.val()).map(id => ids.push(id))
                setRecipeId({ ids: [...ids] })
            }
            else
                setRecipes({})
        })


    }, [])

    const addItem = (title, ingredients, instructions) => {

        if (ingredients.length === 0) {
            setErrorCode(1)
            alert("Add atleast 1 Ingredient")
            setErrorCode(0)
            return
        }

        const obj = {
            title: title,
            ingredients: ingredients,
            instructions: instructions,
            fav: true,
        }

        if (currentId === "") {
            fireDb.child("Recipes").push(obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        alert("Saved Successfully")
                }
            )
        }
        else {
            fireDb.child(`Recipes/${currentId}`).set(obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        alert("Saved Successfully")
                }
            )
        }

    }

    const handleEdit = (key) => {
        setCurrentId(key)
    };

    const handleDelete = (key) => {

        if (window.confirm("Are you sure you want to delete ?")) {
            fireDb.child(`Recipes/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                }
            )
        }

    }

    const filterOnChange = (event) => {

        console.log("hi from onChange", recipeId)

        setSearchValue(event.target.value)

    }

    /* *******************************IMPORTANT VARIABLE*************************************************** */


    const someVariable = recipeId.ids.filter(x => {
        return recipes[x].title.toLowerCase().includes(searchValue.toLowerCase())
    })

    someVariable.sort((a, b) => recipes[a].title.localeCompare(recipes[b].title))

    const someVariable1 = recipeId.ids.filter(x => {
        return (recipes[x].fav === false && recipes[x].title.toLowerCase().includes(searchValue.toLowerCase()))
    })

    someVariable1.sort((a, b) => recipes[a].title.localeCompare(recipes[b].title))

    /* *******************************IMPORTANT VARIABLE*************************************************** */

    const setFavourite = (id) => {

        recipes[id].fav = !recipes[id].fav

        fireDb.child(`Recipes/${currentId}`).set(recipes,
            err => {
                if (err)
                    console.log(err)
            }
        )

    }

    const favIcon = (id) => {
        if (recipes[id].fav)
            return <IconButton style={{ color: "#de3765" }} onClick={() => setFavourite(id)}><FavoriteBorderIcon /></IconButton>
        else
            return <IconButton style={{ color: "#de3765" }} onClick={() => setFavourite(id)}><FavoriteIcon /></IconButton>
    }

    const addItemFunc = () => {
        setCurrentId("")
    }

    return (
        <div>
            <Router>
                <MyNavbar {...{ addItemFunc, filterOnChange }} />
                <Switch >
                    <Route path="/" exact
                        render={
                            () => {
                                return <AllRecipes {...{ someVariable, recipes, favIcon, handleEdit, handleDelete }} />
                            }
                        }
                    >
                    </Route>

                    <Route path="/addItem" exact
                        render={
                            () => {
                                return <div>
                                    <AddItem  {...({ addItem, currentId, errorCode, recipes })} />
                                </div>
                            }
                        }
                    />
                    <Route path="/recipes/:id" exact
                        render={
                            (props) => {
                                return <Recipes {...props} />
                            }
                        }
                    />
                    <Route path="/liked" exact
                        render={
                            () => {
                                return <Favourites {...({ recipes, someVariable1, favIcon, handleEdit, handleDelete })} />
                            }
                        }
                    />
                </Switch>

            </Router>
        </div>
    )
}
