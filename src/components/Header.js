import { useState } from 'react'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/fire'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Map from './Map'
import Loader from './Loader'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Header = ({ loading, eventData }) => {
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mapTheme, setMapTheme] = useState("");

    const [state, setState] = useState({
      fire: true,
      volcano: true,
    });

    const handleDrawerOpen = () => {
        console.log(open)
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className="header">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                >
                <MenuIcon />
                </IconButton>
                <h1><Icon icon={locationIcon}/>Wildfire & Volcano Tracker (Powered by NASA)<Icon icon={locationIcon}/></h1>
            </Toolbar>
            <Drawer
                className="drawer"
                variant="persistent"
                anchor="left"
                open={open}
            >
            <div className="drawerHeader">
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
                    <Divider />
                    <List>
                      <ListItem>
                      <ListItemIcon><WhatshotIcon /></ListItemIcon>
                      <FormControlLabel
                        value="fire"
                        control={<Switch 
                          color="primary" 
                          checked={state.fire}
                          onChange={handleChange} 
                          name="fire"
                        />}
                        label="Fire Data"
                        labelPlacement="start"
                      />
                      </ListItem>
                      <Divider />
                      <ListItem>
                      <ListItemIcon><FilterHdrIcon /></ListItemIcon>
                      <FormControlLabel
                        value="volcano"
                        control={<Switch 
                          color="primary" 
                          checked={state.volcano}
                          onChange={handleChange} 
                          name="volcano"
                        />}
                        label="Volcano Data"
                        labelPlacement="start"
                      />
                      </ListItem>
                    </List>
                    <Divider />
                    <List>
                    {['Dark', 'Retro', 'Street'].map((text, index) => (
                        <ListItem button key={text}  onClick={() => setMapTheme(text)}>
                        <ListItemIcon>{index % 2 === 0 ? <WhatshotIcon /> : <FilterHdrIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
            </Drawer>
             <main
                className={clsx(classes.content, {
                [classes.contentShift]: open,
                })}
            >
                <div className="drawerHeader" />
                { !loading ? <Map eventData={eventData} switchState={state} theme={mapTheme}/> : <Loader/>}
            </main>
        </div>
    )
}

export default Header
