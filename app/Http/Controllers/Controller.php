<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function respondWithToken($token, $responseMessage, $data){
        return \response()->json([
            "success" => true,
            "message" => $responseMessage,
            "result" => $data,
            "token" => $token,
            "token_type" => "bearer",
        ],200);
    }

    public function sendSuccess($data, $message = '')
    {
        return \response()->json([
            "success" => true,
            "message" => $message,
            "result" => $data
        ],200);
    }

    public function sendError($message, $code = 200)
    {
        return \response()->json([
            "success" => false,
            "message" => $message,
            "result" => []
        ],$code);
    }
}
