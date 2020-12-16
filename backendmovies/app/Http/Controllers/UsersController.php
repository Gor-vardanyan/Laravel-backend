<?php

namespace App\Http\Controllers;

use DateTime;
//use Illuminate\Support\Facades\DB;
use App\Models\Users;
use App\Http\Middleware\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{

    public function findusers(){
        //$users = DB::select('select * from users');
        $users=Users::all();
        return $users;
    }

    public function signup(Request $request){
echo "llega";
        $input=$request->all();
        $input['password']=bcrypt($input['password']);
        
        $rules=[
            'email' => 'required',
            'password'=> 'required'
        ];
        
        $messages=[
            'email.required' => 'The email is required',
            'password.required' => 'The password is required'
        ];

        $validator = Validator::make($input,$rules,$messages);

        if ($validator->fails()) {
            return response()->json([$validator->errors()],400);
        }else{
            $users=Users::create($input);
            return $users;
        }
    }

    public function login(Request $request){
 
        if(Auth::attempt(['email'=>$request->email,'password'=>$request->password])){
            $users = Auth::Users();
            $token = $users->createToken('TokenUsers')->accessToken;

            $respuesta=[];
            $respuesta['name']=$users->name;
            $respuesta['token']= 'Bearer '.$token;
            return response()->json($respuesta,200);
        }else{
            return response()->json(['error'=>'Not authenticated.'],401);
        }
    }

     public function profile(Request $request){
         if(isset($request->user)){
            $users = $request->user;
            return $users;
        }else{
            return response()->json(['error'=>'Not authenticated.'],401);    
        }
     }

    public function rent(Request $request){
        if(isset($request->user->id)){
            $id = $request->user->id;
            $users=Users::select("select * from users where id = $id");
            $users->rented = $request->params->id;
            $users->save();
            return $users;
        }else {
            return response()->json(['error'=>'Not authenticated.'],401);  
         }
     }

     public function downRent(Request $request){
         if(isset($request->user->id)){
            $id = $request->user->id;
            $users=Users::select("select * from users where id = $id");
            $users->rented = null;
            $users->save();
            return $users;
         } else{
            return response()->json(['error'=>'Not authenticated.'],401);  
         }
     }

//     public function delete(req,res){
//         try {        
//             const user = await User.findOne({
//                 where: {
//                   email: req.body.email
//                 }
//             })
//             await user.destroy();
//             res.status(201).send({message: 'User deleted'})

//         } catch (error) {
//             console.error(error);
//             res.status(500).send({ message: 'Something went wrong' })    
//         }
//     }

}
    