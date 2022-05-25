# wobot.ai-Assignment-NodeJS-MongoDB

Please create a .env file in the root directory and add the following fields
NODE_ENV (development or Production), PORT, MONO_URI (mongodb atlas cluster url),
JWT_SECRET

API Reference
--------------

Users:

POST        /api/users/        ---> REGISTER USER                           {firstName, lastName, username, password} is required
POST        /api/users/login   ---> LOGIN                                   {username, password} is required
GET         /api/users/:id     ---> GET DETAILS OF THE LOGGEDIN USER         user id is required through params
GET         /api/users/all     ---> FETCH THE USER LIST        


Products:

POST        /api/products/add       ---> ADD A SINGLE PRODUCT                  {name, description, quantity, price} given from req.body
POST        /api/products/addcsv    ---> ADD PRODUCTS USING .csv FILE           edit product.csv file in the root directory to add products
GET         /api/products/all       ---> FETCH THE PRODUCT LIST
