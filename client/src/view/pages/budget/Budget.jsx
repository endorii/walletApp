import { Box, Typography, AppBar, Toolbar, Paper } from "@mui/material";
import BudgetInfo from "./ButgetInfo";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddCategory from "../../../modules/files/components/AddCategory/AddCategory";

const Budget = () => {

    return(
        <Box>
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
                        >
                            
                        <MenuIcon />
                    </IconButton>
                    
                    <Typography
                        sx={{ 
                            ml: 7, 
                            flexGrow: 1}}>

                        Гаманець
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