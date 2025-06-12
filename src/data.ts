// 自动生成的图片数据文件
// 最后更新时间: 2025/6/12 10:19:25

export interface ImageDetail {
  imagePath: string;
  desc: string;
  date: string;
}

export interface MonthData {
  month: string;
  count: number;
  details: ImageDetail[];
}

export const imageData: MonthData[] = [
  {
    "month": "2024-05",
    "count": 1,
    "details": [
      {
        "imagePath": "/image/2024/05/20240512_105541.jpg",
        "desc": "",
        "date": "20240512"
      }
    ]
  },
  {
    "month": "2024-08",
    "count": 1,
    "details": [
      {
        "imagePath": "/image/2024/08/IMG_20240822_出生啦.jpeg",
        "desc": "出生啦",
        "date": "20240822"
      }
    ]
  },
  {
    "month": "2024-09",
    "count": 6,
    "details": [
      {
        "imagePath": "/image/2024/09/IMG_0002_20240904.jpg",
        "desc": "20240904",
        "date": "20240904"
      },
      {
        "imagePath": "/image/2024/09/IMG_0023_20240904.jpg",
        "desc": "20240904",
        "date": "20240904"
      },
      {
        "imagePath": "/image/2024/09/IMG_0084_20240904.jpg",
        "desc": "20240904",
        "date": "20240904"
      },
      {
        "imagePath": "/image/2024/09/IMG_0128_20240904.jpg",
        "desc": "20240904",
        "date": "20240904"
      },
      {
        "imagePath": "/image/2024/09/IMG_0136_20240904.jpg",
        "desc": "20240904",
        "date": "20240904"
      },
      {
        "imagePath": "/image/2024/09/IMG_0203_20240904.jpg",
        "desc": "20240904",
        "date": "20240904"
      }
    ]
  },
  {
    "month": "2024-10",
    "count": 1,
    "details": [
      {
        "imagePath": "/image/2024/10/20241013_092522.jpeg",
        "desc": "",
        "date": "20241013"
      }
    ]
  },
  {
    "month": "2025-01",
    "count": 1,
    "details": [
      {
        "imagePath": "/image/2025/01/20250101_144736.jpeg",
        "desc": "",
        "date": "20250101"
      }
    ]
  }
];

export default imageData;
