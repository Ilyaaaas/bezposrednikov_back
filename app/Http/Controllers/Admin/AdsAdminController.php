<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ConfigHelpers;
use App\Http\Controllers\Controller;
use App\Models\Home;
use App\Models\HomeComment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AdsAdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        if(!ConfigHelpers::IsAdmin()){
            return $this->sendError("Выбранный Вами пользователь не является администратором!");
        }

        $home = Home::with([
            "user",
            "dicCity",
            "dicTypeHome",
            "dicRc",
            "dicCondit",
            'dicTypeSale' => function($query){
                return $query->select('id', 'name2 as name');
            },
            'favorites',
            "homePics" // => function($query){return $query->where('general', true)->select('id', 'pic');}
        ])
            ->select([
                "id",
                "id_type_sale",
                "id_type_home",
                "id_city",
                "cnt_rooms",
                "cnt_toilet",
                "total_area",
                "living_area",
                "kitchen_area",
                "year_construction",
                "floor",
                "floor_all",
                "id_condit",
                "other_comment",
                "price",
                "state",
                "address",
                "phone",
                "phone2",
                "phone3",
                DB::raw("DATE_FORMAT(created_at, '%d.%m.%Y') as date_set"),
                DB::raw("(select count(*) from home_view where id_home = home.id) as cnt_view")
            ])
            ->orderByDesc('id')
            ->get()
        ;

        return $this->sendSuccess($home);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function getComments($id): JsonResponse
    {
        $result = HomeComment::query()
            ->join('users', 'users.id', '=', 'home_comments.id_user')
            ->where('home_comments.id_home', $id)
            ->orderByDesc('home_comments.created_at')
            ->get([
                "home_comments.id",
                DB::raw("date_format(home_comments.created_at, '%d.%m.%Y %T') as date_set"),
                "home_comments.comment_text",
                "users.name",
                "users.avatar",
                DB::raw("IFNULL((select sum(likes) from home_comments_like where id_comment = home_comments.id), 0)   as likes"),
                DB::raw("IFNULL((select sum(dislike) from home_comments_like where id_comment = home_comments.id), 0) as dislikes")
            ]);
        return $this->sendSuccess($result);
    }
}
