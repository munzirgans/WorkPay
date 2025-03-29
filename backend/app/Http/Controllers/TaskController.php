<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\TaskAssignment;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string',
            'date' => 'required|date',
            'additional_charges' => 'nullable|numeric|min:0',
            'assignments' => 'required|array',
            'assignments.*.employee_id' => 'required|exists:employees,id',
            'assignments.*.hours_spent' => 'required|numeric|min:0',
            'assignments.*.hourly_rate' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $task = Task::create([
            'description' => $request->description,
            'date' => $request->date,
            'additional_charges' => $request->additional_charges ?? 0,
        ]);

        $assignments = [];
        foreach ($request->assignments as $assignment) {
            $total_remuneration = $assignment['hours_spent'] * $assignment['hourly_rate'];
            
            $assignments[] = TaskAssignment::create([
                'task_id' => $task->id,
                'employee_id' => $assignment['employee_id'],
                'hours_spent' => $assignment['hours_spent'],
                'hourly_rate' => $assignment['hourly_rate'],
                'total_remuneration' => $total_remuneration
            ]);
        }

        return response()->json([
            'message' => 'Task dan employee berhasil diassign.',
            'task' => $task,
            'assignments' => $assignments
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = Task::with('assignments.employee')->find($id);

        if (!$task) {
            return response()->json(['message' => 'Task tidak ditemukan.'], 404);
        }

        return response()->json($task, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'description' => 'sometimes|required|string',
            'date' => 'sometimes|required|date',
            'additional_charges' => 'sometimes|numeric|min:0',
            'assignments' => 'sometimes|array',
            'assignments.*.employee_id' => 'required_with:assignments|exists:employees,id',
            'assignments.*.hours_spent' => 'required_with:assignments|numeric|min:0',
            'assignments.*.hourly_rate' => 'required_with:assignments|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->has('description')) {
            $task->description = $request->description;
        }
        if ($request->has('date')) {
            $task->date = $request->date;
        }
        if ($request->has('additional_charges')) {
            $task->additional_charges = $request->additional_charges;
        }
        $task->save();

        if ($request->has('assignments')) {
            TaskAssignment::where('task_id', $task->id)->delete();
            $assignments = [];
            foreach ($request->assignments as $assignment) {
                $total_remuneration = $assignment['hours_spent'] * $assignment['hourly_rate'];
                
                $assignments[] = TaskAssignment::create([
                    'task_id' => $task->id,
                    'employee_id' => $assignment['employee_id'],
                    'hours_spent' => $assignment['hours_spent'],
                    'hourly_rate' => $assignment['hourly_rate'],
                    'total_remuneration' => $total_remuneration
                ]);
            }
        }

        return response()->json([
            'message' => 'Task berhasil diperbarui.',
            'task' => $task,
            'assignments' => $assignments ?? TaskAssignment::where('task_id', $task->id)->get()
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task tidak ditemukan.'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task berhasil dihapus.'], 200);
    }
}
