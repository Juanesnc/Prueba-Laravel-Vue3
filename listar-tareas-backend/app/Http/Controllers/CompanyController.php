<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CompanyController extends Controller
{
    public function getCompanies() {

        $company = Company::all();

        
        return response()->json($company, 200);
    }

    public function getId(Request $request){
        $company = Company::where('name', $request->name)->first();

        return response()->json(['id' => $company->id], 200);
    }
}
