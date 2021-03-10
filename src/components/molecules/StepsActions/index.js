import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid } from 'react-native-easy-grid';
import { Content, Left, Right, Footer } from 'native-base';
import { Button } from 'react-native';


export const StepsActions = (props) => {
  const { next, back } = props;

  return (
    <Grid>
      <Col>
        { !!back && <Button title="Back" onPress={back}/> }
      </Col>
      <Col>
        { !!next && <Button title="Next" onPress={next}/> }
      </Col>
    </Grid>
  )
}

StepsActions.propTypes = {
  next: PropTypes.func,
  back: PropTypes.func,
};

export default StepsActions;

