<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // MySQL: extend ENUM. SQLite stores Laravel enums as varchar; no ALTER needed for new values.
        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE plans MODIFY COLUMN status ENUM('draft', 'pending', 'in_progress', 'completed') DEFAULT 'draft'");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE plans MODIFY COLUMN status ENUM('draft', 'in_progress', 'completed') DEFAULT 'draft'");
        }
    }
};
