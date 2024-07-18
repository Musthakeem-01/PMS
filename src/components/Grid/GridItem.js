import Grid from "@material-ui/core/Grid";
// nodejs library to set properties for components
import PropTypes from "prop-types";
/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
 
function GridItem({ ...props }) {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid item  className={className+" GridItemPadding"} {...rest}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node
};

export default (GridItem);