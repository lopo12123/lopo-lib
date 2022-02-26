"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
/**
 * @description FIFO
 */
var Queue = /** @class */ (function () {
    /**
     * @description create a queue with max length
     */
    function Queue(max) {
        /**
         * @description current queue
         * @private
         */
        this._queue = [];
        this._max = max;
    }
    /**
     * @description create a queue with max length
     */
    Queue.create = function (max) {
        return new Queue(max);
    };
    Object.defineProperty(Queue.prototype, "length", {
        /**
         * @description queue`s length
         */
        get: function () {
            return this._queue.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description returns a shallow copy of current queue
     */
    Queue.prototype.getQueue = function () {
        return this._queue.slice(0);
    };
    /**
     * @description push some items into the queue and return current length of the queue
     */
    Queue.prototype.in = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        // below max length
        if (items.length + this._queue.length <= this._max) {
            return (_a = this._queue).push.apply(_a, items);
        }
        // overflow: items.length > max
        else if (items.length >= this._max) {
            this._queue = items.slice(items.length - this._max);
            return this._max;
        }
        // overflow: items.length < max
        else {
            var nextFirst = this._queue.length + items.length - this._max;
            this._queue = __spreadArray(__spreadArray([], this._queue.slice(nextFirst), true), items, true);
            return this._max;
        }
    };
    /**
     * @description take n items from the queue
     */
    Queue.prototype.out = function (n) {
        return this._queue.splice(0, n);
    };
    /**
     * @description move the queue forward n positions, and the items dequeued at the head are re-queued in order
     */
    Queue.prototype.circle = function (n, reverse) {
        var _a, _b;
        if (reverse === void 0) { reverse = false; }
        if (reverse) {
            this._queue.reverse();
            (_a = this._queue).push.apply(_a, this._queue.splice(0, n));
            this._queue.reverse();
        }
        else {
            (_b = this._queue).push.apply(_b, this._queue.splice(0, n));
        }
    };
    /**
     * @description clear the queue and reset it`s max-length to `n` (if need)
     */
    Queue.prototype.clear = function (n) {
        this._queue = [];
        this._max = n !== null && n !== void 0 ? n : this._max;
    };
    return Queue;
}());
exports.Queue = Queue;
