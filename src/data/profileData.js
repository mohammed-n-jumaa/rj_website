export const userData = {
  name: 'سارة أحمد',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  height: 165,
  weight: 65,
  age: 28,
  goal: 'خسارة وزن وتنشيف',
  program: 'برنامج التحول الذهبي',
  price: 299,
  duration: '3 أشهر',
  paymentStatus: 'paid',
  startDate: '2024-01-01',
  endDate: '2024-04-01',
  progress: 65,
  daysLeft: 45
};

export const nutritionPlan = {
  totalCalories: 1800,
  protein: 135,
  carbs: 180,
  fats: 60,
  meals: [
    {
      id: 1,
      name: 'الفطور',
      time: '07:00 AM',
      calories: 450,
      protein: 30,
      carbs: 45,
      fats: 15,
      items: ['3 بيضات مسلوقة', 'خبز توست أسمر (2 شريحة)', 'أفوكادو نصف حبة', 'قهوة سوداء'],
      checked: true,
      pdfUrl: '/pdfs/breakfast-meal-plan.pdf' // رابط PDF من Laravel
    },
    {
      id: 2,
      name: 'سناك صباحي',
      time: '10:30 AM',
      calories: 200,
      protein: 15,
      carbs: 25,
      fats: 8,
      items: ['زبادي يوناني قليل الدسم', 'حفنة لوز (10 حبات)'],
      checked: true,
      pdfUrl: '/pdfs/morning-snack.pdf'
    },
    {
      id: 3,
      name: 'الغداء',
      time: '01:00 PM',
      calories: 600,
      protein: 45,
      carbs: 60,
      fats: 20,
      items: ['صدر دجاج مشوي (200g)', 'أرز بسمتي (1 كوب)', 'سلطة خضراء', 'زيت زيتون (1 ملعقة)'],
      checked: false,
      pdfUrl: '/pdfs/lunch-meal-plan.pdf'
    },
    {
      id: 4,
      name: 'سناك مسائي',
      time: '04:30 PM',
      calories: 250,
      protein: 20,
      carbs: 30,
      fats: 8,
      items: ['بروتين شيك', 'موزة متوسطة'],
      checked: false,
      pdfUrl: '/pdfs/afternoon-snack.pdf'
    },
    {
      id: 5,
      name: 'العشاء',
      time: '07:00 PM',
      calories: 300,
      protein: 25,
      carbs: 20,
      fats: 9,
      items: ['سمك سلمون مشوي (150g)', 'خضار مشوية', 'سلطة'],
      checked: false,
      pdfUrl: '/pdfs/dinner-meal-plan.pdf'
    }
  ]
};

