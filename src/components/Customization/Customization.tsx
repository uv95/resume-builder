import React from 'react';
import Colors from './Colors/Colors';
import Font from './Font/Font';
import Header from './Header/Header';
import Heading from './Heading/Heading';
import JobTitle from './JobTitle';
import Layout from './Layout/Layout';
import Name from './Name';
import Spacing from './Spacing/Spacing';
import Subtitle from './Subtitle';

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
      <Name />
      <JobTitle />
    </>
  );
};

export default Customization;
