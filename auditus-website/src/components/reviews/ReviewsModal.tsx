'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { ReviewsModalProps } from '@/types/reviews-modal';
import { ReviewsModalHeader } from './ReviewsModalHeader';
import { ReviewsSearch } from './ReviewsSearch';
import { ReviewsRatingFilter } from './ReviewsRatingFilter';
import { ReviewsGrid } from './ReviewsGrid';
import { ReviewsPagination } from './ReviewsPagination';
import { useReviewsModal } from '@/hooks/useReviewsModal';

const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  reviews,
  title,
  maxHeight = 'max-h-[90vh]',
  className = '',
  showSearch = true,
  showRatingFilter = true,
  showPagination = true,
  itemsPerPage = 9,
  onReviewClick,
}) => {
  const { t } = useTranslation('testimonials');
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const {
    modalState,
    filteredReviews,
    paginatedReviews,
    totalPages,
    totalFilteredItems,
    ratingCounts,
    isEmpty,
    hasSearchQuery,
    hasActiveFilters,
    setSearchQuery,
    setSelectedRating,
    setCurrentPage,
    clearFilters,
  } = useReviewsModal(reviews, {
    defaultItemsPerPage: itemsPerPage,
    enableSearch: showSearch,
    enableRatingFilter: showRatingFilter,
    enablePagination: showPagination,
  });

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus modal after a brief delay to ensure it's rendered
      const timer = setTimeout(() => {
        modalRef.current?.focus();
      }, 100);

      // Lock body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      // Restore focus when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  // Handle click outside modal
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Handle keyboard events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  };

  // Trap focus within modal
  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    const modal = modalRef.current;
    if (!modal || !modal.contains(event.target as Node)) {
      // Focus escaped the modal, bring it back
      const focusableElements = modal?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

      if (event.target === modal && firstElement) {
        firstElement.focus();
      } else if (!modal?.contains(event.target as Node)) {
        firstElement?.focus();
      }
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        className={`
          relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl
          ${maxHeight} flex flex-col
          animate-in fade-in-0 zoom-in-95 duration-300
          ${className}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reviews-modal-title"
        aria-describedby="reviews-modal-description"
        tabIndex={-1}
        onFocus={handleFocus}
      >
        {/* Header */}
        <ReviewsModalHeader
          title={title || t('modal.title')}
          onClose={onClose}
          reviewsCount={reviews.length}
        />

        {/* Content */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Search and Filters */}
          {(showSearch || showRatingFilter) && (
            <div className="px-6 py-4 border-b border-gray-200 bg-blue-50/30 flex-shrink-0">
              <div className="space-y-4">
                {/* Search */}
                {showSearch && (
                  <ReviewsSearch
                    value={modalState.searchQuery}
                    onChange={setSearchQuery}
                    placeholder={t('modal.searchPlaceholder')}
                    disabled={modalState.isLoading}
                  />
                )}

                {/* Rating Filter */}
                {showRatingFilter && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <ReviewsRatingFilter
                      selectedRating={modalState.selectedRating}
                      onRatingChange={setSelectedRating}
                      reviewCounts={ratingCounts}
                      disabled={modalState.isLoading}
                    />

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="
                          text-sm text-blue-600 hover:text-blue-700
                          font-medium transition-colors underline underline-offset-2
                          self-start sm:self-center
                        "
                        disabled={modalState.isLoading}
                      >
                        {t('modal.clearFilters')}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Results Summary */}
              <div className="mt-4 text-sm text-gray-700 font-medium">
                {hasActiveFilters ? (
                  <span>
                    {t('modal.showingFiltered', {
                      count: totalFilteredItems,
                      total: reviews.length,
                    })}
                  </span>
                ) : (
                  <span>
                    {t('modal.showingAll', { count: reviews.length })}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Reviews Grid */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="p-6">
              <ReviewsGrid
                reviews={paginatedReviews}
                isLoading={modalState.isLoading}
                error={modalState.error}
                emptyStateMessage={
                  hasSearchQuery || hasActiveFilters
                    ? t('modal.noResultsFound')
                    : t('modal.noReviewsAvailable')
                }
                onReviewClick={onReviewClick}
              />
            </div>
          </div>

          {/* Pagination */}
          {showPagination && totalPages > 1 && !isEmpty && !modalState.isLoading && (
            <div className="px-6 py-4 border-t border-gray-200 bg-white shadow-lg flex-shrink-0">
              <ReviewsPagination
                currentPage={modalState.currentPage}
                totalPages={totalPages}
                totalItems={totalFilteredItems}
                itemsPerPage={modalState.itemsPerPage}
                onPageChange={setCurrentPage}
                showPageInfo={true}
                showPageNumbers={true}
                maxVisiblePages={5}
              />
            </div>
          )}
        </div>

        {/* Loading Overlay */}
        {modalState.isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex items-center space-x-3 bg-white rounded-xl px-6 py-4 shadow-lg border">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-gray-700 font-medium">
                {t('modal.loading')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render modal using portal
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
};

export { ReviewsModal };
export default ReviewsModal;