import { useState, useCallback } from 'react';
import type {
  QuickDiagnosisFormData,
  QuickDiagnosisResult,
  QuickDiagnosisState,
  QuickDiagnosisSymptom
} from '@/types';
import { CONTACT_INFO } from '@/data/constants';

// Síntomas disponibles según el brief funcional
export const AVAILABLE_SYMPTOMS: QuickDiagnosisSymptom[] = [
  { id: 'itching', key: 'itching', labelKey: 'symptoms.itching', category: 'common' },
  { id: 'discharge', key: 'discharge', labelKey: 'symptoms.discharge', category: 'warning' },
  { id: 'pain', key: 'pain', labelKey: 'symptoms.pain', category: 'warning' },
  { id: 'blocked', key: 'blocked', labelKey: 'symptoms.blocked', category: 'common' },
  { id: 'tinnitus', key: 'tinnitus', labelKey: 'symptoms.tinnitus', category: 'common' },
  { id: 'suddenLoss', key: 'suddenLoss', labelKey: 'symptoms.suddenLoss', category: 'warning' },
  { id: 'noiseExposure', key: 'noiseExposure', labelKey: 'symptoms.noiseExposure', category: 'exposure' },
  { id: 'others', key: 'others', labelKey: 'symptoms.others', category: 'common' }
];

