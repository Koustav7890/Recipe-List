import { React, useEffect, useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
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

export default function AddItem(props) {

    const [ingredients, setIngredients] = useState({ names: [] })
    const [title, setTitle] = useState("")
    const [instructions, setInstructions] = useState("")
    const classes = useStyles()
    const history = useHistory()

    useEffect(() => {
        console.log(props.currentId)

        const currentId = props.currentId

        if (currentId !== "") {
            setTitle(props.recipes[currentId].title)
            setInstructions(props.recipes[currentId].instructions)
            setIngredients({ names: [...props.recipes[currentId].ingredients] })
        }

    }, [props.recipes, props.currentId])

    function createList() {
        return ingredients.names.map((element, index) =>
            <div key={index}>
                <TextField required id="outlined-basic" placeholder="Add Ingredient" variant="filled" value={element || ""} onChange={handleChange.bind(index)} />
                <IconButton aria-label="delete" onClick={removeClick.bind(index)} color="secondary">
                    <DeleteIcon />
                </IconButton>
            </div>
        )
    }

    function handleChange(event) {
        let name = [...ingredients.names]
        name[this] = event.target.value
        setIngredients({ names: name })
    }

    const addClick = () => {
        setIngredients({ names: [...ingredients.names, ""] })
    }

    function removeClick() {
        let name = [...ingredients.names]
        name.splice(this, 1)
        //console.log(name)
        setIngredients({ names: [...name] })
    }

    const handleSubmit = event => {
        //alert(title)
        event.preventDefault()
        props.addItem(title, ingredients.names, instructions)

        if (props.errorCode === 0)
            history.push("/")
    }

    const handleTitleChange = event => {
        setTitle(event.target.value)
    }

    const handleInstructionChange = event => {
        setInstructions(event.target.value)
    }

    return (
        <Router>
            <div className={classes.wholeBody}>
                <div>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <h2>Title:</h2>
                        <TextField required id="Title" value={title} variant="filled" onChange={handleTitleChange} placeholder="Title" />
                        <h2>Ingredients:</h2>
                        {createList()}
                        <IconButton onClick={addClick}>
                            <AddCircleIcon></AddCircleIcon>
                        </IconButton>
                        <h2>Instructions:</h2>
                        <TextField
                            required
                            id="outlined-multiline-static"
                            multiline
                            rows={10}
                            placeholder="How to Cook ?"
                            variant="filled"
                            className={classes.ingredientText}
                            onChange={handleInstructionChange}
                            value={instructions}
                        />
                        <br />
                        <br />
                        <Button type="submit">
                            Save<SaveIcon />
                        </Button>

                    </form>
                </div>
            </div>
        </Router>
    )
}
