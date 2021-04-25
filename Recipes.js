import { React, useEffect, useState } from 'react'
import fireDb from "../firebase.js"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { BrowserRouter as Router, Link, Route, useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({

    wholeBody: {
        textAlign: "center"
    },
    grow: {
        flexGrow: 1,
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    ingredientText: {
        width: "500px"
    }
}));


export default function Recipes({ match }) {

    const classes = useStyles()
    const history = useHistory()
    const [recipe, setRecipe] = useState(0)

    useEffect(() => {
        //document.body.style.backgroundColor = '#1597bb'
        fireDb.child("Recipes").on("value", snapshot => {
            //console.log(snapshot.val())
            if (snapshot.val() !== null)
                setRecipe({
                    ...snapshot.val()
                })
            else
                setRecipe({})
        })

    }, [])

    return (
        <div>
            <div className={[classes.wholeBody]}>
                {
                    Object.keys(recipe).map(id => {

                        if (id === match.params.id) {
                            const title = recipe[id].title

                            const ingredients = recipe[id].ingredients.map(e => {
                                return <li>{e}</li>
                            })

                            const instructions = recipe[id].instructions

                            return <div>
                                <h3>Title</h3>
                                {title}
                                <h3>Ingredients</h3>
                                {ingredients}
                                <h3>Instructions</h3>
                                {instructions}
                            </div>
                        }

                        return <div></div>
                    })

                }
            </div>
        </div>
    )
}
