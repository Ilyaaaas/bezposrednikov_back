<?php

namespace App\Http\Controllers;

use App\Helpers\DictionaryHelpers;
use App\Models\DicBuildType;
use App\Models\DicCondit;
use App\Models\DicTypeHome;
use App\Models\DicTypeRoom;
use App\Models\DicTypeSale;
use App\Models\Favorite;
use App\Models\Home;
use App\Models\HomeComment;
use App\Models\HomeCommentsLike;
use App\Models\HomePic;
use App\Models\HomeView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    private function filter(Request $request, $id_user = 0)
    {
        $per_page = ($request->has('page')) ? (int) (($request->page - 1) * 12) : 12;
        $sortCol = ($request->has('sortCol')) ? $request->sortCol : 'id';
        $sortDirect = ($request->has('sortDirect')) ? $request->sortDirect : 'desc';

        $home = Home::with([
            "dicCity",
            "dicTypeHome",
            'dicTypeSale' => function($query){
                return $query->select('id', 'name2 as name');
            },
            'favorites',
            "homePics" // => function($query){return $query->where('general', true)->select('id', 'pic');}
        ])
            ->orderBy($sortCol, $sortDirect)
            ->select([
                "id",
                "id_type_sale",
                "id_type_home",
                "id_city",
                "cnt_rooms",
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
                DB::raw("DATE_FORMAT(created_at, '%d.%m.%Y') as date_set"),
                DB::raw("(select count(*) from home_view where id_home = home.id) as cnt_view")
            ])
            //->whereRaw('DATE_ADD(`created_at`, INTERVAL 30 DAY) < now()')
        ;

        if($id_user == 0){
            $home->where("state", 0);
        }else{
            $home->where("id_user", $id_user);
        }

        if($request->has('city')){
            if((int) $request->cities !== 0) {
                $home->where("id_city", $request->cities);
            }
        }

        if($request->has('type_sale')){
            $home->where('id_type_sale', $request->type_sale);
        }

        if($request->has('type_home')){
            $home->where('id_type_home', $request->type_home);
        }

        if($request->has('type_room')){
            $dtr = DicTypeRoom::find($request->type_room);
            $home->whereBetween('cnt_rooms', [$dtr->p1, $dtr->p2]);
        }

        $price_start = ($request->has('price_start')) ? (float) $request->price_start : 0;
        $price_end = ($request->has('price_end')) ? (float) $request->price_end : 0;

        if(($price_start + $price_end) > 0) {
            if (($price_start !== 0) && ($price_end == 0)) {
                $home->where('price', '>=', $price_start);
            } elseif (($price_start == 0) && ($price_end !== 0)) {
                $home->where('price', '<=', $price_end);
            } elseif (($price_start !== 0) && ($price_end !== 0)) {
                $home->whereBetween('price', [$price_start, $price_end]);
            }
        }

        //$res = $home->paginate($per_page);
        //dd(json_decode(json_encode($res)));

        return $home->paginate($per_page);
    }

    public function main(Request $request)
    {
        $result = [
            "list" => $this->filter($request),
            "dictionary" => [
                "dic_type_home" => DicTypeHome::all(),
                "dic_type_room" => DicTypeRoom::all(),
                "dic_type_sale" => DicTypeSale::all(),
                "dic_build_type" => DicBuildType::all(),
                "dic_condit" => DicCondit::all(),
                "dic_city" => (new DictionaryHelpers())->AllCityFromCountry()
            ]
        ];
        return $this->sendSuccess($result);
    }

    public function index(Request $request)
    {
        try {
            $id_user = Auth::guard('api')->user()->id;
        }catch (\Exception $e){
            return $this->sendError($e->getMessage());
        }

        return $this->sendSuccess($this->filter($request, $id_user));
    }


    public function create()
    {
        return $this->edit(0);
    }


    public function store(Request $request)
    {
        return $this->update($request, 0);
    }


    public function show($id)
    {
        $this->setHomeView($id);
        $row  = [
            "home.id",
            "home.id_user",
            "home.id_type_home",
            "home.id_type_sale",
            "home.id_city",
            "home.address",
            "home.cnt_rooms",
            "home.cnt_loggia",
            "home.cnt_balkony",
            "home.cnt_toilet",
            "home.toilet_from_bathroom",
            "home.total_area",
            "home.kitchen_area",
            "home.living_area",
            "home.year_construction",
            "home.floor",
            "home.floor_all",
            "home.id_condit",
            "home.price",
            "home.state",
            "home.created_at",
            "dic_cities.name AS city_name",
            "dic_type_home.name AS type_home_name",
            "dic_type_sale.name2 AS type_sale_name",
            "dic_region.name AS region_name",
            "dic_country.name AS country_name",
            "dic_condit.name as condit_name",
            "home.other_comment",
            "home.phone",
            "home.phone2",
            "home.phone3"
        ];



        //DB::enableQueryLog();
        $q = Home::query()
            ->join('dic_type_sale', 'home.id_type_sale', '=', 'dic_type_sale.id')
            ->join('dic_type_home', 'home.id_type_home', '=', 'dic_type_home.id')
            ->join('dic_cities', 'home.id_city', '=', 'dic_cities.id')
            ->join('dic_region', 'dic_cities.id_region', '=', 'dic_region.id')
            ->leftJoin('dic_condit', 'dic_condit.id', '=', 'home.id_condit')
            ->join('dic_country', function ($join){
                $join->on('dic_cities.country_code', '=', 'dic_country.code')
                    ->on('dic_region.country_code', '=', 'dic_country.code');
            })
            ->where('home.id', $id)
            ->select($row);

        $qs = $q->first();
        $res = $qs->toArray();
        $res['images'] = HomePic::query()->where('id_home', $id)->get();
        $res['favorite'] = false;

        if(Auth::guard('api')->check()){
            $id_user = Auth::guard('api')->user()->id;
            $cnt = Favorite::query()->where(["id_user"=> $id_user, "id_home" => $id])->count();
            if($cnt > 0){
                $res['favorite'] = true;
            }
        }

        $this->setHomeView($id);
        //dd(DB::getQueryLog());
        return $this->sendSuccess($res);
    }

    private function setHomeView($id_home)
    {
        $id_user = (auth()->check()) ? auth()->user()->getAuthIdentifier() : 0;
        $header = \request()->header();

        $save_header = [];
        $list_header = ['host', 'sec-ch-ua', 'sec-ch-ua-platform', 'user-agent'];

        foreach($header as $k=>$v){
            if(in_array($k, $list_header)){
                $save_header[$k] = $v;
            }
        }

        $view_create = [
            "id_home" => $id_home,
            'id_user' => $id_user,
            'header_user' => json_encode($save_header)
        ];

        $cnt = HomeView::query()->where($view_create)->count();

        if($cnt <= 0) {
            HomeView::create($view_create);
        }
    }


    public function edit(int $id)
    {
        $res['dictionary'] = (new DictionaryHelpers())->all();
        if($id > 0) {
            if(!Auth::guard('api')->check())
                return $this->sendError('Ошибка! Пользователь не найден');

            $home = Home::with([
                "dicCity",
                "dicTypeHome",
                'dicTypeSale' => function($query){
                    return $query->select('id', 'name2 as name');
                },
                "dicRc",
                "homePics"
            ])->find($id);

            if (Auth::guard('api')->user()->id == $home->id_user)
                $res["home"] = $home;
        }

        return $this->sendSuccess($res);
    }


    public function update(Request $request, $id)
    {
        //dd($request->all());
        try {
            $id_user = Auth::guard('api')->user()->id;
        }catch (\Exception $e){
            return $this->sendError($e->getMessage());
        }

        $validate = Validator::make($request->all(), [
            "id_type_sale" => "required|integer",
            "id_type_home" => "required|integer",
            "id_city" => "required|integer",
            //"address" => "required|string",
            "cnt_rooms" => "required|integer",
            "cnt_loggia" => "required|integer",
            "cnt_balkony" => "required|integer",
            "cnt_toilet" => "required|integer",
            "total_area" => "required|numeric",
            "living_area" => "required|numeric",
            "kitchen_area" => "required|numeric",
            "year_construction" => "required|integer",
            "floor" => "required|integer",
            "floor_all" => "required|integer",
            "id_condit" => "required|integer",
            "other_comment" => "nullable|string",
            "phone" => "required|string",
            "price" => "required|numeric"
        ]);

        if ($validate->fails()) {
            return $this->sendError($validate->getMessageBag());
            //return $this->sendError("Ошибка валидации входящих параметров");
        }

        DB::beginTransaction();
        try{
            $home = ($id == 0) ? new Home() : Home::find($id);
            $home->id_user = $id_user;
            $home->id_type_sale = $request->id_type_sale;
            $home->id_type_home = $request->id_type_home;
            $home->id_city = $request->id_city;
            $home->address = $request->address;
            $home->cnt_rooms = $request->cnt_rooms;
            $home->cnt_loggia = $request->cnt_loggia;
            $home->cnt_balkony = $request->cnt_balkony;
            $home->cnt_toilet = $request->cnt_toilet;
            $home->toilet_from_bathroom = $request->has('toilet_from_bathroom');
            $home->total_area = $request->total_area;
            $home->living_area = $request->living_area;
            $home->kitchen_area = $request->kitchen_area;
            $home->year_construction = $request->year_construction;
            $home->floor = $request->floor;
            $home->floor_all = $request->floor_all;
            $home->id_condit = $request->id_condit;
            $home->other_comment = $request->other_comment;
            $home->phone = $request->phone;
            $home->phone2 = $request->phone2;
            $home->phone3 = $request->phone3;
            $home->price = $request->price;
            $home->id_rc = $request->id_rc;
            $home->save();

            $ids = ($id == 0) ? $home->id : $id;

            //Работа с картинка (был косяк при редактировании)
            $home_pic = HomePic::query()
                ->where('id_home', $ids)
                ->select();

            //Создаем массив переданных картинок
            $imageOnLoad = [];
            if ($request->has('images')) {
                if (count($request->images) > 0) {
                    foreach ($request->images as $pic) {
                        array_push($imageOnLoad, $pic['pic']);
                    }
                }
            }
            foreach ($home_pic->get() as $old_img) {
                if(file_exists(public_path() . $old_img->pic)) {
                    //Если массив не пустой и имеется уже файл тогда не удаляем его.
                    if(count($imageOnLoad) > 0){
                        if(!in_array($old_img->pic, $imageOnLoad)){
                            unlink(public_path() . $old_img->pic);
                        }
                    }else{
                        unlink(public_path() . $old_img->pic);
                    }
                }
            }
            $home_pic->delete();

            if ($request->has('images')) {
                if (count($request->images) > 0) {
                    foreach ($request->images as $pic) {
                        $hp = new HomePic();
                        $hp->id_home = $ids;
                        $hp->pic = $pic['pic'];
                        $hp->general = (isset($pic['general'])) ? (bool)$pic['general'] : false;
                        $hp->save();
                    }
                }
            }
            DB::commit();
        }catch (\Exception $e){
            DB::rollBack();
            return $this->sendError($e->getMessage());
        }

        return $this->sendSuccess([], 'Данные сохранены успешно!');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function setHomeComment(Request $request): JsonResponse
    {
        $id_user = Auth::guard('api')->user()->id;

        $validate = Validator::make($request->all(), [
            "id_home" => "required|integer",
            "comment" => "required|string"
        ]);
        if($validate->fails()){
            return $this->sendError($validate->getMessageBag());
        }

        //Надо доработать пока сыро
        /*
        $date = date('d/m/Y H:i:s');
        $lastComment = HomeComment::query()
            ->where([
                "id_home" => $request->id_home,
                "id_user" => $id_user,
            ])
            ->whereRaw("date_format(created_at, '%d/%m/%Y %T') >= date_format('$date', '%d/%m/%Y %T') - INTERVAL 60 MINUTE")
            ->count();

        if($lastComment > 0){
            return $this->sendError('Оставление комментариев разрешается только 1 раз в час');
        }
        */

        $data = [
            "id_home" => $request->id_home,
            "id_user" => $id_user,
            "comment_text" => $request->comment,
            "id_child" => ($request->has('child')) ? $request->child : 0
        ];
        HomeComment::create($data);
        return $this->getHomeComment($request->id_home);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function getHomeComment($id): JsonResponse
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

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function setHomeLike(Request $request): JsonResponse
    {
        $id_user = Auth::guard('api')->user()->id;

        $validate = Validator::make($request->all(), [
            "id_comment" => "required|integer",
            "id_type" => "required|string"
        ]);
        if($validate->fails()){
            return $this->sendError($validate->getMessageBag());
        }

        $home_comment = HomeComment::find($request->id_comment);
        if(!$home_comment){
            return  $this->sendError('Комментарий не найден!');
        }
        $id_home = $home_comment->id_home;

        //Проверяем ставил ли пользователь оценку
        $hcl = HomeCommentsLike::query()
            ->where([
                "id_comment" => $request->id_comment,
                "id_user" => $id_user
            ])
            ->first();

        //Если ставил тогда
        if($hcl){
            if($request->id_type == 'likes' && (int)$hcl->likes == 1){
                //если раньше был like и поставил обратно like тогда убираем этот like
                $hcl->delete();
            }elseif ($request->id_type == 'dislike' && (int)$hcl->dislike == 1){
                //если раньше был dislike и поставил обратно dislike тогда убираем этот dislike
                $hcl->delete();
            }else{
                //Иначе меняем местами но их и сохраняем
                $hcl->likes = ($request->id_type == 'likes') ? 1 : 0;
                $hcl->dislike = ($request->id_type == 'dislike') ? 1 : 0;
                $hcl->save();
            }
        }else {
            //Если ставит лайк в первый раз
            $data = [
                "id_comment" => $request->id_comment,
                "id_user" => $id_user,
                "likes" => ($request->id_type == 'likes') ? 1 : 0,
                "dislike" => ($request->id_type == 'dislike') ? 1 : 0,
            ];

            HomeCommentsLike::create($data);
        }
        return $this->getHomeComment($id_home);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function setHomeFavorite(Request $request): JsonResponse
    {
        $id_user = Auth::guard('api')->user()->id;

        $validate = Validator::make($request->all(), [
            "id_home" => "required|integer"
        ]);
        if($validate->fails()){
            return $this->sendError($validate->getMessageBag());
        }

        $data = [
            "id_user" => $id_user,
            "id_home" => $request->id_home
        ];

        $favorite = Favorite::query()->where($data)->first();
        if(!$favorite){
            Favorite::create($data);
            return $this->sendSuccess(["favorite" => true], 'Объявление успешно добавлено в избранное');
        }

        $favorite->delete();
        return $this->sendSuccess(["favorite" => false], 'Объявлено убранно из избраннных');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getHomeFavorite(Request $request): JsonResponse
    {
        $id_user = Auth::guard('api')->user()->id;
        $favorite = Favorite::query()->where('id_user', $id_user)->get()->pluck('id_home');

        $home = Home::with([
            "dicCity",
            "dicTypeHome",
            'dicTypeSale' => function($query){
                return $query->select('id', 'name2 as name');
            },
            "homePics"
        ])
            ->orderByDesc('id')
            ->select([
                "id",
                "id_type_sale",
                "id_type_home",
                "id_city",
                "cnt_rooms",
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
                DB::raw("DATE_FORMAT(created_at, '%d.%m.%Y') as date_set"),
                DB::raw("(select count(*) from home_view where id_home = home.id) as cnt_view")
            ])
            ->whereIn('id', $favorite)
            ->get();

        return $this->sendSuccess($home);
    }

    public function destroy($id)
    {
        //
    }
}
