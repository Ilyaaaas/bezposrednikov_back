<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class MainAdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        dd('Hello world');
    }
}
