import React from 'react';

const Item = ({ data, meshName, onChangeColor }) => {
  const [currentName, setCurrentName] = React.useState('');

  return (
    data.map(({ color, colorName, price, id }) => (
      <div key={id}>
        <div
          className='item' 
          style={{borderColor: currentName === colorName ? '#2c86fb' : undefined}}
          onClick={() => {
            onChangeColor(color, meshName);
            setCurrentName(colorName);
          }}
        >
          <span className='box-color' style={{backgroundColor: color}} />
          <div className='content'>
            <b>{colorName}</b>
            <span>{price}</span>
          </div>
        </div>
      </div>
    ))
  );
}

export default React.memo(Item);