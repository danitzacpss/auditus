import { EnhancedTestimonial } from './google-reviews';

// Modal State Types
export interface ReviewsModalState {
  isOpen: boolean;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  selectedRating: number | null;
  isLoading: boolean;
  error: string | null;
}

// Modal Props
export interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: EnhancedTestimonial[];
  title?: string;
  maxHeight?: string;
  className?: string;
  showSearch?: boolean;
  showRatingFilter?: boolean;
  showPagination?: boolean;
  itemsPerPage?: number;
  onReviewClick?: (review: EnhancedTestimonial) => void;
}

// Search and Filter Props
export interface ReviewsSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export interface ReviewsRatingFilterProps {
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
  reviewCounts: Record<number, number>;
  className?: string;
  disabled?: boolean;
}

// Pagination Props
export interface ReviewsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  showPageInfo?: boolean;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
}

// Review Grid Props
export interface ReviewsGridProps {
  reviews: EnhancedTestimonial[];
  isLoading?: boolean;
  error?: string | null;
  emptyStateMessage?: string;
  className?: string;
  onReviewClick?: (review: EnhancedTestimonial) => void;
}

// Modal Header Props
export interface ReviewsModalHeaderProps {
  title: string;
  onClose: () => void;
  reviewsCount?: number;
  className?: string;
}

// Empty State Props
export interface ReviewsEmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

// Loading State Props
export interface ReviewsLoadingStateProps {
  count?: number;
  className?: string;
}

// Error State Props
export interface ReviewsErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

// Modal Hook Types
export interface UseReviewsModalOptions {
  defaultItemsPerPage?: number;
  enableSearch?: boolean;
  enableRatingFilter?: boolean;
  enablePagination?: boolean;
  searchDebounceMs?: number;
}

export interface UseReviewsModalReturn {
  // State
  modalState: ReviewsModalState;

  // Computed values
  filteredReviews: EnhancedTestimonial[];
  paginatedReviews: EnhancedTestimonial[];
  totalPages: number;
  totalFilteredItems: number;
  ratingCounts: Record<number, number>;
  isEmpty: boolean;
  hasSearchQuery: boolean;
  hasActiveFilters: boolean;

  // Actions
  openModal: () => void;
  closeModal: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedRating: (rating: number | null) => void;
  setCurrentPage: (page: number) => void;
  clearFilters: () => void;
  handleKeyDown: (event: KeyboardEvent) => void;
}

// Rating Filter Chip Types
export interface RatingChipProps {
  rating: number;
  count: number;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

// Modal Animation Types
export type ModalAnimationState = 'entering' | 'entered' | 'exiting' | 'exited';

export interface ModalAnimationProps {
  state: ModalAnimationState;
  duration?: number;
}

// Accessibility Types
export interface ModalA11yProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  role?: string;
  focusOnOpen?: boolean;
  restoreFocusOnClose?: boolean;
  trapFocus?: boolean;
}