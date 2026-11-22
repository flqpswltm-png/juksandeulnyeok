/* =====================================================================
   죽산들녘 홈페이지 (유한회사 한걸음 농업회사법인) — 정보 수정 파일 (이 파일 하나만 고치면 됩니다)
   ---------------------------------------------------------------------
   · 메모장(또는 VS Code)으로 열어서 "따옴표 안의 글자"만 바꾸고 저장하세요.
   · 따옴표(" "), 쉼표(,), 중괄호({ })는 지우지 마세요.
   · 가격은 숫자만 씁니다. 예) price: 12900   /  아직 모르면  price: null
   · 저장한 뒤 index.html을 다시 열면(새로고침) 바로 반영됩니다.
   ===================================================================== */
window.SITE = {

  /* 1) 브랜드 — 2026-10-08 '죽산들녘'으로 확정. name을 바꾸면 사이트 전체의 브랜드 표시가 바뀝니다.
        company(법적 상호)는 바닥글·판매원 표시에 그대로 쓰이니 바꾸지 마세요. */
  brand: {
    name: "죽산들녘",
    tagline: "김제 죽산 들녘에서 농작업 대행으로 기르고 거둔 콩",
    company: "유한회사 한걸음 농업회사법인"
  },

  /* 2) 연락처 — 비워 두면("") 공개 화면에서는 해당 항목·버튼이 숨겨집니다.
        전화번호는 숫자와 - 만 쓰세요. 예) "063-000-0000" */
  contact: {
    phone: "010-3437-1243",  // 주문·상담 대표 전화
    sms: "010-3437-1243",  // 문자 주문 받을 휴대폰 번호 (없으면 phone과 같게)
    email: "flqpswltm@naver.com",  // 고객 문의 이메일
    hours: ""          // 상담 시간 예) "평일 09:00~18:00 (주말·공휴일 휴무)"
  },

  /* 3) 링크 — 스마트스토어·펀딩 주소가 생기면 넣으세요. 비우면 '준비 중'으로 표시됩니다. */
  links: {
    smartstore: "",     // 예) "https://smartstore.naver.com/가게주소"
    funding: "",        // 와디즈/텀블벅 프로젝트(또는 오픈예정) 주소
    fundingNotify: "",  // 펀딩 '알림 신청' 페이지 주소 (보통 funding과 같음)
    kakaoChannelUrl: "" // 예) "https://pf.kakao.com/_xxxxx"  비우면 상담·채널추가 버튼이 숨겨집니다
  },

  /* 4) 법적 표시(바닥글) — 통신판매업 신고 후 번호를 넣으세요. */
  legal: {
    ceo: "김광배",
    address: "전북특별자치도 김제시 죽산면 죽산로 153",
    bizNo: "365-81-02883",
    mailOrderNo: "",    // 통신판매업 신고번호 예) "제2026-전북김제-0000호"
    privacyOfficer: "김광배", // 개인정보 보호책임자 (김민욱님 지정)
    hosting: "GitHub, Inc."  // 호스팅 업체
  },

  /* 5) 펀딩 */
  funding: {
    status: "오픈 예정",            // 예) "오픈 예정" → "진행 중" → "종료"
    period: "",                    // 예) "2026.11.20 ~ 2026.12.10"
    platform: ""                   // 예) "와디즈"
  },

  /* 6) 상품 — 용량(weight)과 가격(price)을 고치세요.
        price: null  → "가격 준비 중"
        soldout: true → "품절" 표시
        status: 상품 전체 상태 문구 ("오픈 예정" / "판매 중" / "품절") */
  products: {
    seoritae: {
      name: "서리태",
      status: "오픈 예정",
      year: "2026년산",
      origin: "국산(전북 김제시)",
      options: [
        { weight: "500g", price: null, soldout: false },
        { weight: "1kg",  price: null, soldout: false },
        { weight: "2kg",  price: null, soldout: false },
        { weight: "4kg",  price: null, soldout: false }
      ]
    },
    baektae: {
      name: "백태(메주콩)",
      status: "오픈 예정",
      year: "2026년산",
      origin: "국산(전북 김제시)",
      options: [
        { weight: "500g", price: null, soldout: false },
        { weight: "1kg",  price: null, soldout: false },
        { weight: "2kg",  price: null, soldout: false },
        { weight: "4kg",  price: null, soldout: false }
      ]
    },
    yakkong: {
      name: "약콩(쥐눈이콩)",
      status: "오픈 예정",
      year: "2026년산",
      origin: "",        // [확인 필요] 산지 확인 후 예) "국산(전북 김제시)"
      options: [
        { weight: "500g", price: null, soldout: false },
        { weight: "1kg",  price: null, soldout: false },
        { weight: "2kg",  price: null, soldout: false },
        { weight: "4kg",  price: null, soldout: false }
      ]
    },
    pat: {
      name: "팥",
      status: "오픈 예정",
      year: "2026년산",
      origin: "",        // [확인 필요] 산지 확인 후 입력
      options: [
        { weight: "500g", price: null, soldout: false },
        { weight: "1kg",  price: null, soldout: false },
        { weight: "2kg",  price: null, soldout: false },
        { weight: "4kg",  price: null, soldout: false }
      ]
    }
  },

  /* 7) 미리보기용 노란 [확인 필요] 표시 — 공개 화면에서는 false. */
  showTodo: false
};
