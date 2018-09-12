// import { Component } from 'react';
//
// export default class App extends Component {
//   state = {
//     name: 'formosa-slides',
//   };
//
//   render() {
//     return (
//       <div className="App">
//         <h1>Welcome to {this.state.name}</h1>
//       </div>
//     );
//   }
// }
// Import React
import React from 'react';

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
    const code = `// Single-line comments start with two slashes.
/* Multiline comments start with slash-star,
   and end with star-slash */

// Statements can be terminated by ;
doStuff();

// ... but they don't have to be, as semicolons are automatically inserted
// wherever there's a newline, except in certain cases.
doStuff()

// Because those cases can cause unexpected results, we'll keep on using
// semicolons in this guide.

///////////////////////////////////
// 1. Numbers, Strings and Operators

// JavaScript has one number type (which is a 64-bit IEEE 754 double).
// Doubles have a 52-bit mantissa, which is enough to store integers
// up to about 9✕10¹⁵ precisely.
3; // = 3
1.5; // = 1.5

// Some basic arithmetic works as you'd expect.
1 + 1; // = 2
0.1 + 0.2; // = 0.30000000000000004
8 - 1; // = 7
10 * 2; // = 20
35 / 5; // = 7
`;


    return (
      <Deck transition={['zoom', 'slide']} transitionDuration={500} theme={theme}>
        <CodeSlide
          transition={[]}
          lang="js"
          code={code}
          ranges={[
              { loc: [0, 270], title: 'Walking through some code' },
              { loc: [0, 1], title: 'The Beginning' },
              { loc: [1, 2] },
              { loc: [1, 2], note: 'Heres a note!' },
              { loc: [2, 3] },
              { loc: [8, 10] },
              // ...
            ]}
        />
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Spectacle Boilerplate
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            open the presentation/index.js file to get started
          </Text>
        </Slide>
        <Slide transition={['fade']} bgColor="tertiary">
          <Heading size={6} textColor="primary" caps>Typography</Heading>
          <Heading size={1} textColor="secondary">Heading 1</Heading>
          <Heading size={2} textColor="secondary">Heading 2</Heading>
          <Heading size={3} textColor="secondary">Heading 3</Heading>
          <Heading size={4} textColor="secondary">Heading 4</Heading>
          <Heading size={5} textColor="secondary">Heading 5</Heading>
          <Text size={6} textColor="secondary">Standard text</Text>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>Standard List</Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
