import React, { Component } from 'react'

import './tile.styles.scss'

const Tile = ({id, name}) => (
    <div className='tile-item'>
    {/* <div className='image'
        style={{
            backgroundImage: `url(${imageUrl})`
        }}
    /> */}
        <div className='tile-footer'>
            <span className='name'>{name}</span>
        </div>
</div>
)

export default Tile;