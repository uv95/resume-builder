import React from 'react';
import Colors from './Colors/Colors';
import Font from './Font/Font';
import Header from './Header/Header';
import Heading from './Heading/Heading';
import Layout from './Layout/Layout';
import Spacing from './Spacing/Spacing';
import Subtitle from './Subtitle/Subtitle';

type Props = {};

const Customization = (props: Props) => {
  return (
    <>
      <Layout />
      <Colors />
      <Spacing />
      <Font />
      <Heading />
      <Subtitle />
      <Header />
    </>
  );
};

export default Customization;
