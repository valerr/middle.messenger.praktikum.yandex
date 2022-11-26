export default class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event, callback) {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} not found`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event, ...args) {
        if (!this.listeners[event]) {
            throw new Error(`Event ${event} not found`);
        }

        this.listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}