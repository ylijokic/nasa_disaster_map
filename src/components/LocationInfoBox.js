import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const LocationInfoBox = ({ info, updateActive, active }) => {
    const classes = useStyles();

    return (
        <div className={active ? "location-info" : ""}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <h2>Hazardous Event Info:</h2>
                    <ul>
                        <li>ID: <strong>{ info.id }</strong></li>
                        <li>TITLE: <strong>{ info.title }</strong></li>
                    </ul>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={updateActive}>Close</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default LocationInfoBox
