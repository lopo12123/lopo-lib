declare class FrameTask {
    #private;
    /**
     * @param fps how many times the task should run in 1s.
     */
    constructor(fps?: number);
    /**
     * @description 新增任务
     * @param taskName 任务名, 若任务名已存在则会覆盖旧任务(旧任务停止并删除)
     * @param fn 任务回调
     * @param args 回调参数, 无参则传 `[]`
     * @param immediate 是否立即开始执行, 默认为`false`
     */
    addTask<Task extends (...args: any[]) => void>(taskName: string, fn: Task, args: Parameters<Task>, immediate?: boolean): void;
    /**
     * @description 开始/继续执行任务
     */
    runTask(taskName: string): void;
    /**
     * @description 停止任务
     */
    pauseTask(taskName: string): void;
    /**
     * @description 删除单个任务
     * @see cancelTask_with_expect
     * @see cancelTask_all
     * @param taskName 要删除的任务名
     */
    cancelTask_single(taskName: string): void;
    /**
     * @description 删除指定任务之外的全部任务
     * @see cancelTask_single
     * @see cancelTask_all
     * @param expect 要保留的任务名列表
     */
    cancelTask_with_expect(expect: string[]): void;
    /**
     * @description 删除全部任务
     * @see cancelTask_single
     * @see cancelTask_with_expect
     */
    cancelTask_all(): void;
    /**
     * @description 获取当前所有任务名
     */
    getState_name_list(): string[];
    /**
     * @description 获得指定任务的运行状态
     * @see getState_run_list
     * @return `null` 无此任务; `true` 正在运行; `false` 停止
     */
    getState_run(taskName: string): boolean | null;
    /**
     * @description 获取当前所有任务运行状态
     * @see getState_run
     */
    getState_run_list(): {
        taskName: string;
        ifRun: boolean;
    }[];
    /**
     * @description 注销事件管理, 即删除全部任务
     * @see cancelTask_all
     */
    dispose(): void;
}
export { FrameTask };
