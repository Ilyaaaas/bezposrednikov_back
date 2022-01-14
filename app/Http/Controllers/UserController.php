<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        //$this->middleware("auth:api",["except" => ["login","register"]]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            $msg = '';
            foreach ($validator->messages()->toArray() as $sv) {
                foreach ($sv as $k => $v) {
                    $msg .= $v;
                }
            }
            return $this->sendError($msg);
        }

        $data = [
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password)
        ];
        $user = new User;
        $user->create($data);
        $responseMessage = "Registration Successful";
        return $this->sendSuccess([], $responseMessage);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            $msg = '';
            foreach ($validator->messages()->toArray() as $sv) {
                foreach ($sv as $k => $v) {
                    $msg .= $v;
                }
            }
            return $this->sendError($msg);
        }

        $credentials = $request->only(["email", "password"]);
        $user = User::where('email', $credentials['email'])->first();

        if ($user) {
            $ex = explode('/', $request->url());
            if ($ex[count($ex) - 2] == 'admin') {
                if ((int)$user->id_role == 1) {
                    return $this->sendError('Ошибка авторизации пользователя');
                }
            }

            if (!auth()->attempt($credentials)) {
                $responseMessage = "Проверьте правильность логина или пароля";
                return $this->sendError($responseMessage);
            }
            $accessToken = auth()->user()->createToken('authToken')->accessToken;
            $responseMessage = "Вход успешен";
            return $this->sendSuccess([
                "user" => auth()->user(),
                "token" => $accessToken,
                "token_type" => "Bearer"
            ], $responseMessage);
        } else {
            $responseMessage = "Ошибка авторизации пользователя";
            return $this->sendError($responseMessage,);
        }
    }

    public function viewProfile()
    {
        $responseMessage = "user profile";
        $data = Auth::guard("api")->user();
        return response()->json([
            "success" => true,
            "message" => $responseMessage,
            "data" => $data
        ], 200);
    }

    public function logout()
    {
        $user = Auth::guard("api")->user()->token();
        $user->revoke();
        $responseMessage = "successfully logged out";
        return response()->json([
            'success' => true,
            'message' => $responseMessage
        ], 200);
    }

    public function authsocial(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'social_name' => 'required',
            'params' => 'required'
        ]);

        if ($validator->fails()) {
            $msg = '';
            foreach ($validator->messages()->toArray() as $sv) {
                foreach ($sv as $k => $v) {
                    $msg .= $v;
                }
            }
            return $this->sendError($msg);
        }

        $type = $request->post('social_name');
        $params = $request->post('params');
        if ($type == 'google') {
            $email = $params['email'];
            $password = $params['googleId'] . $type;
            $name = $params['name'];
            $avatar = $params['imageUrl'];
        }

        if($type == 'facebook'){
            dd($request->all());
        }
        $user = User::query()->where('email', $email)->first();

        if (!$user) {
            $data = [
                "name" => $name,
                "email" => $email,
                "avatar" => $avatar,
                "password" => Hash::make($password),
                'onsocial' => 1
            ];
            $user = new User;
            $user->create($data);
        }

        $credentials = ["email" => $email, "password" => $password];

        if (!auth()->attempt($credentials)) {
            $responseMessage = "Проверьте правильность логина или пароля";
            return $this->sendError($responseMessage);
        }
        $accessToken = auth()->user()->createToken('authToken')->accessToken;
        $responseMessage = "Вход успешен";
        return $this->sendSuccess([
            "user" => auth()->user(),
            "token" => $accessToken,
            "token_type" => "Bearer"
        ], $responseMessage
        );

    }

}
