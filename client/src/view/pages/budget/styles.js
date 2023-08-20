const duration = 400;

export const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 1,
    display: "block",
    transform: 'translateY(0%)',
}

export const transitionStyles = {
    entering: { display: "block", opacity: 0, transform: 'translateY(0%)' },
    entered:  { display: "block", opacity: 1, transform: 'translateY(0%)' },
    exiting:  { display: "block", opacity: 0.3, transform: 'translateY(-80%)' },
    exited: { display: "none", opacity: 0, transform: 'translateY(-80%)' },
};

export const BudgetAppBarStyles = {
    zIndex: 1000
}

export const BudgetToolbarStyles = {
    p: 0, 
    flexGrow: 1
}

export const BudgetAccountStyles = { 
    ml: 12, 
    flexGrow: 1
}

export const BudgetAccountIconStyles = { 
    height: '30px', 
    width: '30px' 
}

export const BudgetAccountTextStyles = {
    ml: 1
}

export const BudgetWrapperStyles = {
    ml: 15, 
    mt: 15
}

export const BudgetInfoWrapperStyles = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'column'
}

export const BudgetInfoPaperStyles = {
    p: 7,
    pt: 3,
    width: "45%",
    zIndex: 1,
}

export const BudgetInfoTotalTextStyles = {
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: 400,
    mb: 1
}

export const BudgetInfoTotalValueStyles = {
    mt: 3,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: 300,
    mb: 3
}

export const CategoriesListButtonWrapperStyles = {
    display: 'flex', 
    justifyContent: 'center', 
    mt: 3
}

export const CategoriesListButtonStyles = { 
    width: '60%'
}

export const CategoriesListPaperStyles = {
    position: 'relative',  
    p: 7,
    pt: 3,
    width: "45%",
    zIndex: 0,
    mt: '1%'
}

export const CategoriesListTextStyles = {
    textAlign: 'center'
}

export const CategoryAvatarSuccessStyles = { 
    bgcolor: '#17B2001C' 
}

export const CategoryAvatarErrorStyles = { 
    bgcolor: '#B200001C' 
}

export const CategoryListItemTextStyles = {
    ml: 2,
    wordWrap: 'break-word'
}

export const CategoryButtonsWrapperStyles = {
    display: 'flex', 
    justifyContent: 'center', 
    gap: '10px'}

export const basicCategoryAvatarStyles = { 
    bgcolor: '#FFA70030' 
}

export const basicCategoryIconStyles = { 
    color: '#FFA700' 
}

export const basicCategoryListItemTextStyles = {
    wordWrap: 'break-word'
}

export const CategoriesListCloseButtonStyles = { 
    position: 'absolute', 
    top: 0, 
    left: 0
}

export const EditCategoryOverlayStyles = {
    paddingTop: "100px"
}

export const EditCategoryModalStyles = {
    p: 7,
    pt: 3,
    position: 'relative', 
    borderRadius: "5px", 
    backgroundColor: "#fefefe",
    margin: "auto",
    border: "1px solid #888",
    width: "50%"
}

export const EditCategoryTextStyles = {
    fontSize: "30px", 
    fontWeight: 'bold', 
    textAlign: 'center'
}

export const EditCategoryFormStyles = {
    mt: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    gap: "10px",
}

export const EditCategoryAutocompleteStyles = { 
    width: 250 
}

export const EditCategoryCloseIconStyles = {
    position: 'absolute', top: -5, right: -5
}

export const LinearProgressBarWrapperStyles = { 
    width: '100%', 
    mb: 2 
}

export const LinearProgressStyles = {
    height: "8px", 
    borderRadius: "10px"
}