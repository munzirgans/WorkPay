<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::all();
        return response()->json($employees);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:employees,email'
        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $employee = Employee::create([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json([
            'message' => 'Employee berhasil ditambahkan.',
            'data' => $employee
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employee = Employee::find($id);
        if(!$employee){
            return response()->json([
                "message" => "Data pegawai tidak dapat ditemukan."
            ],404);
        }
        return response()->json($employee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:50',
            'email' => 'sometimes|required|email|unique:employees,email,'.$id
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $employee = Employee::find($id);
        if (!$employee) {
            return response()->json(['message' => 'Data pegawai tidak dapat ditemukan'], 404);
        }
        if ($request->filled('name')) {
            $employee->name = $request->name;
        }
        if ($request->filled('email')) {
            $employee->email = $request->email;
        }
        $employee->save();
        return response()->json([
            'message' => "Data pegawai berhasil diupdate",
            "data" => $employee
        ], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employee = Employee::find($id);
        if(!$employee){
            return response()->json(['message' => 'Data pegawai tidak dapat ditemukan.'], 404);
        }
        $employee->delete();
        return response()->json(['message' => "Data pegawai berhasil dihapus."], 200);
    }
}
