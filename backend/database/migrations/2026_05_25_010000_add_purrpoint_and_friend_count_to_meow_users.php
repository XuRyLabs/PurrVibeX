<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('meow_users', function (Blueprint $table) {
            $table->unsignedInteger('purr_points')->default(0)->after('profile_visibility');
            $table->unsignedInteger('friend_count')->default(0)->after('purr_points');
        });
    }

    public function down(): void
    {
        Schema::table('meow_users', function (Blueprint $table) {
            $table->dropColumn(['purr_points', 'friend_count']);
        });
    }
};

