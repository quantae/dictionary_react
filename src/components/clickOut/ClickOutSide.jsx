import React, { useEffect, useRef } from 'react';

/**
 * 
 * @param {*} param0 
 * @returns 
 * children: is anything that goes under the outer div tag that is referenced.
 * exceptionRef: can be a component or a simple div tag that is referenced, which can be literally an exception for its function. That is, when exceptionRef is clicked, it is thought to happen in the insided of ClickOutside component
 * onClick: is a handler function that is passed to this component. It will be executed when the click event happens outside of the component.
 * className: makes the component have a className so you can apply css to the component.
 */
const ClickOutSide = ({children, exceptionRef, onClick, className}) => {
    const wrapperRef = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickListener);
        return () => {
            document.removeEventListener('mousedown', handleClickListener);
        };
    },);
    const handleClickListener = (event) => {
        let clickedInside;
        if(exceptionRef) {
          clickedInside = (wrapperRef && wrapperRef.current.contains(event.target)) || exceptionRef.current === event.target || exceptionRef.current.contains(event.target);
        }
        else {
          clickedInside = (wrapperRef && wrapperRef.current.contains(event.target));
        }
    
        if (clickedInside) return;
        else onClick();
      }
  return (
    <div ref={wrapperRef} className={`${className || ''}`}>
    {children}
  </div>
  );
}

export default ClickOutSide;
