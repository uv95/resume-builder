import React from 'react';
import Colors from './Colors/Colors';
import Font from './Font/Font';
import Layout from './Layout/Layout';
import Spacing from './Spacing/Spacing';

type Props = {};

const Customization = (props: Props) => {
  return (
    <>
      <Layout />
      <Colors />
      <Spacing />
      <Font />
    </>
  );
};

export default Customization;
