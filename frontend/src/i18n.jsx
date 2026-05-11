import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'purrvibex-lang';

const makeQuickLink = (icon, title, description) => ({ icon, title, description });
const makeTestimonial = (name, role, quote, avatar) => ({ name, role, quote, avatar });

export const TEXTS = {
  en: {
    nav: {
      home: 'Home',
      about: 'About us',
      rooms: 'PurrLounge',
      gallery: 'Gallery',
      leaderboard: 'Hall of Paws',
      shop: 'ClawMart',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      switchTo: 'Tiếng Việt',
      profile: 'PurrDex',
      darkMode: 'PurrDark',
      lightMode: 'PurrLight',
      brandSubtitle: 'Powered by XuRyLabs',
    },
    home: {
      pill: '🐾 Your new favourite cat-powered hangout spot',
      titleLead: 'The internet just got way cuter —',
      titleHighlight: 'welcome, cat lover!',
      intro:
        'Join a cozy room, share cat pics, and vibe together. No drama, just purrs. 🐱',
      primary: 'Jump into Meow Rooms ✨',
      secondary: 'Explore the Gallery 📸',
      badgeRow: ['Mega cozy vibes ☁️', 'Live rooms 🟢', 'Collect cute stuff 🎁'],
      heroTitle: 'Imagine a tiny cat café — but make it the internet.',
      heroSubtitle:
        'Warm, playful, and a little magical. Come in, chill out. 🌸',
      heroNotes: [
        '🌙 Buttery smooth transitions',
        '🐱 Pastel-soft visuals that don\'t hurt your eyes',
        '🎮 Activities built around being a cat person',
      ],
      featureTitle: 'Four things we\'re really proud of 🐾',
      featureSubtitle: 'Tap, join, play. Everything stays simple.',
      highlights: [
        {
          title: '🏠 PurrLounge',
          text: 'Themed rooms for instant chill and easy convos.',
        },
        {
          title: '🎧 BeatPaws',
          text: 'Sync music with friends and play mini games in between.',
        },
        {
          title: '🐾 MeowDex',
          text: 'Customize your cat profile, mood, and style in seconds.',
        },
        {
          title: '🛍️ ClawMart',
          text: 'Spend points on cute themes, stickers, and shiny extras.',
        },
      ],
      quickTitle: 'Where do you wanna go? 🐾',
      quickSubtitle: 'One tap and you\'re in.',
      quickGuestPrompt: 'Log in to explore.',
      quickLinks: [
        makeQuickLink('🏠', 'PurrLounge', 'Find a cozy room, make yourself at home, and say hi to the regulars.'),
        makeQuickLink('🖼️', 'Cat Gallery', 'Scroll through community cat pics. Therapeutic. Scientifically proven.*'),
        makeQuickLink('🏆', 'Hall of Paws', 'Who\'s the top cat? Check the board and see if you\'re on it.'),
        makeQuickLink('🛒', 'ClawMart', 'Treat yourself. You deserve that sparkly sticker pack.'),
      ],
      reelTitle: '✨ Live right now',
      reelSubtitle: 'Tiny live moments, all day.',
      loopingMotionTitle: 'Always something going on',
      softTransitionsTitle: 'Smooth like a cat landing',
      reelLabels: ['Blink 👁️', 'Purrr 😸', 'Play 🎮'],
      proofTitle: 'Real cats, real opinions 😸',
      proofSubtitle: 'Short reviews from our early cat crowd.',
      testimonials: [
        makeTestimonial(
          'Linh',
          'Certified early adopter',
          'Came for cat photos, stayed for hours. Instant cozy vibe.',
          '🐱✨'
        ),
        makeTestimonial(
          'Minh',
          'Self-proclaimed BeatPaws addict',
          'Sync music with friends is smooth and surprisingly addictive.',
          '🎧🐾'
        ),
        makeTestimonial(
          'An',
          'MeowDex power user',
          'Profile customization is fast, fun, and dangerously cute.',
          '📸😸'
        ),
      ],
      footerTitle: 'Crafted with 🩷 by XuRyLabs',
      footerText: 'Soft colors, smooth motion, cat energy everywhere.',
      trustPills: ['Zero cringe UI 🙅', 'Cat-approved 🐾', 'Makes you go "aww" 🌸'],
    },
    rooms: {
      title: '🏠 PurrLounge',
      subtitle: 'Find your chill spot and vibe with others.',
      filters: { all: 'All', live: '🟢 Live', chill: '🌙 Chill' },
      liveLabel: '🟢 Live',
      chillLabel: '🌙 Chill',
      inRoom: 'in room',
      list: [
        { title: 'Lo-fi Study Corner ☕', desc: 'Quiet room for focus sessions and gentle music.', tag: 'Live', live: true, members: ['🐱', '🐾', '😸'], count: 8 },
        { title: 'Gaming Night 🎮', desc: 'Mini games, bracket challenges, and chaos.', tag: 'Hot', live: true, members: ['😺', '🐱', '🐾'], count: 14 },
        { title: 'Cat Photo Swap 📸', desc: 'Drop your best boss photos and get reactions.', tag: 'New', live: true, members: ['🙀', '😸'], count: 5 },
        { title: 'Night Owl Vibes 🌙', desc: 'Late night chat for all the nocturnal cats.', tag: 'Chill', live: false, members: ['🐾'], count: 2 },
        { title: 'BeatPaws DJ Room 🎧', desc: 'Take turns picking songs. No bad vibes.', tag: 'Live', live: true, members: ['😸', '🐱', '🐾'], count: 11 },
        { title: 'Book & Tea Club 📚', desc: 'Slow mornings, warm drinks, and book recs.', tag: 'Chill', live: false, members: ['🐱', '😺'], count: 3 },
      ],
    },
    gallery: {
      title: '🖼️ Cat Gallery',
      subtitle: 'Community-submitted boss photos. Drop yours anytime.',
      shareButton: '+ Share a photo',
      tags: ['All', 'Cute', 'Funny', 'Cozy', 'Wild'],
      photos: [
        { emoji: '🐱', name: 'Mochi napping', user: '@linh.cat', likes: 42 },
        { emoji: '😸', name: 'Big yawn energy', user: '@minh.purr', likes: 38 },
        { emoji: '🐾', name: 'Paw close-up', user: '@an.meow', likes: 61 },
        { emoji: '😺', name: 'Window watcher', user: '@jerry.cat', likes: 29 },
        { emoji: '🙀', name: 'Startled at vacuum', user: '@linh.cat', likes: 87 },
        { emoji: '😻', name: 'Loaf mode', user: '@minh.purr', likes: 54 },
        { emoji: '🐈', name: 'Stealth mode', user: '@an.meow', likes: 33 },
        { emoji: '🐈‍⬛', name: 'Midnight vibes', user: '@jerry.cat', likes: 71 },
      ],
    },
    leaderboard: {
      title: '🏆 Hall of Paws',
      subtitle: 'Top cats ranked by Meow Points this week.',
      pointsLabel: 'pts',
      youLabel: "That's you! 🐾",
      memberLabel: 'cat member',
      top3: [
        { rank: 2, name: 'Mochi_San', score: 8420, emoji: '😸' },
        { rank: 1, name: 'PurrQueen', score: 9870, emoji: '👑' },
        { rank: 3, name: 'NightPaww', score: 7650, emoji: '🌙' },
      ],
      list: [
        { rank: 4, name: 'CatNapper42', score: 6300, emoji: '🐱', me: false },
        { rank: 5, name: 'LoafKing', score: 5880, emoji: '😺', me: false },
        { rank: 6, name: 'You 🐾', score: 4720, emoji: '🐾', me: true },
        { rank: 7, name: 'FluffyBoss', score: 4100, emoji: '🙀', me: false },
        { rank: 8, name: 'MidnightMeow', score: 3550, emoji: '🐈‍⬛', me: false },
        { rank: 9, name: 'TabbyTrouble', score: 2980, emoji: '🐈', me: false },
        { rank: 10, name: 'SilentPaws', score: 2340, emoji: '😻', me: false },
      ],
    },
    shop: {
      title: '🛍️ ClawMart',
      subtitle: 'Spend your Meow Points on stuff that sparks joy.',
      categories: [
        { id: 'all', label: 'All' },
        { id: 'backgrounds', label: '🖼️ Backgrounds' },
        { id: 'stickers', label: '✨ Stickers' },
        { id: 'avatars', label: '🐱 Avatars' },
        { id: 'themes', label: '🎨 Themes' },
      ],
      newLabel: 'New',
      ownedLabel: '✓ Owned',
      getIt: 'Get it',
      done: '✓ Done!',
      pointsLabel: 'pts',
      items: [
        { emoji: '🌸', name: 'Sakura Theme', desc: 'Soft pink petals everywhere.', cat: 'themes', price: 1200, isNew: true, owned: false },
        { emoji: '🌙', name: 'Night Mode Bg', desc: 'Dark sky, glowing moon.', cat: 'backgrounds', price: 800, isNew: false, owned: true },
        { emoji: '🐟', name: 'Fish Sticker Pack', desc: '12 fishy reaction stickers.', cat: 'stickers', price: 600, isNew: true, owned: false },
        { emoji: '😺', name: 'Beret Cat Avatar', desc: 'Very chic, very cat.', cat: 'avatars', price: 1500, isNew: false, owned: false },
        { emoji: '☁️', name: 'Cloud Bg', desc: 'Soft pastel floating clouds.', cat: 'backgrounds', price: 700, isNew: false, owned: false },
        { emoji: '🎀', name: 'Ribbon Frame', desc: 'A bow-tie photo frame!', cat: 'stickers', price: 400, isNew: false, owned: true },
        { emoji: '🐾', name: 'PawPrint Theme', desc: 'Subtle paw patterns everywhere.', cat: 'themes', price: 900, isNew: false, owned: false },
        { emoji: '🧶', name: 'Yarn Avatar', desc: 'Your cat, but with yarn.', cat: 'avatars', price: 1100, isNew: true, owned: false },
      ],
    },
    music: {
      title: '🎧 BeatPaws',
      subtitle: 'Synced music for your crew. Queue up, vibe out.',
      live: '🟢 Live',
      paused: '⏸ Paused',
      upNext: 'Up next 🎶',
      addToQueue: '+ Add to queue',
      previous: 'Previous',
      shuffle: 'Shuffle',
      play: 'Play',
      pause: 'Pause',
      repeat: 'Repeat',
      next: 'Next',
      currentTime: '1:34',
      totalTime: '4:12',
      queue: [
        { emoji: '🎵', track: 'Thang Tu La Loi Noi Doi', artist: 'Ha Anh Tuan', dur: '4:12', active: true },
        { emoji: '🎶', track: 'Blinding Lights', artist: 'The Weeknd', dur: '3:22', active: false },
        { emoji: '🎸', track: 'As It Was', artist: 'Harry Styles', dur: '2:37', active: false },
        { emoji: '🎹', track: 'Nhu Nhung Phut Ban Dau', artist: 'Bang Kieu', dur: '5:08', active: false },
        { emoji: '🎺', track: 'Levitating', artist: 'Dua Lipa', dur: '3:23', active: false },
      ],
    },
    profile: {
      title: '🐾 MeowDex',
      subtitle: 'Your cat identity card. Make it yours.',
      fallbackUser: 'Cat User',
      online: 'Online',
      providerGoogle: '🟦 Google',
      providerEmail: '✉️ Email',
      stats: { points: 'Points', rooms: 'Rooms', badges: 'Badges' },
      editProfile: '✏️ Edit profile',
      badgesTitle: 'Badges 🏅',
      activityTitle: 'Recent activity ⚡',
      badges: ['🐾 Early Cat', '🎧 BeatPaws Fan', '📸 Shutterpaw', '🏆 Top 10', '🧶 Crafter', '🌙 Night Owl', '🎮 Gamer Paw'],
      activity: [
        { icon: '🏠', text: 'Joined Lo-fi Study Corner', time: '2 min ago' },
        { icon: '❤️', text: 'Liked a photo in Gallery', time: '18 min ago' },
        { icon: '🛍️', text: 'Bought Sakura Theme', time: '1 hr ago' },
        { icon: '🎧', text: 'Queued a song in BeatPaws', time: '3 hr ago' },
        { icon: '🏆', text: 'Reached #6 on Hall of Paws', time: 'Yesterday' },
      ],
    },
    loader: {
      aria: 'Loading session',
      label: 'Just a sec... 🐾',
    },
    about: {
      title: 'About PurrVibeX',
      intro:
        'PurrVibeX is a playful social space for cat lovers to hang out, share moments, and enjoy cozy real-time features together.',
      cards: [
        {
          title: 'Our mission',
          text: 'Make online social spaces feel warm, safe, and fun, like walking into a tiny cat cafe with friends.',
        },
        {
          title: 'What we build',
          text: 'Real-time meow rooms, synced music, cat profile identity, and light gamified rewards to keep things joyful.',
        },
        {
          title: 'How we design',
          text: 'Pastel visuals, soft motion, and clear UX patterns so users can instantly feel at home.',
        },
        {
          title: 'Team values',
          text: 'Kindness first, playful by default, and always built with accessibility and performance in mind.',
        },
      ],
    },
    auth: {
      loginTitle: 'Hey, you\'re back! 🐾',
      loginSubtitle: 'Sign in and pick up right where you left off. Your cat avatar missed you.',
      registerTitle: 'Ready to join the cat squad? 😸',
      registerSubtitle: 'Takes 30 seconds. Your cozy little corner is waiting.',
      email: 'Email',
      password: 'Password',
      displayName: 'Display name',
      loginButton: 'Login with Firebase',
      googleButton: 'Continue with Google',
      orContinueWithEmail: 'or continue with email',
      firebaseReady: 'Email/password login is ready.',
      firebaseAuthLabel: 'Firebase Auth',
      dividerAria: 'or',
      resetEnterEmail: 'Please enter your email first.',
      resetSent: 'Password reset email sent.',
      registerNoteTitle: 'New cat vibe',
      registerNoteText: 'Set your display name, create account, and jump into PurrVibeX.',
      emailPlaceholder: 'you@example.com',
      passwordPlaceholder: '••••••••',
      displayNamePlaceholder: 'Mochi Cat',
      registerButton: 'Create account',
      resetPassword: 'Forgot password?',
      switchToRegister: 'Need an account? Register',
      switchToLogin: 'Already have an account? Login',
      successLogin: 'Logged in successfully!',
      successRegister: 'Account created successfully!',
      firebaseMissing: 'Firebase is not configured yet. Fill in frontend/.env.example first.',
    },
    system: {
      checkingPassTitle: 'Checking your cat pass...',
      checkingPassDesc: 'Please wait while we verify your session.',
    },
  },
  vi: {
    nav: {
      home: 'Trang chủ',
      about: 'Về chúng mình',
      rooms: 'PurrLounge',
      gallery: 'Gallery',
      leaderboard: 'Hall of Paws',
      shop: 'ClawMart',
      login: 'Đăng nhập',
      register: 'Đăng ký',
      logout: 'Đăng xuất',
      switchTo: 'English',
      profile: 'PurrDex',
      darkMode: 'PurrDark',
      lightMode: 'PurrLight',
      brandSubtitle: 'Powered by XuRyLabs',
    },
    home: {
      pill: '🐾 Góc internet siêu chill dành cho hội yêu mèo',
      titleLead: 'Internet vừa dễ thương hơn rất nhiều —',
      titleHighlight: 'chào bạn, sen mèo!',
      intro:
        'Vào phòng chill, đăng ảnh boss, nghe nhạc cùng nhau. Không drama, chỉ có tiếng rừ rừ. 🐱',
      primary: 'Vào PurrLounge ngay ✨',
      secondary: 'Lướt Cat Gallery 📸',
      badgeRow: ['Vibe êm ru ☁️', 'Phòng live 🟢', 'Bộ sưu tập xinh xắn 🎁'],
      heroTitle: 'Hình dung quán cà phê mèo nhỏ xíu — nhưng trên internet.',
      heroSubtitle:
        'Ấm áp, vui tươi, hơi có chút phép màu. Vào là thấy dễ chịu liền. 🌸',
      heroNotes: [
        '🌙 Chuyển cảnh mượt như bơ',
        '🐱 Tông pastel nhẹ nhàng, mát mắt',
        '🎮 Hoạt động được thiết kế cho các sen',
      ],
      featureTitle: '4 thứ mình tự hào nhất 🐾',
      featureSubtitle: 'Chạm là dùng được ngay, không cần học nhiều.',
      highlights: [
        {
          title: '🏠 PurrLounge',
          text: 'Phòng theo chủ đề để chill và trò chuyện thật tự nhiên.',
        },
        {
          title: '🎧 BeatPaws',
          text: 'Nghe nhạc đồng bộ với bạn bè, thêm mini game cho vui.',
        },
        {
          title: '🐾 MeowDex',
          text: 'Tùy chỉnh avatar, mood và style mèo của riêng bạn.',
        },
        {
          title: '🛍️ ClawMart',
          text: 'Dùng điểm để mở sticker, theme và đồ trang trí xinh.',
        },
      ],
      quickTitle: 'Bạn muốn đi đâu? 🐾',
      quickSubtitle: 'Một chạm là vào ngay.',
      quickGuestPrompt: 'Đăng nhập để khám phá.',
      quickLinks: [
        makeQuickLink('🏠', 'PurrLounge', 'Tìm phòng chill, an vị thoải mái và chào hỏi các thành viên quen mặt.'),
        makeQuickLink('🖼️', 'Cat Gallery', 'Lướt ảnh mèo cộng đồng. Trị liệu tinh thần. Đã được khoa học chứng minh.*'),
        makeQuickLink('🏆', 'Hall of Paws', 'Ai đang là top mèo? Lên bảng xem tên bạn có ở đó không nào.'),
        makeQuickLink('🛒', 'ClawMart', 'Chiều bản thân đi. Bạn xứng đáng có gói sticker lấp lánh đó mà.'),
      ],
      reelTitle: '✨ Đang diễn ra ngay lúc này',
      reelSubtitle: 'Khoảnh khắc live nho nhỏ cả ngày.',
      loopingMotionTitle: 'Luôn có gì đó đang xảy ra',
      softTransitionsTitle: 'Mượt như mèo đáp đất',
      reelLabels: ['Nháy 👁️', 'Rừ rừ 😸', 'Chơi 🎮'],
      proofTitle: 'Mèo thật, cảm xúc thật 😸',
      proofSubtitle: 'Review ngắn từ hội mê mèo dùng sớm.',
      testimonials: [
        makeTestimonial(
          'Linh',
          'Người vào sớm nhất hội',
          'Vào vì ảnh mèo, ở lại vì vibe. Quá cuốn.',
          '🐱✨'
        ),
        makeTestimonial(
          'Minh',
          'Con nghiện BeatPaws tự phong',
          'Nghe nhạc đồng bộ rất mượt, dùng là dính luôn.',
          '🎧🐾'
        ),
        makeTestimonial(
          'An',
          'Chuyên gia MeowDex',
          'Tùy chỉnh profile vừa nhanh vừa vui, siêu đáng yêu.',
          '📸😸'
        ),
      ],
      footerTitle: 'Được tạo với 🩷 bởi XuRyLabs',
      footerText: 'Màu mềm, motion mượt, năng lượng mèo ngập tràn.',
      trustPills: ['UI không cringe 🙅', 'Boss mèo đã duyệt 🐾', 'Đảm bảo gây "aww" 🌸'],
    },
    rooms: {
      title: '🏠 PurrLounge',
      subtitle: 'Tìm góc chill hợp gu và vào vibe cùng mọi người.',
      filters: { all: 'Tất cả', live: '🟢 Live', chill: '🌙 Chill' },
      liveLabel: '🟢 Live',
      chillLabel: '🌙 Chill',
      inRoom: 'trong phòng',
      list: [
        { title: 'Góc học Lo-fi ☕', desc: 'Phòng yên tĩnh để học và nghe nhạc nhẹ.', tag: 'Live', live: true, members: ['🐱', '🐾', '😸'], count: 8 },
        { title: 'Gaming Night 🎮', desc: 'Mini game, đấu giải nhỏ và cười xỉu.', tag: 'Hot', live: true, members: ['😺', '🐱', '🐾'], count: 14 },
        { title: 'Đổi ảnh boss 📸', desc: 'Up ảnh mèo xịn và nhận reaction từ cộng đồng.', tag: 'Mới', live: true, members: ['🙀', '😸'], count: 5 },
        { title: 'Vibe cú đêm 🌙', desc: 'Chat khuya cho hội mèo ngủ muộn.', tag: 'Chill', live: false, members: ['🐾'], count: 2 },
        { title: 'BeatPaws DJ Room 🎧', desc: 'Thay phiên chọn nhạc, không toxic.', tag: 'Live', live: true, members: ['😸', '🐱', '🐾'], count: 11 },
        { title: 'Book & Tea Club 📚', desc: 'Sáng nhẹ, trà ấm và chia sẻ sách hay.', tag: 'Chill', live: false, members: ['🐱', '😺'], count: 3 },
      ],
    },
    gallery: {
      title: '🖼️ Cat Gallery',
      subtitle: 'Ảnh boss từ cộng đồng. Up ngay nếu muốn khoe.',
      shareButton: '+ Đăng ảnh',
      tags: ['Tất cả', 'Cute', 'Hài hước', 'Chill', 'Năng động'],
      photos: [
        { emoji: '🐱', name: 'Mochi ngủ nướng', user: '@linh.cat', likes: 42 },
        { emoji: '😸', name: 'Ngáp cực mạnh', user: '@minh.purr', likes: 38 },
        { emoji: '🐾', name: 'Cận cảnh bàn chân', user: '@an.meow', likes: 61 },
        { emoji: '😺', name: 'Ngồi canh cửa sổ', user: '@jerry.cat', likes: 29 },
        { emoji: '🙀', name: 'Hoảng vì máy hút bụi', user: '@linh.cat', likes: 87 },
        { emoji: '😻', name: 'Loaf mode', user: '@minh.purr', likes: 54 },
        { emoji: '🐈', name: 'Stealth mode', user: '@an.meow', likes: 33 },
        { emoji: '🐈‍⬛', name: 'Vibe nửa đêm', user: '@jerry.cat', likes: 71 },
      ],
    },
    leaderboard: {
      title: '🏆 Hall of Paws',
      subtitle: 'Top mèo theo Meow Points tuần này.',
      pointsLabel: 'điểm',
      youLabel: 'Bạn đây rồi! 🐾',
      memberLabel: 'thành viên',
      top3: [
        { rank: 2, name: 'Mochi_San', score: 8420, emoji: '😸' },
        { rank: 1, name: 'PurrQueen', score: 9870, emoji: '👑' },
        { rank: 3, name: 'NightPaww', score: 7650, emoji: '🌙' },
      ],
      list: [
        { rank: 4, name: 'CatNapper42', score: 6300, emoji: '🐱', me: false },
        { rank: 5, name: 'LoafKing', score: 5880, emoji: '😺', me: false },
        { rank: 6, name: 'Bạn 🐾', score: 4720, emoji: '🐾', me: true },
        { rank: 7, name: 'FluffyBoss', score: 4100, emoji: '🙀', me: false },
        { rank: 8, name: 'MidnightMeow', score: 3550, emoji: '🐈‍⬛', me: false },
        { rank: 9, name: 'TabbyTrouble', score: 2980, emoji: '🐈', me: false },
        { rank: 10, name: 'SilentPaws', score: 2340, emoji: '😻', me: false },
      ],
    },
    shop: {
      title: '🛍️ ClawMart',
      subtitle: 'Dùng Meow Points cho những món siêu xinh.',
      categories: [
        { id: 'all', label: 'Tất cả' },
        { id: 'backgrounds', label: '🖼️ Nền' },
        { id: 'stickers', label: '✨ Sticker' },
        { id: 'avatars', label: '🐱 Avatar' },
        { id: 'themes', label: '🎨 Theme' },
      ],
      newLabel: 'Mới',
      ownedLabel: '✓ Đã sở hữu',
      getIt: 'Nhận ngay',
      done: '✓ Xong!',
      pointsLabel: 'điểm',
      items: [
        { emoji: '🌸', name: 'Sakura Theme', desc: 'Cánh hoa hồng pastel phủ khắp giao diện.', cat: 'themes', price: 1200, isNew: true, owned: false },
        { emoji: '🌙', name: 'Night Mode Bg', desc: 'Bầu trời tối và trăng phát sáng.', cat: 'backgrounds', price: 800, isNew: false, owned: true },
        { emoji: '🐟', name: 'Fish Sticker Pack', desc: '12 sticker cá cho reaction nhanh.', cat: 'stickers', price: 600, isNew: true, owned: false },
        { emoji: '😺', name: 'Beret Cat Avatar', desc: 'Đội nón beret cực nghệ.', cat: 'avatars', price: 1500, isNew: false, owned: false },
        { emoji: '☁️', name: 'Cloud Bg', desc: 'Nền mây pastel siêu nhẹ mắt.', cat: 'backgrounds', price: 700, isNew: false, owned: false },
        { emoji: '🎀', name: 'Ribbon Frame', desc: 'Khung ảnh nơ hồng dễ thương.', cat: 'stickers', price: 400, isNew: false, owned: true },
        { emoji: '🐾', name: 'PawPrint Theme', desc: 'Theme dấu chân mèo tinh tế.', cat: 'themes', price: 900, isNew: false, owned: false },
        { emoji: '🧶', name: 'Yarn Avatar', desc: 'Avatar mèo ôm cục len.', cat: 'avatars', price: 1100, isNew: true, owned: false },
      ],
    },
    music: {
      title: '🎧 BeatPaws',
      subtitle: 'Nghe nhạc đồng bộ cùng hội bạn.',
      live: '🟢 Live',
      paused: '⏸ Tạm dừng',
      upNext: 'Danh sách tiếp theo 🎶',
      addToQueue: '+ Thêm vào queue',
      previous: 'Bài trước',
      shuffle: 'Ngẫu nhiên',
      play: 'Phát',
      pause: 'Tạm dừng',
      repeat: 'Lặp lại',
      next: 'Bài tiếp',
      currentTime: '1:34',
      totalTime: '4:12',
      queue: [
        { emoji: '🎵', track: 'Tháng Tư Là Lời Nói Dối', artist: 'Hà Anh Tuấn', dur: '4:12', active: true },
        { emoji: '🎶', track: 'Blinding Lights', artist: 'The Weeknd', dur: '3:22', active: false },
        { emoji: '🎸', track: 'As It Was', artist: 'Harry Styles', dur: '2:37', active: false },
        { emoji: '🎹', track: 'Như Những Phút Ban Đầu', artist: 'Bằng Kiều', dur: '5:08', active: false },
        { emoji: '🎺', track: 'Levitating', artist: 'Dua Lipa', dur: '3:23', active: false },
      ],
    },
    profile: {
      title: '🐾 MeowDex',
      subtitle: 'Thẻ định danh mèo của bạn. Biến nó thành chất riêng.',
      fallbackUser: 'Cat User',
      online: 'Đang online',
      providerGoogle: '🟦 Google',
      providerEmail: '✉️ Email',
      stats: { points: 'Điểm', rooms: 'Phòng', badges: 'Badge' },
      editProfile: '✏️ Chỉnh sửa hồ sơ',
      badgesTitle: 'Badge 🏅',
      activityTitle: 'Hoạt động gần đây ⚡',
      badges: ['🐾 Early Cat', '🎧 Fan BeatPaws', '📸 Shutterpaw', '🏆 Top 10', '🧶 Crafter', '🌙 Cú đêm', '🎮 Gamer Paw'],
      activity: [
        { icon: '🏠', text: 'Vừa vào phòng Lo-fi Study Corner', time: '2 phút trước' },
        { icon: '❤️', text: 'Đã thả tim một ảnh trong Gallery', time: '18 phút trước' },
        { icon: '🛍️', text: 'Đã mua Sakura Theme', time: '1 giờ trước' },
        { icon: '🎧', text: 'Đã thêm bài hát vào BeatPaws', time: '3 giờ trước' },
        { icon: '🏆', text: 'Đạt hạng #6 trên Hall of Paws', time: 'Hôm qua' },
      ],
    },
    loader: {
      aria: 'Đang tải phiên đăng nhập',
      label: 'Đợi xíu nhé... 🐾',
    },
    about: {
      title: 'Về PurrVibeX',
      intro:
        'PurrVibeX là một không gian social vui tươi cho hội yêu mèo, nơi mọi người có thể trò chuyện, chia sẻ khoảnh khắc và tận hưởng các tính năng real-time cùng nhau.',
      cards: [
        {
          title: 'Sứ mệnh',
          text: 'Biến trải nghiệm social online trở nên ấm áp, an toàn và thú vị như bước vào một quán cafe mèo nhỏ xinh.',
        },
        {
          title: 'Chúng mình xây gì',
          text: 'Meow room real-time, nghe nhạc đồng bộ, hồ sơ mèo cá nhân hóa và phần thưởng nho nhỏ để mọi thứ luôn vui.',
        },
        {
          title: 'Cách thiết kế',
          text: 'Visual pastel, chuyển động mềm và UX rõ ràng để người dùng vào là thấy quen ngay.',
        },
        {
          title: 'Giá trị đội ngũ',
          text: 'Ưu tiên sự tử tế, giữ tinh thần nhí nhảnh và luôn chú trọng cả hiệu năng lẫn khả năng truy cập.',
        },
      ],
    },
    auth: {
      loginTitle: 'Ơ bạn quay lại rồi! 🐾',
      loginSubtitle: 'Đăng nhập đi để tiếp tục — avatar mèo của bạn đang nhớ bạn đó.',
      registerTitle: 'Gia nhập hội mèo thôi nào! 😸',
      registerSubtitle: '30 giây là xong. Góc nhỏ dễ thương của bạn đang chờ.',
      email: 'Email',
      password: 'Mật khẩu',
      displayName: 'Tên hiển thị',
      loginButton: 'Đăng nhập với Firebase',
      googleButton: 'Tiếp tục với Google',
      orContinueWithEmail: 'hoặc tiếp tục với email',
      firebaseReady: 'Đăng nhập email/mật khẩu đã sẵn sàng.',
      firebaseAuthLabel: 'Firebase Auth',
      dividerAria: 'hoặc',
      resetEnterEmail: 'Vui lòng nhập email trước.',
      resetSent: 'Đã gửi email đặt lại mật khẩu.',
      registerNoteTitle: 'Vibe mèo mới',
      registerNoteText: 'Đặt tên hiển thị, tạo tài khoản và sẵn sàng vào thế giới PurrVibeX.',
      emailPlaceholder: 'you@example.com',
      passwordPlaceholder: '••••••••',
      displayNamePlaceholder: 'Mochi Cat',
      registerButton: 'Tạo tài khoản',
      resetPassword: 'Quên mật khẩu?',
      switchToRegister: 'Chưa có tài khoản? Đăng ký',
      switchToLogin: 'Đã có tài khoản? Đăng nhập',
      successLogin: 'Đăng nhập thành công!',
      successRegister: 'Tạo tài khoản thành công!',
      firebaseMissing: 'Firebase chưa được cấu hình. Hãy điền `frontend/.env.example` trước.',
    },
    system: {
      checkingPassTitle: 'Đang kiểm tra phiên đăng nhập...',
      checkingPassDesc: 'Vui lòng đợi trong lúc chúng mình xác thực phiên của bạn.',
    },
  },
};

const LanguageContext = createContext(null);

function detectLanguage() {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'vi') {
    return stored;
  }

  const browserLang = window.navigator.language?.toLowerCase() || '';
  return browserLang.startsWith('vi') ? 'vi' : 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((current) => (current === 'en' ? 'vi' : 'en')),
      strings: TEXTS[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}

