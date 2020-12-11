<?php

namespace App\Http\Controllers;

use DateTime;
//use Illuminate\Support\Facades\DB;
use App\Models\Users;
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

        $input=$request->all();
        $input['password']=bcrypt($input['password']);
        
        $rules=[
            'name' => 'required',
            'email' => 'required|unique:App\Models\Users,email',
            'password'=> 'required'
        ];
        
        $messages=[
            'name.required' => 'The name is required',
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
            $users = Auth::user();
            $token = $users->createToken('TokenUser')->accessToken;

            $respuesta=[];
            $respuesta['name']=$users->name;
            $respuesta['token']= 'Bearer '.$token;
            return response()->json($respuesta,200);
        }else{
            return response()->json(['error'=>'Not authenticated.'],401);
        }
    }
    

//         try {
//             const user = await User.findOne({
//                 where: {
//                     email: req.body.email
//                 }
//             })

//             const isMatch = await bcrypt.compare(req.body.password, user.password, (err)=>{
//                 if(err){
//                     res.status(400).send({message:'Wrong credentials'})
//                 }
//             });
            
//             const token = jwt.sign({ id: user.id }, 'test_auth_password', { expiresIn: '30d' });
//             user.token = token; //añade el token a la instancia user
//             await user.save() // valida & actualiza en la base de datos la instancia de user
//             res.send(user);
//         } catch (error) {
//             console.error(error);
//             res.status(500).send({ message: 'There was a problem trying to login' })    
//         }
//     }

//     public function profile(req,res){
//         try {
//             const user = req.user;
//             res.send(user);
//         } catch (error) {
//             console.error(error);
//             res.status(500).send({ message: 'You are not loged in' })    
//         }
//     }

//     public function rent(req,res){
//         try {
//             const user = await User.findOne({
//                 where: {
//                   id: req.user.id
//                 }
//             })
//             user.rented = req.params.id
//             await user.save();
//             res.send(user);
//         } catch (error) {
//             console.error(error)    
//         }
//     }

//     public function downRent(req,res){
//         try {
//             const user = await User.findOne({
//                 where: {
//                   id: req.user.id
//                 }
//             })
//             user.rented = null
//             await user.save();
//             res.send(user);
//         } catch (error) {
//             console.error(error)    
//         }
//     }

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
    