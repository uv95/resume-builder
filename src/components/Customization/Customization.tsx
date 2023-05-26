import React from 'react';
import Colors from './Colors/Colors';
import Font from './Font/Font';
import Heading from './Heading/Heading';
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
      <Heading />
    </>
  );
};

export default Customization;
