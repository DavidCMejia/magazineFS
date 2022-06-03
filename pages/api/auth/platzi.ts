import type {NextApiHandler} from 'next'

const credentialsAuth: NextApiHandler = (request, response) => {
  if(request.method !== "POST"){
    response.status(405).end()
    return 
  }
  
  if(request.body.password === process.env.NEXTAUTH_SECRET){
    const platziUser: User = {
      name: "Platzi Student",
      email: "student@platzi.com",
      image: ""
    }
    console.log(platziUser)
    return response.status(200).json(platziUser)
  }

  response.status(401).end()
}

export default credentialsAuth;