export const useQuickDiagnosis = () => {
  const [state, setState] = useState<QuickDiagnosisState>({
    currentStep: 'symptoms',
    formData: { symptoms: [] },
    isLoading: false
  });

  const resetDiagnosis = useCallback(() => {
    setState({
      currentStep: 'symptoms',
      formData: { symptoms: [] },
      isLoading: false
    });
  }, []);

  const updateFormData = useCallback((data: Partial<QuickDiagnosisFormData>) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...data }
    }));
  }, []);

  const setCurrentStep = useCallback((step: QuickDiagnosisState['currentStep']) => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const analyzeSymptoms = useCallback((formData: QuickDiagnosisFormData): QuickDiagnosisResult => {
    const { symptoms } = formData;
    const hasItching = symptoms.includes('itching');
    const hasDischarge = symptoms.includes('discharge');
    const hasPain = symptoms.includes('pain');
    const hasBlocked = symptoms.includes('blocked');
    const hasTinnitus = symptoms.includes('tinnitus');
    const hasSuddenLoss = symptoms.includes('suddenLoss');
    const hasNoiseExposure = symptoms.includes('noiseExposure');

    // Reglas de orientación según el brief funcional:

    // 1. Supuración/dolor intenso/fiebre: derivar a otorrinolaringólogo (posible infección)
    if (hasDischarge || hasPain) {
      return {
        type: 'medical_urgent',
        severity: 'urgent',
        primaryRecommendation: 'results.medical.urgent.primary',
        secondaryRecommendations: [
          'results.medical.urgent.secondary1',
          'results.medical.urgent.secondary2'
        ],
        urgencyLevel: 4,
        disclaimerRequired: true,
        nextSteps: {
          primary: {
            action: 'emergency',
            label: 'actions.urgentMedical',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=Necesito%20atenci%C3%B3n%20m%C3%A9dica%20urgente.%20Tengo%20s%C3%ADntomas%20de%20dolor%20y/o%20supuraci%C3%B3n%20en%20el%20o%C3%ADdo.`,
            external: true
          },
          secondary: {
            action: 'whatsapp',
            label: 'actions.consultWhatsApp',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
            external: true
          }
        }
      };
    }

    // 2. Pérdida súbita: derivar a otorrinolaringólogo urgente
    if (hasSuddenLoss) {
      return {
        type: 'medical_urgent',
        severity: 'urgent',
        primaryRecommendation: 'results.medical.suddenLoss.primary',
        secondaryRecommendations: [
          'results.medical.suddenLoss.secondary1'
        ],
        urgencyLevel: 4,
        disclaimerRequired: true,
        nextSteps: {
          primary: {
            action: 'emergency',
            label: 'actions.urgentMedical',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=Necesito%20atenci%C3%B3n%20m%C3%A9dica%20urgente.%20He%20perdido%20audici%C3%B3n%20de%20forma%20s%C3%BAbita.`,
            external: true
          },
          secondary: {
            action: 'whatsapp',
            label: 'actions.consultWhatsApp',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
            external: true
          }
        }
      };
    }

    // 3. Exposición a ruidos + zumbidos: sugerir Audiometría
    if (hasNoiseExposure && hasTinnitus) {
      return {
        type: 'audiometry',
        severity: 'moderate',
        primaryRecommendation: 'results.audiometry.noise.primary',
        secondaryRecommendations: [
          'results.audiometry.noise.secondary1',
          'results.audiometry.noise.secondary2'
        ],
        suggestedService: 'Audiometría',
        estimatedPrice: 0, // Precio por determinar
        urgencyLevel: 2,
        disclaimerRequired: true,
        nextSteps: {
          primary: {
            action: 'schedule',
            label: 'actions.scheduleAudiometry',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=Hola%2C%20me%20interesa%20agendar%20una%20audiometr%C3%ADa.%20Tengo%20zumbidos%20y%20exposici%C3%B3n%20reciente%20a%20ruido%20intenso.`,
            external: true
          },
          secondary: {
            action: 'whatsapp',
            label: 'actions.consultWhatsApp',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
            external: true
          }
        }
      };
    }

    // 4. Sensación de tapón/hipoacusia progresiva: sugerir Videotoscopía → posible Lavado
    if (hasBlocked) {
      return {
        type: 'videotoscopy',
        severity: 'moderate',
        primaryRecommendation: 'results.videotoscopy.blocked.primary',
        secondaryRecommendations: [
          'results.videotoscopy.blocked.secondary1',
          'results.videotoscopy.blocked.secondary2'
        ],
        suggestedService: 'Videotoscopía',
        estimatedPrice: 10000,
        urgencyLevel: 2,
        disclaimerRequired: true,
        nextSteps: {
          primary: {
            action: 'schedule',
            label: 'actions.scheduleVideotoscopy',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=Hola%2C%20me%20interesa%20agendar%20una%20videotoscop%C3%ADa.%20Siento%20el%20o%C3%ADdo%20tapado.`,
            external: true
          },
          secondary: {
            action: 'whatsapp',
            label: 'actions.consultWhatsApp',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
            external: true
          }
        }
      };
    }

    // 5. Picazón sin dolor/supuración: sugerir Videotoscopía
    if (hasItching && !hasPain && !hasDischarge) {
      return {
        type: 'videotoscopy',
        severity: 'low',
        primaryRecommendation: 'results.videotoscopy.itching.primary',
        secondaryRecommendations: [
          'results.videotoscopy.itching.secondary1'
        ],
        suggestedService: 'Videotoscopía',
        estimatedPrice: 10000,
        urgencyLevel: 1,
        disclaimerRequired: true,
        nextSteps: {
          primary: {
            action: 'schedule',
            label: 'actions.scheduleVideotoscopy',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=Hola%2C%20me%20interesa%20agendar%20una%20videotoscop%C3%ADa.%20Tengo%20picaz%C3%B3n%20en%20el%20o%C3%ADdo.`,
            external: true
          },
          secondary: {
            action: 'whatsapp',
            label: 'actions.consultWhatsApp',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
            external: true
          }
        }
      };
    }

    // 6. Solo zumbidos: sugerir Audiometría
    if (hasTinnitus && !hasNoiseExposure) {
      return {
        type: 'audiometry',
        severity: 'moderate',
        primaryRecommendation: 'results.audiometry.tinnitus.primary',
        secondaryRecommendations: [
          'results.audiometry.tinnitus.secondary1'
        ],
        suggestedService: 'Audiometría',
        estimatedPrice: 0, // Precio por determinar
        urgencyLevel: 2,
        disclaimerRequired: true,
        nextSteps: {
          primary: {
            action: 'schedule',
            label: 'actions.scheduleAudiometry',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=Hola%2C%20me%20interesa%20agendar%20una%20audiometr%C3%ADa.%20Tengo%20zumbidos%20en%20el%20o%C3%ADdo.`,
            external: true
          },
          secondary: {
            action: 'whatsapp',
            label: 'actions.consultWhatsApp',
            href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
            external: true
          }
        }
      };
    }

    // 7. Otros síntomas o casos generales: sugerir Videotoscopía como evaluación inicial
    return {
      type: 'videotoscopy',
      severity: 'low',
      primaryRecommendation: 'results.videotoscopy.general.primary',
      secondaryRecommendations: [
        'results.videotoscopy.general.secondary1',
        'results.videotoscopy.general.secondary2'
      ],
      suggestedService: 'Videotoscopía',
      estimatedPrice: 10000,
      urgencyLevel: 1,
      disclaimerRequired: true,
      nextSteps: {
        primary: {
          action: 'schedule',
          label: 'actions.scheduleVideotoscopy',
          href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=Hola%2C%20me%20interesa%20agendar%20una%20videotoscop%C3%ADa%20para%20evaluaci%C3%B3n%20auditiva.`,
          external: true
        },
        secondary: {
          action: 'whatsapp',
          label: 'actions.consultWhatsApp',
          href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
          external: true
        }
      }
    };
  }, []);

  const generateDiagnosis = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      // Simular un pequeño delay para mejor UX
      await new Promise(resolve => setTimeout(resolve, 800));

      setState(prev => {
        const result = analyzeSymptoms(prev.formData);
        return {
          ...prev,
          result,
          currentStep: 'results',
          isLoading: false
        };
      });
    } catch (error: unknown) {
      console.error('Error generating diagnosis:', error);
      setState(prev => ({
        ...prev,
        error: 'Ha ocurrido un error al generar el diagnóstico. Por favor, inténtalo de nuevo.',
        isLoading: false
      }));
    }
  }, [analyzeSymptoms]);

  return {
    state,
    resetDiagnosis,
    updateFormData,
    setCurrentStep,
    generateDiagnosis,
    availableSymptoms: AVAILABLE_SYMPTOMS
  };
};