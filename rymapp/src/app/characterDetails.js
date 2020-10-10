import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

import { useStyles } from './styles/styles';

export default function CharacterDet(props){
    const classes = useStyles();

    if(props.isLoading){
        return(
            <div className={classes.circ}>
                <CircularProgress />
            </div>
        )
    } else if(props.characterDetails !== null && props.characterDetails.results !== undefined){
        return(
            <React.Fragment>
                {props.characterDetails.results.map(res => (
                    <Grid item xs={12} sm={6} md={4} key={res.id}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={res.image}
                                title={res.name}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {res.name}
                                </Typography>
                                <ListItem button >
                                    <ListItemIcon>
                                        <EmojiObjectsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`Especie ${res.species?res.species: ''}`} />
                                </ListItem>
                                <ListItem button >
                                    <ListItemIcon>
                                        <FitnessCenterIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`Género ${res.gender?res.gender:'' }`} />
                                </ListItem>
                                <ListItem button >
                                    <ListItemIcon>
                                        <DirectionsRunIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`Origen ${res.origin.name?res.origin.name:'' }`} />
                                </ListItem>
                                <ListItem button >
                                     <ListItemIcon>
                                        <BatteryChargingFullIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`Status ${res.status?res.status: ''}`} />
                                </ListItem>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </React.Fragment>
        )
    } else {
        return(
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="bottom"
            >
                <h2>Tu búsqueda no arrojó resultados!</h2>
            </Grid>
        )
    }
}