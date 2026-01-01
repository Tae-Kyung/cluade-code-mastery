# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

개발자 웹 이력서 프로젝트 - HTML, CSS, JavaScript, TailwindCSS 기반 정적 웹사이트

## 언어 및 커뮤니케이션 규칙

- **기본 언어**: 한국어
- **코드 주석**: 한국어
- **커밋 메시지**: 한국어
- **문서화**: 한국어
- **변수명/함수명**: 영어 (camelCase 사용)

## 기술 스택

- HTML5
- CSS3
- JavaScript (ES6+)
- TailwindCSS (CDN)

## 개발 명령어

```bash
# 로컬 서버 실행 (VS Code Live Server 또는)
npx serve .

# 또는 Python 사용
python -m http.server 8000
```

## 아키텍처

```
/
├── index.html          # 메인 HTML (단일 페이지)
├── css/
│   └── style.css       # 커스텀 스타일 (TailwindCSS 보완)
├── js/
│   └── main.js         # 인터랙션 및 애니메이션
└── assets/
    └── images/         # 이미지 리소스
```

### 섹션 구성

- Header: 네비게이션
- Hero: 프로필 및 소개
- About: 자기소개, 경력, 학력
- Skills: 기술 스택
- Projects: 프로젝트 포트폴리오
- Contact: 연락처 및 소셜 링크
- Footer: 저작권
