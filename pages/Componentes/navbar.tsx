import { Layout, Menu } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';

const { Header, Content, Footer } = Layout;

type MyComponentProps = React.PropsWithChildren<{}>;

const LayoutModel: NextPage<MyComponentProps> = ({children}) => {


    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu 
                mode="horizontal"
                theme="dark"
                >
                <Menu.Item>
                        <Link href="/"> Home</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href="/Login"> Login</Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href="/Register"> Register</Link>
                    </Menu.Item>
                    <Menu.Item>
                    <Link href="/Premium"> Premium</Link>
                    </Menu.Item>
      
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>FOOTER</Footer>
        </Layout>
      );

}




export default LayoutModel;