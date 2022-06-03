import { Button } from "antd";
import { NextPage } from "next";
import { signIn, signOut, useSession } from 'next-auth/react' ;


export const Toparea:NextPage = () => {
    return (
        <Loginlogout />
    )
}

const Loginlogout = () => {

    const { data: session, status } = useSession();
    
     // fix flash unauthenticated flashback
    if (status === 'loading') { return null }

    if (session===null) {
        return (
            <Button onClick={ ()=> signIn() }>Sign In</Button>
        )
    } else {
         return (
            <>
            <span> {session.user?.name} </span>
            <Button onClick={() => signOut()}>Sign Out</Button>
            </>
         )
    }
    
}