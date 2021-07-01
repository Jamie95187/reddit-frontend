import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'urql';
import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
  )
}

export default MyApp
