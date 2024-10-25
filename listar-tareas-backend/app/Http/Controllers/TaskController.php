<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    
    public function index($id, Request $request)
    {
        $query = Task::where('user_id', $id)->where('soft_delete', 0);

        if($request->filled('name')){
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        if($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }
        
        $tasks = $query->get();

        
        return response()->json($tasks, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        Log::info($request);
        $uuid = Str::uuid();

        $task = new Task;
        $task->id =(string) $uuid;
        $task->title = $request->title;
        $task->description = $request->description;
        $task->status = 'pending';
        $task->due_date = $request->due_date;
        $task->company_id = $request->company_id;
        $task->user_id = Auth::id();
        $task->soft_delete = false;
        $task->save();

        return response()->json(['message' => 'Success'], 200);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $authorizationHeader = $request->header('Authorization');

        if(!$authorizationHeader){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $tokenUser = str_replace('Bearer ', '', $authorizationHeader);

        $user = User::where('id', $request->user_id)
        ->where('token', $tokenUser)
        ->first();

        if(!$user){
            return response()->json(['error' => 'Unauthorized'], 401);
        }


        $task = Task::find($request->id);

        $task->title = $request->title;
        $task->description = $request->description;
        $task->company_id = $request->company_id;
        $task->status = $request->status;
        $task->updated_at = now();
        $task->save();
        
        return response()->json(['message' => 'Success'], 200);
    }

    public function destroy(string $id)
    {
        $task = Task::find($id);
        $task->soft_delete = true;

        $task->save();

        return response()->json(['Task Deleted' => 'Success'], 200);
    }
}
