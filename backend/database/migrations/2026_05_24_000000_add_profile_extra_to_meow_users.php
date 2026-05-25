<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('meow_users', function (Blueprint $table) {
            // Username: changeable once per 30 days — track when it was last changed
            $table->timestamp('username_updated_at')->nullable()->after('username');

            // Email: changeable only once — boolean flag
            $table->boolean('email_changed')->default(false)->after('email');

            // Structured address fields (keep existing `location` as denormalized summary)
            $table->string('ward', 100)->nullable()->after('location');
            $table->string('city', 100)->nullable()->after('ward');
            $table->string('country', 100)->nullable()->after('city');

            // Additional profile links
            $table->string('website_url', 255)->nullable()->after('bio');
            $table->string('social_twitter', 100)->nullable()->after('website_url');
            $table->string('social_instagram', 100)->nullable()->after('social_twitter');

            // Make phone nullable (registration may not collect it)
            $table->string('phone')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('meow_users', function (Blueprint $table) {
            $table->dropColumn([
                'username_updated_at',
                'email_changed',
                'ward',
                'city',
                'country',
                'website_url',
                'social_twitter',
                'social_instagram',
            ]);
            $table->string('phone')->nullable(false)->change();
        });
    }
};

