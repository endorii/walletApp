import { Box, Paper, Typography, Divider } from "@mui/material";
import {Chart as ChartJs, BarElement, CategoryScale, Title,LinearScale, Tooltip } from 'chart.js'
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Loader from "../../../modules/files/components/Loader/Loader";
import { ReportInfoPaperInsideStyles, ReportInfoPaperStyles, ReportInfoTextStyles, ReportInfoTextWrapperStyles, ReportInfoWrapperStyles } from "./styles";

ChartJs.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Title
)

const ReportInfo = ({activeDate}) => {

    const {transactions} = useSelector(state => state.transactions);
    const {isLoading} = useSelector(state => state.transactions)

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

        <Box sx={ReportInfoWrapperStyles}>
            <Paper 
                elevation={4}
                sx={ReportInfoPaperStyles}>
                <Box sx={ReportInfoPaperInsideStyles}>
                    <Box sx={ReportInfoTextWrapperStyles}>
                        <Typography sx={ReportInfoTextStyles}> 
                            Початковий баланс
                        </Typography>
                        {/* <Typography>{startBudget}</Typography> */}
                    </Box>
                    <Box sx={ReportInfoTextWrapperStyles}>
                        <Typography sx={ReportInfoTextStyles}>
                            Кінцевий баланс
                        </Typography>
                        {/* <Typography>{budget}</Typography> */}
                    </Box>
                </Box>
            
                <Divider />

                {isLoading ? <Loader/> : <Box>
                    <Bar
                        data={data} 
                    ></Bar>
                </Box>}
            </Paper>
        </Box>
    )
}

export default ReportInfo;