export const workoutPlan = [
  {
    day: 'الأحد',
    title: 'تمارين الجزء العلوي',
    exercises: [
      { 
        name: 'Bench Press', 
        sets: 4, 
        reps: '10-12', 
        videoUrl: 'https://example.com/bench.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg', // رابط يوتيوب حقيقي
        checked: true 
      },
      { 
        name: 'Shoulder Press', 
        sets: 3, 
        reps: '12-15', 
        videoUrl: 'https://example.com/shoulder.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
        checked: true 
      },
      { 
        name: 'Tricep Dips', 
        sets: 3, 
        reps: '12-15', 
        videoUrl: 'https://example.com/tricep.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=6kALZikXxLc',
        checked: false 
      },
      { 
        name: 'Bicep Curls', 
        sets: 3, 
        reps: '12-15', 
        videoUrl: 'https://example.com/bicep.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
        checked: false 
      }
    ]
  },
  {
    day: 'الإثنين',
    title: 'كارديو و Core',
    exercises: [
      { 
        name: 'Running', 
        sets: 1, 
        reps: '30 min', 
        videoUrl: 'https://example.com/run.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=brFHyOtTwH4',
        checked: false 
      },
      { 
        name: 'Plank', 
        sets: 3, 
        reps: '60 sec', 
        videoUrl: 'https://example.com/plank.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
        checked: false 
      },
      { 
        name: 'Russian Twists', 
        sets: 3, 
        reps: '20', 
        videoUrl: 'https://example.com/twist.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
        checked: false 
      }
    ]
  },
  {
    day: 'الثلاثاء',
    title: 'راحة نشطة',
    exercises: [
      { 
        name: 'Walking', 
        sets: 1, 
        reps: '45 min', 
        videoUrl: '',
        youtubeUrl: 'https://www.youtube.com/watch?v=gLEiyZHHtvU',
        checked: false 
      },
      { 
        name: 'Stretching', 
        sets: 1, 
        reps: '15 min', 
        videoUrl: '',
        youtubeUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A',
        checked: false 
      }
    ]
  },
  {
    day: 'الأربعاء',
    title: 'تمارين الجزء السفلي',
    exercises: [
      { 
        name: 'Squats', 
        sets: 4, 
        reps: '12-15', 
        videoUrl: 'https://example.com/squat.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
        checked: false 
      },
      { 
        name: 'Lunges', 
        sets: 3, 
        reps: '12 each', 
        videoUrl: 'https://example.com/lunge.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
        checked: false 
      },
      { 
        name: 'Leg Press', 
        sets: 4, 
        reps: '12-15', 
        videoUrl: 'https://example.com/legpress.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
        checked: false 
      },
      { 
        name: 'Calf Raises', 
        sets: 3, 
        reps: '15-20', 
        videoUrl: 'https://example.com/calf.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=gwLzBJYoWlI',
        checked: false 
      }
    ]
  },
  {
    day: 'الخميس',
    title: 'HIIT Training',
    exercises: [
      { 
        name: 'Burpees', 
        sets: 4, 
        reps: '15', 
        videoUrl: 'https://example.com/burpee.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU',
        checked: false 
      },
      { 
        name: 'Mountain Climbers', 
        sets: 4, 
        reps: '20', 
        videoUrl: 'https://example.com/mountain.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM',
        checked: false 
      },
      { 
        name: 'Jump Squats', 
        sets: 4, 
        reps: '15', 
        videoUrl: 'https://example.com/jumpsquat.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=A-cFYWvaHr0',
        checked: false 
      }
    ]
  },
  {
    day: 'الجمعة',
    title: 'Full Body',
    exercises: [
      { 
        name: 'Deadlifts', 
        sets: 4, 
        reps: '10-12', 
        videoUrl: 'https://example.com/deadlift.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
        checked: false 
      },
      { 
        name: 'Pull-ups', 
        sets: 3, 
        reps: '8-10', 
        videoUrl: 'https://example.com/pullup.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
        checked: false 
      },
      { 
        name: 'Push-ups', 
        sets: 3, 
        reps: '15-20', 
        videoUrl: 'https://example.com/pushup.mp4',
        youtubeUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
        checked: false 
      }
    ]
  },
  {
    day: 'السبت',
    title: 'يوم راحة',
    exercises: []
  }
];

export const messages = [
  {
    id: 1,
    sender: 'trainer',
    name: 'رند جرار',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop',
    message: 'مرحباً سارة! كيف حالك اليوم؟',
    time: '10:30 AM',
    date: '2024-01-15'
  },
  {
    id: 2,
    sender: 'user',
    message: 'الحمد لله، بخير! أكملت تمارين اليوم 💪',
    time: '10:45 AM',
    date: '2024-01-15'
  },
  {
    id: 3,
    sender: 'trainer',
    name: 'رند جرار',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop',
    message: 'ممتاز! استمري على هذا المستوى. لاحظت التزامك الرائع بالنظام الغذائي',
    time: '10:50 AM',
    date: '2024-01-15'
  },
  {
    id: 4,
    sender: 'user',
    message: 'شكراً لك! عندي سؤال عن الوجبة المسائية',
    time: '11:00 AM',
    date: '2024-01-15'
  }
];