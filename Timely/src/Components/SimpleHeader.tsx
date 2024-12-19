import appIcon from "../assets/timely.png";
import {IconButton, Toolbar} from "@mui/material";

function SimpleHeader(){
    return (
        <Toolbar>
            <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                <img src={appIcon} alt="App Icon" style={{ width: 64, height: 64, borderRadius: '50%' }} />
            </IconButton>
        </Toolbar>
);
}

export default SimpleHeader;