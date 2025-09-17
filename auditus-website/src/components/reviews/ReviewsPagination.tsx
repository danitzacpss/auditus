'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReviewsPaginationProps } from '@/types/reviews-modal';

const ReviewsPagination: React.FC<ReviewsPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = '',
  showPageInfo = true,
  showPageNumbers = true,
  maxVisiblePages = 5,
}) => {
  const { t } = useTranslation('testimonials');

  // Don't render if only one page or no pages
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Calculate visible page numbers
  const getVisiblePages = (): number[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const showLeftEllipsis = visiblePages[0] > 1;
  const showRightEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  const handleFirst = () => {
    handlePageChange(1);
  };

  const handleLast = () => {
    handlePageChange(totalPages);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Page Info */}
      {showPageInfo && (
        <div className="text-sm text-gray-800 font-secondary order-2 sm:order-1 font-medium">
          {t('modal.paginationInfo', {
            start: startItem,
            end: endItem,
            total: totalItems,
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2 order-1 sm:order-2">
        {/* First Page Button */}
        {currentPage > 2 && showPageNumbers && (
          <button
            onClick={handleFirst}
            className="
              px-3 py-2 text-sm font-medium text-gray-700
              bg-white border border-gray-300 rounded-lg
              hover:bg-gray-50 hover:border-gray-400
              focus:outline-none focus:ring-4 focus:ring-blue-200
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 shadow-sm
            "
            aria-label={t('modal.goToFirstPage')}
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="
            px-3 py-2 text-sm font-medium text-gray-700
            bg-white border border-gray-300 rounded-lg
            hover:bg-gray-50 hover:border-gray-400
            focus:outline-none focus:ring-4 focus:ring-blue-200
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 shadow-sm
          "
          aria-label={t('modal.previousPage')}
          type="button"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        {showPageNumbers && (
          <>
            {/* Left Ellipsis */}
            {showLeftEllipsis && (
              <>
                <button
                  onClick={handleFirst}
                  className="
                    px-3 py-2 text-sm font-medium text-gray-700
                    bg-white border border-gray-200 rounded-lg
                    hover:bg-gray-50 hover:border-gray-300
                    focus:outline-none focus:ring-4 focus:ring-primary-200
                    transition-all duration-200
                  "
                  type="button"
                >
                  1
                </button>
                <span className="px-2 py-2 text-gray-700 font-medium">...</span>
              </>
            )}

            {/* Visible Page Numbers */}
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-lg
                  border transition-all duration-200
                  focus:outline-none focus:ring-4 focus:ring-blue-200
                  ${
                    page === currentPage
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                  }
                `}
                aria-label={t('modal.goToPage', { page })}
                aria-current={page === currentPage ? 'page' : undefined}
                type="button"
              >
                {page}
              </button>
            ))}

            {/* Right Ellipsis */}
            {showRightEllipsis && (
              <>
                <span className="px-2 py-2 text-gray-700 font-medium">...</span>
                <button
                  onClick={handleLast}
                  className="
                    px-3 py-2 text-sm font-medium text-gray-800
                    bg-white border border-gray-300 rounded-lg
                    hover:bg-gray-50 hover:border-gray-400
                    focus:outline-none focus:ring-4 focus:ring-blue-200
                    transition-all duration-200 shadow-sm
                  "
                  type="button"
                >
                  {totalPages}
                </button>
              </>
            )}
          </>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="
            px-3 py-2 text-sm font-medium text-gray-700
            bg-white border border-gray-300 rounded-lg
            hover:bg-gray-50 hover:border-gray-400
            focus:outline-none focus:ring-4 focus:ring-blue-200
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 shadow-sm
          "
          aria-label={t('modal.nextPage')}
          type="button"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Last Page Button */}
        {currentPage < totalPages - 1 && showPageNumbers && (
          <button
            onClick={handleLast}
            className="
              px-3 py-2 text-sm font-medium text-gray-700
              bg-white border border-gray-300 rounded-lg
              hover:bg-gray-50 hover:border-gray-400
              focus:outline-none focus:ring-4 focus:ring-blue-200
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 shadow-sm
            "
            aria-label={t('modal.goToLastPage')}
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export { ReviewsPagination };
export default ReviewsPagination;