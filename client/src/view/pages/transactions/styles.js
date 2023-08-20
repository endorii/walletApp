const duration = 450;

export const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
    display: "none",
    transform: 'translateX(-100%)',
}

export const transitionStyles = {
    entering: { display: "block", opacity: 0, transform: 'translateX(-100%)' },
    entered:  { display: "block", opacity: 1, transform: 'translateX(0)' },
    exiting:  { display: "none", opacity: 1, transform: 'translateX(-100%)' },
    exited:  { display: "none", opacity: 0, transform: 'translateX(-100%)' },
};

export const TransactionsAppBarStyles = {
    zIndex: 1000
}

export const TransactionsToolbarStyles = {
    p: 0, 
    flexGrow: 1
}

export const TransactionsListItemStyles = {
    ml: 12, 
    flexGrow: 1
}

export const TransactionsListItemIconStyles = {
    height: '30px',
    width: '30px'
}

export const TransactionsListWrapperStyles = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'flex-start',
    gap: "2%"
}

export const TransactionsListPaperStyles = {
    p: 7,
    pt: 3,
    width: "45%",
    zIndex: 2
}

export const TransactionsListTextNoTransactionsStyles = {
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: '300',
    mt: 3
}

export const AvatarSuccessStyles = { 
    bgcolor: '#17B2001C' 
}

export const AvatarErrorStyles = { 
    bgcolor: '#B200001C' 
}

export const TransactionsListListItemTextStyles = {
    wordWrap: 'break-word',
}

export const ValueStyles = {
    p: 2, 
    textAlign: "center"
}

export const FormattedDateStyles = {
    ml: 2, 
    mb: 1, 
    fontSize: 
    "14px", 
    color: "grey", 
    fontWeight: 300
}

export const TransactionsListActivePaperStyles = {
    p: 7,
    pt: 3,
    width: "45%",
    zIndex: 1
}

export const TransactionsListActiveInsideStyles = {
    display: 'flex', 
    justifyContent: 'space-between', 
    mb: 2}

export const TransactionsListActiveInfoTextStyles = {
    fontSize: '24px', 
    fontWeight: 400
}

export const TransactionsListActiveButtonsWrapperStyles = {
    display: 'flex', 
    justifyContent: 'center', 
    gap: '10px'
}

export const TransactionsListActiveModalStyles = {
    p: 7,
    pt: 3,
    position: 'relative', 
    borderRadius: "5px", 
    backgroundColor: "#fefefe",
    margin: "auto",
    mt: 10,
    border: "1px solid #888",
    width: "50%"
}

export const TransactionsListActiveModalTextStyles = {
    fontSize: "30px", 
    fontWeight: 'bold', 
    textAlign: 'center'
}

export const TransactionsListActiveModalFormStyles = {
    position: "relative",
    mt: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    gap: "10px",
}

export const AutocompleteStyles = { 
    width: 300 
}

export const CloseIconStyles = {
    position: 'absolute', 
    top: -5, 
    right: -5
}

export const TransactionsListItemTextStyles = {
    wordWrap: 'break-word', 
    p: 2
}