import { allSteps } from '../config/steps';
import { input } from './input';
import { step } from './step';

export const clear = () => {
    Object.values(allSteps).forEach((step) => step.errors.reset());
    input.reset();
    step.reset();
};
