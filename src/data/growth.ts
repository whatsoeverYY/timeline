export interface GrowthMilestone {
  id: string
  date: string
  age: string
  milestone: string
  category: 'motor' | 'cognitive' | 'social' | 'language'
  description: string
  photos?: string[]
  videoLink?: string
  notes?: string
  achievement: boolean
  importance: 'high' | 'medium' | 'low'
}

export const growthMilestones: GrowthMilestone[] = [
  {
    id: '1',
    date: '2024-03-15',
    age: '2个月',
    milestone: '第一次微笑',
    category: 'social',
    description: '宝宝第一次对妈妈露出了甜甜的笑容',
    photos: ['smile1.jpg', 'smile2.jpg'],
    videoLink: 'https://example.com/first-smile',
    notes: '早上喂奶后，宝宝看着妈妈突然笑了，那一刻真的太幸福了！',
    achievement: true,
    importance: 'high'
  },
  {
    id: '2',
    date: '2024-04-20',
    age: '3个月',
    milestone: '抬头看世界',
    category: 'motor',
    description: '宝宝可以稳定地抬起头部，观察周围的环境',
    photos: ['head-up1.jpg'],
    videoLink: 'https://example.com/head-up',
    notes: '趴着的时候能抬头45度，眼神很专注地看着周围',
    achievement: true,
    importance: 'high'
  },
  {
    id: '3',
    date: '2024-05-10',
    age: '4个月',
    milestone: '翻身小能手',
    category: 'motor',
    description: '宝宝学会了从仰卧翻到俯卧',
    photos: ['rollover1.jpg', 'rollover2.jpg'],
    videoLink: 'https://example.com/rollover',
    notes: '第一次翻身把自己都吓了一跳，然后就开始练习个不停',
    achievement: true,
    importance: 'high'
  },
  {
    id: '4',
    date: '2024-06-05',
    age: '5个月',
    milestone: '咿呀学语',
    category: 'language',
    description: '开始发出"ba-ba"、"ma-ma"的音节',
    photos: ['talking1.jpg'],
    videoLink: 'https://example.com/first-words',
    notes: '虽然还不知道意思，但听到宝宝叫"妈妈"还是很激动',
    achievement: true,
    importance: 'medium'
  },
  {
    id: '5',
    date: '2024-07-12',
    age: '6个月',
    milestone: '独坐小专家',
    category: 'motor',
    description: '宝宝可以不用支撑独立坐着玩耍',
    photos: ['sitting1.jpg', 'sitting2.jpg'],
    videoLink: 'https://example.com/independent-sitting',
    notes: '坐着玩玩具的样子特别认真，像个小大人',
    achievement: true,
    importance: 'high'
  },
  {
    id: '6',
    date: '2024-08-18',
    age: '7个月',
    milestone: '爬行探险家',
    category: 'motor',
    description: '开始学会用手和膝盖爬行',
    photos: ['crawling1.jpg'],
    videoLink: 'https://example.com/first-crawl',
    notes: '虽然还不是很熟练，但已经能向前挪动了',
    achievement: true,
    importance: 'high'
  },
  {
    id: '7',
    date: '2024-09-25',
    age: '8个月',
    milestone: '扶站小勇士',
    category: 'motor',
    description: '能够扶着家具站立',
    photos: ['standing1.jpg', 'standing2.jpg'],
    videoLink: 'https://example.com/standing',
    notes: '扶着沙发站起来，腿部力量越来越强了',
    achievement: true,
    importance: 'high'
  },
  {
    id: '8',
    date: '2024-10-30',
    age: '9个月',
    milestone: '手指精细动作',
    category: 'cognitive',
    description: '学会用拇指和食指捏取小物品',
    photos: ['pincer1.jpg'],
    videoLink: 'https://example.com/pincer-grasp',
    notes: '能够准确地捏起小饼干，手眼协调能力发展很好',
    achievement: true,
    importance: 'medium'
  },
  {
    id: '9',
    date: '2024-11-15',
    age: '10个月',
    milestone: '巡航行走',
    category: 'motor',
    description: '扶着家具可以横向移动行走',
    photos: ['cruising1.jpg'],
    videoLink: 'https://example.com/cruising',
    notes: '沿着沙发边缘走来走去，离独立行走不远了',
    achievement: true,
    importance: 'high'
  },
  {
    id: '10',
    date: '2024-12-08',
    age: '11个月',
    milestone: '第一次叫妈妈',
    category: 'language',
    description: '明确地叫出"妈妈"并且知道指向妈妈',
    photos: ['mama1.jpg'],
    videoLink: 'https://example.com/first-mama',
    notes: '看着妈妈清楚地说"妈妈"，那一刻感动得要哭了',
    achievement: true,
    importance: 'high'
  }
]

export const categoryConfig = {
  motor: { name: '大运动', icon: '🏃‍♂️', color: 'from-green-400 to-emerald-500' },
  cognitive: { name: '认知发展', icon: '🧠', color: 'from-blue-400 to-indigo-500' },
  social: { name: '社交情感', icon: '😊', color: 'from-pink-400 to-rose-500' },
  language: { name: '语言发展', icon: '🗣️', color: 'from-purple-400 to-violet-500' }
}