import React from 'react'

const DivConten = ({ children, col, off }) => {
  return (
    <div className='row mt-3'>
      <div className={ 'col-md-' + col + ' offset-md-' + off }>
        {children}
      </div>
    </div>
  )
}

export default DivConten