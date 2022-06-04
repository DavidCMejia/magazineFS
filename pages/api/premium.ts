import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const premium: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
        res.status(401).end();
        return;
    }

    res.status(200).json({ message: "Estas dentro de la API premium y logeado correctamente" });
}

export default premium