import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import BudgetInfo from "./ButgetInfo";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddCategory from "../../../modules/files/components/AddCategory/AddCategory";
import { useEffect, useState } from "react";
import { logout } from "../../../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../store/reducers/categoriesSlice";

const Budget = () => {

    const {email} = useSelector(state => state.user.user)
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchCategories())
    }, [])

    let navigate = useNavigate(); 

    const routeChange = () =>{ 
        let path = `/auth/login`; 
        navigate(path);
    }

    return(
        <Box>
            {open ? 
            <Box>
                 <Box className="overlay"
                 onClick={() => {setOpen(!open);}}
                sx={{
                    position: "fixed",
                    zIndex: "2000",
                    paddingTop: "100px",
                    left: "0",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                    backgroundColor: "rgba(0,0,0,0.4)",
                }}
                >
                    <Box className="modal" 
                    sx={{
                        p: 7,
                        pt: 3,
                        position: 'relative', 
                        borderRadius: "5px", 
                        backgroundColor: "#fefefe",
                        margin: "auto",
                        border: "1px solid #888",
                        width: "50%"
                    }}>
                        <Button onClick={() => {routeChange(); dispatch(logout())}}>Вийти</Button>
                    </Box>
                </Box>
            </Box> : null
            }
            <Box>
                <AppBar 
                    position="fixed">

                    <Toolbar sx={{
                        p: 0, 
                        flexGrow: 1}}>

                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            sx={{m: 0, p: 0.5}}
                            onClick={() => setOpen(true)}
                            >
                            
                                
                            <MenuIcon />
                        </IconButton>
                        
                        <Typography
                            sx={{ 
                                ml: 7, 
                                flexGrow: 1}}>

                            {email}
                        </Typography>
                        
                        <AddCategory />
                        
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{
                ml: 15, 
                mt: 15}}>
                    
                <BudgetInfo/>
            </Box>
        </Box>
    )
}

export default Budget;