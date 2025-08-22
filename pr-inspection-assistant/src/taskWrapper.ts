import * as tl from 'azure-pipelines-task-lib/task';

export const isDev = () => process.env.Dev_Mode === 'true';
export const isVerboseLoggingEnabled = () => _getInput('verbose_logging', false) === 'true';

const envVar = (name:string) => process.env[name.replaceAll('.', '_')];

const SENSITIVE_PATTERNS = ['token', 'secret', 'password', 'key'];

function shouldMask(name: string, explicit?: boolean): boolean {
    if (explicit) return true;
    const lower = name.toLowerCase();
    return SENSITIVE_PATTERNS.some((p) => lower.includes(p));
}

console.info('isDev: ', isDev());
console.info('verboseLogging: ', isVerboseLoggingEnabled());

function _getInput(name: string, required?: boolean): string | undefined {
    return isDev() ? envVar(name) : tl.getInput(name, required);
};

export function getInput(name: string, required?: boolean, secret = false): string | undefined {
    const result = _getInput(name, required);
    if (isVerboseLoggingEnabled()) {
        const display = shouldMask(name, secret) ? '***' : result;
        console.info(`getInput: ${name} = ${display}`);
    }
    return result;
};

export function getBoolInput(name: string, required?: boolean, secret = false): boolean {
    const result = isDev() ? envVar(name) === 'true' : tl.getBoolInput(name, required);
    if (isVerboseLoggingEnabled()) {
        const display = shouldMask(name, secret) ? '***' : result;
        console.info(`getBoolInput: ${name} = ${display}`);
    }
    return result;
};

export function getVariable(name: string, secret = false): string | undefined {
    const result = isDev() ? envVar(name) : tl.getVariable(name);
    if (isVerboseLoggingEnabled()) {
        const display = shouldMask(name, secret) ? '***' : result;
        console.info(`getVariable: ${name} = ${display}`);
    }
    return result;
};

// re-export everything from task-lib
export * from 'azure-pipelines-task-lib/task';

export default {
    ...tl,
    getVariable,
    getInput,
    getBoolInput,
    isVerboseLoggingEnabled,
    isDev
};