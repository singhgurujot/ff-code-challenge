import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import './Styles/Navbar.css'
const Navbar = ({onChangehandler}:any) => {

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className='header'>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Where in the world?
          </Typography>
          <Button color="inherit"><DarkModeOutlinedIcon/> Dark Mode</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar;