'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useQuickDiagnosis } from '@/hooks/useQuickDiagnosis';
import { quickDiagnosisSchemaEnhanced } from '@/lib/validations';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CalendarBookingModal } from '@/components/ui';
import { CONTACT_INFO } from '@/data/constants';
import { BaseComponentProps, QuickDiagnosisResult } from '@/types';

interface QuickDiagnosisProps extends BaseComponentProps {
  variant?: 'full' | 'compact';
}

const QuickDiagnosis: React.FC<QuickDiagnosisProps> = ({
  className,
  variant = 'full'
}) => {
  const { t, ready } = useTranslation();
  const {
    state,
    updateFormData,
    generateDiagnosis,
    resetDiagnosis,
    availableSymptoms
  } = useQuickDiagnosis();

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleSymptomToggle = (symptomId: string) => {
    const currentSymptoms = state.formData.symptoms;
    const isSelected = currentSymptoms.includes(symptomId);

    const newSymptoms = isSelected
      ? currentSymptoms.filter(id => id !== symptomId)
      : [...currentSymptoms, symptomId];

    updateFormData({ symptoms: newSymptoms });

    // Clear validation error when user starts selecting symptoms
    if (validationErrors.symptoms && newSymptoms.length > 0) {
      setValidationErrors(prev => ({ ...prev, symptoms: '' }));
    }
  };

  const handleAdditionalInfoChange = (value: string) => {
    updateFormData({ additionalInfo: value });

    // Clear validation error when user starts typing
    if (validationErrors.additionalInfo) {
      setValidationErrors(prev => ({ ...prev, additionalInfo: '' }));
    }
  };

  const validateForm = () => {
    try {
      quickDiagnosisSchemaEnhanced.parse(state.formData);
      setValidationErrors({});
      return true;
    } catch (error: unknown) {
      const errors: Record<string, string> = {};

      if (error && typeof error === 'object' && 'errors' in error) {
        const zodError = error as { errors: Array<{ path: string[]; message: string }> };
        zodError.errors.forEach((err) => {
          if (err.path && err.path.length > 0) {
            errors[err.path[0]] = err.message;
          }
        });
      }

      setValidationErrors(errors);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      await generateDiagnosis();
    }
  };

  const handleReset = () => {
    setValidationErrors({});
    resetDiagnosis();
  };

  // Wait for i18n to be ready
  if (!ready) {
    return (
      <section className={cn(
        'w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
        variant === 'compact' ? 'py-8' : 'py-12',
        className
      )}>
        <div className="text-center">
          <div className="animate-pulse text-gray-500">Cargando...</div>
        </div>
      </section>
    );
  }

  if (state.currentStep === 'results' && state.result) {
    return (
      <QuickDiagnosisResults
        result={state.result}
        onNewDiagnosis={handleReset}
        className={className}
        variant={variant}
      />
    );
  }

  return (
    <section className={cn(
      'w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
      variant === 'compact' ? 'py-8' : 'py-12',
      className
    )}>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2
            className={cn(
              'font-poppins font-semibold text-gray-900',
              variant === 'compact' ? 'text-2xl' : 'text-3xl lg:text-4xl'
            )}
            dangerouslySetInnerHTML={{ __html: t('quickDiagnosis.title') }}
          />
          <p className={cn(
            'text-gray-600 font-lato max-w-2xl mx-auto',
            variant === 'compact' ? 'text-base' : 'text-lg'
          )}>
            {t('quickDiagnosis.subtitle')}
          </p>
        </div>

        {/* Disclaimer */}
        <Card className="!bg-yellow-50 !border-yellow-200 border-2">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">{t('quickDiagnosis.disclaimer.icon')}</span>
            <div>
              <h3 className="font-semibold text-yellow-800 font-montserrat text-lg mb-2">
                {t('quickDiagnosis.disclaimer.title')}
              </h3>
              <p className="text-yellow-700 font-lato leading-relaxed">
                {t('quickDiagnosis.disclaimer.text')}
              </p>
            </div>
          </div>
        </Card>

        {/* Form */}
        <Card className="space-y-6 !bg-white !border-gray-200">
          {/* Symptoms Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 font-poppins">
              {t('quickDiagnosis.form.title')}
            </h3>
            <p className="text-gray-600 font-lato">
              {t('quickDiagnosis.form.subtitle')}
            </p>

            {validationErrors.symptoms && (
              <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                {validationErrors.symptoms}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableSymptoms.map((symptom) => {
                const isSelected = state.formData.symptoms.includes(symptom.key);
                const isWarning = symptom.category === 'warning';
                const isExposure = symptom.category === 'exposure';

                return (
                  <label
                    key={symptom.id}
                    className={cn(
                      'flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                      'hover:shadow-md hover:-translate-y-0.5',
                      isSelected
                        ? isWarning
                          ? 'bg-red-50 border-red-300 text-red-900'
                          : isExposure
                          ? 'bg-orange-50 border-orange-300 text-orange-900'
                          : 'bg-primary-50 border-primary-300 text-primary-900'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSymptomToggle(symptom.key)}
                      className={cn(
                        'w-5 h-5 rounded border-2 transition-colors',
                        isSelected
                          ? isWarning
                            ? 'text-red-600 border-red-300 focus:ring-red-200'
                            : isExposure
                            ? 'text-orange-600 border-orange-300 focus:ring-orange-200'
                            : 'text-primary-600 border-primary-300 focus:ring-primary-200'
                          : 'border-gray-300 focus:ring-primary-200'
                      )}
                    />
                    <span className="font-medium font-lato flex-1">
                      {t(`quickDiagnosis.${symptom.labelKey}`)}
                    </span>
                    {isWarning && (
                      <span className="text-red-500 text-sm">⚠️</span>
                    )}
                    {isExposure && (
                      <span className="text-orange-500 text-sm">🔊</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900 font-montserrat">
              {t('quickDiagnosis.additionalInfo.title')}
            </label>
            <textarea
              value={state.formData.additionalInfo || ''}
              onChange={(e) => handleAdditionalInfoChange(e.target.value)}
              placeholder={t('quickDiagnosis.additionalInfo.placeholder')}
              rows={3}
              className={cn(
                'w-full px-4 py-3 border-2 rounded-xl transition-colors font-lato',
                'focus:ring-4 focus:ring-primary-200 focus:border-primary-400 focus:outline-none',
                validationErrors.additionalInfo
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 bg-gray-50 focus:bg-white'
              )}
            />
            {validationErrors.additionalInfo && (
              <p className="text-red-600 text-sm font-medium">
                {validationErrors.additionalInfo}
              </p>
            )}
            <p className="text-xs text-gray-500 font-lato">
              {t('quickDiagnosis.additionalInfo.label')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={state.isLoading}
              loading={state.isLoading}
              className="flex-1 h-12 text-lg font-semibold"
              variant="primary"
            >
              {state.isLoading
                ? t('quickDiagnosis.results.loading')
                : t('quickDiagnosis.form.submitButton')
              }
            </Button>

            <Button
              onClick={handleReset}
              disabled={state.isLoading}
              variant="secondary"
              className="sm:w-auto h-12"
            >
              {t('quickDiagnosis.form.resetButton')}
            </Button>
          </div>

          {/* Error Display */}
          {state.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-red-500">⚠️</span>
                <span className="font-medium">{state.error}</span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

// Quick Diagnosis Results Component
interface QuickDiagnosisResultsProps {
  result: QuickDiagnosisResult;
  onNewDiagnosis: () => void;
  className?: string;
  variant?: 'full' | 'compact';
}

const QuickDiagnosisResults: React.FC<QuickDiagnosisResultsProps> = ({
  result,
  onNewDiagnosis,
  className,
  variant = 'full'
}) => {
  const { t, ready } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if it's a medical emergency that shouldn't show appointment buttons
  const isMedicalUrgent = result.type === 'medical_urgent' ||
                         result.severity === 'urgent' ||
                         result.nextSteps.primary.label.includes('médica urgente') ||
                         result.nextSteps.primary.label.includes('urgente') ||
                         result.nextSteps.primary.label.includes('emergencia');

  // Determine if primary button should use calendar booking
  const shouldUseCalendar = !isMedicalUrgent && CONTACT_INFO.calendarBooking && (
    result.type === 'audiometry' ||
    result.type === 'videotoscopy' ||
    result.nextSteps.primary.label.includes('audiometría') ||
    result.nextSteps.primary.label.includes('Audiometría') ||
    result.nextSteps.primary.label.includes('videotoscopía') ||
    result.nextSteps.primary.label.includes('Videotoscopía') ||
    result.nextSteps.primary.label.includes('agendar') ||
    result.nextSteps.primary.label.includes('Agendar') ||
    result.nextSteps.primary.label.includes('cita') ||
    result.nextSteps.primary.label.includes('Cita')
  );

  // Determine if secondary button should use calendar booking
  const shouldUseCalendarSecondary = CONTACT_INFO.calendarBooking && result.nextSteps.secondary && (
    result.nextSteps.secondary.label.includes('audiometría') ||
    result.nextSteps.secondary.label.includes('Audiometría') ||
    result.nextSteps.secondary.label.includes('videotoscopía') ||
    result.nextSteps.secondary.label.includes('Videotoscopía') ||
    result.nextSteps.secondary.label.includes('agendar') ||
    result.nextSteps.secondary.label.includes('Agendar') ||
    result.nextSteps.secondary.label.includes('cita') ||
    result.nextSteps.secondary.label.includes('Cita')
  );

  const handlePrimaryAction = () => {
    if (shouldUseCalendar) {
      setIsModalOpen(true);
    } else {
      // Fallback to original href behavior
      if (result.nextSteps.primary.href) {
        if (result.nextSteps.primary.external) {
          window.open(result.nextSteps.primary.href, '_blank');
        } else {
          window.location.href = result.nextSteps.primary.href;
        }
      }
    }
  };

  const handleSecondaryAction = () => {
    if (shouldUseCalendarSecondary) {
      setIsModalOpen(true);
    } else {
      // Fallback to original href behavior
      if (result.nextSteps.secondary?.external) {
        window.open(result.nextSteps.secondary.href, '_blank');
      } else if (result.nextSteps.secondary?.href) {
        window.location.href = result.nextSteps.secondary.href;
      }
    }
  };

  // Determine service name for calendar modal
  const getServiceName = () => {
    if (result.type === 'audiometry' ||
        result.nextSteps.primary.label.includes('audiometría') ||
        result.nextSteps.primary.label.includes('Audiometría')) {
      return 'Audiometría';
    } else if (result.type === 'videotoscopy' ||
               result.nextSteps.primary.label.includes('videotoscopía') ||
               result.nextSteps.primary.label.includes('Videotoscopía')) {
      return 'Videotoscopía';
    } else if (result.type === 'cleaning' ||
               result.nextSteps.primary.label.includes('lavado') ||
               result.nextSteps.primary.label.includes('Lavado')) {
      return 'Lavado de Oídos';
    } else {
      return 'Evaluación Auditiva';
    }
  };

  // Wait for i18n to be ready
  if (!ready) {
    return (
      <section className={cn(
        'w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
        variant === 'compact' ? 'py-8' : 'py-12',
        className
      )}>
        <div className="text-center">
          <div className="animate-pulse text-gray-500">Cargando resultados...</div>
        </div>
      </section>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'urgent':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medical_urgent':
        return '🏥';
      case 'videotoscopy':
        return '👁️';
      case 'audiometry':
        return '👂';
      case 'cleaning':
        return '🧼';
      default:
        return '🔍';
    }
  };

  return (
    <section className={cn(
      'w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
      variant === 'compact' ? 'py-8' : 'py-12',
      className
    )}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className={cn(
            'font-poppins font-semibold text-gray-900',
            variant === 'compact' ? 'text-2xl' : 'text-3xl lg:text-4xl'
          )}>
            {t('quickDiagnosis.results.title')}
          </h2>
          <p className={cn(
            'text-gray-600 font-lato',
            variant === 'compact' ? 'text-base' : 'text-lg'
          )}>
            {t('quickDiagnosis.results.subtitle')}
          </p>
        </div>

        {/* Results Card */}
        <Card className="space-y-6 !bg-white !border-gray-200">
          {/* Severity and Type */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{getTypeIcon(result.type)}</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 font-poppins">
                  {result.suggestedService || t('quickDiagnosis.results.title')}
                </h3>
              </div>
            </div>
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-medium border',
              getSeverityColor(result.severity)
            )}>
              {t(`quickDiagnosis.results.severity.${result.severity}`)}
            </span>
          </div>

          {/* Primary Recommendation */}
          <div className="!bg-blue-50 !border !border-blue-200 rounded-xl p-6">
            <h4 className="font-semibold !text-blue-900 font-montserrat mb-3">
              Recomendación Principal
            </h4>
            <p className="!text-blue-800 font-lato leading-relaxed">
              {t(result.primaryRecommendation)}
            </p>
          </div>

          {/* Secondary Recommendations */}
          {result.secondaryRecommendations && result.secondaryRecommendations.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 font-montserrat">
                Información Adicional
              </h4>
              <ul className="space-y-2">
                {result.secondaryRecommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span className="text-gray-700 font-lato">{t(rec)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Price Information */}
          {result.estimatedPrice && result.estimatedPrice > 0 && (
            <div className="!bg-green-50 !border !border-green-200 rounded-xl p-4">
              <p className="!text-green-800 font-medium font-montserrat">
                {t('quickDiagnosis.results.estimatedPrice', {
                  price: result.estimatedPrice.toLocaleString('es-CL')
                })}
              </p>
            </div>
          )}

          {result.estimatedPrice === 0 && (
            <div className="!bg-gray-50 !border !border-gray-200 rounded-xl p-4">
              <p className="!text-gray-700 font-medium font-montserrat">
                {t('quickDiagnosis.results.priceOnConsult')}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {isMedicalUrgent ? (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <h3 className="font-semibold text-red-800 font-primary text-lg mb-2">
                      Importante: Busca atención médica inmediata
                    </h3>
                    <p className="text-red-700 font-secondary leading-relaxed mb-4">
                      Los síntomas que has descrito requieren evaluación médica urgente.
                      Te recomendamos acudir directamente a un médico otorrinolaringólogo
                      o centro de salud especializado.
                    </p>
                    <p className="text-red-600 font-secondary text-sm">
                      Este centro se especializa en procedimientos de audiología preventiva,
                      no en atención médica urgente.
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp contact for urgent consultations */}
              <div className="flex justify-center">
                <Button
                  href={result.nextSteps.primary.href}
                  external={result.nextSteps.primary.external}
                  variant="secondary"
                  className="flex items-center space-x-2"
                >
                  <span>💬</span>
                  <span>Consultar por WhatsApp</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={shouldUseCalendar ? handlePrimaryAction : undefined}
                href={shouldUseCalendar ? undefined : result.nextSteps.primary.href}
                external={shouldUseCalendar ? undefined : result.nextSteps.primary.external}
                className="flex-1 h-12 text-lg font-semibold"
                variant="primary"
              >
                {t(result.nextSteps.primary.label)}
              </Button>

              {result.nextSteps.secondary && (
                <Button
                  onClick={shouldUseCalendarSecondary ? handleSecondaryAction : undefined}
                  href={shouldUseCalendarSecondary ? undefined : result.nextSteps.secondary.href}
                  external={shouldUseCalendarSecondary ? undefined : result.nextSteps.secondary.external}
                  variant="secondary"
                  className="sm:w-auto h-12"
                >
                  {t(result.nextSteps.secondary.label)}
                </Button>
              )}
            </div>
          )}

          {/* New Diagnosis Button */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={onNewDiagnosis}
              variant="ghost"
              className="w-full"
            >
              {t('quickDiagnosis.actions.newDiagnosis')}
            </Button>
          </div>
        </Card>

        {/* Disclaimer for Results */}
        {result.disclaimerRequired && (
          <Card className="!bg-yellow-50 !border-yellow-200 border-2">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{t('quickDiagnosis.disclaimer.icon')}</span>
              <div>
                <h3 className="font-semibold text-yellow-800 font-montserrat text-lg mb-2">
                  {t('quickDiagnosis.disclaimer.title')}
                </h3>
                <p className="text-yellow-700 font-lato leading-relaxed">
                  {t('quickDiagnosis.disclaimer.text')}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Calendar Booking Modal */}
        {CONTACT_INFO.calendarBooking && (
          <CalendarBookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            calendarUrl={CONTACT_INFO.calendarBooking}
            serviceName={getServiceName()}
          />
        )}
      </div>
    </section>
  );
};

export default QuickDiagnosis;