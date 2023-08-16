import { LinearProgress, Box, Typography } from '@mui/material';
import { useSelector } from "react-redux";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress sx={{height: "8px", borderRadius: "10px"}} variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        
        <Typography sx={{ml: 1}} variant="body2" color="text.secondary">
          {Math.round(props.value) + "%"}
        </Typography>
      </Box>
      
    </Box>
  );
}

export default function LinearProgressBar({category}) {

    const {transactions} = useSelector(state => state.transactions);

    const filteredTransactions = transactions.filter(transaction => transaction.category === category.label);
    const total = filteredTransactions.reduce((acc, transaction) => acc + transaction.value, 0);

    const MIN = 0;
    const MAX = category.limit === 0 ? 1 : category.limit;

    const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            <LinearProgressWithLabel
                color={
                    normalise(category.limit + total) <= 10
                    ? "error"
                    : "primary"
                }
                value={normalise(category.limit + total)}
            />

            <Typography sx={{ml: 1}} variant="body2" color="text.secondary">
                {"Залишилося: " + Math.round(category.limit + total)}
            </Typography>
        </Box>
    );
  }