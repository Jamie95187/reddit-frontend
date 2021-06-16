import React from 'react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Formik, Form } from 'formik';
import { Button, Box, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { useMutation } from 'urql';
import { useCreateUserMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const CREATEUSER_MUT = `
  mutation CreateUser($username: String!, $password:String!){
  createUser(options: {username:$username, password:$password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`

const Register: React.FC<registerProps> = ({}) => {
  const [,createUser] = useCreateUserMutation(CREATEUSER_MUT);
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, {setErrors}) => {
          [{field: 'username', message: 'something wrong'}]
          const response = await createUser(values);
          console.log(response.data.createUser);
          if (response.data?.createUser.errors) {
            // setErrors(toErrorMap(response.data.createUser.errors));
            // setErrors({
            //   username: "hey Im an error",
            // })
          }
        }}
      >
      {( {isSubmitting} ) => (
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
            isLoading={isSubmitting}
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
