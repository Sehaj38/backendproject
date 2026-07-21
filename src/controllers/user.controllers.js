import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// method to have user registered

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend 
    // validation for all details (email format, password not empty)
    // check if user already exist
    // files input - avatar, images
    // upload to cloudinary, avatar
    // create user object - create entry in db
    // remove password, refresh token fireld from respose
    // check for user creation
    // return response or error

    //1. get user details
    const {username, email, fullname, password} = req.body;
    
    //2. validation
    if (
        [fullname, email, username, password].some(
            (field) => field?.trim === "")
    ) {
        throw new ApiError(400, "All field are required")
    }
     
    //3. check if user already exist
    const existingUser = User.findOne({
        $or: [{email},{password}]
    })
    if(existingUser){
        throw new ApiError(409, "user with email or username already exists")
    }

    //4. file uplaod on local
    console.log(req.files?.body);
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0].path;
    if(!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

    //5. file upload on cloudinry
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar) throw new ApiError(400, "Avatar file is required");

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    //6. create user
    User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        password
    })

    //7. check if user created
    const createdUser = await User.findById(User._id).select(
        "-password -refreshToken"
    )
    
    //8. send response
        //error
    if(!createdUser) throw new ApiError(500, "Something went wrong registering the user")
        //response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered succesfully!")
    )
})

export {registerUser}