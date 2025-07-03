export interface VaccineRecord {
  id: string
  date: string
  age: string
  vaccineName: string
  reactions: string[]
  videoLink?: string
  hospital?: string
  doctor?: string
  notes?: string
}

export const vaccineRecords: VaccineRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    age: '2个月',
    vaccineName: '乙肝疫苗第二针',
    reactions: ['轻微发热', '接种部位红肿'],
    videoLink: 'https://example.com/video1',
    hospital: '儿童医院',
    doctor: '张医生',
    notes: '宝宝很勇敢，没有哭闹太久'
  },
  {
    id: '2',
    date: '2024-02-20',
    age: '3个月',
    vaccineName: '脊灰疫苗第一针',
    reactions: ['食欲稍差', '嗜睡'],
    videoLink: 'https://example.com/video2',
    hospital: '儿童医院',
    doctor: '李医生',
    notes: '接种后多喝水，注意休息'
  },
  {
    id: '3',
    date: '2024-03-18',
    age: '4个月',
    vaccineName: '百白破疫苗第一针',
    reactions: ['无明显反应'],
    videoLink: 'https://example.com/video3',
    hospital: '社区卫生服务中心',
    doctor: '王医生',
    notes: '接种过程很顺利，宝宝状态良好'
  },
  {
    id: '4',
    date: '2024-04-22',
    age: '5个月',
    vaccineName: '脊灰疫苗第二针',
    reactions: ['轻微哭闹', '接种部位轻微疼痛'],
    videoLink: 'https://example.com/video4',
    hospital: '儿童医院',
    doctor: '张医生',
    notes: '回家后给宝宝多按摩接种部位'
  },
  {
    id: '5',
    date: '2024-05-20',
    age: '6个月',
    vaccineName: '百白破疫苗第二针',
    reactions: ['轻微发热37.2°C', '食欲正常'],
    videoLink: 'https://example.com/video5',
    hospital: '儿童医院',
    doctor: '李医生',
    notes: '物理降温，24小时后恢复正常'
  },
  {
    id: '6',
    date: '2024-06-15',
    age: '7个月',
    vaccineName: '乙肝疫苗第三针',
    reactions: ['接种部位轻微红肿', '情绪稍有不安'],
    videoLink: 'https://example.com/video6',
    hospital: '社区卫生服务中心',
    doctor: '王医生',
    notes: '完成乙肝疫苗全程接种'
  },
  {
    id: '7',
    date: '2024-07-10',
    age: '8个月',
    vaccineName: '麻疹疫苗第一针',
    reactions: ['轻微发热', '皮疹（正常反应）'],
    videoLink: 'https://example.com/video7',
    hospital: '儿童医院',
    doctor: '张医生',
    notes: '医生说出现轻微皮疹是正常的免疫反应'
  },
  {
    id: '8',
    date: '2024-08-05',
    age: '9个月',
    vaccineName: '百白破疫苗第三针',
    reactions: ['无明显反应'],
    videoLink: 'https://example.com/video8',
    hospital: '儿童医院',
    doctor: '李医生',
    notes: '完成百白破疫苗基础免疫'
  }
]