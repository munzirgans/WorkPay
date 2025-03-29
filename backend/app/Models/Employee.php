<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'name', 'email'
    ];

    public function TaskAssignments(){
        return $this->hasMany(TaskAssignment::class);
    }
}
