import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    cardRoot: {
        minWidth: 275,
    },
}));

export default function Favourites(props) {

    const { someVariable1, recipes, favIcon, handleEdit, handleDelete } = props
    const classes = useStyles()

    return (
        <div>
            <Grid container spacing={1}>
                {
                    someVariable1.map(id => {

                        const name = recipes[id].title

                        return <Grid item md={2} sm={12} xs={12} key={id}>
                            <Card className={classes.classRoot} variant="outlined" style={{ marginTop: "10px", minHeight: "200px", maxHeight: "200px", position: "relative" }}>
                                <CardContent>
                                    <Typography style={{ textAlign: "center" }} variant="h5" component="h2" >
                                        {name + "  "}
                                    </Typography>
                                    {
                                        favIcon(id)
                                    }
                                </CardContent>
                                <CardActions style={{ position: "absolute", bottom: "0" }}>
                                    <Link style={{ textDecoration: "none" }} to={`/recipes/${id}`}>
                                        <Button size="small" color="primary" >
                                            Learn More
                                        </Button>
                                    </Link>

                                    <Link to="/addItem">
                                        <IconButton onClick={() => handleEdit(id)}>
                                            <EditIcon fontSize="small" style={{ color: "blue" }}></EditIcon>
                                        </IconButton>
                                    </Link>

                                    <IconButton onClick={() => handleDelete(id)}>
                                        <DeleteIcon fontSize="small" style={{ color: "red" }}></DeleteIcon>
                                    </IconButton>

                                </CardActions>
                            </Card>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    )
}
