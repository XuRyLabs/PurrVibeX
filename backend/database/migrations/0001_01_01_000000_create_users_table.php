<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('meow_users', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('display_name');
            $table->string('email')->unique();
            $table->string('username')->unique();
            $table->string('phone');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('avatar_url')->nullable();
            $table->text('bio')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('location')->nullable();
            $table->string('locale', 10)->nullable();
            $table->string('timezone')->nullable();
            $table->string('role')->default('user');
            $table->timestamp('last_seen')->nullable();
            $table->string('profile_visibility')->default('public');

            // Indexes if useful:
            $table->index('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meow_users');
    }
};
