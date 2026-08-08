import React from "react";

interface StepperStep {
  number: number;
  title: string;
  description?: string;
}

interface StepperNumberedProps {
  steps: StepperStep[];
}

export default function StepperNumbered({ steps }: StepperNumberedProps) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex items-start min-w-max gap-0">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-start">
            {/* Step */}
            <div className="flex flex-col items-center text-center w-36 md:w-44">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-green text-white flex items-center justify-center text-lg font-bold font-heading shadow-lg shadow-brand-green/25">
                {step.number}
              </div>
              <h4 className="mt-3 text-sm font-semibold text-deep-teal font-heading leading-tight px-2">
                {step.title}
              </h4>
              {step.description && (
                <p className="mt-1 text-xs text-secondary-text px-2">{step.description}</p>
              )}
            </div>
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex items-center pt-6 md:pt-7">
                <div className="w-8 md:w-12 h-0.5 bg-brand-green/30" />
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-brand-green/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
