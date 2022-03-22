import React from 'react';

const Row = props => (
  <div>
    {props.children}
    <style jsx>
      {`
        div {
          display: flex;
        }
      `}
    </style>
  </div>
);

export default Row;
