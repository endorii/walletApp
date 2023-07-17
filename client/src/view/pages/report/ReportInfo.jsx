import { Box, Paper, Typography, Divider, Button } from "@mui/material";
import {Chart as ChartJs, BarElement, CategoryScale, Title,LinearScale, Tooltip } from 'chart.js'
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJs.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Title
)

const ReportInfo = ({activeDate}) => {

    const {transactions} = useSelector(state => state.transactions);
    const {startBudget} = useSelector(state => state.startBudget);
    const {budget} = useSelector(state => state.budget);

    const filteredTransactions = transactions.filter(transaction => {
        const date = new Date(transaction.date);
        return date >= activeDate.startDate && date <= activeDate.endDate;
    });

    const data = {
        labels: filteredTransactions.map(transaction => transaction.date),
        datasets: [
          {
            data: filteredTransactions.map(transaction => transaction.value),
            backgroundColor: filteredTransactions.map((transaction) => (transaction.value > 0 ? "#61a8ff" : "red")),
            borderColor: "black",
            borderWidth: 0.5,
          },
        ],
    };

    return (

        <Box 
            sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexDirection: 'column'}}>

            <Paper 
                elevation={4}
                sx={{
                    p: 7,
                    pt: 3,
                    width: "45%"
            }}>

                <Box sx={{
                    display: 'flex',
                    margin: '0 auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80px'
                    
                }}>
                    <Box sx={{
                        textAlign: 'center',
                        width: '50%',
                    }}>
                        <Typography sx={{
                            color: 'grey'
                        }}>Початковий баланс</Typography>
                        <Typography>{startBudget}</Typography>
                    </Box>
                    <Box sx={{
                        textAlign: 'center',
                        width: '50%',
                    }}>
                        <Typography sx={{
                            color: 'grey'
                        }}>Кінцевий баланс</Typography>
                        <Typography>{budget}</Typography>
                    </Box>
                </Box>
            
                <Divider />

                <Box>
                    <Bar style={{
                        padding: '20px',
                    }} 
                        data={data} 
                    ></Bar>
                </Box>

            </Paper>
        </Box>
    )
}

export default ReportInfo;