export default class EventBus {
    private readonly listeners: Record<string, Array<(...args: unknown[]) => void>> = {};

    on(event: string, callback: () => {}) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: () => {}) {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} not found`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} not found`);
        }

        this.listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}