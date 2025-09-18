// Default Instagram Automation Configuration

import { AutomationConfig } from '../types';

export const defaultConfig: AutomationConfig = {
  credentials: {
    username: process.env.INSTAGRAM_USERNAME || '',
    password: process.env.INSTAGRAM_PASSWORD || '',
    twoFactorSecret: process.env.INSTAGRAM_2FA_SECRET
  },
  posting: {
    schedule: {
      enabled: true,
      times: ['09:00', '18:00'], // 9 AM and 6 PM
      timezone: 'Europe/Istanbul',
      days: undefined // All days
    },
    queue: [],
    defaultHashtags: [
      '#balkanlar',
      '#dağcılık',
      '#doğayürüyüşü',
      '#kamp',
      '#doğa',
      '#macera',
      '#trekking',
      '#dağlar',
      '#balkanlarinzirveleri',
      '#arnavutluk',
      '#karadağ',
      '#kosova',
      '#kuzeymakedunya',
      '#bosnahersek'
    ]
  },
  engagement: {
    hashtag: {
      enabled: true,
      hashtags: [
        'dağcılık',
        'doğayürüyüşü',
        'türkiyedağcılık',
        'kampçılık',
        'doğasporları',
        'trekkingtürkiye',
        'dağfotoğrafçılığı',
        'balkanlar',
        'balkanlarinzirveleri',
        'arnavutlukdağları',
        'karadağdağları',
        'kosovadağları',
        'makedunyadağları',
        'bosnadağları',
        'viapinarica',
        'prokletije',
        'şardağları'
      ],
      actions: {
        like: true,
        comment: true,
        follow: false
      },
      limits: {
        maxLikesPerHashtag: 10,
        maxCommentsPerHashtag: 3,
        maxFollowsPerHashtag: 2,
        maxActionsPerDay: 200
      },
      filters: {
        minLikes: 10,
        maxLikes: 10000,
        minFollowers: 100,
        maxFollowers: 100000,
        excludeVerified: false,
        mustHaveProfilePic: true,
        minAccountAge: 30
      },
      commentTemplates: [
        {
          id: 'mountain_general_tr',
          category: 'mountain',
          templates: [
            'Muhteşem dağ manzarası!',
            'İnanılmaz bir zirve!',
            'Dağların bu kadarı güzel olabilir!',
            'Doğanın mucizesi!',
            'Nefes kesici manzara!',
            'Bu görüntü gerçekten harika!',
            'Dağcılık hedefleri tam burada!',
            'Doğa bizi şaşırtmaya devam ediyor!'
          ],
          useEmojis: true,
          contextKeywords: ['dağ', 'zirve', 'tepe', 'yayla', 'mountain', 'peak']
        },
        {
          id: 'hiking_general_tr',
          category: 'hiking',
          templates: [
            'Harika bir doğa yürüyüşü!',
            'Patika manzaraları muhteşem!',
            'Efsane bir yürüyüş rotası!',
            'Bu patika harika görünüyor!',
            'Macera hedefleri!',
            'Ne güzel bir yürüyüş!',
            'Patika terapisi en güzel hali!',
            'Yürüyüş cenneti!'
          ],
          useEmojis: true,
          contextKeywords: ['yürüyüş', 'patika', 'trekking', 'hiking', 'trail', 'rota']
        },
        {
          id: 'balkan_specific_tr',
          category: 'balkans',
          templates: [
            'Balkanlar gerçekten özel!',
            'Muhteşem Balkan manzaraları!',
            'Balkanları keşfetmeyi seviyorum!',
            'Balkan dağları inanılmaz!',
            'Balkanların gizli cenneti!',
            'Balkan doğasının çeşitliliği!'
          ],
          useEmojis: true,
          contextKeywords: ['balkan', 'arnavutluk', 'karadağ', 'kosova', 'makedonya', 'bosna']
        },
        {
          id: 'turkish_outdoor_tr',
          category: 'outdoor',
          templates: [
            'Kamp hayatının tadını çıkarın!',
            'Doğada olmak huzur veriyor!',
            'Açık hava maceraları en güzeli!',
            'Doğa sporları tutkusu!',
            'Bu rotayı mutlaka denemelisiniz!',
            'Türkiyeden selamlar, harika görünüyor!'
          ],
          useEmojis: true,
          contextKeywords: ['kamp', 'doğa', 'outdoor', 'açıkhava', 'camp']
        }
      ],
      checkInterval: 30 // Check every 30 minutes
    },
    commentManagement: {
      enabled: true,
      autoLikePositive: true,
      autoReplyTemplates: [
        {
          id: 'thanks_reply_tr',
          category: 'thanks',
          templates: [
            'Çok teşekkür ederim! Beğenmenize sevindim!',
            'Güzel sözleriniz için teşekkürler!',
            'Desteğiniz için minnettarız!',
            'Teşekkürler! İyi yürüyüşler!'
          ],
          useEmojis: true,
          contextKeywords: ['teşekkür', 'sağol', 'thanks', 'thank you', 'harika', 'güzel', 'muhteşem']
        },
        {
          id: 'info_reply_tr',
          category: 'information',
          templates: [
            'Detaylı rota bilgileri için web sitemizi ziyaret edebilirsiniz!',
            'Bu patika hakkında daha fazla bilgiyi sitemizde bulabilirsiniz!',
            'Profil linkimizden tüm yürüyüş rehberlerine ulaşabilirsiniz!'
          ],
          useEmojis: false,
          contextKeywords: ['nerede', 'konum', 'bilgi', 'detay', 'nasıl', 'rota', 'where', 'location']
        }
      ],
      hideNegative: false,
      keywords: {
        positive: ['harika', 'muhteşem', 'güzel', 'mükemmel', 'süper', 'efsane', 'love', 'amazing', 'beautiful', 'stunning', 'incredible'],
        negative: ['kötü', 'berbat', 'çirkin', 'rezalet', 'hate', 'ugly', 'boring', 'terrible'],
        spam: ['takip et', 'profilime bak', 'dm gel', 'linke tıkla', 'bedava takipçi', 'follow me', 'check my profile']
      }
    }
  },
  directMessages: {
    enabled: true,
    checkInterval: 5, // Check every 5 minutes
    autoReply: {
      enabled: true,
      welcomeMessage: 'Mesajınız için teşekkürler! Balkanların muhteşem zirvelerini keşfetmek için size nasıl yardımcı olabiliriz? 🏔️',
      rules: [
        {
          id: 'route_info_tr',
          name: 'Rota Bilgisi',
          triggers: ['rota', 'patika', 'yürüyüş', 'güzergah', 'zorluk', 'route', 'trail', 'hike'],
          response: 'Detaylı rota bilgileri için balkanlarinzirveleri.com adresini ziyaret edebilirsiniz. Balkanların tüm önemli zirve ve patikalarıyla ilgili kapsamlı rehberlerimiz var! 🥾',
          priority: 10,
          requireHumanReview: false
        },
        {
          id: 'safety_info_tr',
          name: 'Güvenlik Bilgisi',
          triggers: ['güvenlik', 'tehlikeli', 'güvenli', 'ekipman', 'malzeme', 'safety', 'equipment'],
          response: 'Güvenlik bizim önceliğimiz! Web sitemizde güvenlik rehberlerimize göz atabilirsiniz. Her zaman uygun ekipmanla yürüyüş yapın, hava durumunu kontrol edin ve birine planlarınızı bildirin. ⛑️',
          priority: 9,
          requireHumanReview: false
        },
        {
          id: 'collaboration_tr',
          name: 'İşbirliği Talebi',
          triggers: ['işbirliği', 'ortaklık', 'beraber', 'sponsor', 'collaborate', 'partnership'],
          response: 'İşbirliği ilginiz için teşekkür ederiz! Mesajınızı inceleyip en kısa sürede size dönüş yapacağız. 🤝',
          priority: 8,
          requireHumanReview: true
        },
        {
          id: 'general_greeting_tr',
          name: 'Genel Selamlama',
          triggers: ['merhaba', 'selam', 'hey', 'günaydın', 'iyi günler', 'hi', 'hello'],
          response: 'Merhaba! Bizimle iletişime geçtiğiniz için teşekkürler. Balkan dağlarıyla ilgili tüm sorularınızı sorabilirsiniz! 👋',
          priority: 1,
          requireHumanReview: false,
          maxUsesPerUser: 2
        }
      ]
    },
    filters: {
      onlyFollowers: false,
      onlyVerified: false,
      blockSpam: true
    }
  },
  triggers: [
    {
      id: 'follower_milestone_1k',
      name: '1K Followers Milestone',
      enabled: true,
      trigger: {
        type: 'follower_milestone',
        value: 1000
      },
      actions: {
        postContent: {
          id: 'milestone_1k_post',
          caption: 'Thank you for 1000 followers! Your support means everything to us. Here is to many more mountain adventures together!',
          hashtags: ['1kfollowers', 'milestone', 'thankyou', 'mountaincommunity'],
          status: 'pending'
        }
      },
      cooldown: 1440 // 24 hours
    },
    {
      id: 'mention_response',
      name: 'Respond to Mentions',
      enabled: true,
      trigger: {
        type: 'mention'
      },
      actions: {
        likePost: true,
        commentOnPost: {
          template: 'Thanks for the mention! Keep exploring the beautiful Balkans!'
        }
      },
      cooldown: 5 // 5 minutes between responses
    }
  ],
  safety: {
    rateLimits: {
      maxLikesPerHour: 30,
      maxCommentsPerHour: 10,
      maxFollowsPerHour: 10,
      maxDMsPerHour: 15,
      maxActionsPerDay: 200
    },
    delays: {
      minActionDelay: 3, // seconds
      maxActionDelay: 10, // seconds
      afterLogin: 10, // seconds
      betweenHashtags: 60 // seconds
    },
    antiDetection: {
      randomizeTimings: true,
      simulateHumanBehavior: true,
      pauseOnWeekends: false,
      nightTimeHours: {
        start: '23:00',
        end: '06:00'
      }
    }
  },
  monitoring: {
    logLevel: 'info',
    logFile: 'logs/instagram-automation/automation.log',
    notifications: {
      email: undefined,
      webhook: undefined,
      onError: true,
      onSuccess: false,
      dailySummary: true
    }
  }
};