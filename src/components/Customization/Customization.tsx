import React from 'react';
import Colors from './Colors/Colors';
import Layout from './Layout/Layout';
import Spacing from './Spacing/Spacing';

type Props = {};

const Customization = (props: Props) => {
  return (
    <>
      <Layout />
      <Colors />
      <Spacing />
    </>
  );
};

export default Customization;
