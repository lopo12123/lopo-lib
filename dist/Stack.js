"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
/**
 * @description LIFO
 */
var Stack = /** @class */ (function () {
    /**
     * @description create a stack with max length
     */
    function Stack(max) {
        /**
         * @description current stack
         * @private
         */
        this._stack = [];
        if (max <= 0 && max !== -1) {
            if (console) {
                console.warn('[Stack] Size Warning: Expect max to be greater than 0 or equal to -1 but got ' + max);
            }
        }
        this._max = max;
    }
    /**
     * @description create a stack with max length
     */
    Stack.create = function (max) {
        return new Stack(max);
    };
    Object.defineProperty(Stack.prototype, "depth", {
        /**
         * @description stack`s depth
         */
        get: function () {
            return this._stack.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description returns a shallow copy of current stack
     */
    Stack.prototype.getStack = function () {
        return this._stack.slice(0);
    };
    /**
     * @description push some items into the stack and return current depth of the stack (it will automatically ignore the rest items when the stack is full)
     */
    Stack.prototype.in = function () {
        var _a, _b, _c;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        // no max-depth limit
        if (this._max === -1) {
            return (_a = this._stack).push.apply(_a, items);
        }
        // with max-depth limit
        else {
            // below max length
            if (this._stack.length + items.length <= this._max) {
                return (_b = this._stack).push.apply(_b, items);
            }
            // overflow: already reach the limit
            else if (this._stack.length === this._max) {
                return this._max;
            }
            // overflow: can just put some of items into the stack
            else {
                return (_c = this._stack).push.apply(_c, items.slice(0, this._max - this._stack.length));
            }
        }
    };
    /**
     * @description take n items from the stack
     */
    Stack.prototype.out = function (n) {
        return this._stack.splice((this._stack.length - n < 0) ? 0 : (this._stack.length - n)).reverse();
    };
    /**
     * @description clear the queue and reset it`s max-length to `n` (if need)
     */
    Stack.prototype.clear = function (n) {
        this._stack = [];
        this._max = n !== null && n !== void 0 ? n : this._max;
    };
    return Stack;
}());
exports.Stack = Stack;
