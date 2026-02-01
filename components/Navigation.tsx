import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
    className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Định nghĩa thứ tự các trang
    const pageOrder = ['/', '/research', '/article', '/charts', '/services'];

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

    return (
        <div className={`flex items-center gap-4 ${className}`}>
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
