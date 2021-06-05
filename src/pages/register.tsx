import React from 'react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Formik, Form } from 'formik';
import { Button, Box, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

interface registerProps {
}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
        console.log(values);
        }}
      >
      {({values, handleChange}) => (
        <Form>
          <InputField
            name="username"
            placeholder="username"
            label="Username"
          />
          <Box mt={4}>
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
          </Box>
          <Button
            type="submit"
            colorScheme="blue"
            mt={4}
          >
            register
          </Button>
        </Form>
      )}
      </Formik>
    </Wrapper>
  );
}

export default Register;
