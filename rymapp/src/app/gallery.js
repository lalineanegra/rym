import React, { useState, useEffect } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { motion } from "framer-motion"
import Typography from '@material-ui/core/Typography';

import { useStyles, bounce } from './styles/styles';
import { baseUrl } from '../common/baseUrl';
import CharacterDet from './characterDetails';

export default function Gallery(){
    const classes = useStyles();

    const [character, setHeroe] = useState('');
    const [characterDetails, setcharacterDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      handleSubmit()
    }, [])
  
    function handleChange(e){
      e.preventDefault();
      setHeroe(e.target.value);
    }
  
    function handleSubmit(){
      setIsLoading(true)
      fetch(baseUrl+character, {
        headers :{
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        }
      })
      .then(res => {
        if(res.ok){
          return res
        } else {
          alert('Error de conexión')
        }
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setcharacterDetails(res);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
      })
    }
    return( 
        <React.Fragment>
            <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <motion.div transition={ bounce } animate={{ y: ['0%', '-50%'] }}>
                <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Galería Rick & Morty
                </Typography>
                </motion.div>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                  ¡Busca tus personajes favoritos!
                </Typography>
            </Container>
            <Container maxWidth="sm" className={classes.banner}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="bottom"
                >
                <form className={classes.banner} onSubmit={ e => handleSubmit(e)} noValidate>
                    <FormControl>
                    <InputLabel htmlFor="component-simple">Nombre</InputLabel>
                    <Input id="component-simple" value={character} onChange={handleChange} />
                    </FormControl>
                    <FormControl alignItems="bottom" style={{"margin":"0em 3em 0em 3em"}}>
                    <motion.div  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} style={{'marginBottom': '0px', 'backgroundColor': '#d18419'}}>
                        Buscar
                        </Button>
                    </motion.div>
                    </FormControl>
                </form>
                </Grid>
            </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4} minHeight="500px">
                <CharacterDet
                characterDetails={characterDetails}
                isLoading={isLoading}
                />
            </Grid>
            </Container>
        </React.Fragment>
    )
}
