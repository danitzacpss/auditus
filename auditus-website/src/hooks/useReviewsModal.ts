'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { EnhancedTestimonial } from '@/types/google-reviews';
import {
  ReviewsModalState,
  UseReviewsModalOptions,
  UseReviewsModalReturn
} from '@/types/reviews-modal';

const DEFAULT_OPTIONS: Required<UseReviewsModalOptions> = {
  defaultItemsPerPage: 9,
  enableSearch: true,
  enableRatingFilter: true,
  enablePagination: true,
  searchDebounceMs: 300,
};

export const useReviewsModal = (
  reviews: EnhancedTestimonial[],
  options: UseReviewsModalOptions = {}
): UseReviewsModalReturn => {
  const config = { ...DEFAULT_OPTIONS, ...options };

  // Modal state
  const [modalState, setModalState] = useState<ReviewsModalState>({
    isOpen: false,
    currentPage: 1,
    itemsPerPage: config.defaultItemsPerPage,
    searchQuery: '',
    selectedRating: null,
    isLoading: false,
    error: null,
  });

  // Debounced search query
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(modalState.searchQuery);
    }, config.searchDebounceMs);

    return () => clearTimeout(timer);
  }, [modalState.searchQuery, config.searchDebounceMs]);

  // Filter reviews by search query and rating
  const filteredReviews = useMemo(() => {
    let filtered = reviews;

    // Apply search filter
    if (config.enableSearch && debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(review =>
        review.name.toLowerCase().includes(query) ||
        review.content.toLowerCase().includes(query) ||
        review.service?.toLowerCase().includes(query) ||
        review.originalText?.toLowerCase().includes(query)
      );
    }

    // Apply rating filter
    if (config.enableRatingFilter && modalState.selectedRating !== null) {
      filtered = filtered.filter(review => review.rating === modalState.selectedRating);
    }

    return filtered;
  }, [reviews, debouncedSearchQuery, modalState.selectedRating, config.enableSearch, config.enableRatingFilter]);

  // Calculate pagination
  const totalPages = useMemo(() => {
    if (!config.enablePagination) return 1;
    return Math.ceil(filteredReviews.length / modalState.itemsPerPage);
  }, [filteredReviews.length, modalState.itemsPerPage, config.enablePagination]);

  // Get paginated reviews
  const paginatedReviews = useMemo(() => {
    if (!config.enablePagination) return filteredReviews;

    const startIndex = (modalState.currentPage - 1) * modalState.itemsPerPage;
    const endIndex = startIndex + modalState.itemsPerPage;
    return filteredReviews.slice(startIndex, endIndex);
  }, [filteredReviews, modalState.currentPage, modalState.itemsPerPage, config.enablePagination]);

  // Calculate rating counts
  const ratingCounts = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        counts[review.rating]++;
      }
    });

    return counts;
  }, [reviews]);

  // Computed values
  const totalFilteredItems = filteredReviews.length;
  const isEmpty = totalFilteredItems === 0;
  const hasSearchQuery = debouncedSearchQuery.trim().length > 0;
  const hasActiveFilters = modalState.selectedRating !== null || hasSearchQuery;

  // Actions
  const openModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: true }));
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setModalState(prev => ({
      ...prev,
      searchQuery: query,
      currentPage: 1, // Reset to first page when searching
    }));
  }, []);

  const setSelectedRating = useCallback((rating: number | null) => {
    setModalState(prev => ({
      ...prev,
      selectedRating: rating,
      currentPage: 1, // Reset to first page when filtering
    }));
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setModalState(prev => ({ ...prev, currentPage: page }));
  }, []);

  const clearFilters = useCallback(() => {
    setModalState(prev => ({
      ...prev,
      searchQuery: '',
      selectedRating: null,
      currentPage: 1,
    }));
    setDebouncedSearchQuery('');
  }, []);

  // Handle keyboard events
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!modalState.isOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        closeModal();
        break;
      case 'ArrowLeft':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          if (modalState.currentPage > 1) {
            setCurrentPage(modalState.currentPage - 1);
          }
        }
        break;
      case 'ArrowRight':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          if (modalState.currentPage < totalPages) {
            setCurrentPage(modalState.currentPage + 1);
          }
        }
        break;
      case 'Home':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          setCurrentPage(1);
        }
        break;
      case 'End':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          setCurrentPage(totalPages);
        }
        break;
    }
  }, [modalState.isOpen, modalState.currentPage, totalPages, closeModal, setCurrentPage]);

  // Attach keyboard event listeners
  useEffect(() => {
    if (modalState.isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [modalState.isOpen, handleKeyDown]);

  // Reset to first page when modal opens
  useEffect(() => {
    if (modalState.isOpen && modalState.currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [modalState.isOpen, modalState.currentPage, setCurrentPage]);

  return {
    // State
    modalState,

    // Computed values
    filteredReviews,
    paginatedReviews,
    totalPages,
    totalFilteredItems,
    ratingCounts,
    isEmpty,
    hasSearchQuery,
    hasActiveFilters,

    // Actions
    openModal,
    closeModal,
    setSearchQuery,
    setSelectedRating,
    setCurrentPage,
    clearFilters,
    handleKeyDown,
  };
};