import React from 'react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Formik, Form } from 'formik';
import { Button, Box } from "@chakra-ui/react";
import { useMutation } from 'urql';
import { useCreateUserMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";

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
  const router = useRouter();
  const [,createUser] = useCreateUserMutation(CREATEUSER_MUT);
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, {setStatus}) => {
          [{field: 'username', message: 'something wrong'}]
          const response = await createUser(values);
          if (response.data?.createUser.errors) {
            // setStatus(toErrorMap(response.data.createUser.errors));
            console.log("henlo from inside error");
            // console.log(toErrorMap(response.data.createUser.errors));
          } else if (response.data?.createUser.user) {
            // console.log(response);
            console.log("hello correctly created user");
            // worked created user and stored cookie
            // navigate to home page
            router.push("/")
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

export default withUrqlClient(createUrqlClient)(Register);
