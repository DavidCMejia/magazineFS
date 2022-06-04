import { Layout, Menu } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Link from 'next/link';


// proteccion rutas desde backend server
export const getServerSideProps:GetServerSideProps<{}> = async (context) => {

    const session = await getSession(context);

    if (session === null) {
        return {
          redirect : {
            destination: '/api/auth/signin',
            permanent: false, 
          }
        }
    }

    return { props: { session } };

}

// proteccion de rutas desde frontend
const Premium: NextPage = () => {

  const { data: session, status }  = useSession();

  if (status === 'loading') { return null }

  if (session === null)  {

    return <p>Acesso denegado</p>
  } else {

    return (
      <p>CONTENIDO PREMIUM</p>
    );
    
  }



}




export default Premium;