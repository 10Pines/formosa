---
id: getting-started
title: Getting started
---

Let's be frank, form managment in react becomes tedious quite fast, we've
all written the same `this.setState({[e.target.name]: e.target.value})` a
thousand times. The main reasoning in for formosa to exist is that I only
care about form state once the user submits it, before that moment only the
form should be concerned with its state.

## Inception

This library came to life as I found myself writing a frontend app that
consisted basically of lots of forms, slightly different from each other.
To be fair the app had 5 forms but by the time I learned about the context and I
wanted to use it for something so formosa came to be.

## What you get

The main principles formosa holds are:

1. Form state should be hidden inside the form until the user submits it
3. The structure of the submit result should be derived from the names of the
form inputs
2. Validations are a key part of the library and should be at least as good as
the components
5. form fields should be composable: I should be able to create complex form
fields from simpler existing ones
4. Creating custom validations as well as custom inputs (or wiring up existing
inputs) should be easy
6. Escape hatches should exist so edge cases are possible

## A Tour of Formosa

Here is the smallest useful example, a form that has two inputs: username and
password, and when it's submitted we show an alert with the values.

```js
import { Form, ValidatedInput, ValidatedButton, validations } from 'formosa';

export const LoginForm = () => (
  <Form
    onSubmit={(loginData) => {
      alert(JSON.stringify(loginData, null, 2));
    }}
  >
    Username: <ValidatedInput name="username" validation={validations.notEmpty} /> <br/>
    Password: <ValidatedInput name="password" type="password" /> <br/>
    <ValidatedButton>LOGIN</ValidatedButton> <br/>
  </Form>
)
```

In the example we see:

* The submit button is disabled until we fill the username field (the only one
validated)
* The password field is actually a html password field since ValidatedInput
forwards props to the native input
* The username input only shows errors after the input has been modified
* Validation for username is defined using formosa's fluent validations API

