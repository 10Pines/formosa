// Import React
import React from 'react';
import { Form, NestedForm, ValidatedInput, ValidatedSelect, ValidatedButton, connectField, validations } from 'formosa';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Appear,
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

import 'prismjs';
// Syntax highlight
import 'prismjs/themes/prism-coy.css';
import CodeSlide from 'spectacle-code-slide';


// Require CSS
import 'normalize.css';
import './App.css';
import { PlainReactForm } from './PlainReactForm';
import { BasicFormosaForm } from './BasicFormosaForm';
import { FormosaFormWithEdad } from './FormosaFormWithEdad';
import { FormosaFormWithType } from './FormosaFormWithType';

Object.assign(window, validations);

const theme = createTheme({
  primary: 'white',
  secondary: '#1F2022',
  tertiary: '#03A9FC',
  quaternary: '#CECECE',
}, {
  primary: 'Montserrat',
  secondary: 'Helvetica',
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck contentWidth={1500} contentHeight={1050} transition={['fade']} transitionDuration={500} theme={theme}>
        <Slide>
          <Heading >Formosa</Heading>
          <Text>mejores forms para react y angular</Text>
        </Slide>
        <Slide>
          <Text>Formulario con react usando setState</Text>
          <PlainReactForm />
        </Slide>
        <Slide>
          <Heading size={6}>Porque no lo hace alguien mas?</Heading>
        </Slide>
        <Slide>
          <Text>Formulario basico con formosa</Text>
          <BasicFormosaForm />
        </Slide>
        <Slide>
          <Text>Las validaciones pueden transformar el resultado</Text>
          <FormosaFormWithEdad />
        </Slide>
        <Slide>
          <Text>Los formularios pueden depender de otros valores</Text>
          <FormosaFormWithType />
        </Slide>
      </Deck>
    );
  }
}
