import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import DisplayUsersData from './displayUsers';
import { Row, Col } from 'antd';
import LayoutModel from './Componentes/navbar';

function MyApp({ Component, pageProps }: AppProps) {

const client = new ApolloClient({
uri: "http://localhost:5000/graphql",
cache: new InMemoryCache(),

});

return (
<>
 <ApolloProvider client={client}>
     <LayoutModel>
         <Row justify="space-around">
             <Col span={8}>
             <Component {...pageProps} />
             </Col>

             {/*
             <Col span={10}>
             <br />
             <DisplayUsersData />
             </Col> */}
         </Row>
     </LayoutModel>
 </ApolloProvider>

</>
)
}

export default MyApp