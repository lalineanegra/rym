import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2)
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    banner: {
      alignContent: 'bottom',
      margin: '0 auto'
    },
    toolText:{
      padding: '1em'
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    root: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
    circ: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    }
  }));

  export const bounce = {
    y : {
        duration: 0.2,
        yoyo: 3,
        ease: 'easeOut'
    }
}