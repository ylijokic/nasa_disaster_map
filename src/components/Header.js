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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 100,
    backgroundColor: '#777777',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
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
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        console.log(open)
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
            >
            <div className={classes.drawerHeader}>
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
                        control={<Switch color="primary" />}
                        label="Fire Data"
                        labelPlacement="start"
                      />
                      </ListItem>
                      <Divider />
                      <ListItem>
                      <ListItemIcon><FilterHdrIcon /></ListItemIcon>
                      <FormControlLabel
                        value="volcano"
                        control={<Switch color="primary" />}
                        label="Volcano Data"
                        labelPlacement="start"
                      />
                      </ListItem>
                    </List>
                    <Divider />
                    <List>
                    {['Dark Map', 'Satellite Map', 'Street Map'].map((text, index) => (
                        <ListItem button key={text}>
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
                <div className={classes.drawerHeader} />
                { !loading ? <Map eventData={eventData}/> : <Loader/>}
            </main>
        </div>
    )
}

export default Header
