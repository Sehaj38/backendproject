import { asyncHandler } from "../utils/asyncHandler.js";

// method to have user registered

const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "register user controller"
    })
})

export {registerUser}