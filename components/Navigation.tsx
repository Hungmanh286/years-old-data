import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
    className?: string;
    mode?: 'floating' | 'inline';
}

const FLOATING_BOTTOM_OFFSET = 32;
const FOOTER_GAP = 16;

const Navigation: React.FC<NavigationProps> = ({ className = '', mode = 'floating' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const navRef = useRef<HTMLDivElement | null>(null);
    const [liftOffset, setLiftOffset] = useState(0);

    // Định nghĩa thứ tự các trang
    const pageOrder = ['/', '/research', '/article', '/charts', '/services', '/blog'];

    const currentIndex = pageOrder.indexOf(location.pathname);
    const canGoBack = currentIndex > 0;
    const canGoNext = currentIndex < pageOrder.length - 1;

    const handleBack = () => {
        // Sử dụng browser history back
        navigate(-1);
    };

    const handleNext = () => {
        if (canGoNext) {
            const nextPage = pageOrder[currentIndex + 1];
            navigate(nextPage);
        }
    };

    const handleHome = () => {
        navigate('/');
    };

    useEffect(() => {
        if (mode !== 'floating') {
            return;
        }

        let rafId = 0;

        const updatePosition = () => {
            const navElement = navRef.current;
            const footerElement = document.getElementById('site-footer');

            if (!navElement || !footerElement) {
                setLiftOffset(0);
                return;
            }

            const navHeight = navElement.offsetHeight;
            const viewportHeight = window.innerHeight;
            const footerTop = footerElement.getBoundingClientRect().top;
            const fixedTop = viewportHeight - FLOATING_BOTTOM_OFFSET - navHeight;
            const topBeforeFooter = footerTop - FOOTER_GAP - navHeight;
            const nextTop = Math.min(fixedTop, topBeforeFooter);
            const nextLift = Math.min(0, nextTop - fixedTop);

            setLiftOffset(nextLift);
        };

        const onScrollOrResize = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updatePosition);
        };

        updatePosition();
        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', onScrollOrResize);
            window.removeEventListener('resize', onScrollOrResize);
        };
    }, [mode]);

    const containerClassName = mode === 'floating'
        ? `fixed bottom-8 right-8 z-50 ${className}`
        : `flex items-center gap-4 ${className}`;

    const floatingStyle = mode === 'floating'
        ? { transform: `translateY(${liftOffset}px)` }
        : undefined;

    return (
        <div
            ref={navRef}
            className={containerClassName}
            style={floatingStyle}
        >
            <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Back"
            >
                <ChevronLeft size={16} />
                <span className="text-sm font-medium">Back</span>
            </button>

            <button
                onClick={handleHome}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
                Home
            </button>

            <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-[#fad02c] hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
                title="Next"
            >
                <span className="text-sm font-medium">Next</span>
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default Navigation;
