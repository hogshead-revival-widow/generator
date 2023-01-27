import { writable, type Writable, get } from 'svelte/store';
import { allSteps } from '../config/steps';

const stepState: Writable<IStep> = writable(allSteps[0]);

const getCurrentIdx = (currentStep: IStep) =>
    Object.values(allSteps).findIndex((step) => step.title === currentStep.title);

const move = (direction: 'next' | 'previous') => {
    stepState.update((currentStep) => {
        const currentIdx = getCurrentIdx(currentStep);
        const targetIdx = direction === 'next' ? currentIdx + 1 : currentIdx - 1;
        const target = allSteps[targetIdx];
        if (target === undefined) {
            const msg = `Can't move  from ${currentStep.title}: No ${direction} step exists`;
            throw new Error(msg);
        }
        return target;
    });
};

export const step = {
    subscribe: stepState.subscribe,
    goNext: () => move('next'),
    goPrevious: () => move('previous'),
    getNextName: () => allSteps[getCurrentIdx(get(step)) + 1].nameAsNext,
    hasNext: () => allSteps[getCurrentIdx(get(step)) + 1] !== undefined,
    hasPrevious: () => allSteps[getCurrentIdx(get(step)) - 1] !== undefined,
    isFirst: () => getCurrentIdx(get(step)) === 0,
    isLast: () => getCurrentIdx(get(step)) === allSteps.length - 1,
    reset: () => stepState.set(allSteps[1]),
};
