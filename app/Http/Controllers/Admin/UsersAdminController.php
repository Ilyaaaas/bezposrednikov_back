<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UsersAdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $user_id = auth()->user()->getAuthIdentifier();
        $res = User::where('id', '<>', $user_id)->get();
        //$res = User::all();
        return $this->sendSuccess($res);
    }
}
