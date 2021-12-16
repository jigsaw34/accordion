import React from 'react';

import { items } from '../../data';
import './style.scss';

const Accordion = () => {
  const [isShow, setIsShow] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const isActive = (id) => id === isShow;

  const handleOpen = (id) => {    
    setIsShow((prevState) => prevState === id ? 0 : id);
  };

  return (
    <div className='container'>
      <div className='accordion'>
        <h2 className='accordion-title'>The accordion</h2>
        <p className='accordion-text'>
          The accordion is a grophical control element comprising a vertically stacked list of items, such as label a thumbnails. Each item can be `expanded` or `collapsed` to reveal the content associated with that item
        </p>
        <div 
          className='accordion-list' 
          role="tablist" 
        >
          {items.map(({ title, subTitle, description, id }) => (
            <div
              key={id}
              className='accordion-item' 
              onClick={() => handleOpen(id)}
            >
              <span className='accordion-item__icon'>{!isActive(id) ? '+' : '-'}</span>
              <span className='accordion-item__text'>{title}</span>
              <div
                ref={ref => isActive(id) && setHeight(ref?.scrollHeight)}
                className='accordion-item_content'
                style={{height: `${isActive(id)? height : 0}px`}}
                aria-hidden={ isActive(id) }
              >
                <div>{subTitle}</div>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Accordion;