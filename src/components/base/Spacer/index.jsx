import React from 'react';
import PropTypes from 'prop-types';

const Spacer = ({ children, type = 'horizontal', size = 8, ...props }) => {
  const spacerStyle = {
    ...props.style,
    display: type === 'vertical' ? 'block' : 'inline-block',
    vertical: type === 'horizontal' ? 'middle' : undefined,
  };

  const nodes = React.Children.toArray(children)
    .filter(element => React.isValidElement(element))
    .map((element, index, elements) => {
      return React.cloneElement(element, {
        ...element.props,
        style: {
          ...element.props.style,
          marginRight:
            type === 'horizontal' && index !== elements.length - 1
              ? size
              : undefined,
          marginBottom:
            type === 'vertical' && index !== elements.length - 1
              ? size
              : undefined,
        },
      });
    });

  return (
    <div style={spacerStyle} {...props}>
      {nodes}
    </div>
  );
};

Spacer.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Spacer;
