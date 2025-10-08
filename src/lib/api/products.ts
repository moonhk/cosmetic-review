import { Product } from "@/lib/types/product";

export async function getProducts(): Promise<Product[]> {
  // TODO: 실제 API 엔드포인트로 교체
  // const response = await fetch('https://api.example.com/products', {
  //   next: { revalidate: 300 } // 5분마다 재검증
  // });
  // if (!response.ok) {
  //   throw new Error('상품을 불러오는데 실패했습니다');
  // }
  // return response.json();

  // 임시 Mock 데이터 (서버에서 실행)
  await new Promise((resolve) => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션

  return [
    {
      id: "1",
      name: "리쥬란 힐러 턴오버 앰플 듀얼 이펙트 10ml 더블 한정기획",
      brand: "리쥬란",
      category: "에센스",
      price: 36580,
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0023/A00000023506707ko.jpg",
      rank: 1,
      rating: 4.8,
    },
    {
      id: "2",
      name: "비건 팩클렌저 3종 한정기획",
      brand: "풀리",
      category: "클렌징",
      price: 16900,
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0023/A00000023503104ko.png",
      rank: 2,
      rating: 4.7,
    },
    {
      id: "3",
      name: "스틱레브르 컬러드 립밤 (배리어 그레이프/쥬쥬 배리어)",
      brand: "유리아쥬",
      category: "립케어",
      price: 9900,
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0023/A00000023548526ko.jpg",
      rank: 3,
      rating: 4.9,
    },
    {
      id: "4",
      name: "딥 데미지 헤어 트리트먼트 EX 320ml 더블 기획",
      brand: "어노브",
      category: "헤어트리트먼트",
      price: 29800,
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0017/A000000171423122ko.jpg",
      rank: 4,
      rating: 4.8,
    },
    {
      id: "5",
      name: "립 포션 카라멜 글레이즈 8ml",
      brand: "얼터너티브스테레오",
      category: "립틴트",
      price: 15500,
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0023/A00000023439412ko.jpg",
      rank: 5,
      rating: 4.6,
    },
    {
      id: "6",
      name: "율무 스킨클린 팩 120g + 20g + 스파츌라 증정기획",
      brand: "리터니티",
      category: "마스크/팩",
      price: 26000,
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0019/A00000019878040ko.png",
      rank: 6,
      rating: 4.7,
    },
    {
      id: "7",
      name: "리액트샷 스피옥실 400 15g 2입 기획",
      brand: "바이브랩",
      category: "헤어토닉/앰플",
      price: 32400,
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0023/A00000023413411ko.jpg",
      rank: 7,
      rating: 4.8,
    },
    {
      id: "8",
      name: "리바이브 테라피 스칼프 앤 브로우 앰플 15g 더블기획",
      brand: "바이브랩",
      category: "헤어토닉/앰플",
      price: 29800,
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0023/A00000023413607ko.jpg",
      rank: 8,
      rating: 4.9,
    },
    {
      id: "9",
      name: "에센셜 마스크팩 10매 8종 택1",
      brand: "메디힐",
      category: "마스크/팩",
      price: 10000,
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0022/A00000022341473ko.jpg",
      rank: 9,
      rating: 4.7,
    },
    {
      id: "10",
      name: "레이어드 핏 쿠션 기획 (본품+리필+클라우드 퍼프)",
      brand: "네이밍",
      category: "쿠션",
      price: 27200,
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0017/A00000017595449ko.jpg",
      rank: 10,
      rating: 4.8,
    },
  ];
}
