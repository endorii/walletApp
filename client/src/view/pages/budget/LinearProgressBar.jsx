import { LinearProgress, Box, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { LinearProgressBarWrapperStyles, LinearProgressStyles } from './styles';
import { normalise } from './functions';

export default function LinearProgressBar({category}) {

    const {transactions} = useSelector(state => state.transactions);

    const filteredTransactions = transactions.filter(transaction => transaction.category === category.label);
    const total = filteredTransactions.reduce((acc, transaction) => acc + transaction.value, 0);
    const MIN = 0;
    const MAX = category.limit === 0 ? 1 : category.limit;
    
    return (
        <Box sx={LinearProgressBarWrapperStyles}>
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress
                        color={normalise(MIN, MAX, category.limit + total) <= 10 ? "error" : "primary"}
                        value={normalise(MIN, MAX, category.limit + total)}
                        sx={LinearProgressStyles}
                        variant="determinate"
                    />
                </Box>
                <Box minWidth={35}>
                    <Typography ml={1} variant="body2" color="text.secondary">
                        {Math.round(normalise(MIN, MAX, category.limit + total)) + "%"}
                    </Typography>
                </Box>
            </Box>
            <Typography ml={1} variant="body2" color="text.secondary">
                {"Залишилося: " + Math.round(category.limit + total)}
            </Typography>
        </Box>
    );
}
