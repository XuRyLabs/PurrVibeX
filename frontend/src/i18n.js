import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'purrvibex-lang';

const makeQuickLink = (icon, title, description) => ({ icon, title, description });
const makeTestimonial = (name, role, quote, avatar) => ({ name, role, quote, avatar });

export const TEXTS = {
  en: {
    nav: {
      home: 'Home',
      rooms: 'Rooms',
      gallery: 'Gallery',
      leaderboard: 'Leaderboard',
      shop: 'Shop',
      switchTo: 'Tiếng Việt',
    },
    home: {
      pill: '🐾 Cozy cat social playground',
      titleLead: 'A cute little world for',
      titleHighlight: 'cat lovers',
      intro:
        'Hang out in Meow Rooms, share cat photos, enjoy synced music, play mini games, and build your own adorable cat identity — all wrapped in a soft, playful vibe.',
      primary: 'Enter Meow Rooms ✨',
      secondary: 'Browse Cat Gallery 📸',
      badgeRow: ['Soft vibes', 'Real-time rooms', 'Cute rewards'],
      heroTitle: 'A cozy digital home that feels warm, playful, and a little magical.',
      heroSubtitle:
        'We keep the interface light, expressive, and welcoming so people instantly feel like they are stepping into a tiny cat café on the internet.',
      heroNotes: [
        '🌙 Smooth transitions',
        '🐱 Soft pastel visuals',
        '🎮 Cat-first activities',
      ],
      featureTitle: 'What you can do here',
      featureSubtitle: 'Simple, cozy, and made to feel like a small cat-inspired playground.',
      highlights: [
        {
          title: 'Meow Rooms',
          text: 'Chill in themed rooms, hang out with friends, and join cozy cat vibes together.',
        },
        {
          title: 'Music + Games',
          text: 'Listen in sync, queue songs, and jump into playful mini games with your crew.',
        },
        {
          title: 'Cat Profiles',
          text: 'Customize your cat avatar, mood, badges, and little details that feel uniquely yours.',
        },
        {
          title: 'Meow Shop',
          text: 'Unlock backgrounds, stickers, and adorable little goodies with your Meow Points.',
        },
      ],
      quickTitle: 'Quick paths',
      quickSubtitle: 'Use the navbar or jump straight into the pages below.',
      quickLinks: [
        makeQuickLink('🏠', 'Explore Rooms', 'Find public rooms, cozy corners, and hangout spaces.'),
        makeQuickLink('🖼️', 'Cat Gallery', 'Browse cute cat photos, stories, and community moments.'),
        makeQuickLink('🏆', 'Leaderboard', 'See who is active, playing, and collecting the most points.'),
        makeQuickLink('🛒', 'Meow Shop', 'Pick up avatar items, themes, and tiny decorative treasures.'),
      ],
      reelTitle: 'Tiny motion reel',
      reelSubtitle: 'A lightweight looping animation to catch attention without feeling heavy.',
      loopingMotionTitle: 'Looping motion',
      softTransitionsTitle: 'Soft transitions',
      reelLabels: ['Blink', 'Purr', 'Play'],
      proofTitle: 'Why people keep coming back',
      proofSubtitle: 'A social playground that feels friendly instead of formal.',
      testimonials: [
        makeTestimonial(
          'Linh',
          'Early tester',
          'It feels like stepping into a warm cat cafe with friends. The page is playful, not stiff.',
          '🐱✨'
        ),
        makeTestimonial(
          'Minh',
          'Music room fan',
          'The vibe is super gentle and cute. I can already imagine hanging out here for hours.',
          '🎧🐾'
        ),
        makeTestimonial(
          'An',
          'Cat gallery lover',
          'The little motions and cards make everything feel alive. It is charming right away.',
          '📸😸'
        ),
      ],
      footerTitle: 'Powered by XuRyLabs',
      footerText: 'Made with soft colors, playful motion, and a cat-first vibe.',
      trustPills: ['Friendly UI', 'Pet-friendly fun', 'Built to delight'],
    },
  },
  vi: {
    nav: {
      home: 'Trang chủ',
      rooms: 'Phòng',
      gallery: 'Gallery',
      leaderboard: 'Bảng xếp hạng',
      shop: 'Cửa hàng',
      switchTo: 'English',
    },
    home: {
      pill: '🐾 Không gian social siêu dễ thương dành cho người mê mèo',
      titleLead: 'Một thế giới nhỏ xinh cho',
      titleHighlight: 'hội yêu mèo',
      intro:
        'Vào Meow Rooms để tám chuyện, chia sẻ ảnh mèo, nghe nhạc đồng bộ, chơi mini game và xây dựng dấu ấn cat avatar của riêng bạn — tất cả được gói trong một vibe mềm mại, vui tươi.',
      primary: 'Vào Meow Rooms ✨',
      secondary: 'Xem Cat Gallery 📸',
      badgeRow: ['Vibe mềm mại', 'Phòng real-time', 'Quà thưởng dễ thương'],
      heroTitle: 'Một ngôi nhà số ấm áp, vui nhộn và hơi có chút phép màu.',
      heroSubtitle:
        'Chúng mình giữ giao diện nhẹ nhàng, biểu cảm và thân thiện để ai vào cũng có cảm giác như bước vào một quán cà phê mèo nhỏ xinh trên internet.',
      heroNotes: [
        '🌙 Chuyển cảnh mượt',
        '🐱 Tông pastel dễ thương',
        '🎮 Hoạt động chuẩn mèo',
      ],
      featureTitle: 'Bạn có thể làm gì ở đây',
      featureSubtitle: 'Đơn giản, ấm áp và được thiết kế như một sân chơi mang màu sắc mèo.',
      highlights: [
        {
          title: 'Meow Rooms',
          text: 'Vào các phòng theo chủ đề để chat, chill và hẹn bạn bè cùng vui vẻ.',
        },
        {
          title: 'Âm nhạc + Game',
          text: 'Nghe nhạc đồng bộ, xếp bài hát và nhảy vào các mini game vui nhộn cùng hội bạn.',
        },
        {
          title: 'Cat Profile',
          text: 'Tùy chỉnh avatar mèo, mood, badge và các chi tiết nhỏ để thể hiện cá tính của bạn.',
        },
        {
          title: 'Meow Shop',
          text: 'Đổi Meow Points để mở background, sticker và những món đồ trang trí siêu xinh.',
        },
      ],
      quickTitle: 'Lối tắt nhanh',
      quickSubtitle: 'Dùng navbar hoặc chọn nhanh các thẻ bên dưới để đi đến trang bạn cần.',
      quickLinks: [
        makeQuickLink('🏠', 'Khám phá phòng', 'Tìm phòng công khai, góc chill và không gian tụ họp.'),
        makeQuickLink('🖼️', 'Cat Gallery', 'Xem ảnh mèo đáng yêu, câu chuyện và khoảnh khắc cộng đồng.'),
        makeQuickLink('🏆', 'Bảng xếp hạng', 'Xem ai đang hoạt động, chơi game và tích điểm nhiều nhất.'),
        makeQuickLink('🛒', 'Meow Shop', 'Mua item avatar, theme và các món đồ trang trí nhỏ xinh.'),
      ],
      reelTitle: 'Vòng lặp chuyển động nhỏ',
      reelSubtitle: 'Một animation nhẹ để thu hút ánh nhìn mà không làm trang bị nặng.',
      loopingMotionTitle: 'Chuyển động lặp',
      softTransitionsTitle: 'Chuyển cảnh mềm mại',
      reelLabels: ['Nháy mắt', 'Rừ rừ', 'Chơi đùa'],
      proofTitle: 'Vì sao mọi người thích quay lại',
      proofSubtitle: 'Một sân chơi social thân thiện chứ không cứng nhắc như một trang giới thiệu khô khan.',
      testimonials: [
        makeTestimonial(
          'Linh',
          'Người test sớm',
          'Cảm giác như đang vào một quán cà phê mèo ấm cúng với bạn bè. Trang nhìn vui và dễ thương.',
          '🐱✨'
        ),
        makeTestimonial(
          'Minh',
          'Thích phòng nhạc',
          'Vibe rất dịu và xinh. Nhìn qua là muốn ở lại lâu để chat và nghe nhạc.',
          '🎧🐾'
        ),
        makeTestimonial(
          'An',
          'Fan gallery mèo',
          'Các chuyển động nhỏ và card làm mọi thứ sống động hơn hẳn. Nhìn rất có sức hút.',
          '📸😸'
        ),
      ],
      footerTitle: 'Powered by XuRyLabs',
      footerText: 'Làm bằng màu sắc mềm mại, chuyển động nhẹ và một vibe đặt mèo lên trước.',
      trustPills: ['Giao diện thân thiện', 'Vui như nuôi mèo', 'Sinh ra để gây thích thú'],
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
