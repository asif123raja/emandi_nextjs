// import { NextRequest } from "next/server";
// import  Jwt from "jsonwebtoken";

// export const getDataFromToken = (request:NextRequest) => {
//     try {
//         const token = request.cookies.get('token')?.value || '';
//         const decodedToken:any = Jwt.verify(token,process.env.TOKEN_SECRET!);
//         return decodedToken.id;
//     } catch (error:any) {
//         throw new error(error.message)
//     }
// }
import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        // Fetch the token from cookies
        const token = request.cookies.get('token')?.value || '';

        // Verify the token using the secret
        const decodedToken: any = Jwt.verify(token, process.env.TOKEN_SECRET!);

        // Return the user ID from the decoded token
        return decodedToken.id;
    } catch (error: any) {
        // Throw an Error with the message from the caught exception
        throw new Error(error.message);
    }
}
