export default class EventBus {
    private readonly listeners: Record<string, Array<(...args: unknown[]) => void>> = {};

    on(event: string, callback: (...args: unknown[]) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: () => void) {
        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]) {
        this.listeners[event]?.forEach(function(listener) {
            listener(...args);
        });
    }
}
