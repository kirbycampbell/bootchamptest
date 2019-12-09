import React from 'react'
import './RightFilterBox.css'

const RightProfileBox = () => {
  return (
    <div className="Outer-RightBox">
      <div className="Filter-Title">Filter</div>
      <div className="Filter-Opt">
        <span className="tag">Topic</span>
        <span className="tag">City</span>
        <span className="tag">Resource</span>
      </div>
    </div>
  )
}

export default RightProfileBox
