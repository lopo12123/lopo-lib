/**
 * @description clone an object、array or anything else
 */
export declare class Clone {
    /**
     * @description [plain] these wil be lost:
     * <br/>[1]methods on objects;
     * <br/>[2]key is in type 'Symbol';
     * <br/>[3]some else ...
     */
    static plain: <T>(o: T) => T;
    /**
     * @description [deep] all params and methods will be cloned
     */
    static deep: <T extends unknown>(o: T) => T;
}
