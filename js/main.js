// 개발자 웹 이력서 - JavaScript (다크 테마 버전)

document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 선택
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // ========================================
    // 모바일 메뉴 토글
    // ========================================

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open');
        });

        // 모바일 메뉴 링크 클릭 시 메뉴 닫기
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // ========================================
    // 스크롤 이벤트
    // ========================================

    // 스크롤 시 헤더 스타일 변경
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // 현재 보이는 섹션에 따라 네비게이션 활성화
    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}` || (sectionId === 'hero' && href === '#')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    // ========================================
    // 섹션 가시성 애니메이션 (Intersection Observer)
    // ========================================

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // 히어로 섹션은 바로 보이게
        if (section.id === 'hero') {
            section.classList.add('visible');
        } else {
            sectionObserver.observe(section);
        }
    });

    // ========================================
    // 스크롤 이벤트 리스너 (throttle 적용)
    // ========================================

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ========================================
    // 부드러운 스크롤 (네비게이션 클릭)
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // 통계 숫자 카운트업 애니메이션 (선택적)
    // ========================================

    const animateCountUp = (element, target, suffix = '') => {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target + suffix;
            }
        };

        updateCount();
    };

    // 통계 섹션이 보일 때 카운트업 실행
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElements = entry.target.querySelectorAll('[data-count]');
                statElements.forEach(el => {
                    const target = parseInt(el.dataset.count);
                    const suffix = el.dataset.suffix || '';
                    animateCountUp(el, target, suffix);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // About 섹션의 통계 관찰
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }

    // ========================================
    // 초기화
    // ========================================

    handleScroll();
    updateActiveNav();
});
