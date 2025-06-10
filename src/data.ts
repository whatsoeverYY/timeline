// 此文件由 generate-data.mjs 自动生成，请勿手动修改
// 运行 node generate-data.mjs 来重新生成此文件

export interface ImageDetail {
  imagePath: string;
  desc: string;
  date: string;
}

export interface MonthlyData {
  month: string;
  count: number;
  details: ImageDetail[];
}

export const imageData: MonthlyData[] = [
  {
    "month": "2020-12",
    "count": 2,
    "details": [
      {
        "imagePath": "@/assets/image/2020/12/IMG_20201215_185050.jpg",
        "desc": "185050",
        "date": "20201215"
      },
      {
        "imagePath": "@/assets/image/2020/12/IMG_20201216_201237.jpg",
        "desc": "201237",
        "date": "20201216"
      }
    ]
  },
  {
    "month": "2021-03",
    "count": 1,
    "details": [
      {
        "imagePath": "@/assets/image/2021/03/IMG_20210328_165935.jpg",
        "desc": "165935",
        "date": "20210328"
      }
    ]
  },
  {
    "month": "2021-04",
    "count": 1,
    "details": [
      {
        "imagePath": "@/assets/image/2021/04/IMG_20210410_144747.jpg",
        "desc": "144747",
        "date": "20210410"
      }
    ]
  },
  {
    "month": "2021-05",
    "count": 3,
    "details": [
      {
        "imagePath": "@/assets/image/2021/05/IMG_20210515_134255.jpg",
        "desc": "134255",
        "date": "20210515"
      },
      {
        "imagePath": "@/assets/image/2021/05/IMG_20210515_134300.jpg",
        "desc": "134300",
        "date": "20210515"
      },
      {
        "imagePath": "@/assets/image/2021/05/IMG_20210520_222955.jpg",
        "desc": "222955",
        "date": "20210520"
      }
    ]
  },
  {
    "month": "2021-10",
    "count": 1,
    "details": [
      {
        "imagePath": "@/assets/image/2021/10/IMG_20211003_171530.jpg",
        "desc": "171530",
        "date": "20211003"
      }
    ]
  },
  {
    "month": "2022-03",
    "count": 2,
    "details": [
      {
        "imagePath": "@/assets/image/2022/03/IMG_20220305_212230.jpg",
        "desc": "212230",
        "date": "20220305"
      },
      {
        "imagePath": "@/assets/image/2022/03/IMG_20220308_153421.jpg",
        "desc": "153421",
        "date": "20220308"
      }
    ]
  },
  {
    "month": "2022-05",
    "count": 2,
    "details": [
      {
        "imagePath": "@/assets/image/2022/05/IMG_20220508_135134.jpg",
        "desc": "135134",
        "date": "20220508"
      },
      {
        "imagePath": "@/assets/image/2022/05/IMG_20220508_152901.jpg",
        "desc": "152901",
        "date": "20220508"
      }
    ]
  },
  {
    "month": "2024-08",
    "count": 1,
    "details": [
      {
        "imagePath": "@/assets/image/2024/08/IMG_20240822_出生啦.jpeg",
        "desc": "出生啦",
        "date": "20240822"
      }
    ]
  }
];

export default imageData;
