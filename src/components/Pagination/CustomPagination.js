import React from 'react'
import "./CustomPagination.css"
import { Pagination } from '@mui/material'


const CustomPagination = ({setPage,numOfPages=10}) => {

    const handlePageChange=(page)=>{
        setPage(page);
        window.scroll(0,0);
    }

  return (
    <div className="pagination">
            <Pagination
            hidePrevButton hideNextButton
            count={numOfPages}
            onChange={(e)=>handlePageChange(e.target.textContent)} 
            count={numOfPages} color="primary" />
    </div>
  )
  }

export default CustomPagination