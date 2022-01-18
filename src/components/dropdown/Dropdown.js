import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View from '../View';

// const PLACEMENTS = ['top', 'bottom', 'left', 'right', 'auto'];

const propTypes = {
  children: PropTypes.node.isRequired,
  //   title: PropTypes.node,
  //   content: PropTypes.node.isRequired,
  //   placement: PropTypes.oneOf(PLACEMENTS),
  visible: PropTypes.bool,
};

const styles = StyleSheet.create({
  '.dropdown-menu': css`
    position: absolute;
    z-index: -1;
    // display: none; // none by default, but block on "open" of the menu
    min-width: $dropdown-min-width;
    padding: $dropdown-padding-y $dropdown-padding-x;
    margin: 0; // Override default margin of ul
    font-size: $dropdown-font-size;
    color: $dropdown-color;
    text-align: left; // Ensures proper alignment if parent has it changed (e.g., modal footer)
    // list-style: none;
    background-color: $dropdown-bg;
    // background-clip: padding-box;
    border: $dropdown-border-width solid $dropdown-border-color;
    border-radius: $dropdown-border-radius;
    // @include box-shadow($dropdown-box-shadow);

    top: 100%;
    left: 0;
    margin-top: $dropdown-spacer;
  `,
  '.dropup': css`
    top: auto;
    bottom: 100%;
    margin-top: 0;
    margin-bottom: $dropdown-spacer;
  `,
  '.dropend': css`
    top: 0;
    right: auto;
    left: 100%;
    margin-top: 0;
    margin-left: $dropdown-spacer;
  `,
  '.dropstart': css`
    top: 0;
    right: 100%;
    left: auto;
    margin-top: 0;
    margin-right: $dropdown-spacer;
  `,
});

const Dropdown = (props) => {
  const { children, visible = false } = props;
  // const { children, title = null, content, placement, visible = false } = props;

  const classes = getStyles(styles, ['.dropdown-menu']);
  return <>{visible && <View style={[classes]}>{children}</View>}</>;
};

Dropdown.propTypes = propTypes;

export default Dropdown;
