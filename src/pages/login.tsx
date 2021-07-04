import React from 'react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Formik, Form } from 'formik';
import { Button, Box } from "@chakra-ui/react";
import { useMutation } from 'urql';
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [,login] = useLoginMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          [{field: 'username', message: 'something wrong'}]
          try {
            const response = await login( { options: values } );
              if (response.data?.login.errors) {
                // setStatus(toErrorMap(response.data.createUser.errors));
                console.log("henlo from inside login error");
                // console.log(toErrorMap(response.data.createUser.errors));
              } else if (response.data?.login.user) {
                // console.log(response);
                console.log("hello correctly login user");
                // worked created user and stored cookie
                // navigate to home page
                router.push("/")
              }
            } catch (error) {
              console.log(error);
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
            login
          </Button>
        </Form>
      )}
      </Formik>
    </Wrapper>
  );
}
export default withUrqlClient(createUrqlClient)(Login);
